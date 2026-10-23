"""Build Pan, the Pancatz mascot (half panda, half cat), and export it for the website.

Run with the Blender Python module (pip install bpy) or inside Blender:

    python video/blender/pancatz.py            # writes public/models/pancatz.glb
    python video/blender/pancatz.py --render   # also renders video/out/pancatz.png

public/images/pancatz-mascot.webp (the no-WebGL fallback) is a 320px crop of that render.

Pan follows the Pancatz logo: a panda face with eye patches, a cat nose and
"w" mouth, and the scratch on the forehead. The cat half adds pointed ears,
whiskers, a ringed tail and a collar with a bell. It is built from simple
primitives so it stays small. Object names matter: the site's mascot script
(src/scripts/mascot.ts) animates Pan, Body, Head, EarL/EarR, EyeL/EyeR,
PupilL/PupilR, ArmL/ArmR, LegL/LegR and Tail1..Tail6.
"""

import math
import os
import sys

import bpy
from mathutils import Vector

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
GLB = os.path.join(ROOT, "public", "models", "pancatz.glb")
PNG = os.path.join(ROOT, "video", "out", "pancatz.png")

# Linear colours. Orange and blue are the site's --design and --tech.
INK = (0.012, 0.012, 0.016, 1)
FUR = (0.93, 0.91, 0.87, 1)
EYE = (1, 1, 1, 1)
PINK = (1.0, 0.36, 0.42, 1)
ORANGE = (1.0, 0.078, 0.010, 1)
BLUE = (0.024, 0.035, 1.0, 1)
GOLD = (1.0, 0.55, 0.08, 1)

TAIL_SEGMENTS = 6


def material(name, rgba, rough=0.6):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = rgba
    bsdf.inputs["Roughness"].default_value = rough
    return m


def attach(o, parent):
    if parent:
        o.parent = parent
        o.matrix_parent_inverse = parent.matrix_world.inverted()
    return o


def finish(name, scale, mat, parent):
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return attach(o, parent)


def sphere(name, loc, scale, mat, parent=None, rot=(0, 0, 0), seg=24, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings, radius=1, location=loc, rotation=rot)
    return finish(name, scale, mat, parent)


def cone(name, loc, r1, r2, depth, mat, parent=None, rot=(0, 0, 0), scale=(1, 1, 1), verts=24):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r1, radius2=r2, depth=depth, location=loc, rotation=rot)
    return finish(name, scale, mat, parent)


def rod(name, a, b, radius, mat, parent=None):
    """A thin cylinder from point a to point b (used for whiskers)."""
    d = [b[i] - a[i] for i in range(3)]
    length = math.sqrt(sum(c * c for c in d))
    mid = [(a[i] + b[i]) / 2 for i in range(3)]
    # Point the cylinder's Z axis along d.
    pitch = math.acos(d[2] / length)
    yaw = math.atan2(d[1], d[0])
    bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=radius, depth=length, location=mid, rotation=(0, pitch, yaw))
    return finish(name, (1, 1, 1), mat, parent)


def arc(name, loc, radius, thickness, mat, parent=None):
    """The lower half of a ring, facing the viewer: one bump of the cat's "w" mouth."""
    bpy.ops.mesh.primitive_torus_add(major_radius=radius, minor_radius=thickness, major_segments=24, minor_segments=8, location=loc, rotation=(math.radians(90), 0, 0))
    o = bpy.context.active_object
    o.name = name
    o.data.materials.append(mat)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="DESELECT")
    bpy.ops.object.mode_set(mode="OBJECT")
    for v in o.data.vertices:
        v.select = v.co.y > 0.004  # the top half, in the ring's local space
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.delete(type="VERT")
    bpy.ops.object.mode_set(mode="OBJECT")
    bpy.ops.object.shade_smooth()
    return attach(o, parent)


def empty(name, loc, parent=None):
    bpy.ops.object.empty_add(type="PLAIN_AXES", location=loc)
    e = bpy.context.active_object
    e.name = name
    return attach(e, parent)


