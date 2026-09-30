"""从源图生成站点图标（favicon.ico + apple-touch-icon）。

用法：
    python scripts/make-icon.py <源图路径>

产物：
    favicon.ico                          多尺寸 ICO（16/32/48），供浏览器标签页使用
    assets/gsy-icon-rounded-avatar.png   512×512 圆角 PNG，供 apple-touch-icon / OG 使用

说明：源图为方形带背景的插画，直接等比缩放；不裁切人物，保留原构图。
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ICO_SIZES = [16, 32, 48]
TOUCH_SIZE = 512
TOUCH_RADIUS_RATIO = 0.22


def fit_square(image: Image.Image, size: int) -> Image.Image:
    """等比缩放并居中填充到正方形画布。"""
    src = image.convert("RGB")
    scale = min(size / src.width, size / src.height)
    resized = src.resize(
        (max(1, round(src.width * scale)), max(1, round(src.height * scale))),
        Image.LANCZOS,
    )
    canvas = Image.new("RGB", (size, size), src.getpixel((0, 0)))
    canvas.paste(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return canvas


def enhance(image: Image.Image) -> Image.Image:
    """小尺寸帧提一点对比与锐度，避免暗色背景糊成一团。"""
    from PIL import ImageEnhance

    out = ImageEnhance.Contrast(image).enhance(1.06)
    out = ImageEnhance.Color(out).enhance(1.08)
    return out


def rounded(image: Image.Image, size: int, radius_ratio: float) -> Image.Image:
    canvas = fit_square(image, size).convert("RGBA")
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=round(size * radius_ratio), fill=255
    )
    canvas.putalpha(mask)
    return canvas


def main() -> int:
    if len(sys.argv) < 2:
        print("用法：python scripts/make-icon.py <源图路径>", file=sys.stderr)
        return 2

    source = Path(sys.argv[1]).expanduser().resolve()
    if not source.exists():
        print(f"源图不存在：{source}", file=sys.stderr)
        return 2

    with Image.open(source) as raw:
        frames = [enhance(fit_square(raw, size)) for size in ICO_SIZES]
        ico_path = ROOT / "favicon.ico"
        frames[-1].save(ico_path, format="ICO", sizes=[(s, s) for s in ICO_SIZES])

        touch = rounded(raw, TOUCH_SIZE, TOUCH_RADIUS_RATIO)
        touch_path = ROOT / "assets" / "gsy-icon-rounded-avatar.png"
        touch.save(touch_path, format="PNG", optimize=True)

    print(f"已写入 {ico_path.relative_to(ROOT)}（{', '.join(f'{s}px' for s in ICO_SIZES)}）")
    print(f"已写入 {touch_path.relative_to(ROOT)}（{TOUCH_SIZE}px）")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
