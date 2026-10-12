import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, ArrowRight, Copy, Check, Gift } from 'lucide-react';
import { IMAGES, REVEILLON_DATA } from '../data/hotels';

interface ReveillonBannerProps {
  onBookReveillon: () => void;
  currency: 'TND' | 'EUR';
}

export const ReveillonBanner: React.FC<ReveillonBannerProps> = ({ onBookReveillon, currency }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 82, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(REVEILLON_DATA.promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#18181E] via-[#111115] to-[#0A0A0C] shadow-2xl shadow-black/80">
      {/* Background image with luxury noir & gold scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.reveillonGala}
          alt="Gala Réveillon El Mouradi"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-30 mix-blend-luminosity brightness-75 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0E0E12]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/90 via-[#0A0A0C]/60 to-transparent" />
      </div>

      {/* Decorative Gold Filigree corner lines */}
      <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-[#D4AF37]/30 rounded-bl-2xl" />

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between">
        {/* Top Header metadata */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-[#E5C378] tracking-widest uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>Édition Spéciale · Saint-Sylvestre 2026</span>
          </div>
          <span className="text-[11px] font-medium text-amber-200/80 bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full">
            -25% Privilège
          </span>
        </div>

        {/* Main Title & Description */}
        <div className="mb-4">
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
            Grand Réveillon de Prestige
          </h3>
          <p className="text-xs sm:text-sm text-[#D1D1D8] line-clamp-2 leading-relaxed">
            Dîner de Gala 7 services, orchestre impérial, champagne offert et navette aéroport VIP gracieuse dès 3 nuitées.
          </p>
        </div>

        {/* Countdown strip */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/20 backdrop-blur-md">
          <div className="text-center">
            <div className="font-mono text-base sm:text-lg font-bold text-[#F3E5AB] tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-[#A0A0AA]">Jours</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="font-mono text-base sm:text-lg font-bold text-[#F3E5AB] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-[#A0A0AA]">Heures</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="font-mono text-base sm:text-lg font-bold text-[#F3E5AB] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-[#A0A0AA]">Min</div>
          </div>
          <div className="text-center border-l border-white/10">
            <div className="font-mono text-base sm:text-lg font-bold text-[#F3E5AB] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[9px] uppercase tracking-wider text-[#A0A0AA]">Sec</div>
          </div>
        </div>

        {/* Action Row & Promo Code Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-white/10">
          {/* Promo code copy button */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#1C1C22] border border-[#D4AF37]/30 text-xs text-[#E5C378] hover:border-[#D4AF37] transition-all group"
            title="Copier le code promotionnel"
          >
            <div className="flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono font-semibold tracking-wider">{REVEILLON_DATA.promoCode}</span>
            </div>
            <span className="text-[11px] text-[#A69363] flex items-center gap-1">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 group-hover:text-white transition-colors" />
                  <span>Copier</span>
                </>
              )}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onBookReveillon}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-[#0A0A0C] font-semibold text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <span>Réserver le Gala</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
