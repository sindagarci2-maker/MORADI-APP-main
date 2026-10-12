import React from 'react';
import { Compass, Sparkles, Plane, Ticket, MapPin } from 'lucide-react';

export type TabDestination = 'hotels' | 'map' | 'reveillon' | 'transfer' | 'bookings';

interface BottomTabBarProps {
  activeTab: TabDestination;
  onTabChange: (tab: TabDestination) => void;
  bookingCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  bookingCount,
}) => {
  const tabs = [
    {
      id: 'hotels' as TabDestination,
      label: 'Découvrir',
      icon: Compass,
    },
    {
      id: 'map' as TabDestination,
      label: 'Carte & Accès',
      icon: MapPin,
    },
    {
      id: 'reveillon' as TabDestination,
      label: 'Réveillon',
      icon: Sparkles,
      highlight: true,
    },
    {
      id: 'transfer' as TabDestination,
      label: 'Navette VIP',
      icon: Plane,
    },
    {
      id: 'bookings' as TabDestination,
      label: 'Mon Séjour',
      icon: Ticket,
      badge: bookingCount > 0 ? bookingCount : undefined,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0C0C0F]/95 backdrop-blur-xl border-t border-[#D4AF37]/25 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-all relative ${
                isActive ? 'text-[#F3E5AB]' : 'text-[#8E8E9A] hover:text-[#C5C5CE]'
              }`}
            >
              {/* Highlight subtle glow on active */}
              {isActive && (
                <div className="absolute top-1 w-8 h-1 rounded-full bg-gold-gradient shadow-[0_0_8px_#D4AF37]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#D4AF37]' : ''
                  }`}
                />
                {tab.highlight && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                )}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 h-4 min-w-[16px] px-1 rounded-full bg-[#D4AF37] text-black text-[9px] font-bold flex items-center justify-center font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-[#F3E5AB] font-semibold' : 'text-[#8E8E9A]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
