import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Clock, Trophy, MapPin, Gift, Box } from 'lucide-react';

interface Slide {
  image: string;
  subTitle: string;
  title: string;
  description: string;
  badge: string;
}

const HERO_SLIDES: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop',
    subTitle: 'The Autumn Lookbook',
    title: 'Aurelia Oro Chrono',
    description: 'Sculptical weight balanced with Japanese Quartz. Built in solid brass gold mesh plating to command attention.',
    badge: 'NEW CAPSULE'
  },
  {
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    subTitle: 'Modernist Eyewear',
    title: 'Verdun Angular',
    description: 'Fine high-density bio-acetate frame. Formulated to neutralize 100% UVA and UVB radiation with classic style.',
    badge: 'LIMITLESS STYLE'
  },
  {
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
    subTitle: 'Layered Minimal Pieces',
    title: 'Imperial Solid Links',
    description: 'Sterling silver standard base bathed in an intensive 18k yellow gold polish. Guaranteed timeless luxury.',
    badge: 'SEASON BEST'
  }
];

const TESTIMONIALS = [
  {
    quote: "The Aurelia Gold watch is an incredible weight on the wrist. It receives inquiries at every meeting. True modern luxury.",
    author: "Richard Alpert",
    role: "Senior Creative Partner",
    rating: 5,
    location: "Geneva"
  },
  {
    quote: "My Siena Suede crossbody has survived continuous commutes and still holds a beautiful shape. The gold accents are gorgeous.",
    author: "Elena Rastovich",
    role: "Brand Architect",
    rating: 5,
    location: "Zurich"
  },
  {
    quote: "Sensational service. My classic Onyx mesh arrived in a custom velvet lined casing with a personalized certificate of handcraft.",
    author: "Taiki Murakami",
    role: "Senior UX Specialist",
    rating: 5,
    location: "Kyoto"
  }
];

