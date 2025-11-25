import { CheckCircle, Loader2, MousePointer2, Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// API Base URL - In production, this would be an env variable
const API_BASE = 'https://color-culture-leads.onrender.com';
// Default Tenant for V1 Pilot - "Nikki's Painting"
const DEFAULT_TENANT = 'nikki';

function App() {
  // --- STATE ---
  const [tenant, setTenant] = useState(null);
  const [step, setStep] = useState('upload'); // upload | visualize | lead-form | success
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null); // For resetting
  const [isProcessing, setIsProcessing] = useState(false);

  // Lead Form State
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    project_details: '',
    customer_phone: ''
  });

  const imgRef = useRef(null);

  // --- 1. CONFIGURATION ---
  useEffect(() => {
    // Grab tenant from URL query param (?tenant=nikki) or default
    const params = new URLSearchParams(window.location.search);
    const tenantId = params.get('tenant') || DEFAULT_TENANT;

    fetch(`${API_BASE}/config/${tenantId}`)
      .then(res => res.json())
      .then(data => {
        setTenant(data);
        // Apply primary color to CSS variable for dynamic branding
        document.documentElement.style.setProperty('--primary-color', data.branding.primaryColor);
      })
      .catch(err => console.error("Failed to load tenant config:", err));
  }, []);

  // --- 2. IMAGE UPLOAD ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setImageFile(file);
    setOriginalUrl(objectUrl);
    setPreviewUrl(objectUrl);
    setStep('visualize');
  };

  // --- 3. VISUALIZATION (CV ENGINE) ---
  const handleImageClick = async (e) => {
    if (isProcessing || !tenant) return;

    // Coordinate Math: Scale click to original image resolution
    const rect = e.target.getBoundingClientRect();
    const displayX = e.clientX - rect.left;
    const displayY = e.clientY - rect.top;

    const naturalWidth = imgRef.current.naturalWidth;
    const naturalHeight = imgRef.current.naturalHeight;
    const clientWidth = e.target.clientWidth;
    const clientHeight = e.target.clientHeight;

    const actualX = Math.floor((displayX / clientWidth) * naturalWidth);
    const actualY = Math.floor((displayY / clientHeight) * naturalHeight);

    setIsProcessing(true);

    // Pick a target color (Hardcoded to a neutral gray/blue for demo,
    // ideally this comes from a palette picker in future versions)
    const targetHex = "#E2E8F0";

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('target_color_hex', targetHex);
    formData.append('click_x', actualX);
    formData.append('click_y', actualY);

    try {
      // POST /visualize/process
      const res = await fetch(`${API_BASE}/visualize/process`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error("Processing failed");

      const blob = await res.blob();
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert("Could not paint that wall. Try a clearer area.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- 4. LEAD SUBMISSION ---
  const submitLead = async (e) => {
    e.preventDefault();

    const payload = {
      tenant_id: tenant.id,
      customer_email: formData.customer_email,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      project_details: formData.project_details,
      original_image_url: "pending_s3_upload", // Placeholder for V2
      selected_palette: "custom_mix"
    };

    try {
      // POST /lead/submit
      const res = await fetch(`${API_BASE}/lead/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStep('success');
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- RENDER ---
  if (!tenant) return <div className="loading">Loading Contractor Config...</div>;

  return (
    <div className="widget-container">
      {/* BRAND HEADER */}
      <header className="widget-header">
        {tenant.branding.logoUrl && (
          <img src={tenant.branding.logoUrl} alt={tenant.name} className="brand-logo" />
        )}
        <h3>{tenant.name} Virtual Painter</h3>
      </header>

      {/* STEP 1: UPLOAD */}
      {step === 'upload' && (
        <div className="upload-zone">
          <Upload size={48} className="icon-primary" />
          <p>See your room in a new color instantly.</p>
          <label className="btn-primary">
            Upload Photo
            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          </label>
        </div>
      )}

      {/* STEP 2: VISUALIZE */}
      {step === 'visualize' && (
        <div className="visualizer-zone">
          <div className="image-wrapper">
             {isProcessing && (
               <div className="overlay-loading">
                 <Loader2 className="spin" /> Painting...
               </div>
             )}
             <img
               ref={imgRef}
               src={previewUrl}
               onClick={handleImageClick}
               className="interactive-image"
               alt="Room Preview"
             />
             <div className="instruction-toast">
               <MousePointer2 size={16} /> Tap a wall to paint it
             </div>
          </div>

          <div className="actions">
             <button className="btn-secondary" onClick={() => setPreviewUrl(originalUrl)}>
               Reset
             </button>
             <button className="btn-primary" onClick={() => setStep('lead-form')}>
               {tenant.branding.ctaText} {/* Dynamic CTA from Config */}
             </button>
          </div>
        </div>
      )}

      {/* STEP 3: LEAD FORM */}
      {step === 'lead-form' && (
        <form className="lead-form" onSubmit={submitLead}>
          <h4>Get Your Free Quote</h4>
          <p className="subtext">We'll send this preview to {tenant.name}.</p>

          <input
            type="text" placeholder="Name" required
            value={formData.customer_name}
            onChange={e => setFormData({...formData, customer_name: e.target.value})}
          />
          <input
            type="email" placeholder="Email" required
            value={formData.customer_email}
            onChange={e => setFormData({...formData, customer_email: e.target.value})}
          />
          <input
            type="tel" placeholder="Phone (Optional)"
            value={formData.customer_phone}
            onChange={e => setFormData({...formData, customer_phone: e.target.value})}
          />
          <textarea
            placeholder="Project details (e.g., 2 bedrooms, exterior...)"
            value={formData.project_details}
            onChange={e => setFormData({...formData, project_details: e.target.value})}
          />

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setStep('visualize')}>Back</button>
            <button type="submit" className="btn-primary">Submit Request</button>
          </div>
        </form>
      )}

      {/* STEP 4: SUCCESS */}
      {step === 'success' && (
        <div className="success-zone">
          <CheckCircle size={64} className="icon-success" />
          <h4>Request Sent!</h4>
          <p>{tenant.name} will contact you shortly.</p>
        </div>
      )}
    </div>
  );
}

export default App;