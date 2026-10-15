import bpy
import json

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath="/workspace/projects/patrick-house/v2.glb")

mesh = [o for o in bpy.context.scene.objects if o.type == 'MESH'][0]
mw = mesh.matrix_world

# Find top-most vertices (Z highest)
verts = mesh.data.vertices
top_verts = []
for v in verts:
    w = mw @ v.co
    top_verts.append((w.z, w.x, w.y))

top_verts.sort(reverse=True)
print("TOP_10_VERTS:")
for z, x, y in top_10 if False else top_verts[:10]:
    print(f"  z={z:.4f} x={x:.4f} y={y:.4f}")

# Sample vertices at different Z levels to understand structure
# Find the dome top: look for high-Z vertices near center X
# Patrick is likely at positive or negative Y (in front)
# Let's find where the dome center-top is by looking at high-Z vertices clustered near X=0
high_z = [v for v in top_verts if v[0] > 0.6]
print(f"\nVerts above z=0.6: {len(high_z)}")
# Cluster by Y to separate dome vs Patrick head
# Print distribution
for z, x, y in high_z[:20]:
    print(f"  z={z:.4f} x={x:.4f} y={y:.4f}")

# Find the highest Z vertex near x=0 (dome center)
dome_top = [v for v in top_verts if abs(v[1]) < 0.1]
if dome_top:
    print(f"\nDOME_TOP (near x=0): z={dome_top[0][0]:.4f} x={dome_top[0][1]:.4f} y={dome_top[0][2]:.4f}")

# Also find overall max z
print(f"\nGLOBAL_MAX_Z: {top_verts[0][0]:.4f} at x={top_verts[0][1]:.4f} y={top_verts[0][2]:.4f}")
