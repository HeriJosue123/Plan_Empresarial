from PIL import Image

# Choco Loco: Crop IG borders (mostly top and bottom)
# Original size is approx 720x1600. The post is a square.
img = Image.open('C:/Users/alexi/Downloads/Plan_Empresarial/assets/images/choco_loco.jpeg')
w, h = img.size
# Let's crop a square in the upper middle
top = int(h * 0.12)
bottom = top + w
left = 0
right = w
cropped = img.crop((left, top, right, bottom))
cropped.save('C:/Users/alexi/Downloads/Plan_Empresarial/assets/images/choco_loco.jpeg')

# Menu: Crop hands and background
img = Image.open('C:/Users/alexi/Downloads/Plan_Empresarial/assets/images/menu.jpeg')
w, h = img.size
# Crop edges where fingers and background are
left = int(w * 0.15)
right = int(w * 0.90)
top = int(h * 0.20)
bottom = int(h * 0.85)
cropped = img.crop((left, top, right, bottom))
cropped.save('C:/Users/alexi/Downloads/Plan_Empresarial/assets/images/menu.jpeg')

print("Cropped successfully!")