export const Home: React.FC = () => {
  const { setPage, setFilters } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  // Get Featured products, New arrivals, and Best Sellers
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  const handleCategoryClick = (category: string) => {
    setFilters('', category, [0, 500], 'popular');
    setPage('shop');
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300" id="home_page_root">
      
      {/* 1. HERO SECTION WITH IMAGE SLIDESHOW */}
      <section className="relative h-[550px] sm:h-[650px] md:h-[750px] w-full bg-zinc-900 overflow-hidden" id="hero-slideshow">
        
        {/* Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image overlay */}
            <div className="absolute inset-0 bg-neutral-950/50 dark:bg-neutral-950/65 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
            />
            
            {/* Content card centered left */}
            <div className="absolute inset-y-0 left-0 z-20 w-full px-4 sm:px-8 lg:px-16 flex items-center">
              <div className="max-w-xl text-left text-white select-none">
                
                {/* Micro Label */}
                <span className="inline-block bg-[#D4AF37] text-black text-[9px] font-mono font-black tracking-[0.3em] px-3 py-1 uppercase rounded-none mb-4">
                  {slide.badge}
                </span>

                {/* Looking-glass tag */}
                <h3 className="font-sans text-[#D4AF37] text-sm sm:text-base tracking-[0.35em] uppercase font-bold mb-2">
                  {slide.subTitle}
                </h3>

                {/* Majestic Display Title */}
                <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase mb-6">
                  {slide.title}
                </h1>

                {/* Explainer */}
                <p className="text-zinc-300 dark:text-zinc-400 text-xs sm:text-sm tracking-wide leading-relaxed mb-8 max-w-md">
                  {slide.description}
                </p>

                {/* Call Action Button */}
                <button 
                  onClick={() => setPage('shop')}
                  className="bg-[#D4AF37] hover:bg-white text-black font-semibold font-mono text-xs tracking-[0.25em] px-8 py-4 uppercase border border-transparent transition-all duration-350 rounded-none cursor-pointer"
                  id={`hero-btn-${index}`}
                >
                  Discover the Shop
                </button>

              </div>
            </div>

          </div>
        ))}

        {/* Floating arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white bg-black/30 hover:bg-black/85 backdrop-blur-sm border border-white/10 rounded-full transition-all cursor-pointer"
          id="btn-slide-prev"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white bg-black/30 hover:bg-black/85 backdrop-blur-sm border border-white/10 rounded-full transition-all cursor-pointer"
          id="btn-slide-next"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dotted indicator list */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {HERO_SLIDES.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${index === activeSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40'}`}
              id={`slide-dot-${index}`}
            />
          ))}
        </div>

      </section>

      {/* 2. CATEGORY QUICK FILTERS NAVIGATION BAR */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold font-semibold">Curated Portfolios</span>
            <h2 className="font-sans text-2xl font-bold tracking-tighter uppercase text-zinc-900 dark:text-zinc-100 mt-1">Shop Luxury Capsules</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: 'Watches', img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200' },
              { name: 'Sunglasses', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=200' },
              { name: 'Wallets', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=200' },
              { name: 'Jewelry', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200' },
              { name: 'Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200' },
              { name: 'Belts', img: 'https://images.unsplash.com/photo-1624222247344-590c2e91126a?q=80&w=200' },
              { name: 'Hats', img: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=200' }
            ].map((cat, i) => (
              <button 
                key={i}
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative flex flex-col items-center bg-white dark:bg-zinc-950 border border-zinc-105 dark:border-zinc-900 p-4 transition-all duration-300 hover:border-[#D4AF37]/50 hover:-translate-y-1 hover:shadow-sm cursor-pointer rounded"
                id={`cat-card-${cat.name}`}
              >
                <div className="h-12 w-12 rounded-full overflow-hidden mb-3 bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
                  <img src={cat.img} alt={cat.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 group-hover:text-[#D4AF37]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="featured-collection">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 border-b border-zinc-100 dark:border-zinc-900 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold font-semibold">House Favorites</span>
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase mt-1">Featured Essentials</h2>
          </div>
          <button 
            onClick={() => {
              setFilters('', 'All', [0, 550], 'popular');
              setPage('shop');
            }}
            className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#D4AF37] hover:text-black dark:hover:text-white transition-colors cursor-pointer mt-4 sm:mt-0 font-bold"
            id="featured-all-link"
          >
            <span>VIEW ENTIRE CATALOG</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. MID-SITE INTERACTIVE SALES LOOKBOOK BANNER */}
      <section className="relative overflow-hidden bg-zinc-900 py-24 px-6 sm:px-12 lg:px-24 border-y border-[#D4AF37]/15" id="hero-mid-banner">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200')] bg-cover bg-fixed bg-center blur-[1px]" />
          
          <div className="relative z-20 max-w-3xl mx-auto text-center text-white">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">Special Seasonal Campaign</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase leading-none tracking-tighter text-white mt-3 mb-4">
              Enhance Your Daily Tailoring
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm tracking-wide leading-relaxed max-w-lg mx-auto mb-8 font-sans">
              Collect handfinished cardholders, premium chronological brass timers, and high-tensile titanium eyewear. Built with meticulous modular layout precision for modern purists.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button 
                onClick={() => {
                  setFilters('', 'Watches', [0, 505], 'newest');
                  setPage('shop');
                }}
                className="w-full sm:w-auto bg-white hover:bg-[#D4AF37] hover:text-black text-black font-semibold font-mono text-xs tracking-widest py-3.5 px-8 rounded-none transition-all shadow cursor-pointer uppercase"
                id="mid-banner-watches"
              >
                CHRONO SUITE
              </button>
              <button 
                onClick={() => {
                  setFilters('', 'Sunglasses', [0, 505], 'newest');
                  setPage('shop');
                }}
                className="w-full sm:w-auto bg-transparent border border-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#000000] text-white font-semibold font-mono text-xs tracking-widest py-3.5 px-8 rounded-none transition-all cursor-pointer uppercase"
                id="mid-banner-sun"
              >
                GLASSES ARCHIVE
              </button>
            </div>
          </div>
        </section>

      {/* 5. NEW ARRIVALS & BEST SELLERS (TABS GRID SECTION) */}
      <section className="bg-zinc-50/50 dark:bg-zinc-950/20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* New Arrivals Subblock */}
            <div id="new-arrivals-subblock">
              <div className="flex items-baseline justify-between border-b border-zinc-200 dark:border-zinc-900 pb-4 mb-8">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold font-semibold">Just Forged</span>
                  <h3 className="font-sans text-xl sm:text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-50 mt-1">New Arrivals</h3>
                </div>
                <button onClick={() => { setFilters('', 'All', [0, 550], 'newest'); setPage('shop'); }} className="text-xs font-mono text-zinc-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] tracking-widest cursor-pointer font-bold">
                  DISCOVER MORE
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Best Sellers Subblock */}
            <div id="best-sellers-subblock">
              <div className="flex items-baseline justify-between border-b border-zinc-200 dark:border-zinc-900 pb-4 mb-8">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold font-semibold">Unmatched Demand</span>
                  <h3 className="font-sans text-xl sm:text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-50 mt-1">Best Sellers</h3>
                </div>
                <button onClick={() => { setFilters('', 'All', [0, 550], 'popular'); setPage('shop'); }} className="text-xs font-mono text-zinc-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] tracking-widest cursor-pointer font-bold">
                  DISCOVER MORE
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bestSellers.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. IMMERSIVE CUSTOMER TESTIMONIALS SLIDER */}
      <section className="bg-white dark:bg-zinc-950 py-24 border-t border-zinc-100 dark:border-zinc-900 px-4">
        <div className="max-w-4xl mx-auto text-center" id="testimonials-section">
          
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-black">Customer Endorsement</span>
          <h2 className="font-sans text-2xl sm:text-3xl font-black mt-2 mb-12 uppercase tracking-tighter">The Accessory Hub Voice</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test, index) => (
              <div 
                key={index} 
                className="bg-zinc-50 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-none border border-zinc-150 dark:border-zinc-800 text-left flex flex-col justify-between"
                id={`testimonial-index-${index}`}
              >
                <div>
                  {/* Gold Stars */}
                  <div className="flex text-amber-500 mb-4">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-[13px] leading-relaxed italic mb-6 font-sans">
                    "{test.quote}"
                  </p>
                </div>
                
                {/* Author Info */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-auto">
                  <h5 className="font-sans text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">{test.author}</h5>
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase mt-0.5 tracking-wider">
                    <span>{test.role}</span>
                    <span>{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. QUICK TRUST ELEMENTS (COMPREHENSIVE COURIER SUMMARY) */}
      <section className="bg-zinc-950 dark:bg-black text-white px-4 py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs tracking-widest uppercase">
          <div className="flex flex-col items-center p-2">
            <Clock size={16} className="text-[#D4AF37] mb-2" />
            <span className="font-mono text-[10px]">24/7 SUPPORT CONCIERGE</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <Trophy size={16} className="text-[#D4AF37] mb-2" />
            <span className="font-mono text-[10px]">LIFETIME PLATING REPAIR</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <Box size={16} className="text-[#D4AF37] mb-2" />
            <span className="font-mono text-[10px]">REINFORCED INSURED BOXES</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <Gift size={16} className="text-[#D4AF37] mb-2" />
            <span className="font-mono text-[10px]">ELEGANT GREETING CARDS</span>
          </div>
        </div>
      </section>

    </div>
  );
};
