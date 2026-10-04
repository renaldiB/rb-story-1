import os
from PIL import Image

EXPR_MAP = {
    1: 'neutral',
    2: 'gentle_happy',
    3: 'joy',
    4: 'curious',
    5: 'surprised',
    6: 'worried',
    7: 'nervous',
    8: 'embarrassed',
    9: 'sad',
    10: 'vulnerable',
    11: 'frustrated',
    12: 'relieved'
}

base = Image.open('public/assets/characters/primary/variants/nana/nana_pose_relaxed_standing.png').convert('RGBA')
out_dir = 'public/assets/characters/primary/variants/nana'

for i, name in EXPR_MAP.items():
    src_file = f'Flow Images/Nana/nana_expression/nana_expression-{i:02d}.png'
    expr = Image.open(src_file).convert('RGBA')
    bbox = expr.getbbox()
    crop_expr = expr.crop(bbox)
    ew, eh = crop_expr.size
    scale = 230.0 / ew
    tw = int(ew * scale)
    th = int(eh * scale)
    resized_expr = crop_expr.resize((tw, th), Image.Resampling.LANCZOS)
    
    comp = base.copy()
    px = 375 + (228 - tw) // 2
    py = 283
    comp.paste(resized_expr, (px, py), resized_expr)
    
    png_path = os.path.join(out_dir, f'nana_expression_{name}.png')
    webp_path = os.path.join(out_dir, f'nana_expression_{name}.webp')
    comp.save(png_path, 'PNG')
    comp.save(webp_path, 'WEBP', quality=95, method=1)
    print(f'Generated {name}: {png_path}', flush=True)

# Also update legacy variants for full visual synchronization
legacy_map = {
    'nana_neutral': 'neutral',
    'nana_happy': 'gentle_happy',
    'nana_sad': 'sad',
    'nana_worried': 'worried',
    'nana_embarrassed': 'embarrassed',
    'nana_surprised': 'surprised',
}
for leg_name, expr_name in legacy_map.items():
    p = os.path.join(out_dir, f'nana_expression_{expr_name}.png')
    im = Image.open(p)
    im.save(os.path.join(out_dir, f'{leg_name}.png'), 'PNG')
    im.save(os.path.join(out_dir, f'{leg_name}.webp'), 'WEBP', quality=95, method=1)
    print(f'Updated legacy {leg_name}', flush=True)
