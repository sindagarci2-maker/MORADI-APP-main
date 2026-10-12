import React from 'react';
import { Crown, Smartphone, LayoutGrid, Globe, Bell } from 'lucide-react';

interface HeaderTopBarProps {
  currency: 'TND' | 'EUR';
  onToggleCurrency: () => void;
  activeAppMode: 'app' | 'uikit';
  onToggleAppMode: (mode: 'app' | 'uikit') => void;
  onOpenVIPClub: () => void;
}

export const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  currency,
  onToggleCurrency,
  activeAppMode,
  onToggleAppMode,
  onOpenVIPClub,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0D]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient p-[1px] flex items-center justify-center shadow-md shadow-[#D4AF37]/20">
            <div className="w-full h-full bg-[#0E0E12] rounded-[7px] flex items-center justify-center">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <span className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-white">
              EL MOURADI
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#E5C378] block -mt-1 font-medium">
              Hôtels & Resorts · Luxe
            </span>
          </div>
        </div>

        {/* Central Switch: Mobile Simulator vs UI Kit Showcase */}
        <div className="flex items-center gap-1 p-1 bg-[#14141A] rounded-xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => onToggleAppMode('app')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeAppMode === 'app'
                ? 'bg-gold-gradient text-black font-semibold shadow-sm'
                : 'text-[#A0A0AB] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulateur Mobile</span>
            <span className="sm:hidden">App</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleAppMode('uikit')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeAppMode === 'uikit'
                ? 'bg-gold-gradient text-black font-semibold shadow-sm'
                : 'text-[#A0A0AB] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kit UI Noir & Or</span>
            <span className="sm:hidden">Kit UI</span>
          </button>
        </div>

        {/* Right Zone: Currency & VIP Pass */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <button
            type="button"
            onClick={onToggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#16161D] border border-white/10 text-xs text-[#E5C378] hover:border-[#D4AF37]/50 font-mono transition-colors"
            title="Changer de devise"
          >
            <Globe className="w-3 h-3 text-[#A0A0AA]" />
            <span>{currency}</span>
          </button>

          {/* VIP Pass Trigger */}
          <button
            type="button"
            onClick={onOpenVIPClub}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#F3E5AB] hover:bg-[#D4AF37]/20 transition-colors"
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline text-[11px] font-medium">VIP Gold</span>
          </button>
        </div>
      </div>
    </header>
  );
};
