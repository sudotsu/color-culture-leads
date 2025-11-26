import { CheckCircle, Download, Loader2, MousePointer2, Palette, Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ColorPicker from './ColorPicker';
import { getColorById } from './paintColors';

// API Base URL - In production, this would be an env variable
const API_BASE = 'https://color-culture-leads.onrender.com';
// Default Tenant for V1 Pilot - "Nikki's Painting"
const DEFAULT_TENANT = 'nikki';

// Surface types for painting
const SURFACE_TYPES = {
  WALLS: 'Walls',
  TRIM: 'Trim & Doors',
  CEILING: 'Ceiling'
};

function App() {
  // --- STATE ---
  const [tenant, setTenant] = useState(null);
  const [step, setStep] = useState('upload'); // upload | visualize | color-select | lead-form | success
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null); // For resetting
  const [isProcessing, setIsProcessing] = useState(false);

  // Color Selection State
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentSurface, setCurrentSurface] = useState(SURFACE_TYPES.WALLS);
  const [selectedColors, setSelectedColors] = useState({
    [SURFACE_TYPES.WALLS]: null,
    [SURFACE_TYPES.TRIM]: null,
    [SURFACE_TYPES.CEILING]: null
  });
  const [clickCoords, setClickCoords] = useState(null);

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

    // Store click coordinates and show color picker
    setClickCoords({ x: actualX, y: actualY });
    setShowColorPicker(true);
  };

  // Apply selected color to the clicked area
  const applyColor = async (color) => {
    if (!clickCoords || !color) return;

    setIsProcessing(true);
    setShowColorPicker(false);

    const formDataToSend = new FormData();
    formDataToSend.append('file', imageFile);
    formDataToSend.append('target_color_hex', color.hex);
    formDataToSend.append('click_x', clickCoords.x);
    formDataToSend.append('click_y', clickCoords.y);

    try {
      // POST /visualize/process
      const res = await fetch(`${API_BASE}/visualize/process`, {
        method: 'POST',
        body: formDataToSend
      });

      if (!res.ok) throw new Error("Processing failed");

      const blob = await res.blob();
      const newImageUrl = URL.createObjectURL(blob);
      setPreviewUrl(newImageUrl);

      // Update the image file for future painting operations
      const newFile = new File([blob], imageFile.name, { type: 'image/jpeg' });
      setImageFile(newFile);

      // Save the selected color for this surface
      setSelectedColors(prev => ({
        ...prev,
        [currentSurface]: color
      }));
    } catch (err) {
      alert("Could not paint that area. Try a clearer surface.");
    } finally {
      setIsProcessing(false);
      setClickCoords(null);
    }
  };

  // Export color selections
  const exportColorSelections = () => {
    const selections = Object.entries(selectedColors)
      .filter(([_, color]) => color !== null)
      .map(([surface, color]) => ({
        surface,
        colorName: color.name,
        brand: color.brand,
        sku: color.sku,
        hex: color.hex
      }));

    const exportText = `PAINT COLOR SELECTIONS\n${'='.repeat(50)}\n\n` +
      selections.map(s =>
        `${s.surface}:\n` +
        `  Color: ${s.colorName}\n` +
        `  Brand: ${s.brand}\n` +
        `  SKU: ${s.sku}\n` +
        `  Color Code: ${s.hex}\n`
      ).join('\n') +
      `\n${'='.repeat(50)}\n` +
      `Take these SKU numbers to any paint retailer\n` +
      `or show this to your painter for exact matching.`;

    // Create downloadable file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paint-color-selections.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- 4. LEAD SUBMISSION ---
  const submitLead = async (e) => {
    e.preventDefault();

    // Build color selections string for the project details
    const colorSelectionsText = Object.entries(selectedColors)
      .filter(([_, color]) => color !== null)
      .map(([surface, color]) => `${surface}: ${color.name} (${color.sku} - ${color.brand})`)
      .join(', ');

    const enhancedProjectDetails = colorSelectionsText
      ? `${formData.project_details}\n\nSelected Paint Colors: ${colorSelectionsText}`
      : formData.project_details;

    const payload = {
      tenant_id: tenant.id,
      customer_email: formData.customer_email,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      project_details: enhancedProjectDetails,
      original_image_url: "pending_s3_upload", // Placeholder for V2
      selected_palette: colorSelectionsText || "custom_mix"
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
          {/* Surface Type Selector */}
          <div className="surface-selector">
            <div className="surface-label">
              <Palette size={16} />
              <span>Select Surface Type:</span>
            </div>
            <div className="surface-buttons">
              {Object.values(SURFACE_TYPES).map((surface) => (
                <button
                  key={surface}
                  className={`surface-btn ${currentSurface === surface ? 'active' : ''} ${selectedColors[surface] ? 'has-color' : ''}`}
                  onClick={() => setCurrentSurface(surface)}
                >
                  {surface}
                  {selectedColors[surface] && (
                    <span
                      className="color-indicator"
                      style={{ backgroundColor: selectedColors[surface].hex }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

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
               <MousePointer2 size={16} /> Tap {currentSurface.toLowerCase()} to paint
             </div>
          </div>

          {/* Color Picker Modal */}
          {showColorPicker && (
            <div className="modal-overlay" onClick={() => setShowColorPicker(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <ColorPicker
                  onColorSelect={applyColor}
                  selectedColor={selectedColors[currentSurface]}
                  surfaceType={currentSurface}
                />
                <button
                  className="btn-secondary modal-close"
                  onClick={() => setShowColorPicker(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Selected Colors Summary */}
          {Object.values(selectedColors).some(c => c !== null) && (
            <div className="color-summary">
              <h5>Your Color Selections:</h5>
              <div className="selected-colors-list">
                {Object.entries(selectedColors).map(([surface, color]) =>
                  color && (
                    <div key={surface} className="selected-color-item">
                      <div
                        className="color-dot"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="color-details">
                        <strong>{surface}:</strong> {color.name}
                        <br />
                        <span className="sku-badge">{color.sku}</span> - {color.brand}
                      </div>
                    </div>
                  )
                )}
              </div>
              <button className="btn-export" onClick={exportColorSelections}>
                <Download size={16} />
                Export Paint Numbers
              </button>
            </div>
          )}

          <div className="actions">
             <button className="btn-secondary" onClick={() => {
               setPreviewUrl(originalUrl);
               setSelectedColors({
                 [SURFACE_TYPES.WALLS]: null,
                 [SURFACE_TYPES.TRIM]: null,
                 [SURFACE_TYPES.CEILING]: null
               });
             }}>
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