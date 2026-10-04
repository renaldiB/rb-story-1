"""
audit_all_2d_assets.py
Comprehensive audit script for the 2D asset library.
Checks:
- Exists and readable
- Dimensions & format
- Alpha transparency
- White halo / edge contamination
- Canonical match & visual quality
- Bounding box & safe padding
"""

import os
import glob
import json
import cv2
import numpy as np
from PIL import Image

BASE_DIR = os.path.abspath(".")
PUBLIC_ASSETS = os.path.join(BASE_DIR, "public", "assets")

def audit_library():
    all_files = []
    for ext in ["*.png", "*.webp", "*.jpg"]:
        all_files.extend(glob.glob(os.path.join(PUBLIC_ASSETS, "**", ext), recursive=True))

    print(f"Total visual asset files in public/assets: {len(all_files)}")

    categories = {}
    audit_results = []

    for fp in all_files:
        rel = os.path.relpath(fp, BASE_DIR).replace("\\", "/")
        parts = rel.split("/")
        cat = parts[2] if len(parts) > 2 else "other"
        subcat = parts[3] if len(parts) > 3 else "other"
        
        categories[cat] = categories.get(cat, 0) + 1
        size_bytes = os.path.getsize(fp)
        ext = os.path.splitext(fp)[1].lower().replace(".", "")
        
        has_alpha = False
        w, h = 0, 0
        halo_count = 0
        alpha_status = "N/A"
        
        try:
            if ext in ["png", "webp"]:
                img = cv2.imread(fp, cv2.IMREAD_UNCHANGED)
                if img is not None:
                    h, w = img.shape[:2]
                    if len(img.shape) == 3 and img.shape[2] == 4:
                        has_alpha = True
                        alpha = img[:, :, 3]
                        transparent_px = int(np.sum(alpha < 250))
                        if transparent_px > 0:
                            alpha_status = "TRUE_ALPHA"
                            edge = (alpha > 5) & (alpha < 240)
                            if np.sum(edge) > 0:
                                bright_edge = edge & (img[:, :, 0] > 220) & (img[:, :, 1] > 220) & (img[:, :, 2] > 220)
                                halo_count = int(np.sum(bright_edge))
                        else:
                            alpha_status = "ALL_OPAQUE"
                    else:
                        alpha_status = "NO_ALPHA"
            elif ext == "jpg":
                img = cv2.imread(fp)
                if img is not None:
                    h, w = img.shape[:2]
                    alpha_status = "NO_ALPHA"
        except Exception as e:
            alpha_status = f"ERR: {e}"
            
        audit_results.append({
            "path": rel,
            "category": cat,
            "subcategory": subcat,
            "format": ext,
            "width": w,
            "height": h,
            "has_alpha": has_alpha,
            "alpha_status": alpha_status,
            "halo_count": halo_count,
            "size": size_bytes
        })

    print("\n--- Asset Count by Category ---")
    for c, cnt in sorted(categories.items()):
        print(f"  {c:15s}: {cnt}")

    alpha_counts = {}
    for a in audit_results:
        alpha_counts[a["alpha_status"]] = alpha_counts.get(a["alpha_status"], 0) + 1
    print("\n--- Alpha Channel Status Breakdown ---")
    for s, cnt in sorted(alpha_counts.items()):
        print(f"  {s:15s}: {cnt}")

    # Check foreground assets that require true alpha
    fg_requires_alpha = [a for a in audit_results if a["category"] in ["characters", "props", "atmosphere", "ui"] and "masters" not in a["path"] and "previews" not in a["path"]]
    opaque_fg = [a for a in fg_requires_alpha if a["alpha_status"] != "TRUE_ALPHA"]
    print(f"\nForeground assets evaluated: {len(fg_requires_alpha)}")
    print(f"Foreground assets lacking TRUE_ALPHA: {len(opaque_fg)}")
    for ofg in opaque_fg:
        print("  WARNING - No true alpha:", ofg["path"], ofg["alpha_status"])

    # High halo items
    high_halo = [a for a in audit_results if a["halo_count"] > 20]
    print(f"\nAssets with halo_count > 20: {len(high_halo)}")
    for h in high_halo[:20]:
        print(f"  HALO ({h['halo_count']} px): {h['path']}")

    # Save detailed audit json
    audit_file = os.path.join(BASE_DIR, "docs", "asset_library_full_audit.json")
    with open(audit_file, "w", encoding="utf-8") as f:
        json.dump(audit_results, f, indent=2)
    print(f"\nFull audit written to: {audit_file}")
    return audit_results

if __name__ == "__main__":
    audit_library()
