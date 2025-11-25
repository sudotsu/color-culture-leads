import json
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from typing import Optional

# Import the CV logic from the uploaded file
from cv_engine_v1 import process_wall_preview

app = FastAPI(title="ColorCulture Lead Gen API", version="1.0.0")

# 1. CORS Configuration
# Crucial for "Embedded via iFrame or Widget" strategy.
# Allows the API to be called from contractor websites (WordPress, Squarespace).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific tenant domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load Tenant Configuration
# Single source of truth for branding and routing.
try:
    with open("tenant_config.json", "r") as f:
        CONFIG_DATA = json.load(f)
except FileNotFoundError:
    # Fallback for dev environment if file is missing, though it shouldn't be.
    CONFIG_DATA = {"tenants": {}}

def get_tenant_config(tenant_id: str):
    """Helper to retrieve and validate tenant existence."""
    tenant = CONFIG_DATA.get("tenants", {}).get(tenant_id)
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    if not tenant.get("active", False):
        raise HTTPException(status_code=403, detail="Tenant account is inactive")
    return tenant

# 3. Pydantic Models (Strictly following api_contract_leads.yaml)
class LeadSubmission(BaseModel):
    tenant_id: str
    customer_name: Optional[str] = None
    customer_email: str
    customer_phone: Optional[str] = None
    project_details: Optional[str] = None
    original_image_url: Optional[str] = None
    selected_palette: Optional[str] = None

# 4. Endpoints

@app.get("/config/{tenant_id}")
async def get_config(tenant_id: str):
    """
    Get branding and settings for a specific contractor.
    """
    tenant = get_tenant_config(tenant_id)
    # Return only public info to frontend
    return {
        "id": tenant["id"],
        "name": tenant["name"],
        "branding": tenant["branding"],
        "palettes": tenant["palettes"]
    }

@app.post("/visualize/process")
async def visualize_process(
    file: UploadFile = File(...),
    target_color_hex: str = Form(...),
    click_x: int = Form(...),
    click_y: int = Form(...),
):
    """
    Upload image + coordinates to get a recolored preview.
    Connects directly to cv_engine_v1.py logic.
    """
    # 1. Validation
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG/PNG allowed.")

    # 2. Read bytes
    image_bytes = await file.read()

    # 3. Process via CV Engine
    # Optimized for web latency (<1.5s) as per requirements.
    try:
        processed_image = process_wall_preview(
            image_bytes=image_bytes,
            x=click_x,
            y=click_y,
            hex_color=target_color_hex
        )
    except Exception as e:
        print(f"CV Engine Error: {e}")
        raise HTTPException(status_code=500, detail="Image processing failed")

    # 4. Return Image Bytes directly
    return Response(content=processed_image, media_type="image/jpeg")

@app.post("/lead/submit", status_code=201)
async def submit_lead(lead: LeadSubmission):
    """
    Submit a new lead to the tenant.
    """
    # 1. Verify Tenant Exists
    tenant = get_tenant_config(lead.tenant_id)

    # 2. Routing Logic
    # In a real deployment, this would trigger an email via SendGrid or a Zapier Webhook.
    routing = tenant.get("lead_routing", {})

    # Log for v1 MVP (simulating the email dispatch)
    print(f"--- NEW LEAD FOR {tenant['name']} ---")
    print(f"Email: {lead.customer_email}")
    print(f"Routing To: {routing.get('email')} / Webhook: {routing.get('webhook')}")
    print("-------------------------------------")

    # 3. Return Success
    return {"message": "Lead accepted and routed", "tenant_name": tenant["name"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)