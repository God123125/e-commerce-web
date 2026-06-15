import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, User, Sun, Moon, Menu, X, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setPage, 
    cart, 
    wishlist, 
    isDarkMode, 
    toggleDarkMode, 
    user 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  const handleNav = (tab: any) => {
    setPage(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full select-none" id="main_navbar">
      {/* Promo Bar */}
      <div className="bg-black text-[#D4AF37] text-[10px] sm:text-xs tracking-[0.25em] py-2 text-center font-mono uppercase font-semibold border-b border-[#D4AF37]/15 relative overflow-hidden">
        <div className="inline-block animate-pulse">
          Complimentary Global Shipping on Orders Over $150 &amp; Use Code: <span className="underline">GOLDEN20</span>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center space-x-2 cursor-pointer group"
              id="logo-button"
            >
              <div className="h-9 w-9 bg-black dark:bg-white flex items-center justify-center border border-[#D4AF37] transition-transform duration-300 group-hover:rotate-12">
                <span className="text-white dark:text-black font-sans font-black text-lg tracking-widest">A</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-lg font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
                  ACCESSORY<span className="text-[#D4AF37]">.</span>HUB
                </span>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 tracking-[0.35em] uppercase leading-none mt-1 font-mono">
                  PREMIUM LUXURY
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 text-xs tracking-[0.25em] font-medium uppercase font-sans">
              <button 
                onClick={() => handleNav('home')}
                className={`relative py-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] transition-colors cursor-pointer ${currentPage === 'home' ? 'text-[#D4AF37] font-bold border-b border-[#D4AF37]' : ''}`}
                id="nav-link-home"
              >
                Home
              </button>
              <button 
                onClick={() => handleNav('shop')}
                className={`relative py-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] transition-colors cursor-pointer ${currentPage === 'shop' ? 'text-[#D4AF37] font-bold border-b border-[#D4AF37]' : ''}`}
                id="nav-link-shop"
              >
                Shop
              </button>
              <button 
                onClick={() => handleNav('contact')}
                className={`relative py-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] transition-colors cursor-pointer ${currentPage === 'contact' ? 'text-[#D4AF37] font-bold border-b border-[#D4AF37]' : ''}`}
                id="nav-link-contact"
              >
                Contact
              </button>
            </div>

            {/* Control Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
                id="toggle-dark-mode-btn"
              >
                {isDarkMode ? <Sun size={19} className="text-[#D4AF37]" /> : <Moon size={19} />}
              </button>

              {/* Wishlist Icon */}
              <button 
                onClick={() => handleNav('account')}
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 relative cursor-pointer"
                title="Wishlist"
                id="navbar-wishlist-btn"
              >
                <Heart size={19} className={wishlistItemsCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                {wishlistItemsCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-black dark:bg-[#D4AF37] dark:text-black text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {wishlistItemsCount}
                  </span>
                )}
              </button>

              {/* Account Icon */}
              <button 
                onClick={() => handleNav('account')}
                className={`p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 cursor-pointer flex items-center space-x-1 ${
                  currentPage === 'account' ? 'text-[#D4AF37]' : 'text-zinc-600 dark:text-zinc-300 hover:text-black hover:dark:text-white'
                }`}
                title="Profile / Account"
                id="navbar-account-btn"
              >
                <User size={19} />
                {user && (
                  <span className="hidden lg:inline-block text-[10px] tracking-widest uppercase truncate max-w-[80px]">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button 
                onClick={() => handleNav('cart')}
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 relative cursor-pointer"
                title="Shopping Bag"
                id="navbar-cart-btn"
              >
                <ShoppingBag size={19} />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-[#D4AF37] text-black text-[9px] font-black rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Hamburger Mobile Menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 md:hidden text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-[#D4AF37] rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-300" id="mobile-navigation-drawer">
          <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col items-start text-xs tracking-widest uppercase">
            <button 
              onClick={() => handleNav('home')}
              className={`w-full text-left py-3 px-4 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium ${currentPage === 'home' ? 'text-[#D4AF37] bg-zinc-50 dark:bg-zinc-900 font-bold' : 'text-zinc-700 dark:text-zinc-200'}`}
              id="m-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => handleNav('shop')}
              className={`w-full text-left py-3 px-4 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium ${currentPage === 'shop' ? 'text-[#D4AF37] bg-zinc-50 dark:bg-zinc-900 font-bold' : 'text-zinc-700 dark:text-zinc-200'}`}
              id="m-nav-shop"
            >
              Shop Catalog
            </button>
            <button 
              onClick={() => handleNav('contact')}
              className={`w-full text-left py-3 px-4 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium ${currentPage === 'contact' ? 'text-[#D4AF37] bg-zinc-50 dark:bg-zinc-900 font-bold' : 'text-zinc-700 dark:text-zinc-200'}`}
              id="m-nav-contact"
            >
              Contact Boutique
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
