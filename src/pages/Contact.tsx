import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle } from 'lucide-react';

interface Boutique {
  id: string;
  city: string;
  lat: number;   // relative coordinates inside our canvas (0 - 100)
  lng: number;
  address: string;
  hours: string;
  phone: string;
}

const BOUTIQUES_ARR: Boutique[] = [
  {
    id: 'paris',
    city: 'Paris Atelier',
    lat: 40,
    lng: 48,
    address: "742 Avenue de l'Opéra, 75001 Paris, France",
    hours: "Mon - Sat: 11:00 AM - 7:35 PM",
    phone: "+33 1 45 66 12 99"
  },
  {
    id: 'tokyo',
    city: 'Ginza Depôt',
    lat: 45,
    lng: 78,
    address: "5-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
    hours: "Daily: 11:00 AM - 8:00 PM",
    phone: "+81 3 5562 9011"
  },
  {
    id: 'nyc',
    city: 'Manhattan Salon',
    lat: 35,
    lng: 25,
    address: "812 Madison Avenue, New York, NY 10021, USA",
    hours: "Mon - Sat: 10:00 AM - 7:00 PM",
    phone: "+1 (212) 555-0925"
  }
];

export const Contact: React.FC = () => {
  const [activeBoutique, setActiveBoutique] = useState<Boutique>(BOUTIQUES_ARR[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Catalog Inquiry');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ripplePhase, setRipplePhase] = useState(0);

  // Animation lock for the interactive canvas map
  useEffect(() => {
    let animId: number;
    const ticker = () => {
      setRipplePhase(prev => (prev + 0.05) % (Math.PI * 2));
      animId = requestAnimationFrame(ticker);
    };
    animId = requestAnimationFrame(ticker);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Compute and render the interactive gold vector map on change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    const isDark = document.documentElement.classList.contains('dark');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background of the world vector layout
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.04)' : 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 1;
    const step = 20;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Drawing abstract golden continent borders/dots to create a world feeling
    ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.06)' : 'rgba(0,0,0,0.02)';
    
    // Mock North America
    ctx.beginPath();
    ctx.arc(canvas.width * 0.22, canvas.height * 0.35, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Mock Europe
    ctx.beginPath();
    ctx.arc(canvas.width * 0.48, canvas.height * 0.38, 45, 0, Math.PI * 2);
    ctx.fill();
    
    // Mock Asia
    ctx.beginPath();
    ctx.arc(canvas.width * 0.75, canvas.height * 0.42, 65, 0, Math.PI * 2);
    ctx.fill();

    // Draw connecting lines between nodes with animated dashes
    ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.35)';
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    const pts = BOUTIQUES_ARR.map(b => ({
      x: canvas.width * (b.lng / 100),
      y: canvas.height * (b.lat / 100)
    }));
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]); // Reset path

    // Render each boutique node
    BOUTIQUES_ARR.forEach(b => {
      const x = canvas.width * (b.lng / 100);
      const y = canvas.height * (b.lat / 100);
      const isSelected = b.id === activeBoutique.id;

      if (isSelected) {
        // Draw expanding gold radar ripples
        const pulseRadius = 15 + Math.sin(ripplePhase) * 8;
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius - 5, 0, Math.PI * 2);
        ctx.fill();

        // Selected core marker
        ctx.fillStyle = '#D4AF37';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Elegant city popup label overlay
        ctx.fillStyle = isDark ? '#18181b' : '#ffffff';
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 4;
        
        const labelText = b.city.toUpperCase();
        ctx.font = 'bold 9px monospace';
        const labelWidth = ctx.measureText(labelText).width + 16;
        
        ctx.fillRect(x - labelWidth/2, y - 26, labelWidth, 16);
        ctx.strokeRect(x - labelWidth/2, y - 26, labelWidth, 16);
        ctx.shadowBlur = 0; // reset
        
        ctx.fillStyle = isDark ? '#ffffff' : '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(labelText, x, y - 15);
      } else {
        // Inactive marker
        ctx.fillStyle = isDark ? '#3f3f46' : '#a1a1aa';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '8px monospace';
        ctx.fillStyle = isDark ? '#71717a' : '#71717a';
        ctx.textAlign = 'center';
        ctx.fillText(b.city.toUpperCase(), x, y + 15);
      }
    });

  }, [activeBoutique, ripplePhase]);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black font-sans" id="contact-hub-view">
      
      {/* 1. COMPACT PAGE HEADER */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
          Direct Lineage Inquiry
        </span>
        <h1 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tighter mt-2 text-zinc-900 dark:text-zinc-50">
          STUDIO ATELIERS
        </h1>
        <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mt-4" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* L. BOUTIQUE CONTACT CARD DETAILS */}
        <div className="space-y-8 text-left">
          
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 p-6 sm:p-8 rounded space-y-6">
            
            <div className="border-b border-zinc-150 dark:border-zinc-800 pb-4 mb-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">Boutique Finder</span>
              <h3 className="font-sans text-xl font-extrabold uppercase mt-1">Our Elite Locations</h3>
            </div>

            {/* Quick buttons switching boutique */}
            <div className="grid grid-cols-3 gap-2">
              {BOUTIQUES_ARR.map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setActiveBoutique(btn)}
                  className={`py-2 px-3 text-[10px] font-mono tracking-widest uppercase border transition-all rounded-none ${
                    activeBoutique.id === btn.id 
                      ? 'border-[#D4AF37] bg-white dark:bg-zinc-950 text-[#D4AF37] font-bold shadow' 
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white bg-white/50'
                  }`}
                  id={`boutique-tab-${btn.id}`}
                >
                  {btn.city.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Selected boutique specs */}
            <div className="space-y-4 pt-4 text-xs tracking-wide" id="active-boutique-card">
              
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Mailing Address</span>
                  <strong className="text-zinc-800 dark:text-zinc-200 uppercase leading-relaxed text-[13px]">{activeBoutique.address}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Phone size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Hotline Call</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 font-mono text-xs">{activeBoutique.phone}</strong>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Boutique Hours</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 text-xs font-mono">{activeBoutique.hours}</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* INTERACTIVE GOLD MAP CANVAS COMPONENT */}
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-900 rounded p-6 shadow-sm">
            <div className="flex justify-between font-mono text-[9px] text-zinc-450 uppercase mb-3 px-1">
              <span>Accessory Hub Boutiques Network Map</span>
              <span className="text-[#D4AF37] animate-pulse">&bull; Live Coordinates</span>
            </div>
            
            <div className="relative aspect-[16/9] w-full bg-[#18181b]/5 dark:bg-[#000000]/30 rounded overflow-hidden border border-zinc-100 dark:border-zinc-850">
              <canvas 
                ref={canvasRef} 
                width={600} 
                height={337} 
                className="w-full h-full object-cover block"
                id="interactive-boutique-canvas-map"
              />
            </div>
            
            <div className="text-center font-mono text-[9px] text-zinc-400 uppercase tracking-widest mt-3">
              Press buttons above to shift vector coordinates and radar ping focus spots
            </div>
          </div>

        </div>

        {/* R. INTERACTIVE INQUIRY TRANSMISSION FORM */}
        <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-900 p-6 sm:p-8 rounded text-left">
          
          <div className="border-b border-zinc-150 dark:border-zinc-800 pb-3 mb-6">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">Inquiry Port</span>
            <h3 className="font-sans text-lg font-black uppercase mt-1">Direct Courier Transmission</h3>
          </div>

          {success ? (
            <div className="bg-zinc-900 border border-[#D4AF37] text-[#D4AF37] p-6 text-xs font-mono rounded-none tracking-wider text-center space-y-3 animate-pulse">
              <CheckCircle size={24} className="mx-auto text-[#D4AF37]" />
              <strong>TRANSMISSION DELIVERED SECURELY!</strong>
              <p className="text-[10px] text-zinc-400">Our support concierge will reply to your registered coordinate within 12 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              
              <div>
                <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                  Your Full Name
                </label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VICTORIA STERLING"
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded-none animate-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                  Secure Return Email
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Srunkerry@gmail.com"
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 font-mono text-zinc-800 dark:text-zinc-200 rounded-none animate-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                  Subject Matter
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-3 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded-none cursor-pointer"
                  id="contact-subject-select"
                >
                  <option value="General Catalog Inquiry">General Catalog Inquiry</option>
                  <option value="Elite Membership Program">Elite Membership Program</option>
                  <option value="Custom Chronological Sizing">Custom Chronological Sizing</option>
                  <option value="Track Outstanding Dispatch">Track Outstanding Dispatch</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                  Secured Request Body
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="DESCRIBE YOUR INQUIRY REGARDING PLATING WARRANTIES, SIZE ADJUSTMENT CONCIERGE..."
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#D4AF37] text-xs tracking-wider outline-none p-4 uppercase font-mono text-zinc-800 dark:text-zinc-200 rounded-none"
                  id="contact-form-message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-zinc-900 dark:hover:bg-white text-black hover:text-white dark:hover:text-black font-semibold font-mono text-xs tracking-[0.25em] py-4 uppercase rounded-none shadow cursor-pointer text-center flex justify-center items-center gap-2 transition-colors duration-200"
                id="contact-submit-action"
              >
                <Send size={12} />
                <span>Transmit Secure Envelope</span>
              </button>

            </form>
          )}

          <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-4 text-[10px] tracking-widest text-zinc-400 font-mono flex items-center justify-center space-x-2 uppercase">
            <Sparkles size={11} className="text-[#D4AF37]" />
            <span>Encrypted Direct Message Relay Connected</span>
          </div>

        </div>

      </div>

    </div>
  );
};
