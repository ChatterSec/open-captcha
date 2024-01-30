import trimesh
import numpy as np
import io
from PIL import Image

mesh = trimesh.load_mesh('./models/police.obj')
mesh.apply_transform(trimesh.transformations.rotation_matrix(np.radians(90.0), [0, 1, 0]))

scene = trimesh.Scene(mesh)
data = scene.save_image(resolution=(1080,1080))
image = np.array(Image.open(io.BytesIO(data))) 

# Save the image
Image.fromarray(image).save('out.png')