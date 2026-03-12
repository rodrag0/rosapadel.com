# ROSA 3D Assets Guide

Preferred format for production assets:
- `.glb` (binary glTF 2.0)

Recommended file set:
- `rosa-court.glb` (full court with static geometry)
- `rosa-hardware.glb` (ROSA hardware module)
- `rosa-monitor.glb` (monitor assembly)
- `rosa-cameras.glb` (camera units)

Coordinate and scale conventions:
- Units: meters
- Up axis: Y-up
- Forward axis: -Z
- Origin: center of court floor (0, 0, 0)

Optimization targets:
- Total scene under 8 MB for first load
- Use baked textures where possible
- Keep each model under ~120k triangles where feasible

Export settings (Blender -> glTF):
- Format: glTF Binary (.glb)
- Include: Selected Objects
- Apply Modifiers: On
- +Y Up: On
- Compression: enable geometry compression if available

If you provide these files, the current `court3d.js` can be upgraded from primitive placeholders to loaded production models.
