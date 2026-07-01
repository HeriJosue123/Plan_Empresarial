from PIL import Image
import sys

def crop_image(img_path):
    print(f"Processing {img_path}")
    img = Image.open(img_path)
    width, height = img.size
    gray = img.convert("L")
    
    top = 0
    bottom = height
    
    # Typical Instagram screenshot has black bars at top and bottom.
    # Let's find the first row that is bright enough.
    for y in range(height):
        # Sample middle column to avoid side borders
        if gray.getpixel((width//2, y)) > 20:
            top = y
            break
            
    for y in range(height-1, -1, -1):
        if gray.getpixel((width//2, y)) > 20:
            bottom = y
            break
            
    # Add a bit of margin to remove any UI lines
    top = top + 10
    bottom = bottom - 10
    
    # Left and right might also be black
    left = 0
    for x in range(width):
        if gray.getpixel((x, height//2)) > 20:
            left = x
            break
            
    right = width
    for x in range(width-1, -1, -1):
        if gray.getpixel((x, height//2)) > 20:
            right = x
            break
            
    left = max(0, left + 2)
    right = min(width, right - 2)

    # Sanity check
    if bottom <= top or right <= left:
        print(f"Skipping {img_path}, bounding box invalid")
        return

    print(f"Cropping {img_path} to ({left}, {top}, {right}, {bottom})")
    cropped = img.crop((left, top, right, bottom))
    cropped.save(img_path)

try:
    crop_image("choco_loco.jpeg")
    crop_image("menu.jpeg")
    print("Done!")
except Exception as e:
    print(f"Error: {e}")
