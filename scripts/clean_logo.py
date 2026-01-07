from PIL import Image, ImageDraw

def clean_logo(path):
    try:
        img = Image.open(path)
        width, height = img.size
        draw = ImageDraw.Draw(img)
        
        # Increased mask size from 60 to 150 to ensure coverage
        # The image size is likely large (e.g. 1000px+ width), so 60px might have been too small.
        # Bottom right symbol often sits 50-100px from corners.
        
        mask_w = 150
        mask_h = 100 
        
        # Coordinates: Start from (Width - mask_w, Height - mask_h) to (Width, Height)
        box = [width - mask_w, height - mask_h, width, height]
        
        draw.rectangle(box, fill=(0, 0, 0))
        
        img.save(path)
        print(f"Successfully cleaned (aggressive) {path}, Size: {width}x{height}")
    except Exception as e:
        print(f"Error cleaning logo: {e}")

if __name__ == "__main__":
    clean_logo(r"c:\Restuarent App\website\public\assets\logo_fitted_2025.png")