def build():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    ink, fur, eye = material("Ink", INK, 0.45), material("Fur", FUR, 0.8), material("Eye", EYE, 0.2)
    pink, orange, blue, gold = material("Pink", PINK, 0.6), material("Orange", ORANGE, 0.7), material("Blue", BLUE, 0.5), material("Gold", GOLD, 0.3)

    # Blender is Z-up with -Y facing the viewer; glTF export turns -Y into +Z.
    # Pan stands on the origin, about 3 units tall with the ears.
    pan = empty("Pan", (0, 0, 0))

    # Legs hang off the root so the body can bob and lean on its own.
    for side, x in (("L", -1), ("R", 1)):
        leg = empty(f"Leg{side}", (0.24 * x, 0, 0.42), pan)
        sphere(f"Thigh{side}", (0.26 * x, 0, 0.25), (0.19, 0.2, 0.24), ink, leg)
        sphere(f"Foot{side}", (0.27 * x, -0.1, 0.07), (0.2, 0.26, 0.1), ink, leg)
        sphere(f"Bean{side}", (0.27 * x, -0.34, 0.06), (0.07, 0.03, 0.05), pink, leg, seg=12, rings=6)

    body = empty("Body", (0, 0, 0.42), pan)
    sphere("Torso", (0, 0, 0.78), (0.52, 0.46, 0.6), fur, body, seg=32, rings=16)
    sphere("Shoulders", (0, 0.01, 1.07), (0.56, 0.5, 0.25), ink, body)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.44, minor_radius=0.06, major_segments=32, minor_segments=8, location=(0, -0.02, 1.15))
    finish("Collar", (1, 0.95, 1), blue, body)
    sphere("Bell", (0, -0.5, 1.06), (0.085, 0.085, 0.085), gold, body, seg=16, rings=8)

    for side, x in (("L", -1), ("R", 1)):
        arm = empty(f"Arm{side}", (0.44 * x, 0, 1.12), body)
        sphere(f"Forearm{side}", (0.53 * x, -0.06, 0.86), (0.15, 0.15, 0.3), ink, arm, rot=(0, math.radians(-10 * x), 0))
        sphere(f"Pad{side}", (0.57 * x, -0.19, 0.66), (0.065, 0.03, 0.055), pink, arm, seg=12, rings=6)

    # A ringed cat tail that curls up behind, one empty per segment so it can swish.
    # It sweeps out to Pan's left so it shows from the front.
    parent = body
    p = (0.12, 0.38, 0.48)
    angle = 0.1
    yaw = 1.0
    for i in range(1, TAIL_SEGMENTS + 1):
        seg = empty(f"Tail{i}", p, parent)
        r = 0.12 - 0.008 * i
        step = 0.2
        d = (math.sin(yaw) * math.cos(angle) * step, math.cos(yaw) * math.cos(angle) * step, math.sin(angle) * step)
        centre = tuple(p[j] + d[j] / 2 for j in range(3))
        mat = ink if i % 2 == 0 or i == TAIL_SEGMENTS else fur
        sphere(f"TailFur{i}", centre, (r, 0.15, r), mat, seg, rot=(angle, 0, -yaw), seg=16, rings=8)
        p = (p[0] + d[0], p[1] + d[1], p[2] + d[2])
        parent = seg
        angle += 0.3

    # ── Head ──
    head = empty("Head", (0, 0, 1.22), body)
    sphere("Skull", (0, 0, 1.92), (0.98, 0.86, 0.82), fur, head, seg=40, rings=20)
    for side, x in (("L", -1), ("R", 1)):
        ear = empty(f"Ear{side}", (0.55 * x, 0.05, 2.45), head)
        tilt = (0, 0.38 * x, 0)
        cone(f"EarShell{side}", (0.63 * x, 0.08, 2.74), 0.32, 0.035, 0.6, ink, ear, rot=tilt, scale=(1, 0.5, 1))
        cone(f"EarInner{side}", (0.6 * x, -0.02, 2.68), 0.18, 0.02, 0.38, pink, ear, rot=tilt, scale=(1, 0.3, 1))

        sphere(f"Patch{side}", (0.34 * x, -0.73, 1.93), (0.27, 0.15, 0.34), ink, head, rot=(0.2, math.radians(-30 * x), 0))
        e = empty(f"Eye{side}", (0.33 * x, -0.86, 1.98), head)
        sphere(f"EyeWhite{side}", (0.33 * x, -0.86, 1.98), (0.125, 0.07, 0.135), eye, e)
        pupil = empty(f"Pupil{side}", (0.33 * x, -0.92, 1.97), e)
        sphere(f"PupilBall{side}", (0.33 * x, -0.92, 1.97), (0.085, 0.05, 0.095), ink, pupil, seg=20, rings=10)
        sphere(f"Glint{side}", (0.33 * x + 0.035, -0.965, 2.02), (0.03, 0.015, 0.03), eye, pupil, seg=12, rings=6)

        sphere(f"Cheek{side}", (0.6 * x, -0.6, 1.72), (0.13, 0.07, 0.08), orange, head, rot=(0, 0, math.radians(-30 * x)), seg=16, rings=8)
        for k in (-1, 0, 1):
            z = 1.76 + 0.06 * k
            t = 0.22 * k
            start = (0.42 * x, -0.78, z)
            end = (start[0] + x * math.cos(t) * 0.46, -0.8, z + math.sin(t) * 0.46)
            rod(f"Whisker{side}{k + 1}", start, end, 0.008, ink, head)

    # Cat nose and "w" mouth, as in the logo.
    cone("Nose", (0, -0.86, 1.82), 0.085, 0.0, 0.05, pink, head, rot=(math.radians(90), 0, 0), verts=3)
    for side, x in (("L", -1), ("R", 1)):
        arc(f"Mouth{side}", (0.055 * x, -0.86, 1.74), 0.055, 0.013, ink, head)
    # The scratch on the forehead from the logo.
    for i in range(3):
        x, z = -0.34 + 0.07 * i, 2.4 - 0.055 * i
        y = -0.86 * math.sqrt(1 - (x / 0.98) ** 2 - ((z - 1.92) / 0.82) ** 2) + 0.005
        sphere(f"Scratch{i + 1}", (x, y, z), (0.09, 0.05, 0.016), ink, head, rot=(-0.6, -0.45, 0), seg=12, rings=6)

    return pan


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
    bpy.ops.object.camera_add(location=(2.4, -9.2, 2.6))
    cam = bpy.context.active_object
    cam.rotation_euler = (Vector((0.1, 0, 1.45)) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam
    cam.data.lens = 50
    bpy.ops.object.light_add(type="AREA", location=(-3, -4, 5))
    key = bpy.context.active_object
    key.data.energy = 1100
    key.data.size = 4
    bpy.ops.object.light_add(type="AREA", location=(4, -2, 2))
    rim = bpy.context.active_object
    rim.data.energy = 350
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
