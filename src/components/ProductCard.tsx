import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart, setPage } = useApp();
  const [hovered, setHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    // Add default first color and first size if applicable
    const defaultColor = product.colors[0] || 'Default';
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    
    setTimeout(() => {
      addToCart(product, 1, defaultColor, defaultSize);
      setIsAdding(false);
    }, 600);
  };

  const handleCardClick = () => {
    setPage('product-details', product.id);
  };

  return (
    <div 
      className="group relative flex flex-col justify-between bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
      id={`product-card-${product.id}`}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        
        {/* Images with cross-fade hover swap */}
        <img 
          src={hovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Wishlist Trigger Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border border-zinc-100 dark:border-zinc-800 rounded-full hover:bg-white dark:hover:bg-zinc-900 group-hover:opacity-100 transition-all duration-300 shadow-sm"
          id={`wishlist-btn-${product.id}`}
          title="Toggle Wishlist"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-300 ${
              isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-[#D4AF37]'
            }`} 
          />
        </button>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isNew && (
            <span className="bg-black text-[#D4AF37] text-[8px] sm:text-[9px] font-mono font-black tracking-[0.2em] px-2 py-1 uppercase rounded-sm border border-[#D4AF37]/30 shadow-sm">
              New In
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-white text-zinc-900 text-[8px] sm:text-[9px] font-mono font-black tracking-[0.15em] px-2 py-1 uppercase rounded-sm border border-zinc-200 shadow-sm">
              Best Seller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[8px] sm:text-[9px] font-mono font-black tracking-widest px-2 py-1 uppercase rounded-sm shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View and Add overlay drawer details on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/45 to-transparent flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className="flex-1 bg-[#D4AF37] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-black text-[9px] sm:text-xs font-mono font-bold tracking-widest uppercase py-2.5 px-2 flex items-center justify-center gap-1.5 transition-colors duration-300 rounded-none"
            id={`quick-add-${product.id}`}
          >
            {isAdding ? (
              <span className="animate-spin h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full" />
            ) : product.stock === 0 ? (
              'Sold Out'
            ) : (
              <>
                <ShoppingBag size={12} />
                Quick Add
              </>
            )}
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setPage('product-details', product.id);
            }}
            className="p-2.5 bg-zinc-900/90 text-white hover:text-[#D4AF37] hover:bg-black transition-colors rounded border border-zinc-800"
            title="Inspect Details"
          >
            <Eye size={13} />
          </button>
        </div>

      </div>

      {/* Information text details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Category */}
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase">
            {product.category}
          </span>
          
          {/* Product Name */}
          <h3 className="font-sans text-sm sm:text-base font-black uppercase text-zinc-900 dark:text-zinc-100 group-hover:text-[#D4AF37] transition-colors mt-1.5 tracking-tight min-h-[44px] line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Micro Rating Indicator */}
          <div className="flex items-center space-x-1 mt-2 mb-2">
            <span className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  className={i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-zinc-200 dark:text-zinc-800'} 
                />
              ))}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing tier */}
        <div className="flex items-baseline justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-[#D4AF37] font-mono font-bold text-sm sm:text-base">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-zinc-300 dark:text-zinc-700 line-through font-mono text-xs">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-red-500 text-[9px] font-mono uppercase tracking-widest animate-pulse">
              Only {product.stock} Left!
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
