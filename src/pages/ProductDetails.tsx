import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Star, Shield, Truck, Sparkles, Plus, Minus, Heart, ArrowLeft, MessageSquare, BadgeCheck } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    wishlist,
    reviews,
    addReview,
    setPage
  } = useApp();

  // Safeguard if none selected, load w1 by default
  const productId = selectedProductId || 'w1';
  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // New Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync state if product changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
    setQuantity(1);
    setReviewSuccess(false);
    setNewComment('');
  }, [product]);

  const prodReviews = reviews[product.id] || [];
  const averageRating = prodReviews.length > 0 
    ? (prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length).toFixed(1)
    : product.rating.toFixed(1);

  const handleAddCart = () => {
    setIsAdded(true);
    addToCart(product, quantity, selectedColor, selectedSize);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(product.id, newRating, newComment.trim());
    setReviewSuccess(true);
    setNewComment('');
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Find Related Products (same category, excluding current product)
  const relatedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black font-sans" id="product-details-root">
      
      {/* 1. BACK CONTROLS GESTURE */}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => setPage('shop')}
          className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#D4AF37] hover:text-black dark:hover:text-white uppercase cursor-pointer font-bold"
          id="back-to-shop-btn"
        >
          <ArrowLeft size={14} />
          <span>Back to Catalog</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* 2. CORE BRIEF GRID (Left Gallery, Right Selections & Adders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 bg-zinc-50/20 dark:bg-zinc-900/10 p-2 sm:p-6 rounded border border-zinc-100/50 dark:border-zinc-900">
          
          {/* L. IMAGE GALLERY COLUMN (lg: span 7) */}
          <div className="lg:col-span-7 space-y-4" id="details-gallery">
            
            {/* Big Main Active Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded">
              
              <img 
                src={activeImage} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-all duration-300"
                id="main-active-product-img"
              />

              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-mono font-black tracking-widest px-3 py-1.5 uppercase rounded">
                  -{discountPercent}% Save
                </span>
              )}
            </div>

            {/* Carousel Thumbnails */}
            <div className="grid grid-cols-3 gap-4" id="gallery-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900 rounded border transition-all ${
                    activeImage === img 
                      ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' 
                      : 'border-zinc-200 dark:border-zinc-805 hover:border-zinc-400'
                  }`}
                  id={`thumb-img-${i}`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* R. SPECIFICATION DETAILS COLUMN (lg: span 5) */}
          <div className="lg:col-span-5 flex flex-col pt-2" id="details-specification">
            
            {/* Category Bread */}
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold">
              {product.category} COLLECTION
            </span>

            {/* Title */}
            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase leading-none tracking-tighter text-zinc-900 dark:text-zinc-50 mt-2 mb-3">
              {product.name}
            </h1>

            {/* Stars & Reviews summary */}
            <div className="flex items-center space-x-2.5 border-b border-zinc-100 dark:border-zinc-900 pb-5 mb-5">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    className={i < Math.floor(Number(averageRating)) ? 'fill-amber-500 text-amber-500' : 'text-zinc-200 dark:text-zinc-800'} 
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 font-bold">
                {averageRating}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span className="text-xs font-mono text-zinc-400">
                {prodReviews.length} CUSTOMER REVIEWS
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline space-x-4 mb-6">
              <span className="text-2xl font-mono font-black text-[#D4AF37]">${product.price}</span>
              {product.originalPrice && (
                <span className="text-zinc-400 line-through text-sm font-mono">${product.originalPrice}</span>
              )}
            </div>

            {/* Descriptive Pitch */}
            <p className="text-zinc-500 text-xs sm:text-[13px] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* COLOR OPTION PICKER */}
            <div className="mb-6">
              <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold mb-3">
                Selected Tone: <strong className="text-zinc-800 dark:text-zinc-100">{selectedColor}</strong>
              </label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs font-mono uppercase py-2 px-3.5 border transition-all rounded-sm ${
                      selectedColor === color 
                        ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow' 
                        : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400'
                    }`}
                    id={`color-choice-${color}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SPECIFIC SELECTION */}
            {product.sizes && (
              <div className="mb-6">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold mb-3">
                  Select Size
                </label>
                <div className="flex gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs font-mono uppercase py-2 px-4 border transition-all rounded-sm ${
                        selectedSize === sz 
                          ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow' 
                          : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350 hover:border-zinc-400'
                      }`}
                      id={`size-choice-${sz}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STOCK INDICATOR COUNTER */}
            <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-850 rounded flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Availability</span>
                <span className="text-xs font-bold font-mono">
                  {product.stock > 0 ? (
                    <span className="text-emerald-500">IN STOCK ({product.stock} units)</span>
                  ) : (
                    <span className="text-red-500">SOLD OUT ATELIER TEMPORARILY</span>
                  )}
                </span>
              </div>
              {product.stock <= 5 && product.stock > 0 && (
                <span className="bg-red-50 text-red-500 dark:bg-red-950/20 text-[9px] font-semibold border border-red-200 dark:border-red-900 px-2.5 py-1 uppercase rounded animate-pulse font-mono tracking-wider">
                  Urgent Limit
                </span>
              )}
            </div>

            {/* INTERACTIVE QUANTITY CONTROLS & ADD ACTION */}
            <div className="flex gap-4 mb-8">
              
              {/* Stepper counter */}
              <div className="flex items-center border border-zinc-250 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-1 rounded">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-3 text-zinc-500 hover:text-black dark:hover:text-white cursor-pointer"
                  id="dec-qty-btn"
                >
                  <Minus size={13} />
                </button>
                <span className="px-4 font-mono font-black text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  className="p-3 text-zinc-500 hover:text-black dark:hover:text-white cursor-pointer"
                  id="inc-qty-btn"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Main Checkout Dispatcher */}
              <button 
                onClick={handleAddCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#D4AF37] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-semibold font-mono text-xs tracking-widest py-4 uppercase rounded-none transition-colors duration-305 shadow hover:shadow-lg disabled:bg-zinc-300 disabled:text-zinc-500 cursor-pointer text-center flex justify-center items-center gap-2"
                id="add-to-cart-action"
              >
                {isAdded ? (
                  <span className="animate-pulse">ADDED SECURELY!</span>
                ) : product.stock === 0 ? (
                  'SOLD OUT'
                ) : (
                  'ADD TO SHOPPING BAG'
                )}
              </button>

              {/* Wishlist Heart Toggle */}
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded cursor-pointer"
                id="wishlist-detail-btn"
                title="Wishlist"
              >
                <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500 scale-110' : ''} />
              </button>

            </div>

            {/* Courier Promises List */}
            <div className="space-y-3.5 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <div className="flex items-center text-xs text-zinc-500 space-x-3">
                <Truck size={14} className="text-[#D4AF37] shrink-0" />
                <span>Complimentary tracked Courier shipping over $150. Fully insured.</span>
              </div>
              <div className="flex items-center text-xs text-zinc-500 space-x-3">
                <Shield size={14} className="text-[#D4AF37] shrink-0" />
                <span>Extended 2-Year International Certified Movement Warranty.</span>
              </div>
              <div className="flex items-center text-xs text-zinc-500 space-x-3">
                <Sparkles size={14} className="text-[#D4AF37] shrink-0" />
                <span>Arrives wrapped in silk tissue, black drawer box, ribboned.</span>
              </div>
            </div>

          </div>

        </div>

        {/* 3. HARD TECHNICAL SPECIFICATIONS GRID VIEW */}
        <div className="border-t border-zinc-100 dark:border-zinc-900 pt-16 mb-20" id="tech-specs-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 max-w-xs">
              <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Curation Elements</span>
              <h3 className="font-sans text-lg font-black uppercase tracking-tighter mt-1 text-zinc-900 dark:text-zinc-100">
                Atelier Technical Blueprint
              </h3>
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
                We believe total transparency in material provenance define authentic modern accessories.
              </p>
            </div>
            <div className="md:col-span-8 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 rounded p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="border-b border-zinc-200/50 dark:border-zinc-800 pb-3 flex justify-between text-xs font-mono">
                    <span className="text-zinc-400 uppercase tracking-wider">{label}</span>
                    <span className="text-zinc-950 dark:text-zinc-150 font-bold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. COMPREHENSIVE INTERACTIVE REVIEWS FORUM */}
        <div className="border-t border-zinc-100 dark:border-zinc-900 pt-16 mb-20" id="reviews-forum">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side column: Review listings */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-sans text-xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 mb-6 flex items-center space-x-2">
                <MessageSquare size={18} className="text-[#D4AF37]" />
                <span>Customer Experiences ({prodReviews.length})</span>
              </h3>

              {prodReviews.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/50 border rounded text-xs text-zinc-500 font-mono italic">
                  No guest comments currently loaded for this luxury accessory. Be the pioneer to review.
                </div>
              ) : (
                <div className="divide-y divide-zinc-150 dark:divide-zinc-900 max-h-[500px] overflow-y-auto pr-2 space-y-4">
                  {prodReviews.map((rev) => (
                    <div key={rev.id} className="pt-4 first:pt-0" id={`review-${rev.id}`}>
                      
                      {/* stars + verified checkbox */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, rIdx) => (
                            <Star key={rIdx} size={11} className="fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        
                        <div className="flex items-center text-[9px] font-mono text-emerald-500 tracking-wider">
                          <BadgeCheck size={12} className="mr-1 inline" /> VERIFIED ORDER ATELIER
                        </div>
                      </div>

                      <p className="text-zinc-750 dark:text-zinc-300 text-xs sm:text-[13px] leading-relaxed mb-3">
                        "{rev.comment}"
                      </p>

                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{rev.userName}</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side form: Submit experience feedback */}
            <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded border border-zinc-100 dark:border-zinc-800">
              <h4 className="font-sans text-base font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 mb-3 block">
                Log Your Evaluation
              </h4>
              <p className="text-zinc-500 text-[11px] mb-6 leading-relaxed">
                Participated in active commissioning? Express structural aspects, plating longevity, or courier feedback to help other purists.
              </p>

              {reviewSuccess ? (
                <div className="bg-zinc-900 border border-[#D4AF37] text-[#D4AF37] p-4 text-xs font-mono rounded tracking-wider animate-bounce text-center">
                  YOUR VERIFIED EVALUATION RECEIVED. <br />Gratitude from the Hub.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  
                  {/* Select custom rating */}
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                      Grade of Craft
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((grading) => (
                        <button
                          key={grading}
                          type="button"
                          onClick={() => setNewRating(grading)}
                          className="p-1 cursor-pointer transition-transform hover:scale-125"
                        >
                          <Star 
                            size={20} 
                            className={grading <= newRating ? 'fill-amber-500 text-amber-500' : 'text-zinc-300 dark:text-zinc-800'} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment box */}
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                      Constructive Review
                    </label>
                    <textarea
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="DESCRIBE INTEGRITY, PACKAGING WEIGHT, BRUSHED POLISH FEEL..."
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-4 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded"
                      id="feedback-form-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black dark:bg-[#D4AF37] hover:bg-zinc-900 dark:hover:bg-white text-white dark:text-black font-semibold font-mono text-[10px] tracking-widest py-3 uppercase rounded shadow cursor-pointer text-center"
                    id="submit-review-form-btn"
                  >
                    DISPATCH EVALUATION LOG
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>

        {/* 5. RELATED DECORATIVE ITEMS CAROUSEL */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-zinc-100 dark:border-zinc-900 pt-16" id="related-products-carousel">
            <div className="mb-10 text-center sm:text-left">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                Harmonized Look
              </span>
              <h3 className="font-sans text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-105 mt-1">
                Recommended Pairings
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
