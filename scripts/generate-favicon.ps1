$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $projectRoot 'assets/gsy-logo-transparent-mark.png'
$pngPath = Join-Path $projectRoot 'assets/gsy-icon-rounded-white.png'
$icoPath = Join-Path $projectRoot 'favicon.ico'
$sizes = @(16, 32, 48, 64, 128, 256)

function New-RoundedRectanglePath {
  param(
    [System.Drawing.RectangleF]$Rectangle,
    [float]$Radius
  )

  $diameter = $Radius * 2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($Rectangle.X, $Rectangle.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($Rectangle.X, $Rectangle.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function ConvertTo-PngBytes {
  param(
    [System.Drawing.Image]$Source,
    [int]$Size
  )

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $stream = New-Object System.IO.MemoryStream

  try {
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.DrawImage($Source, 0, 0, $Size, $Size)
    $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
    return $stream.ToArray()
  }
  finally {
    $stream.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

$mark = [System.Drawing.Bitmap]::FromFile($sourcePath)
$icon = New-Object System.Drawing.Bitmap $mark.Width, $mark.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($icon)
$backgroundPath = $null
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

try {
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  $margin = [float][Math]::Round($icon.Width * 0.0765)
  $side = [float]($icon.Width - 2 * $margin)
  $radius = [float][Math]::Round($side * 0.21)
  $rectangle = New-Object System.Drawing.RectangleF $margin, $margin, $side, $side
  $backgroundPath = New-RoundedRectanglePath -Rectangle $rectangle -Radius $radius
  $graphics.FillPath($whiteBrush, $backgroundPath)

  $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
  $graphics.DrawImageUnscaled($mark, 0, 0)
  $icon.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $payloads = foreach ($size in $sizes) {
    [pscustomobject]@{
      Size = $size
      Bytes = ConvertTo-PngBytes -Source $icon -Size $size
    }
  }

  $stream = New-Object System.IO.MemoryStream
  $writer = New-Object System.IO.BinaryWriter $stream
  try {
    $writer.Write([uint16]0)
    $writer.Write([uint16]1)
    $writer.Write([uint16]$payloads.Count)

    $offset = 6 + 16 * $payloads.Count
    foreach ($payload in $payloads) {
      $dimension = if ($payload.Size -eq 256) { [byte]0 } else { [byte]$payload.Size }
      $writer.Write($dimension)
      $writer.Write($dimension)
      $writer.Write([byte]0)
      $writer.Write([byte]0)
      $writer.Write([uint16]1)
      $writer.Write([uint16]32)
      $writer.Write([uint32]$payload.Bytes.Length)
      $writer.Write([uint32]$offset)
      $offset += $payload.Bytes.Length
    }

    foreach ($payload in $payloads) {
      $writer.Write([byte[]]$payload.Bytes)
    }
    [System.IO.File]::WriteAllBytes($icoPath, $stream.ToArray())
  }
  finally {
    $writer.Dispose()
    $stream.Dispose()
  }
}
finally {
  if ($backgroundPath) { $backgroundPath.Dispose() }
  $whiteBrush.Dispose()
  $graphics.Dispose()
  $icon.Dispose()
  $mark.Dispose()
}

Write-Host "Generated $pngPath"
Write-Host "Generated $icoPath"
