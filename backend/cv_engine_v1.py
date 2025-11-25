import cv2
import numpy as np
from PIL import Image
import io

def process_wall_preview(image_bytes: bytes, x: int, y: int, hex_color: str, tolerance: int = 30) -> bytes:
    """
    Rapidly tints a specific wall region while preserving texture.
    Optimized for web latency (<1.5s response).
    """
    # 1. Decode Image
    nparr = np.frombuffer(image_bytes, np.uint8)
    img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    h, w = img_bgr.shape[:2]

    # 2. Safety Check Coords
    x, y = max(0, min(x, w-1)), max(0, min(y, h-1))

    # 3. Flood Fill Mask (The "Magic Wand")
    mask = np.zeros((h+2, w+2), np.uint8)
    cv2.floodFill(
        img_bgr, mask, (x, y), (0,0,0),
        (tolerance,)*3, (tolerance,)*3,
        flags=4 | (255 << 8) | cv2.FLOODFILL_MASK_ONLY
    )
    wall_mask = mask[1:-1, 1:-1]

    # Soften edges for realism
    wall_mask = cv2.GaussianBlur(wall_mask, (5, 5), 0)

    # 4. Color Blending (LAB Space for realistic lighting)
    img_lab = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(img_lab)

    # Convert target hex to LAB
    rgb = tuple(int(hex_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
    target_lab = cv2.cvtColor(np.uint8([[rgb]]), cv2.COLOR_RGB2LAB)[0][0]

    # Blend: Keep original L (texture/shadow), swap A/B (color)
    mask_norm = wall_mask.astype(float) / 255.0
    a_new = (a * (1-mask_norm) + target_lab[1] * mask_norm).astype(np.uint8)
    b_new = (b * (1-mask_norm) + target_lab[2] * mask_norm).astype(np.uint8)

    merged = cv2.merge([l, a_new, b_new])
    final_bgr = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)

    # 5. Return JPEG
    _, encoded = cv2.imencode('.jpg', final_bgr, [cv2.IMWRITE_JPEG_QUALITY, 85])
    return encoded.tobytes()