import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Instagram, Facebook, Send, RotateCw, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, applyPromo } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setSubscribed(true);
    applyPromo('WELCOME10'); // Auto-apply their discount for joining
    setEmail('');
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-zinc-900 selection:bg-[#D4AF37] selection:text-black" id="footer-section">
      
      {/* Brand Values Belt */}
      <div className="border-b border-zinc-900 px-4 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4 text-[#D4AF37]">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-zinc-100 font-medium tracking-[0.15em] text-xs uppercase mb-2">Authenticated Luxury</h4>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
              Every curated item comes with certified warranty documentation and direct lineage validation.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4 text-[#D4AF37]">
              <RotateCw size={22} />
            </div>
            <h4 className="text-zinc-100 font-medium tracking-[0.15em] text-xs uppercase mb-2">Harmonized Returns</h4>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
              We offer complimentary secure courier return service within 30 days of standard receipt.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="h-12 w-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mb-4 text-[#D4AF37]">
              <Sparkles size={22} />
            </div>
            <h4 className="text-zinc-100 font-medium tracking-[0.15em] text-xs uppercase mb-2">Bespoke Polishing</h4>
            <p className="text-zinc-500 text-xs max-w-xs leading-relaxed">
              Enjoy lifetime complimentary restoration, ultrasonic cleaning, and link sizing adjustments.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Brand Pitch & Newsletter */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white mb-6">
              <div className="h-7 w-7 bg-white dark:bg-zinc-900 border border-[#D4AF37] flex items-center justify-center">
                <span className="text-black dark:text-white font-sans font-black text-xs">A</span>
              </div>
              <span className="font-sans text-lg tracking-tighter uppercase font-black text-zinc-100">
                ACCESSORY<span className="text-[#D4AF37]">.</span>HUB
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed mb-8 max-w-sm">
              We craft and source accessories for modern purists. Balancing brutalist architectural edges with refined materials, we cultivate items of timeless elegance.
            </p>
          </div>

          <div>
            <h5 className="text-zinc-200 text-xs tracking-[0.25em] font-semibold uppercase mb-4">
              Join the Inner Circle
            </h5>
            <p className="text-zinc-500 text-[11px] leading-relaxed mb-4 max-w-xs">
              Subscribe to unlock early access warnings to capsule lookbooks and secure a voucher for 10% off.
            </p>

            {subscribed ? (
              <div className="bg-zinc-900 border border-[#D4AF37]/40 text-[#D4AF37] p-4 text-xs font-mono rounded tracking-wider animate-pulse max-w-sm">
                WELCOME TO THE CIRCLE. <br />Your code <strong className="underline">WELCOME10</strong> has been applied instantly.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-zinc-700 focus-within:border-[#D4AF37] py-2 transition-all max-w-sm">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL" 
                  className="bg-transparent border-none text-zinc-300 text-xs tracking-widest placeholder-zinc-700 outline-none w-full py-1 uppercase"
                />
                <button 
                  type="submit" 
                  className="text-zinc-500 hover:text-[#D4AF37] transition-colors p-1 cursor-pointer"
                  id="newsletter-submit-btn"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            {errorMsg && <p className="text-red-500 text-[10px] uppercase font-mono mt-2 tracking-widest">{errorMsg}</p>}
          </div>
        </div>

        {/* Right Side: Links */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          <div>
            <h6 className="text-zinc-100 text-[11px] tracking-[0.25em] font-bold uppercase mb-6">Collections</h6>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => setPage('shop')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer">
                  Chronographs &amp; Watches
                </button>
              </li>
              <li>
                <button onClick={() => setPage('shop')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer">
                  Polarized Eyewear
                </button>
              </li>
              <li>
                <button onClick={() => setPage('shop')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer">
                  Heirloom Rings &amp; Link Chains
                </button>
              </li>
              <li>
                <button onClick={() => setPage('shop')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer">
                  Craft Saffiano Leather Goods
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-zinc-100 text-[11px] tracking-[0.25em] font-bold uppercase mb-6">Boutique</h6>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer text-left">
                  Parisian Atelier Shop
                </button>
              </li>
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer text-left">
                  Tokyo Premium Ginza Depôt
                </button>
              </li>
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer text-left font-semibold flex items-center gap-1">
                  <MapPin size={10} className="text-[#D4AF37]" /> Store Finder
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h6 className="text-zinc-100 text-[11px] tracking-[0.25em] font-bold uppercase mb-6">Connect</h6>
            <div className="flex space-x-4 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="h-9 w-9 bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37] text-zinc-400 hover:text-[#D4AF37] transition-all flex items-center justify-center rounded">
                <Instagram size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="h-9 w-9 bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37] text-zinc-400 hover:text-[#D4AF37] transition-all flex items-center justify-center rounded">
                <Facebook size={15} />
              </a>
            </div>
            <p className="text-zinc-600 text-[10px] leading-relaxed">
              Dedicated Direct Hotline: <br />
              <strong className="text-zinc-400">+1 (800) 555-LUXE</strong>
            </p>
          </div>

        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="border-t border-zinc-900 bg-zinc-950/80 px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-widest font-mono text-zinc-700 uppercase">
          <div>
            &copy; {new Date().getFullYear()} Accessory Hub Inc. All Rights Deferent.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span>PCI-DSS Secured SSL</span>
            <span>GDPR Responded</span>
            <span>Terms of Luxury Use</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
