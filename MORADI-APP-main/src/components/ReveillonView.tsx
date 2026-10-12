import React from 'react';
import { Sparkles, Calendar, Music, Utensils, GlassWater, Clock, Gift, ShieldCheck, ArrowRight, Plane } from 'lucide-react';
import { IMAGES, REVEILLON_DATA } from '../data/hotels';

interface ReveillonViewProps {
  onBookReveillon: () => void;
  currency: 'TND' | 'EUR';
}

export const ReveillonView: React.FC<ReveillonViewProps> = ({ onBookReveillon, currency }) => {
  const menuCourses = [
    {
      course: 'Mise en Bouche Impériale',
      dish: 'Perles de caviar & tartare de loup de mer aux agrumes confits du Cap Bon',
    },
    {
      course: 'Entrée d’Or Prestige',
      dish: 'Médaillon de foie gras poêlé, réduction de figues de Djebba & brioche dorée',
    },
    {
      course: 'Le Joyau Méditerranéen',
      dish: 'Pavé de turbot rôti au safran impérial, émulsion d’huile d’olive de Teboursouk',
    },
    {
      course: 'Intermède Givré',
      dish: 'Sorbet mandarine impériale & champagne millésimé',
    },
    {
      course: 'La Pièce Maîtresse',
      dish: 'Filet de bœuf Rossini aux morilles sauvages et truffes noires',
    },
    {
      course: 'Douceur de la Saint-Sylvestre',
      dish: 'Lingot noir & or aux chocolats d’exception, cœur coulant praliné et éclats de pistache',
    },
  ];

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Hero Visual Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
        <img
          src={IMAGES.reveillonGala}
          alt="Gala Réveillon 2026 El Mouradi"
          referrerPolicy="no-referrer"
          className="w-full h-64 sm:h-80 object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/50 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Édition 2026
            </span>
            <span className="text-xs text-[#F3E5AB] font-mono tracking-wide">31 Décembre · Soirée de Gala</span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Le Grand Réveillon d'Or
          </h1>
          <p className="text-xs sm:text-sm text-[#D1D1D8] mt-1 max-w-lg">
            Célébrez l'avènement du Nouvel An 2026 dans l'opulence et la féerie des Palais El Mouradi.
          </p>
        </div>
      </div>

      {/* Special Offer Alert */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201B10] to-[#121217] border border-[#D4AF37]/40 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-[#F3E5AB]">
              Privilège Réveillon : Navette Aéroport VIP Offerte
            </h4>
            <p className="text-xs text-[#B5B5BE] mt-0.5">
              Pour tout séjour de 3 nuits et plus avec code <span className="text-[#D4AF37] font-mono font-bold">REVEILLON-GOLD</span>,
              votre transfert aller-retour en Mercedes avec chauffeur privé est gracieusement offert.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBookReveillon}
          className="px-3 py-2 rounded-xl bg-gold-gradient text-black font-semibold text-xs shrink-0 whitespace-nowrap shadow-md"
        >
          En Profiter
        </button>
      </div>

      {/* Program Schedule */}
      <div className="rounded-2xl border border-white/10 bg-[#121216] p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C378] uppercase tracking-wider mb-4">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <span>Déroulement de la Nuit Impériale</span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex gap-3">
            <div className="font-mono font-bold text-[#D4AF37] shrink-0 w-12">20h00</div>
            <div>
              <div className="font-semibold text-white">Accueil VIP & Coupe de Champagne Millésimé</div>
              <div className="text-[#8E8E9A] mt-0.5">Tapis Noir & Or au grand foyer, harpiste et violonistes live.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="font-mono font-bold text-[#D4AF37] shrink-0 w-12">21h15</div>
            <div>
              <div className="font-semibold text-white">Ouverture du Dîner Gastronomique 7 Services</div>
              <div className="text-[#8E8E9A] mt-0.5">Conçu par notre brigade de chefs étoilés et sommellerie de prestige.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="font-mono font-bold text-[#D4AF37] shrink-0 w-12">22h30</div>
            <div>
              <div className="font-semibold text-white">Grand Orchestre Symphonique & Show Oriental d’Élite</div>
              <div className="text-[#8E8E9A] mt-0.5">Spectacle musical exclusif avec ténors et chanteurs de renom.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="font-mono font-bold text-[#D4AF37] shrink-0 w-12">00h00</div>
            <div>
              <div className="font-semibold text-white">Célébration des 12 Coups de Minuit & Pluie de Confettis Dorés</div>
              <div className="text-[#8E8E9A] mt-0.5">Feu d’artifice sur la mer méditerranée et toasts royaux.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="font-mono font-bold text-[#D4AF37] shrink-0 w-12">09h-14h</div>
            <div>
              <div className="font-semibold text-white">Brunch Royal du 1er Janvier</div>
              <div className="text-[#8E8E9A] mt-0.5">Buffet impérial de l’An Neuf servi face aux piscines et à la plage.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Gastronomique 7 Services */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#121217] p-5">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C378] uppercase tracking-wider">
            <Utensils className="w-4 h-4 text-[#D4AF37]" />
            <span>Menu de Gala 7 Services</span>
          </div>
          <span className="text-[11px] text-[#A69363]">Service aux gants blancs</span>
        </div>

        <div className="space-y-3.5">
          {menuCourses.map((item, idx) => (
            <div key={idx} className="pb-3 border-b border-white/5 last:border-b-0 last:pb-0">
              <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-mono">
                {item.course}
              </span>
              <p className="text-xs sm:text-sm text-white font-medium mt-0.5">{item.dish}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Package Tarifs & CTA */}
      <div className="p-5 rounded-2xl bg-gradient-to-b from-[#1C1A14] to-[#101015] border border-[#D4AF37] shadow-xl text-center space-y-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5C378]">Forfait Clé en Main</span>
          <h3 className="font-cinzel text-xl font-bold text-white mt-1">Séjour Réveillon & Gala Impérial</h3>
          <p className="text-xs text-[#B8B8C4] mt-1">
            Comprend l'hébergement en Suite de luxe, le dîner de Gala, le brunch du 1er Janvier et l'accès VIP Thalasso.
          </p>
        </div>

        <div className="flex items-baseline justify-center gap-2">
          <span className="text-xs text-gray-400 line-through">
            {currency === 'TND' ? '650 TND' : '195 EUR'}
          </span>
          <span className="font-mono text-3xl font-extrabold text-[#F3E5AB]">
            {currency === 'TND' ? '490 TND' : '148 EUR'}
          </span>
          <span className="text-xs text-[#D1D1D8]">/ personne</span>
        </div>

        <button
          type="button"
          onClick={onBookReveillon}
          className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-sm shadow-xl shadow-[#D4AF37]/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Réserver le Séjour Réveillon 2026</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
