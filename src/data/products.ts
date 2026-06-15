import { Product, Review, PromoCode } from '../types';

export const CATEGORIES = [
  'Watches',
  'Sunglasses',
  'Wallets',
  'Jewelry',
  'Bags',
  'Belts',
  'Hats'
];

export const MOCK_PRODUCTS: Product[] = [
  // --- WATCHES ---
  {
    id: 'w1',
    name: 'Aurelia Chronograph Gold',
    category: 'Watches',
    price: 349,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 124,
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Gold/Black', 'Gold/White', 'Full Gold'],
    description: 'The Aurelia Chronograph stands as a monument to precision and style. Featuring a triple-dial brushed gold face and a robust, genuine calfskin band, it is built to transcend seasonal fashion trends.',
    specs: {
      'Movement': 'Japanese Quartz Chronograph',
      'Case Diameter': '42mm',
      'Water Resistance': '5 ATM / 50 Meters',
      'Strap Material': 'Interchangeable Full Grain Italian Leather',
      'Glass': 'Scratch-resistant Sapphire Crystal'
    },
    isNew: true,
    isBestSeller: true,
    featured: true,
    stock: 12
  },
  {
    id: 'w2',
    name: 'Classic Onyx Mesh Watch',
    category: 'Watches',
    price: 189,
    rating: 4.6,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Matte Black', 'Brushed Steel'],
    description: 'Intricately forged from ultra-light mesh stainless steel. Its dark face offers supreme legibility and a stark, sculptural statement modernizing any wrist.',
    specs: {
      'Movement': 'Swiss Quartz',
      'Case Diameter': '38mm',
      'Water Resistance': '3 ATM',
      'Strap Material': 'Stainless Steel Mesh Link',
      'Glass': 'Hardened Mineral Crystal'
    },
    isNew: false,
    isBestSeller: false,
    featured: true,
    stock: 25
  },

  // --- SUNGLASSES ---
  {
    id: 's1',
    name: 'Verdun Angular Sunglasses',
    category: 'Sunglasses',
    price: 145,
    originalPrice: 195,
    rating: 4.9,
    reviewsCount: 204,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Gloss Black/Gold', 'Tortoise/Bronze', 'Clear Gold/Green'],
    description: 'Chiseled frame geometry meets premium polarized UV protection. Named after the historic district of craftsmanship, Verdun brings retro-elegance into the contemporary landscape.',
    specs: {
      'Frame Type': 'Hand-polished Acetate',
      'Lenses': 'Polarized 100% UVA/UVB Protection',
      'Fit': 'Medium to Wide',
      'Hinge': 'German-engineered 5-barrel hinges'
    },
    isNew: true,
    isBestSeller: true,
    featured: true,
    stock: 8
  },
  {
    id: 's2',
    name: 'Monarch Hex Metal Sunglasses',
    category: 'Sunglasses',
    price: 160,
    rating: 4.5,
    reviewsCount: 61,
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Gold/Black Lens', 'Silver/Ice Blue', 'Rose Gold/Pink Lens'],
    description: 'Framed in high-tensile titanium with 24k gold bath finish, these hexagonal lenses balance weightless style with striking aesthetic angles.',
    specs: {
      'Frame Type': 'Flexible Grade-A Titanium',
      'Lenses': 'Cat-3 Anti-reflective Coated',
      'Fit': 'Standard Unisex',
      'Weight': '18 grams'
    },
    isNew: false,
    isBestSeller: false,
    featured: false,
    stock: 15
  },

  // --- WALLETS ---
  {
    id: 'wa1',
    name: 'Saffiano Gold Slim Cardholder',
    category: 'Wallets',
    price: 79,
    originalPrice: 95,
    rating: 4.7,
    reviewsCount: 312,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588444839799-668622b214f7?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Onyx Black', 'Rich Tan', 'Emerald Gold'],
    description: 'Engineered for simplicity and durability. Featuring our signature cross-grain textured Saffiano leather, styled with three outer slots and a secure central chamber marked in gold foil details.',
    specs: {
      'Material': 'Genuine Saffiano Calfskin Leather',
      'Dimensions': '10cm x 7.5cm',
      'Capacity': 'Up to 6 cards + folded notes',
      'Security': 'RFID Blocking Core Protection'
    },
    isNew: false,
    isBestSeller: true,
    featured: true,
    stock: 40
  },
  {
    id: 'wa2',
    name: 'Heritage Bifold Billfold',
    category: 'Wallets',
    price: 115,
    rating: 4.8,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1588444839799-668622b214f7?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Chestnut Brown', 'Classic Black'],
    description: 'A traditional masterpiece of single-cut full-grain pebble leather. Over time, it gains a marvelous personalized patina reflect of the locations it visits in your pocket.',
    specs: {
      'Material': 'Hand-stitched Full Grain Horween Leather',
      'Dimensions': '11cm x 9cm (closed)',
      'Capacity': '8 card compartments + double billfold chamber'
    },
    isNew: true,
    isBestSeller: false,
    featured: false,
    stock: 18
  },

  // --- JEWELRY ---
  {
    id: 'j1',
    name: 'Imperial Link Chain Necklace',
    category: 'Jewelry',
    price: 210,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 156,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['18k Yellow Gold Plated', 'Rhodium Silver'],
    description: 'An elegant, customizable statement chain designed for layering. Features interlocking solid rectangular links, finished with an ergonomic double safety clasp and micro-engraved insignia.',
    specs: {
      'Material': 'Sterling Silver dipped in 18k Gold Plating',
      'Length': '50 centimeters',
      'Link Width': '6.5 millimeters',
      'Hypoallergenic': 'Lead, Nickel and Cadmium Free'
    },
    isNew: true,
    isBestSeller: true,
    featured: true,
    stock: 4
  },
  {
    id: 'j2',
    name: 'Lumine Diamond cut Studs',
    category: 'Jewelry',
    price: 135,
    rating: 4.4,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['White Gold', 'Rose Gold'],
    description: 'These brilliant diamond-cut cubic zirconia studs are shaped to maximize reflective indices. Effortless, elegant luxury that works as beautifully with casual denims as evening wear.',
    specs: {
      'Mount Type': 'Solid 14k White/Rose Gold Post',
      'Carat Equivalent': '1.5 Carats per earring',
      'Stone': 'Flawless Heart-and-Arrow Cut VVS Zirconia'
    },
    isNew: false,
    isBestSeller: false,
    featured: false,
    stock: 22
  },

  // --- BAGS ---
  {
    id: 'b1',
    name: 'Siena Suede Crossbody Bag',
    category: 'Bags',
    price: 295,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Golden Amber', 'Midnight Black', 'Forest Green'],
    description: 'The Siena Crossbody represents the ultimate companion of the modern tastemaker. Spliced from thick, rich suede and structured with a solid magnetic frame, it sports double inside card sleeves and brushed hardware details.',
    specs: {
      'Outer Material': 'Premium Italian Calf Suede',
      'Lining': '100% Eco-cotton twill',
      'Dimensions': '24cm x 16cm x 7.5cm',
      'Strap Drop': 'Adjustable 45cm - 58cm'
    },
    isNew: true,
    isBestSeller: true,
    featured: true,
    stock: 6
  },
  {
    id: 'b2',
    name: 'Vanguard Leather Sling Tote',
    category: 'Bags',
    price: 360,
    rating: 4.7,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Brushed Tan', 'Onyx Black'],
    description: 'A striking structural tote crafted from vegetable tanned tooling leather. Built with reinforced double handle hoops, zippered inner secure pouch, and spacious tablet chambers.',
    specs: {
      'Outer Material': 'Handcrafted Full-Grain Vacchetta Leather',
      'Tote Height': '38cm',
      'Tote Width': '32cm',
      'Device Fit': 'Up to 14" Macbook Pro comfortable'
    },
    isNew: false,
    isBestSeller: true,
    featured: false,
    stock: 14
  },

  // --- BELTS ---
  {
    id: 'be1',
    name: 'Brushed Brass Classique Belt',
    category: 'Belts',
    price: 85,
    rating: 4.6,
    reviewsCount: 135,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624222247344-590c2e91126a?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Cognac Brown', 'Classic Charcoal', 'Rich Chestnut'],
    sizes: ['32', '34', '36', '38', '40'],
    description: 'An elegant addition to elevate simple tailoring or flowy garments. Features hand-burnished oil edges, solid brushed brass frame-lock, and a subtle debossed internal branding signature.',
    specs: {
      'Width': '3.2 centimeters',
      'Strap': 'Vegetable-tanned double collar saddle shoulder leather',
      'Buckle': '100% Solid Solid Brass'
    },
    isNew: false,
    isBestSeller: false,
    featured: true,
    stock: 20
  },

  // --- HATS ---
  {
    id: 'h1',
    name: 'Lafayette Wool Felt Fedora',
    category: 'Hats',
    price: 125,
    originalPrice: 165,
    rating: 4.8,
    reviewsCount: 76,
    images: [
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=600&auto=format&fit=crop'
    ],
    colors: ['Charcoal Gray', 'Sand Gold', 'Raven Black'],
    sizes: ['S (55cm)', 'M (57cm)', 'L (59cm)'],
    description: 'Crafted from the purest, weather-resistant Australian wool. The Lafayette Fedora displays a structured stiff teardrop crown and gold-accented fine grosgrain ribbon bow detailing.',
    specs: {
      'Material': '100% Premium Australian Wool Felt',
      'Brim Width': '7.5 centimeters',
      'Crown Height': '11.5 centimeters',
      'Sweatband': 'Secured interior cotton elastic'
    },
    isNew: true,
    isBestSeller: true,
    featured: true,
    stock: 5
  }
];

