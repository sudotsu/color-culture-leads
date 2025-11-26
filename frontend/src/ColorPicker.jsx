import { Search, Tag, X } from 'lucide-react';
import React, { useState } from 'react';
import {
  PAINT_BRANDS,
  PAINT_CATEGORIES,
  PAINT_COLORS,
  getColorsByBrand,
  getColorsByCategory,
  getPopularColors,
  searchColors
} from './paintColors';
import './ColorPicker.css';

/**
 * Render a paint color picker UI for selecting and inspecting paint colors for a given surface.
 *
 * @param {Object} props - Component props.
 * @param {(color: Object) => void} props.onColorSelect - Callback invoked with the selected color object when a color card is clicked.
 * @param {Object|null} props.selectedColor - Currently selected color object (or `null`) used to highlight the selection and show details.
 * @param {string} props.surfaceType - Display name of the surface being painted shown in the header.
 * @returns {JSX.Element} The rendered ColorPicker component.
 */
function ColorPicker({ onColorSelect, selectedColor, surfaceType }) {
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getDisplayColors = () => {
    if (searchQuery.trim()) {
      return searchColors(searchQuery);
    }

    switch (activeTab) {
      case 'popular':
        return getPopularColors();
      case 'category':
        return selectedCategory ? getColorsByCategory(selectedCategory) : [];
      case 'brand':
        return selectedBrand ? getColorsByBrand(selectedBrand) : [];
      default:
        return PAINT_COLORS;
    }
  };

  const displayColors = getDisplayColors();

  return (
    <div className="color-picker">
      <div className="color-picker-header">
        <h4>Choose Paint Color for {surfaceType}</h4>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, SKU, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Tabs */}
        {!searchQuery && (
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
              onClick={() => setActiveTab('popular')}
            >
              Popular
            </button>
            <button
              className={`tab ${activeTab === 'category' ? 'active' : ''}`}
              onClick={() => setActiveTab('category')}
            >
              By Category
            </button>
            <button
              className={`tab ${activeTab === 'brand' ? 'active' : ''}`}
              onClick={() => setActiveTab('brand')}
            >
              By Brand
            </button>
          </div>
        )}

        {/* Category Filter */}
        {activeTab === 'category' && !searchQuery && (
          <div className="filter-chips">
            {Object.values(PAINT_CATEGORIES).map((category) => (
              <button
                key={category}
                className={`chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Brand Filter */}
        {activeTab === 'brand' && !searchQuery && (
          <div className="filter-chips">
            {Object.values(PAINT_BRANDS).map((brand) => (
              <button
                key={brand}
                className={`chip ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Grid */}
      <div className="color-grid">
        {displayColors.length === 0 && (
          <div className="no-results">
            <p>No colors found. Try a different search or filter.</p>
          </div>
        )}

        {displayColors.map((color) => (
          <div
            key={color.id}
            className={`color-card ${selectedColor?.id === color.id ? 'selected' : ''}`}
            onClick={() => onColorSelect(color)}
          >
            <div
              className="color-swatch"
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor?.id === color.id && (
                <div className="selected-check">✓</div>
              )}
            </div>
            <div className="color-info">
              <div className="color-name">{color.name}</div>
              <div className="color-sku">
                <Tag size={12} />
                {color.sku}
              </div>
              <div className="color-brand">{color.brand}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Color Details */}
      {selectedColor && (
        <div className="selected-color-details">
          <div className="detail-header">
            <div
              className="detail-swatch"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div>
              <div className="detail-name">{selectedColor.name}</div>
              <div className="detail-sku">
                <Tag size={14} />
                <strong>{selectedColor.sku}</strong> - {selectedColor.brand}
              </div>
            </div>
          </div>
          <p className="detail-description">{selectedColor.description}</p>
          <div className="retailer-info">
            <strong>Where to buy:</strong>
            <p>
              Take this SKU number (<strong>{selectedColor.sku}</strong>) to any {selectedColor.brand} retailer
              or authorized dealer. They can mix this exact color for you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;