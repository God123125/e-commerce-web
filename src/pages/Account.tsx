import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { User, ClipboardList, Heart, LogOut, CheckCircle, Save, Settings, Package, ShoppingCart } from 'lucide-react';

export const Account: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    loginUser,
    logoutUser,
    updateUserProfile,
    addToCart,
    setPage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('orders');

  // Login form state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('Srunkerry@gmail.com');
  const [nameInput, setNameInput] = useState('Victoria Sterling');
  const [authMsg, setAuthMsg] = useState('');

  // Profile forms state
  const [profName, setProfName] = useState(user ? user.name : '');
  const [profEmail, setProfEmail] = useState(user ? user.email : '');
  const [profPhone, setProfPhone] = useState(user ? user.phone : '');
  const [profAddress, setProfAddress] = useState(user ? user.address : '');
  const [profCity, setProfCity] = useState(user ? user.city : '');
  const [profZip, setProfZip] = useState(user ? user.zipCode : '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter products in Wishlist
  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  // Handle Login / Registration
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setAuthMsg('Please supply a valid credentials block.');
      return;
    }
    
    loginUser(emailInput.trim(), authMode === 'login' ? 'Victoria Sterling' : nameInput.trim());
    setAuthMsg('');
    
    // Auto sync profile fields
    setProfName(authMode === 'login' ? 'Victoria Sterling' : nameInput.trim());
    setProfEmail(emailInput.trim());
    setProfPhone('+1 (555) 732-8411');
    setProfAddress("742 Avenue de l'Opéra");
    setProfCity('Paris');
    setProfZip('75001');
  };

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: profName,
      email: profEmail,
      phone: profPhone,
      address: profAddress,
      city: profCity,
      zipCode: profZip
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Quick action wishlist to Cart
  const handleWishToCart = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const prod = MOCK_PRODUCTS.find(p => p.id === productId);
    if (prod) {
      addToCart(prod, 1, prod.colors[0], prod.sizes ? prod.sizes[0] : undefined);
    }
  };

  /* ---------------- GUEST LOGIN CARD GATEWAY ---------------- */
  if (!user) {
    return (
      <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-16 px-4 flex justify-center items-center font-sans tracking-wide" id="account-gate-root">
        <div className="max-w-md w-full bg-zinc-950 text-white rounded-none p-8 shadow-2xl border border-[#D4AF37]/30 relative overflow-hidden" id="auth-box-container">
          
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#D4AF37]/5 rounded-bl-full border-b border-l border-[#D4AF37]/10" />
          
          {/* Brand header */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase block mb-2">Member Terminal</span>
            <h2 className="font-sans text-2xl font-black uppercase tracking-tighter">Accessory Hub Register</h2>
            <div className="h-0.5 w-12 bg-[#D4AF37] mx-auto mt-3" />
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {authMode === 'register' && (
              <div>
                <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1 font-bold">
                  Your Full Name
                </label>
                <input 
                  type="text" 
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="E.G: VICTORIA STERLING" 
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3.5 uppercase font-mono text-zinc-100 rounded-none"
                />
              </div>
            )}

            <div>
              <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1 font-bold">
                Email Passport
              </label>
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="YOUR.EMAIL@DOMAIN.COM" 
                className="w-full bg-zinc-900 border border-zinc-850 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3.5 font-mono text-zinc-100 rounded-none"
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1 font-bold">
                Access Token Password
              </label>
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full bg-zinc-900 border border-zinc-850 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3.5 font-mono text-zinc-100 rounded-none"
              />
            </div>

            {authMsg && <p className="text-red-500 text-[10px] uppercase tracking-wider font-mono text-center">{authMsg}</p>}

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-white text-black font-semibold font-mono text-xs tracking-widest py-4 uppercase rounded-none transition-colors duration-300 mt-6 cursor-pointer"
              id="auth-submit-btn"
            >
              {authMode === 'login' ? 'ACCESS BOUTIQUE MEMBER' : 'REGISTER TO THE HANGER'}
            </button> They can toggling login modes

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-[10px] font-mono text-zinc-400 hover:text-[#D4AF37] uppercase tracking-widest underline underline-offset-2 cursor-pointer pb-2"
              >
                {authMode === 'login' ? 'Create a premium new account' : 'Already have credentials? Login'}
              </button>
            </div>

          </form>

          {/* Quick autofill tag */}
          <div className="mt-8 pt-4 border-t border-zinc-900 text-center text-zinc-500 text-[9px] font-mono">
            Demo Autofill: <strong className="text-zinc-400">Srunkerry@gmail.com</strong>
          </div>

        </div>
      </div>
    );
  }

  /* ---------------- LOGGED IN MEMBER HUB ---------------- */
  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black font-sans" id="account-hub-view">
      
      {/* 2. PROFILE BANNER */}
      <div className="max-w-7xl mx-auto mb-10 bg-zinc-950 text-white p-6 sm:p-10 rounded border border-[#D4AF37]/20 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 h-44 w-44 bg-[#D4AF37]/5 rounded-bl-full border-b border-l border-[#D4AF37]/15" />
        
        <div className="flex items-center space-x-6 relative z-10 text-left">
          <div className="h-16 w-16 bg-[#D4AF37] text-black text-xl font-sans font-black flex items-center justify-center rounded-full border-2 border-white shadow-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold">VIP Commission Member</span>
            <h1 className="text-xl sm:text-3xl font-sans font-black uppercase tracking-tight mt-1">{user.name}</h1>
            <p className="text-zinc-400 text-xs mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={logoutUser}
          className="bg-zinc-900 hover:bg-[#D4AF37] border border-zinc-800 hover:border-transparent text-zinc-400 hover:text-black font-mono text-[10px] tracking-widest py-3 px-5 uppercase rounded flex items-center space-x-2 transition-all relative z-10 cursor-pointer"
          id="logout-btn"
        >
          <LogOut size={12} />
          <span>Abandon Session</span>
        </button>

      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* L. HUB TAB SELECTORS */}
          <div className="flex flex-col space-y-2 border-b lg:border-none border-zinc-200 dark:border-zinc-800 pb-4 lg:pb-0">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left py-3.5 px-5 rounded-sm flex items-center space-x-3 text-xs font-mono tracking-widest uppercase transition-all border ${
                activeTab === 'orders' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-zinc-50 dark:bg-zinc-900 font-bold shadow-sm' 
                  : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/30'
              }`}
              id="tab-btn-orders"
            >
              <ClipboardList size={14} />
              <span>Orders Archive ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left py-3.5 px-5 rounded-sm flex items-center space-x-3 text-xs font-mono tracking-widest uppercase transition-all border ${
                activeTab === 'wishlist' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-zinc-50 dark:bg-zinc-900 font-bold shadow-sm' 
                  : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/30'
              }`}
              id="tab-btn-wishlist"
            >
              <Heart size={14} />
              <span>My Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left py-3.5 px-5 rounded-sm flex items-center space-x-3 text-xs font-mono tracking-widest uppercase transition-all border ${
                activeTab === 'profile' 
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-zinc-50 dark:bg-zinc-900 font-bold shadow-sm' 
                  : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/30'
              }`}
              id="tab-btn-profile"
            >
              <Settings size={14} />
              <span>Boutique Profile</span>
            </button>
          </div>

          {/* R. TAB CONTENTS MODULE */}
          <div className="lg:col-span-3">
            
            {/* --- TAB: ORDERS HISTORY --- */}
            {activeTab === 'orders' && (
              <div className="space-y-6" id="orders-registry-box">
                <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 mb-4">
                  <h3 className="font-sans text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    <Package size={17} className="text-[#D4AF37]" />
                    <span>Purchase Histories</span>
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                    Review chronological states of your active commissions and couriers dispatch logs.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/20 rounded border border-zinc-100 dark:border-zinc-850 font-mono text-xs text-zinc-500 italic">
                    You have not established orders yet. Use the Shop to select luxury items.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div 
                        key={ord.id}
                        className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded overflow-hidden"
                        id={`order-card-${ord.id}`}
                      >
                        {/* Order Upper Stripe details */}
                        <div className="bg-zinc-150 dark:bg-zinc-900/10 border-b border-zinc-200 dark:border-zinc-805 p-4 sm:px-6 flex flex-wrap justify-between items-center text-xs font-mono gap-4">
                          <div className="flex space-x-6">
                            <div>
                              <span className="text-zinc-450 block text-[9.5px] uppercase">Registered ID</span>
                              <strong className="text-zinc-800 dark:text-white font-bold">{ord.id}</strong>
                            </div>
                            <div>
                              <span className="text-zinc-450 block text-[9.5px] uppercase">Deduction Date</span>
                              <strong className="text-zinc-700 dark:text-zinc-300">{ord.date}</strong>
                            </div>
                            <div>
                              <span className="text-zinc-450 block text-[9.5px] uppercase">Courier Status</span>
                              <strong className="text-emerald-500 font-black animate-pulse uppercase tracking-wider">{ord.status}</strong>
                            </div>
                          </div>
                          <div>
                            <span className="text-zinc-450 block text-[9.5px] uppercase text-right">Debit Total</span>
                            <strong className="text-[#D4AF37] font-black">${ord.totalAmount.toFixed(2)}</strong>
                          </div>
                        </div>

                        {/* Order Nested Items list */}
                        <div className="p-4 sm:p-6 divide-y divide-zinc-200/50 dark:divide-zinc-800/50 space-y-4">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex gap-4 pt-4 first:pt-0 items-center justify-between">
                              <div className="flex gap-3">
                                <div className="h-12 w-12 bg-zinc-100 rounded overflow-hidden shrink-0">
                                  <img src={it.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-left font-serif">
                                  <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-55 hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => setPage('product-details', it.productId)}>
                                    {it.productName}
                                  </h4>
                                  <span className="text-[9.5px] font-mono text-zinc-450 uppercase tracking-widest block">
                                    Qty: {it.quantity} / Tone: {it.color} {it.size && `/ Size: ${it.size}`}
                                  </span>
                                </div>
                              </div>
                              <span className="font-mono text-xs text-zinc-600 dark:text-zinc-350">
                                ${it.price} each
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Track detail */}
                        {ord.trackingNumber && (
                          <div className="bg-zinc-50 dark:bg-zinc-950 px-4 py-3 border-t border-zinc-200 dark:border-zinc-805 text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex justify-between">
                            <span>Track Airway Bill No:</span>
                            <strong className="text-zinc-800 dark:text-zinc-200 select-all">{ord.trackingNumber}</strong>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --- TAB: WISHLIST --- */}
            {activeTab === 'wishlist' && (
              <div id="wishlist-tab-module">
                <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 mb-8">
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    <Heart size={16} className="text-red-500" />
                    <span>My Wishlist ({wishlist.length} items)</span>
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                    Access visual cards you recorded. Easily checkout these choices.
                  </p>
                </div>

                {wishlist.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/20 rounded border border-zinc-100 dark:border-zinc-805 font-mono text-xs text-zinc-500 italic">
                    Your luxury wishlist drawer is currently unfilled. Use visual heart toggles throughout the catalog.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="wishlist-grid">
                    {wishlistProducts.map(product => (
                      <div key={product.id} className="relative group/wish">
                        <ProductCard product={product} />
                        
                        {/* Instant add action overlay shortcut */}
                        <button
                          onClick={(e) => handleWishToCart(product.id, e)}
                          className="absolute bottom-20 left-4 right-4 z-10 bg-black text-white hover:bg-[#D4AF37] hover:text-black py-2.5 px-2 text-[10px] font-mono tracking-widest uppercase rounded flex items-center justify-center gap-1.5 transition-all shadow-md opacity-0 group-hover/wish:opacity-100"
                        >
                          <ShoppingCart size={11} />
                          Quick Bag Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* --- TAB: PROFILE SETTINGS EDITOR --- */}
            {activeTab === 'profile' && (
              <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-150 dark:border-zinc-900 p-6 sm:p-8 rounded" id="profile-editor-module">
                
                <div className="border-b border-zinc-150 dark:border-zinc-800 pb-3 mb-5">
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
                    VIP Profile Editor
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    Keep shipping addresses correct so next checkout processes will be expedited.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="p-4 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs tracking-wider uppercase font-mono rounded mb-6 flex items-center space-x-2">
                    <CheckCircle size={14} />
                    <span>Your elite credentials updated persistently!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                        Elite Member Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={profName}
                        onChange={(e) => setProfName(e.target.value)}
                        placeholder="Victoria Sterling" 
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-205 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-850 dark:text-zinc-150 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                        Email Coordinates
                      </label>
                      <input 
                        type="email" 
                        required
                        value={profEmail}
                        onChange={(e) => setProfEmail(e.target.value)}
                        placeholder="Srunkerry@gmail.com" 
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-205 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-850 dark:text-zinc-150 rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                        Dial Phone
                      </label>
                      <input 
                        type="text" 
                        value={profPhone}
                        onChange={(e) => setProfPhone(e.target.value)}
                        placeholder="+1 (555) 732-8411" 
                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-205 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-850 dark:text-zinc-150 rounded"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                        Default Street Address
                      </label>
                      <input 
                        type="text" 
                        value={profAddress}
                        onChange={(e) => setProfAddress(e.target.value)}
                        placeholder="742 Avenue de l'Opéra" 
                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-205 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-850 dark:text-zinc-150 rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                        City Location
                      </label>
                      <input 
                        type="text" 
                        value={profCity}
                        onChange={(e) => setProfCity(e.target.value)}
                        placeholder="Paris" 
                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-205 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-850 dark:text-zinc-150 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                        Postal Code
                      </label>
                      <input 
                        type="text" 
                        value={profZip}
                        onChange={(e) => setProfZip(e.target.value)}
                        placeholder="75001" 
                        className="w-full bg-white dark:bg-zinc-955 border border-zinc-205 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-850 dark:text-zinc-150 rounded"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-black hover:bg-zinc-900 hover:text-white font-mono text-[10px] font-bold tracking-widest py-3.5 mt-4 uppercase rounded-none cursor-pointer text-center flex justify-center items-center gap-2 transition-colors duration-200"
                  >
                    <Save size={12} />
                    <span>Save persistent profile modifications</span>
                  </button>

                </form>

              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