export const MOCK_REVIEWS_MAP: Record<string, Review[]> = {
  w1: [
    {
      id: "r1",
      userName: "Alexander V.",
      rating: 5,
      date: "2026-05-12",
      comment: "Absolutely outstanding piece of art. The solid brushed gold dial looks far more valuable in hand than in photos. Kept time flawlessly for months. Packaged like a treasure.",
      verified: true
    },
    {
      id: "r2",
      userName: "Sophia K.",
      rating: 4,
      date: "2026-05-28",
      comment: "A beautiful watch! Extremely elegant. The leather strap is slightly stiff at first but breaks in beautifully after a couple of wearings. Highly recommend.",
      verified: true
    }
  ],
  s1: [
    {
      id: "r3",
      userName: "Marcus B.",
      rating: 5,
      date: "2026-05-30",
      comment: "The Verdun frames are exceptionally solid. I get compliments literally every time I step out wearing them. No glare and fully eye-protecting.",
      verified: true
    }
  ],
  wa1: [
    {
      id: "r4",
      userName: "Isabella L.",
      rating: 5,
      date: "2026-06-02",
      comment: "Perfect minimalist design. Holds 5 of my essential cards and some cash notes without stretching. RFID blocking is peace of mind.",
      verified: true
    }
  ]
};

export const MOCK_PROMO_CODES: PromoCode[] = [
  { code: 'GOLDEN20', discountType: 'percentage', value: 20 },
  { code: 'LUXURY50', discountType: 'fixed', value: 50 },
  { code: 'WELCOME10', discountType: 'percentage', value: 10 }
];
