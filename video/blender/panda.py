"""Build the Pancatz panda mascot in Blender and export it for the website.

Run with the Blender Python module (pip install bpy) or inside Blender:

    python video/blender/panda.py            # writes public/models/panda.glb
    python video/blender/panda.py --render   # also renders video/out/panda.png

public/images/panda.webp (the no-WebGL fallback) is a 240px crop of that render.

The panda is a peeking head with two paws, made of simple primitives so it
stays tiny (a few hundred KB). Object names matter: the site's mascot script
(src/scripts/mascot.ts) looks up Head, EyeL/EyeR, PupilL/PupilR, PawL/PawR
and CheekL/CheekR to animate them.
"""

import math
import os
import sys

import bpy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
GLB = os.path.join(ROOT, "public", "models", "panda.glb")
PNG = os.path.join(ROOT, "video", "out", "panda.png")

INK = (0.012, 0.012, 0.016, 1)
FUR = (0.93, 0.91, 0.87, 1)
EYE = (1, 1, 1, 1)
CHEEK = (1.0, 0.19, 0.04, 1)  # Pancatz design orange, linear


def material(name, rgba, rough=0.6):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = rgba
    bsdf.inputs["Roughness"].default_value = rough
    return m


def sphere(name, loc, scale, mat, parent=None, rot=(0, 0, 0), seg=24, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings, radius=1, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    if parent:
        o.parent = parent
        o.matrix_parent_inverse = parent.matrix_world.inverted()
    return o


def empty(name, loc, parent=None):
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=loc)
    e = bpy.context.active_object
    e.name = name
    if parent:
        e.parent = parent
        e.matrix_parent_inverse = parent.matrix_world.inverted()
    return e


def build():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    ink, fur, eye, cheek = material("Ink", INK, 0.45), material("Fur", FUR, 0.8), material("Eye", EYE, 0.2), material("Cheek", CHEEK, 0.7)

    # Blender is Z-up with -Y facing the viewer; glTF export turns -Y into +Z.
    head = empty("Head", (0, 0, 0))
    sphere("Skull", (0, 0, 0), (1.18, 1.0, 0.98), fur, head, seg=40, rings=20)
    for side, x in (("L", -1), ("R", 1)):
        sphere(f"Ear{side}", (0.82 * x, 0.1, 0.8), (0.36, 0.26, 0.36), ink, head)
        sphere(f"Patch{side}", (0.4 * x, -0.86, 0.12), (0.3, 0.16, 0.38), ink, head, rot=(0.2, math.radians(-28 * x), 0))
        e = empty(f"Eye{side}", (0.4 * x, -0.97, 0.16), head)
        sphere(f"EyeWhite{side}", (0.4 * x, -0.97, 0.16), (0.13, 0.08, 0.15), eye, e)
        p = empty(f"Pupil{side}", (0.4 * x, -1.03, 0.15), e)
        sphere(f"PupilBall{side}", (0.4 * x, -1.03, 0.15), (0.075, 0.05, 0.09), ink, p, seg=20, rings=10)
        sphere(f"Glint{side}", (0.4 * x + 0.03, -1.075, 0.2), (0.025, 0.015, 0.025), eye, p, seg=12, rings=6)
        sphere(f"Cheek{side}", (0.66 * x, -0.7, -0.24), (0.15, 0.09, 0.09), cheek, head, rot=(0, 0, math.radians(-34 * x)), seg=16, rings=8)
        sphere(f"Paw{side}", (0.62 * x, -0.62, -1.02), (0.3, 0.26, 0.2), ink, None)
    sphere("Nose", (0, -1.0, -0.1), (0.15, 0.08, 0.09), ink, head)
    # A small smile: a thin torus segment under the nose.
    bpy.ops.mesh.primitive_torus_add(major_radius=0.1, minor_radius=0.018, location=(0, -0.985, -0.24), rotation=(math.radians(90), 0, 0))
    smile = bpy.context.active_object
    smile.name = "Smile"
    smile.data.materials.append(ink)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="DESELECT")
    bpy.ops.object.mode_set(mode="OBJECT")
    for v in smile.data.vertices:
        v.select = v.co.y > -0.02  # top half in local space (rotated): drop it
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.delete(type="VERT")
    bpy.ops.object.mode_set(mode="OBJECT")
    smile.parent = head
    smile.matrix_parent_inverse = head.matrix_world.inverted()


def export():
    os.makedirs(os.path.dirname(GLB), exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=GLB, export_format="GLB", export_yup=True, export_apply=True, export_materials="EXPORT", export_texcoords=False, export_cameras=False, export_lights=False)
    print("wrote", GLB, os.path.getsize(GLB), "bytes")


def render():
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 64
    scene.cycles.device = "CPU"
    scene.render.resolution_x = scene.render.resolution_y = 720
    scene.render.film_transparent = True
    bpy.ops.object.camera_add(location=(1.1, -6.6, 0.0), rotation=(math.radians(90), 0, math.radians(9)))
    scene.camera = bpy.context.active_object
    scene.camera.data.lens = 58
    bpy.ops.object.light_add(type="AREA", location=(-3, -4, 4))
    key = bpy.context.active_object
    key.data.energy = 900
    key.data.size = 4
    bpy.ops.object.light_add(type="AREA", location=(4, -2, 1))
    rim = bpy.context.active_object
    rim.data.energy = 300
    rim.data.color = (1.0, 0.55, 0.4)
    world = bpy.data.worlds.new("World")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.6
    scene.world = world
    scene.render.filepath = PNG
    bpy.ops.render.render(write_still=True)
    print("wrote", PNG)


if __name__ == "__main__":
    build()
    export()
    if "--render" in sys.argv:
        render()
