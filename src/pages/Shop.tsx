import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, LayoutGrid, List, ArrowUpDown } from 'lucide-react';

export const Shop: React.FC = () => {
  const {
    searchQuery,
    categoryFilter,
    priceRange,
    sortBy,
    setFilters,
    resetFilters,
    setPage
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localRange, setLocalRange] = useState<number>(priceRange[1]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync states
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalRange(priceRange[1]);
  }, [priceRange]);

  // Formulate filtered products
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    // 1. Search Query
    const query = localSearch.trim().toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(query);
    const descMatch = product.description.toLowerCase().includes(query);
    const searchMatches = query === '' || nameMatch || descMatch;

    // 2. Category
    const categoryMatches = categoryFilter === 'All' || product.category === categoryFilter;

    // 3. Price
    const priceMatches = product.price <= localRange;

    return searchMatches && categoryMatches && priceMatches;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'newest') {
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    // Default or popular: sort by rating + review score count
    return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
  });

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    setFilters(val, categoryFilter, [0, localRange], sortBy);
  };

  const handleCategorySelect = (cat: string) => {
    setFilters(localSearch, cat, [0, localRange], sortBy);
  };

  const handlePriceRangeChange = (val: number) => {
    setLocalRange(val);
    setFilters(localSearch, categoryFilter, [0, val], sortBy);
  };

  const handleSortChange = (sort: string) => {
    setFilters(localSearch, categoryFilter, [0, localRange], sort);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-105 min-h-screen py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black font-sans" id="shop-catalog-view">
      
      {/* 1. COMPACT PAGE HEADER / CRUMBS */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
          Bespoke Curated Accessories
        </span>
        <h1 className="font-sans text-3xl sm:text-5xl font-black leading-none tracking-tighter uppercase mt-2 text-zinc-900 dark:text-zinc-50">
          THE CATALOG
        </h1>
        <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* 2. LIVE INTERACTIVE TOOLBAR (Search & Sorting details) */}
        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 rounded p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96 flex items-center">
            <input 
              type="text" 
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="SEARCH ACCESSORY ARCHIVE..." 
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3.5 pl-10 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded shadow-sm"
              id="shop-search-field"
            />
            <Search className="absolute left-3.5 text-zinc-400 dark:text-zinc-600" size={15} />
          </div>

          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
            
            {/* Filter Toggle Mobile Button */}
            <button 
              onClick={() => setMobileFiltersOpen(prev => !prev)}
              className="lg:hidden flex items-center space-x-2 bg-black dark:bg-[#D4AF37] text-white dark:text-black text-xs font-mono tracking-wider py-3.5 px-4 rounded border border-transparent shadow hover:opacity-90"
              id="mobile-filter-drawer-toggle"
            >
              <SlidersHorizontal size={14} />
              <span>FILTERS ({filteredProducts.length})</span>
            </button>

            {/* View Mode controls */}
            <div className="hidden sm:flex items-center space-x-1 border border-zinc-200 dark:border-zinc-800 p-1 bg-white dark:bg-zinc-950 rounded">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all rounded ${viewMode === 'grid' ? 'bg-zinc-100 dark:bg-zinc-900 text-[#D4AF37]' : 'text-zinc-400'}`}
                title="Grid layout"
                id="view-grid-btn"
              >
                <LayoutGrid size={15} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all rounded ${viewMode === 'list' ? 'bg-zinc-100 dark:bg-zinc-900 text-[#D4AF37]' : 'text-zinc-400'}`}
                title="List layout"
                id="view-list-btn"
              >
                <List size={15} />
              </button>
            </div>

            {/* Sorter Selector */}
            <div className="relative flex items-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-2.5">
              <ArrowUpDown size={12} className="text-[#D4AF37] mr-2" />
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-transparent border-none text-[11px] font-mono tracking-widest outline-none py-3 pr-4 text-zinc-700 dark:text-zinc-300 uppercase cursor-pointer"
                id="shop-sort-select"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

          </div>

        </div>

        {/* 3. CORE CONTENT GRID (Left Column: Filters, Right Column: Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* A. SIDEBAR FILTERS (Visible on Desktop) */}
          <div className="hidden lg:block space-y-8 pr-4" id="desktop-filters-sidebar">
            
            {/* Reset Filters action */}
            <div className="flex justify-between items-center border-b border-zinc-150 dark:border-zinc-900 pb-4">
              <span className="text-[11px] font-mono tracking-widest uppercase font-black text-zinc-800 dark:text-zinc-200">
                Filters
              </span>
              <button 
                onClick={resetFilters}
                className="text-[9px] font-mono text-[#D4AF37] hover:text-black dark:hover:text-white flex items-center space-x-1 uppercase tracking-widest cursor-pointer font-bold"
                id="desktop-filters-clear-btn"
              >
                <RotateCcw size={10} />
                <span>Reset All</span>
              </button>
            </div>

            {/* Categories section */}
            <div>
              <h4 className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold mb-4">
                Categories
              </h4>
              <div className="flex flex-col space-y-2.5">
                <button 
                  onClick={() => handleCategorySelect('All')}
                  className={`text-left text-xs tracking-widest uppercase py-1 ${
                    categoryFilter === 'All' 
                      ? 'text-black dark:text-white font-black underline underline-offset-4 decoration-[#D4AF37]' 
                      : 'text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                  id="filter-category-all"
                >
                  All Accessories ({MOCK_PRODUCTS.length})
                </button>
                {CATEGORIES.map(cat => {
                  const count = MOCK_PRODUCTS.filter(p => p.category === cat).length;
                  return (
                    <button 
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`text-left text-xs tracking-widest uppercase py-1 flex justify-between items-center ${
                        categoryFilter === cat 
                          ? 'text-black dark:text-white font-black underline underline-offset-4 decoration-[#D4AF37]' 
                          : 'text-zinc-400 hover:text-black dark:hover:text-white'
                      }`}
                      id={`filter-category-${cat}`}
                    >
                      <span>{cat}</span>
                      <span className="text-[9px] font-mono text-zinc-300 dark:text-zinc-700">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price slider section */}
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                  Price Limit
                </h4>
                <span className="font-mono text-xs text-[#D4AF37] font-bold">
                  Max: ${localRange}
                </span>
              </div>
              <input 
                type="range" 
                min={50}
                max={500}
                step={10}
                value={localRange}
                onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
                className="w-full accent-black dark:accent-[#D4AF37] h-1 bg-zinc-150 dark:bg-zinc-800 rounded-lg cursor-pointer"
                id="desktop-price-slider"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>

            {/* Quick Guarantees panel */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded border border-zinc-100 dark:border-zinc-900 space-y-4">
              <h5 className="text-[10px] font-mono tracking-widest uppercase font-bold text-zinc-900 dark:text-zinc-150">
                Hub Guarantees
              </h5>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Receive customized boutique packaging including our signature black-velvet padded box and certificate of lineage.
              </p>
            </div>

          </div>

          {/* B. PRODUCT LISTINGS GRID */}
          <div className="lg:col-span-3">

            {/* Mobile Filter Sheet (visible only if items are toggled) */}
            {mobileFiltersOpen && (
              <div className="lg:hidden bg-zinc-50 dark:bg-zinc-900 p-6 border border-zinc-200 dark:border-zinc-800 rounded mb-8 animate-in slide-in-from-top duration-300" id="mobile-filter-sheet">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">Atelier Filter Suite</span>
                  <button onClick={resetFilters} className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
                    Clear All
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-3">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleCategorySelect('All')}
                      className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-sm border ${
                        categoryFilter === 'All' ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black border-transparent font-bold' : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      All
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-sm border ${
                          categoryFilter === cat ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black border-transparent font-bold' : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price limit */}
                <div className="mb-4">
                  <div className="flex justify-between font-mono text-[10px] uppercase mb-2">
                    <span>Upper Price Limit</span>
                    <strong className="text-[#D4AF37] font-bold">${localRange}</strong>
                  </div>
                  <input 
                    type="range" 
                    min={50}
                    max={500}
                    step={10}
                    value={localRange}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>
                
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-[#D4AF37] text-black font-semibold font-mono text-xs tracking-widest py-3 mt-4 uppercase rounded shadow"
                >
                  APPLY ATELIER FILTERS
                </button>
              </div>
            )}

            {/* Results Counters */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono text-zinc-400 tracking-wider">
                Showing <strong className="text-zinc-800 dark:text-zinc-200">{sortedProducts.length}</strong> of <strong className="text-zinc-800 dark:text-zinc-250">{MOCK_PRODUCTS.length}</strong> Accessories
              </span>
              {categoryFilter !== 'All' && (
                <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 uppercase rounded">
                  Category: {categoryFilter}
                </span>
              )}
            </div>

            {/* EMPTY RESULT VIEW */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/30 rounded border border-zinc-100 dark:border-zinc-900 px-6" id="empty-shop-state">
                <Search size={36} className="text-[#D4AF37]/50 mx-auto mb-4" />
                <h3 className="font-serif text-lg font-bold mb-2">No Accessories Found</h3>
                <p className="text-zinc-500 text-xs tracking-wide max-w-sm mx-auto mb-6 leading-relaxed">
                  We could not find items fitting your selected search parameters. Adjust your price sliding bar or clear active queries.
                </p>
                <button 
                  onClick={resetFilters}
                  className="bg-black dark:bg-[#D4AF37] text-white dark:text-black font-semibold font-mono text-xs tracking-widest px-6 py-3 uppercase rounded hover:opacity-95 transition-all cursor-pointer"
                  id="empty-shop-reset-btn"
                >
                  Clear Archive Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              
              /* GRID LAYOUT LISTINGS */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" id="shop-products-grid">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

            ) : (
              
              /* LIST LAYOUT LISTINGS */
              <div className="flex flex-col space-y-6" id="shop-products-list">
                {sortedProducts.map(product => {
                  const discountPercent = product.originalPrice 
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;

                  return (
                    <div 
                      key={product.id}
                      onClick={() => setPage('product-details', product.id)}
                      className="group bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded p-4 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      id={`list-item-${product.id}`}
                    >
                      <div className="w-full sm:w-44 aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-900 rounded relative shrink-0">
                        <img src={product.images[0]} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        {discountPercent > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-mono px-2 py-0.5 font-bold uppercase rounded-sm">
                            -{discountPercent}%
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-between py-2">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                            {product.category}
                          </span>
                          <h3 className="font-sans text-lg font-black uppercase text-zinc-900 dark:text-zinc-50 group-hover:text-[#D4AF37] mt-1 tracking-tight">
                            {product.name}
                          </h3>
                          <p className="text-zinc-500 text-xs mt-2 line-clamp-2 leading-relaxed max-w-xl font-sans">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6 gap-3">
                          <div className="flex items-center justify-center sm:justify-start space-x-2">
                            <span className="text-[#D4AF37] font-mono font-bold text-lg">${product.price}</span>
                            {product.originalPrice && <span className="text-zinc-300 dark:text-zinc-700 line-through text-xs font-mono">${product.originalPrice}</span>}
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPage('product-details', product.id);
                            }}
                            className="bg-zinc-155 text-black hover:bg-[#D4AF37] hover:text-black text-xs font-mono tracking-widest uppercase font-bold px-4 py-2.5 rounded-none transition-all cursor-pointer"
                          >
                            INSPECT DETAILS
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};
