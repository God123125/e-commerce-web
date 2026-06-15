import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, CreditCard as CardIcon, Apple as AppleIcon, HelpCircle, ArrowRight } from 'lucide-react';

export const Checkout: React.FC = () => {
  const {
    cart,
    user,
    appliedPromo,
    placeOrder,
    setPage
  } = useApp();

  // Shipments Info matching user profile or empty
  const [fullName, setFullName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [address, setAddress] = useState(user ? user.address : '');
  const [city, setCity] = useState(user ? user.city : '');
  const [zipCode, setZipCode] = useState(user ? user.zipCode : '');

  // Payment Options choice
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal' | 'apple-pay'>('credit-card');

  // Credit Card Form details
  const [ccNumber, setCcNumber] = useState('');
  const [ccName, setCcName] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvv, setCcCvv] = useState('');

  // UI Error indicators
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cost breakdowns
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 150 ? 0 : 15;
  
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = subtotal * (appliedPromo.value / 100);
    } else {
      discountAmount = appliedPromo.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address || !city || !zipCode) {
      setFormError('Please fill out all required shipping fields.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    const shippingProfile = {
      name: fullName,
      email,
      phone,
      address,
      city,
      zipCode
    };

    setTimeout(() => {
      const paymentLabel = paymentMethod === 'credit-card' ? 'Visa/Mastercard' : paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay';
      placeOrder(shippingProfile, paymentLabel);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black font-sans" id="checkout-view-view">
      
      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold">Secure Gate</span>
        <h1 className="font-sans text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 mt-1">
          SECURED CHECKOUT
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* L. SHIPPING DETAILS & PAYMENTS (lg: span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {formError && (
              <div className="p-4 bg-red-50 text-red-500 border border-red-200 text-xs tracking-wider uppercase font-mono rounded animate-pulse">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-8" id="checkout-submit-form">
              
              {/* Shipping Blocks */}
              <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-150 dark:border-zinc-900 p-6 sm:p-8 rounded space-y-4">
                <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-105 border-b border-zinc-150 dark:border-zinc-800 pb-3 mb-5">
                  1. Shipping Protocol
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                      Recipient Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="E.G: VICTORIA STERLING"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Srunkerry@gmail.com"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                    Street Address *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="742 AVENUE DE L'OPÉRA"
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                      City *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="PARIS"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                      Postal Zip Code *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="75001"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 732-8411"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded"
                    />
                  </div>
                </div>

              </div>

              {/* Payments choice block */}
              <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-150 dark:border-zinc-900 p-6 sm:p-8 rounded space-y-4">
                <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-105 border-b border-zinc-150 dark:border-zinc-800 pb-3 mb-5">
                  2. Payment Protocol
                </h3>

                {/* Tabs choosing */}
                <div className="grid grid-cols-3 gap-2 pb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit-card')}
                    className={`p-3.5 border text-xs font-mono tracking-widest uppercase flex flex-col items-center justify-center gap-1 transition-all rounded ${
                      paymentMethod === 'credit-card' 
                        ? 'border-[#D4AF37] bg-white dark:bg-zinc-950 text-[#D4AF37] shadow font-bold' 
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <CardIcon size={16} />
                    <span className="text-[9px] mt-1">Visa/Master</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3.5 border text-xs font-mono tracking-widest uppercase flex flex-col items-center justify-center gap-1 transition-all rounded ${
                      paymentMethod === 'paypal' 
                        ? 'border-[#D4AF37] bg-white dark:bg-zinc-950 text-[#D4AF37] shadow font-bold' 
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <span className="font-serif italic font-bold">Pay</span>
                    <span className="text-[9px]">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple-pay')}
                    className={`p-3.5 border text-xs font-mono tracking-widest uppercase flex flex-col items-center justify-center gap-1 transition-all rounded ${
                      paymentMethod === 'apple-pay' 
                        ? 'border-[#D4AF37] bg-white dark:bg-zinc-950 text-[#D4AF37] shadow font-bold' 
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <AppleIcon size={16} />
                    <span className="text-[9px] mt-1">Apple Pay</span>
                  </button>
                </div>

                {/* Render Credit Card Form With Gold Live Visual card preview */}
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 pt-2">
                    
                    {/* Live Card graphics decoration */}
                    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-[#D4AF37]/30 p-6 rounded-lg shadow-xl relative text-white font-mono uppercase tracking-widest max-w-sm mx-auto mb-6">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs text-zinc-400">ACCESSORY HUB INTL</span>
                        <span className="text-[#D4AF37] text-sm font-serif font-black tracking-widest">Visa</span>
                      </div>
                      <div className="text-base sm:text-lg mb-6 leading-none tracking-[0.1em]" id="card-num-preview">
                        {ccNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <div>
                          <span className="text-zinc-500 block text-[8px] tracking-normal">Cardholder</span>
                          <span className="text-[#D4AF37] font-bold truncate max-w-[130px] inline-block">{ccName || 'GUEST COMMISSIONER'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[8px] tracking-normal">Expires</span>
                          <strong className="text-white font-bold">{ccExpiry || 'MM/YY'}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                          Card Number
                        </label>
                        <input 
                          type="text" 
                          required={paymentMethod === 'credit-card'}
                          value={ccNumber}
                          onChange={(e) => setCcNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                          Card Name
                        </label>
                        <input 
                          type="text" 
                          required={paymentMethod === 'credit-card'}
                          value={ccName}
                          onChange={(e) => setCcName(e.target.value)}
                          placeholder="VICTORIA STERLING"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                          Expiration Date
                        </label>
                        <input 
                          type="text" 
                          required={paymentMethod === 'credit-card'}
                          value={ccExpiry}
                          onChange={(e) => setCcExpiry(e.target.value.slice(0, 5))}
                          placeholder="MM/YY"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1">
                          CVV Code
                        </label>
                        <input 
                          type="password" 
                          required={paymentMethod === 'credit-card'}
                          value={ccCvv}
                          onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          placeholder="•••"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-8 text-center bg-[#eaeef9]/30 border border-[#4d66cb]/20 rounded font-mono text-xs text-[#003087]">
                    You will be securely redirected to PayPal popup details on authorization.
                  </div>
                )}

                {paymentMethod === 'apple-pay' && (
                  <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded font-mono text-xs flex flex-col justify-center items-center gap-2">
                    <AppleIcon size={24} className="text-black dark:text-white" />
                    <span>Authorize this luxurious transaction using Apple FaceID.</span>
                  </div>
                )}

              </div>

              {/* Submit trigger button */}
              <button 
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#D4AF37] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-semibold font-mono text-xs tracking-[0.25em] py-4.5 uppercase rounded-none shadow hover:shadow-xl transition-all duration-300 text-center flex justify-center items-center gap-2 cursor-pointer disabled:bg-zinc-300"
                id="place-order-checkout-action"
              >
                {isSubmitting ? (
                  <span className="animate-spin h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Place Luxury Order</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>

            </form>

          </div>

          {/* R. ORDER PRODUCTS CART RECAP ROW (lg: span 5) */}
          <div className="lg:col-span-5" id="checkout-cart-summary">
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-805 p-6 rounded space-y-6">
              
              <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-105 border-b border-zinc-150 dark:border-zinc-800 pb-3 mb-4">
                Selected Spindle
              </h3>

              {/* Items loops */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 pt-4 first:pt-0 items-center justify-between">
                    <div className="flex gap-3">
                      <div className="h-12 w-12 rounded bg-zinc-100 overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left font-serif">
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{item.product.name}</h4>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                          Qty: {item.quantity} / Tone: {item.selectedColor}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-150">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial calculations */}
              <div className="space-y-3.5 border-t border-zinc-150 dark:border-zinc-800 pt-5 text-xs font-sans">
                
                <div className="flex justify-between text-zinc-500">
                  <span>Bag Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-red-500 font-mono text-[11px] font-bold">
                    <span>Coupon Discount (-{appliedPromo.value}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-500">
                  <span>Insured Express Courier</span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-500 font-mono text-[10px] uppercase font-bold tracking-widest">Complimentary</span>
                  ) : (
                    <span className="font-mono">${shippingCost.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex justify-between items-baseline border-t border-zinc-150 dark:border-zinc-800 pt-4 mt-2">
                  <span className="font-sans font-black uppercase tracking-tight text-sm">Secured Grand Total</span>
                  <strong className="text-base font-mono font-black text-[#D4AF37]">${grandTotal.toFixed(2)}</strong>
                </div>

              </div>

              {/* Shipping Promises */}
              <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 rounded space-y-3 font-sans text-[11px] text-zinc-500 leading-relaxed">
                <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-350 uppercase tracking-wider font-mono text-[9px] font-bold">
                  <Truck size={12} className="text-[#D4AF37]" />
                  <span>Insured Delivery Protocol</span>
                </div>
                <p>
                  Orders leave our Paris salon within 24 business hours. Fully tracked with premium custom cardboard insulation.
                </p>
              </div>

              <div className="flex justify-center items-center gap-1.5 text-[9px] font-mono text-zinc-450 uppercase tracking-widest pt-2">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Verified PCI Merchant Service</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
