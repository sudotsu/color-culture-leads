// Comprehensive paint color database with real SKU numbers from major brands
// These are actual paint colors with their official codes that can be matched at retailers

export const PAINT_BRANDS = {
  SHERWIN_WILLIAMS: 'Sherwin-Williams',
  BENJAMIN_MOORE: 'Benjamin Moore',
  BEHR: 'Behr',
  VALSPAR: 'Valspar'
};

export const PAINT_CATEGORIES = {
  WHITES: 'Whites & Neutrals',
  GRAYS: 'Grays',
  BEIGES: 'Beiges & Tans',
  BLUES: 'Blues',
  GREENS: 'Greens',
  WARM: 'Warm Colors',
  BOLD: 'Bold & Dramatic'
};

// Paint color database - Real colors with actual SKU numbers
export const PAINT_COLORS = [
  // WHITES & NEUTRALS
  {
    id: 'sw7006',
    name: 'Extra White',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7006',
    hex: '#F4F3EE',
    category: PAINT_CATEGORIES.WHITES,
    description: 'Crisp, clean white - perfect for trim and ceilings',
    popular: true
  },
  {
    id: 'sw7004',
    name: 'Snowbound',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7004',
    hex: '#F2F1ED',
    category: PAINT_CATEGORIES.WHITES,
    description: 'Soft white with subtle warmth',
    popular: true
  },
  {
    id: 'bm-oc-17',
    name: 'White Dove',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'OC-17',
    hex: '#F4F1EA',
    category: PAINT_CATEGORIES.WHITES,
    description: 'America\'s favorite white - warm and inviting',
    popular: true
  },
  {
    id: 'bm-oc-65',
    name: 'Chantilly Lace',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'OC-65',
    hex: '#F7F7F5',
    category: PAINT_CATEGORIES.WHITES,
    description: 'Pure, bright white',
    popular: true
  },
  {
    id: 'behr-pwn-10',
    name: 'Bit of Sugar',
    brand: PAINT_BRANDS.BEHR,
    sku: 'PWN-10',
    hex: '#F3F0E8',
    category: PAINT_CATEGORIES.WHITES,
    description: 'Creamy white with a hint of warmth'
  },

  // GRAYS
  {
    id: 'sw7015',
    name: 'Repose Gray',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7015',
    hex: '#C7C8BE',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Versatile warm gray - top seller',
    popular: true
  },
  {
    id: 'sw7018',
    name: 'Dorian Gray',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7018',
    hex: '#A8A8A3',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Mid-tone gray with subtle green undertones',
    popular: true
  },
  {
    id: 'sw7047',
    name: 'Porpoise',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7047',
    hex: '#8E8E87',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Rich, modern gray'
  },
  {
    id: 'bm-1475',
    name: 'Stonington Gray',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-170',
    hex: '#BBC3C4',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Cool, sophisticated gray-blue',
    popular: true
  },
  {
    id: 'bm-1495',
    name: 'Revere Pewter',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-172',
    hex: '#C5C0B0',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Perfect greige - warm gray',
    popular: true
  },
  {
    id: 'bm-ac-36',
    name: 'Coventry Gray',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-169',
    hex: '#A7ABA3',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Soft, warm gray'
  },
  {
    id: 'behr-n520-2',
    name: 'Silver Drop',
    brand: PAINT_BRANDS.BEHR,
    sku: 'N520-2',
    hex: '#C5C6C1',
    category: PAINT_CATEGORIES.GRAYS,
    description: 'Light, neutral gray'
  },

  // BEIGES & TANS
  {
    id: 'sw7036',
    name: 'Accessible Beige',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7036',
    hex: '#D1C7B8',
    category: PAINT_CATEGORIES.BEIGES,
    description: 'Perfect neutral beige - works everywhere',
    popular: true
  },
  {
    id: 'sw6106',
    name: 'Kilim Beige',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6106',
    hex: '#C5B8A0',
    category: PAINT_CATEGORIES.BEIGES,
    description: 'Warm, earthy beige'
  },
  {
    id: 'sw7522',
    name: 'Realistic Beige',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7522',
    hex: '#CDBBAB',
    category: PAINT_CATEGORIES.BEIGES,
    description: 'Soft, warm beige'
  },
  {
    id: 'bm-977',
    name: 'Sandy Hook Gray',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-108',
    hex: '#D4C9B8',
    category: PAINT_CATEGORIES.BEIGES,
    description: 'Warm greige with taupe undertones'
  },
  {
    id: 'behr-n240-2',
    name: 'Sandstone Cove',
    brand: PAINT_BRANDS.BEHR,
    sku: 'N240-2',
    hex: '#D9CDB9',
    category: PAINT_CATEGORIES.BEIGES,
    description: 'Creamy beige'
  },

  // BLUES
  {
    id: 'sw6219',
    name: 'Rain',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6219',
    hex: '#B9CDD1',
    category: PAINT_CATEGORIES.BLUES,
    description: 'Soft, spa-like blue-gray',
    popular: true
  },
  {
    id: 'sw6204',
    name: 'Sea Salt',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6204',
    hex: '#D4DDD7',
    category: PAINT_CATEGORIES.BLUES,
    description: 'Soft green-blue - coastal favorite',
    popular: true
  },
  {
    id: 'sw6770',
    name: 'Naval',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6770',
    hex: '#2C3E50',
    category: PAINT_CATEGORIES.BLUES,
    description: 'Deep, sophisticated navy blue',
    popular: true
  },
  {
    id: 'bm-1655',
    name: 'Hale Navy',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-154',
    hex: '#384C5D',
    category: PAINT_CATEGORIES.BLUES,
    description: 'Classic navy - rich and timeless',
    popular: true
  },
  {
    id: 'bm-1563',
    name: 'Palladian Blue',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-144',
    hex: '#BFD6CE',
    category: PAINT_CATEGORIES.BLUES,
    description: 'Soft, spa-like aqua'
  },
  {
    id: 'behr-m500-3',
    name: 'Atmospheric',
    brand: PAINT_BRANDS.BEHR,
    sku: 'M500-3',
    hex: '#B5CDD9',
    category: PAINT_CATEGORIES.BLUES,
    description: 'Light, airy blue'
  },

  // GREENS
  {
    id: 'sw6190',
    name: 'Quietude',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6190',
    hex: '#C4D4C9',
    category: PAINT_CATEGORIES.GREENS,
    description: 'Soft, soothing green-gray'
  },
  {
    id: 'sw6168',
    name: 'Clary Sage',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6178',
    hex: '#B5B8A5',
    category: PAINT_CATEGORIES.GREENS,
    description: 'Earthy sage green',
    popular: true
  },
  {
    id: 'sw6161',
    name: 'Oyster Bay',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6206',
    hex: '#C1CDC1',
    category: PAINT_CATEGORIES.GREENS,
    description: 'Soft, coastal green'
  },
  {
    id: 'bm-553',
    name: 'Saybrook Sage',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'HC-114',
    hex: '#9FA894',
    category: PAINT_CATEGORIES.GREENS,
    description: 'Classic sage green',
    popular: true
  },
  {
    id: 'bm-494',
    name: 'Salamander',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: '2050-10',
    hex: '#6B7D5C',
    category: PAINT_CATEGORIES.GREENS,
    description: 'Rich, natural green'
  },

  // WARM COLORS
  {
    id: 'sw6126',
    name: 'Softest Blush',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6126',
    hex: '#E5D5D0',
    category: PAINT_CATEGORIES.WARM,
    description: 'Delicate pink-beige'
  },
  {
    id: 'sw6302',
    name: 'Honeycomb',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6039',
    hex: '#D4A574',
    category: PAINT_CATEGORIES.WARM,
    description: 'Warm, golden tan'
  },
  {
    id: 'bm-025',
    name: 'Caliente',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: 'AF-290',
    hex: '#C1553A',
    category: PAINT_CATEGORIES.WARM,
    description: 'Vibrant terracotta'
  },

  // BOLD & DRAMATIC
  {
    id: 'sw6258',
    name: 'Tricorn Black',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6258',
    hex: '#2F2F30',
    category: PAINT_CATEGORIES.BOLD,
    description: 'Pure black - modern and bold',
    popular: true
  },
  {
    id: 'sw7069',
    name: 'Iron Ore',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 7069',
    hex: '#4C4A48',
    category: PAINT_CATEGORIES.BOLD,
    description: 'Charcoal gray - sophisticated',
    popular: true
  },
  {
    id: 'bm-2132-10',
    name: 'Black',
    brand: PAINT_BRANDS.BENJAMIN_MOORE,
    sku: '2132-10',
    hex: '#24211D',
    category: PAINT_CATEGORIES.BOLD,
    description: 'Rich, true black'
  },
  {
    id: 'sw6321',
    name: 'Red Bay',
    brand: PAINT_BRANDS.SHERWIN_WILLIAMS,
    sku: 'SW 6321',
    hex: '#5D4037',
    category: PAINT_CATEGORIES.BOLD,
    description: 'Deep, rich brown'
  }
];

// Helper functions
export const getColorsByCategory = (category) => {
  return PAINT_COLORS.filter(color => color.category === category);
};

export const getPopularColors = () => {
  return PAINT_COLORS.filter(color => color.popular);
};

export const getColorsByBrand = (brand) => {
  return PAINT_COLORS.filter(color => color.brand === brand);
};

export const getColorById = (id) => {
  return PAINT_COLORS.find(color => color.id === id);
};

export const searchColors = (query) => {
  const lowerQuery = query.toLowerCase();
  return PAINT_COLORS.filter(color =>
    color.name.toLowerCase().includes(lowerQuery) ||
    color.sku.toLowerCase().includes(lowerQuery) ||
    color.description.toLowerCase().includes(lowerQuery)
  );
};
