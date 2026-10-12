import React from 'react';
import { Star, MapPin, Plane, Sparkles, ChevronRight, Check } from 'lucide-react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
  currency: 'TND' | 'EUR';
  onViewOnMap?: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onBook, currency, onViewOnMap }) => {
  const price = currency === 'TND' ? hotel.pricePerNightTND : hotel.pricePerNightEUR;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121216] transition-all hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col">
      {/* Visual Cover */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#18181F]">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Stars */}
          <div className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 backdrop-blur-md border border-white/10">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
            <span className="ml-1 text-[11px] font-semibold text-white">{hotel.rating}</span>
          </div>

          {/* Airport Shuttle pill/badge */}
          {hotel.hasAirportShuttle && (
            <div className="flex items-center gap-1 rounded-full bg-[#121216]/90 px-2.5 py-1 text-[11px] font-medium text-[#E5C378] border border-[#D4AF37]/40 backdrop-blur-md">
              <Plane className="h-3 w-3 text-[#D4AF37]" />
              <span>Navette VIP Dispo</span>
            </div>
          )}
        </div>

        {/* City kicker */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90 font-medium">
          <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>{hotel.city}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#F3E5AB] transition-colors">
              {hotel.name}
            </h3>
          </div>

          <p className="text-xs text-[#9E9EA8] mt-1 line-clamp-2 leading-relaxed">
            {hotel.description}
          </p>

          {/* Airport distance metadata & Map view trigger */}
          <div className="mt-3 flex items-center justify-between gap-2 text-xs bg-[#16161D] px-2.5 py-1.5 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-[#8E8E9A] min-w-0">
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">
                À {hotel.distanceToAirportKm} km · {hotel.nearestAirport}
              </span>
            </div>

            {onViewOnMap && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewOnMap(hotel);
                }}
                className="flex items-center gap-1 text-[11px] text-[#E5C378] hover:text-[#FFF2B2] font-medium shrink-0 hover:underline"
              >
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">Sur la carte</span>
              </button>
            )}
          </div>

          {/* Features */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hotel.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] text-[#C5C5D0] bg-[#1B1B22] border border-white/5 px-2 py-0.5 rounded-md"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Price & CTA Footer */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8E8E9A]">À partir de</div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#F3E5AB] tabular-nums">
                {price}
              </span>
              <span className="text-xs font-medium text-[#A6A6B2]">{currency} / nuit</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBook(hotel)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs sm:text-sm shadow-md shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.98] transition-all shrink-0"
          >
            <span>Réserver</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
