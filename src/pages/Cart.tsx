import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Minus, Trash2, ArrowRight, Sparkles, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    appliedPromo,
    applyPromo,
    removePromo,
    setPage
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = subtotal * (appliedPromo.value / 100);
    } else {
      discountAmount = appliedPromo.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    
    const res = applyPromo(promoInput.trim());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
    setTimeout(() => setPromoMessage(null), 4000);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-24 px-4 font-sans select-none" id="empty-cart-view">
        <div className="max-w-md mx-auto text-center">
          <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-900 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={24} className="text-[#D4AF37]" />
          </div>
          <h2 className="font-sans text-2xl font-black uppercase tracking-tighter mb-3">Your Shopping Bag is Empty</h2>
          <p className="text-zinc-500 text-xs tracking-wide leading-relaxed mb-8 max-w-sm mx-auto">
            We offer bespoke certified timers, polarized optics, and gold links. Return to our boutique shelves to fill your bag.
          </p>
          <button 
            onClick={() => setPage('shop')}
            className="w-full bg-[#D4AF37] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-semibold font-mono text-xs tracking-[0.25em] py-4 uppercase rounded shadow cursor-pointer transition-colors duration-300"
            id="empty-cart-return-shop"
          >
            DISCOVER THE SHOP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black font-sans" id="cart-view-root">
      
      {/* 1. COMPACT CRUMBS */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-bold">Your Selection</span>
        <h1 className="font-sans text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 mt-1">
          SHOPPING BAG ({cart.length} item types)
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* L. ITEMS TABLE CONTAINER (lg: span 7) */}
          <div className="lg:col-span-7 space-y-4" id="cart-table-items">
            
            {cart.map((item, idx) => {
              const itemTotal = item.product.price * item.quantity;
              
              return (
                <div 
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-805 rounded p-4 flex flex-col sm:flex-row items-center gap-4 transition-all hover:border-[#D4AF37]/15"
                  id={`cart-row-${idx}`}
                >
                  
                  {/* Thumb image */}
                  <div 
                    onClick={() => setPage('product-details', item.product.id)}
                    className="w-full sm:w-28 aspect-square overflow-hidden bg-zinc-100 rounded cursor-pointer relative shrink-0"
                  >
                    <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>

                  {/* Information Details block */}
                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 
                          onClick={() => setPage('product-details', item.product.id)}
                          className="font-sans text-base font-extrabold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                          id={`cart-remove-idx-${idx}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Chosen spec sub-labels */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono uppercase text-zinc-500 mt-2">
                        <span>Tone: <strong className="text-zinc-800 dark:text-zinc-200">{item.selectedColor}</strong></span>
                        {item.selectedSize && <span>Size: <strong className="text-zinc-800 dark:text-zinc-200">{item.selectedSize}</strong></span>}
                        <span>Price: <strong className="text-zinc-850 dark:text-zinc-200">${item.product.price}</strong></span>
                      </div>
                    </div>

                    {/* Quantity Adjustment + Subtotal Row */}
                    <div className="flex justify-between items-center mt-6">
                      
                      {/* Interactive adjustment step */}
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded px-0.5">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="p-2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-3 font-mono text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="p-2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Cumulative Price */}
                      <span className="font-mono text-sm font-black text-zinc-900 dark:text-zinc-100">
                        Total: ${itemTotal.toFixed(2)}
                      </span>

                    </div>
                  </div>

                </div>
              );
            })}

            {/* Quick Guarantees bar */}
            <div className="bg-zinc-950/5 dark:bg-zinc-900/10 p-4 border border-dashed border-zinc-200 dark:border-zinc-805 rounded flex items-center space-x-3 text-xs text-zinc-500">
              <Sparkles size={16} className="text-[#D4AF37] shrink-0" />
              <span>We wrap each accessory in heavy charcoal tissue padding inside an insulated magnetic lock jewelry box. Complimentary gift-note available.</span>
            </div>

          </div>

          {/* R. ORDER SUMMARY EXPENSES BILL (lg: span 5) */}
          <div className="lg:col-span-5" id="cart-order-summary">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 rounded">
              
              <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-105 border-b border-zinc-150 dark:border-zinc-800 pb-4 mb-6">
                Order Summation
              </h2>

              {/* Cost Rows */}
              <div className="space-y-4 border-b border-zinc-150 dark:border-zinc-800 pb-5 mb-5 text-sm font-sans">
                
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal of selection</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-50">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-red-500 font-mono text-xs font-semibold">
                    <div className="flex items-center">
                      <span>VOCHURE DECO ({appliedPromo.code})</span>
                      <button onClick={removePromo} className="ml-1 text-zinc-400 hover:text-red-600 underline cursor-pointer text-[9px]">
                        (Remove)
                      </button>
                    </div>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-zinc-500">Insured Courier Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-wider">Free Shipping</span>
                  ) : (
                    <span className="font-mono font-bold">${shippingCost.toFixed(2)}</span>
                  )}
                </div>

                {shippingCost > 0 && (
                  <div className="flex items-center space-x-2 text-[10px] bg-amber-50 dark:bg-amber-950/20 text-[#D4AF37] p-2.5 rounded border border-amber-100 dark:border-amber-900/50">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>Spend an additional <strong className="font-bold">${(150 - subtotal).toFixed(2)}</strong> to toggle free tracked shipping!</span>
                  </div>
                )}

              </div>

              {/* Grand Total Row */}
              <div className="flex justify-between items-baseline border-b border-zinc-150 dark:border-zinc-800 pb-6 mb-6">
                <span className="font-sans text-base font-black uppercase tracking-tight">Total secured amount</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-[#D4AF37]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* PROMO CODES FORM */}
              <div className="mb-6">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-2">
                  Promo voucher code
                </label>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="E.G: GOLDEN20" 
                    className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none px-3.5 py-2 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded"
                  />
                  <button 
                    type="submit"
                    className="bg-[#D4AF37] text-black font-mono text-[10px] font-bold tracking-widest px-4 uppercase rounded-none cursor-pointer hover:bg-zinc-900 hover:text-white transition-colors duration-200"
                  >
                    Apply code
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-[10px] mt-2 font-mono uppercase tracking-widest ${
                    promoMessage.isError ? 'text-red-500' : 'text-emerald-500'
                  }`}>
                    {promoMessage.text}
                  </p>
                )}
                <div className="text-[9px] text-zinc-400 font-mono uppercase mt-2">
                  Tip: <strong className="underline">GOLDEN20</strong> saves 20%, <strong className="underline">LUXURY50</strong> secures $50 deduction.
                </div>
              </div>

              {/* Main Checkout button */}
              <button 
                onClick={() => setPage('checkout')}
                className="w-full bg-[#D4AF37] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-semibold font-mono text-xs tracking-[0.2em] py-4.5 uppercase rounded-none shadow hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
                id="cart-checkout-proceed-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex justify-center items-center gap-1 text-[9px] font-mono text-zinc-450 uppercase tracking-widest mt-4">
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>SSL Encrypted Secured Transaction Gateway</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
