import trimesh
import pyrender
import numpy as np
import io
from PIL import Image

scene = pyrender.Scene()

fuze_trimesh = trimesh.load('./models/police.obj')
mesh = pyrender.Mesh.from_trimesh(fuze_trimesh)

scene.add(mesh)



data = scene.save_image(resolution=(1080,1080))
image = np.array(Image.open(io.BytesIO(data))) 