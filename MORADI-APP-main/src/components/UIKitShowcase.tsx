import React, { useState } from 'react';
import {
  Palette,
  Type,
  MousePointer,
  CreditCard,
  Plane,
  Sparkles,
  Check,
  Copy,
  Layers,
  Shield,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { IMAGES } from '../data/hotels';

export const UIKitShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const colors = [
    { name: 'Onyx Profond (Canvas)', hex: '#08080A', usage: 'Fond d’écran principal de l’application' },
    { name: 'Noir Carbone (Surface)', hex: '#121216', usage: 'Conteneurs de cartes & modules de contenu' },
    { name: 'Noir Obsidienne (Elevated)', hex: '#1A1A22', usage: 'Modals, survols, champs d’input actifs' },
    { name: 'Or Impérial (Primary Gold)', hex: '#D4AF37', usage: 'Boutons d’action primaire, accents royaux' },
    { name: 'Or Champagne (Highlight)', hex: '#F3E5AB', usage: 'Titres clés, typographies d’emphase, badges' },
    { name: 'Or Ambré (Border Glow)', hex: '#AA7C11', usage: 'Ombres portées métalliques, reflets dorés' },
    { name: 'Blanc Ivoire (Text High)', hex: '#FBF7EE', usage: 'Texte principal de haute lisibilité' },
    { name: 'Gris Platine (Text Muted)', hex: '#9E9EA8', usage: 'Métadonnées discrètes, sous-titres, séparateurs' },
  ];

  return (
    <div className="space-y-8 pb-28 text-white max-w-5xl mx-auto">
      {/* Introduction Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#17171E] via-[#101014] to-[#1F190D] border border-[#D4AF37]/50 shadow-2xl">
        <div className="flex items-center gap-2 text-xs text-[#E5C378] uppercase font-mono tracking-widest mb-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Charte Graphique Officielle · Hôtels El Mouradi</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Kit UI Mobile Noir & Doré · Design System
        </h2>
        <p className="text-xs sm:text-sm text-[#C5C5CE] mt-2 max-w-2xl leading-relaxed">
          Bibliothèque de composants et tokens de design conçus pour l’expérience mobile des palais El Mouradi.
          Alliant le prestige de la haute hospitalité tunisienne (armoiries or) à l’ergonomie tactile d’avant-garde.
        </p>
      </div>

      {/* 1. Palette Chromatique Or & Noir */}
      <div className="rounded-3xl border border-white/10 bg-[#101014] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#E5C378]">
          <Palette className="w-4 h-4 text-[#D4AF37]" />
          <span>01. Palette Chromatique Noir & Doré (60-30-10 Rule)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {colors.map((c) => (
            <div
              key={c.hex}
              onClick={() => copyColor(c.hex)}
              className="p-3 rounded-2xl bg-[#16161C] border border-white/5 hover:border-[#D4AF37]/50 cursor-pointer transition-all group"
            >
              <div
                className="h-16 w-full rounded-xl mb-2.5 border border-white/10 flex items-end justify-end p-1.5"
                style={{ backgroundColor: c.hex }}
              >
                {copiedHex === c.hex ? (
                  <span className="bg-black/80 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                    <Check className="w-3 h-3" /> Copié
                  </span>
                ) : (
                  <Copy className="w-3 h-3 text-white/50 group-hover:text-white transition-colors" />
                )}
              </div>
              <div className="font-semibold text-xs text-white truncate">{c.name}</div>
              <div className="font-mono text-[11px] text-[#D4AF37]">{c.hex}</div>
              <div className="text-[10px] text-[#80808A] truncate mt-0.5">{c.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Typographie d'Exception */}
      <div className="rounded-3xl border border-white/10 bg-[#101014] p-6 space-y-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#E5C378]">
          <Type className="w-4 h-4 text-[#D4AF37]" />
          <span>02. Typographie Hiérarchique (Cinzel Serif & Plus Jakarta Sans)</span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#15151A] border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-wider">
              Display / Titres de Prestige · Font: Cinzel (Serif Royal)
            </span>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              PALACE PORT EL KANTAOUI · SUITE ROYALE
            </div>
            <p className="text-xs text-[#8E8E9A]">
              Utilisé pour les noms d’établissements, titres de gala du réveillon et armoiries.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#15151A] border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-wider">
              Body & Navigation · Font: Plus Jakarta Sans (Touch Ergonomic)
            </span>
            <div className="text-base text-[#FBF7EE] font-medium leading-relaxed">
              Hospitalité tunisienne 5 étoiles, navette avec chauffeur privé Mercedes et paiement sécurisé.
            </div>
            <p className="text-xs text-[#8E8E9A]">
              Optimisé pour la lisibilité mobile en plein soleil, haute clarté des contrastes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#15151A] border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-wider">
              Chiffres & Tarifs · Tabular Numerals
            </span>
            <div className="font-mono text-2xl font-bold text-[#F3E5AB] tabular-nums">
              490 TND · 148 EUR · 214-TUN-8902 · VOL TU 721
            </div>
          </div>
        </div>
      </div>

      {/* 3. Système de Boutons Tactiles (Minimum 44px) */}
      <div className="rounded-3xl border border-white/10 bg-[#101014] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#E5C378]">
          <MousePointer className="w-4 h-4 text-[#D4AF37]" />
          <span>03. Système de Boutons Tactiles & Micro-Interactions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Primary Gold */}
          <div className="p-4 rounded-2xl bg-[#16161B] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-[#A0A0AB]">Bouton Primaire Or (Gala & Réservation)</span>
            <button className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.98] transition-all">
              Confirmer la Réservation
            </button>
          </div>

          {/* Secondary Outline */}
          <div className="p-4 rounded-2xl bg-[#16161B] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-[#A0A0AB]">Bouton Contour Doré</span>
            <button className="w-full py-3 rounded-xl bg-transparent border border-[#D4AF37] text-[#E5C378] font-semibold text-xs hover:bg-[#D4AF37]/10 transition-all">
              Option Navette Aéroport
            </button>
          </div>

          {/* Dark Elevated */}
          <div className="p-4 rounded-2xl bg-[#16161B] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-[#A0A0AB]">Bouton Tertiaire / Ghost</span>
            <button className="w-full py-3 rounded-xl bg-[#202028] border border-white/10 text-white font-medium text-xs hover:border-white/30 transition-all">
              Détails du Séjour
            </button>
          </div>
        </div>
      </div>

      {/* 4. Formulaires de Saisie & Sélecteurs */}
      <div className="rounded-3xl border border-white/10 bg-[#101014] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#E5C378]">
          <Sliders className="w-4 h-4 text-[#D4AF37]" />
          <span>04. Formulaires de Saisie & Sélecteurs Luxueux</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#A6A6B2] mb-1 font-medium">Champ Texte avec Focus Doré</label>
            <input
              type="text"
              defaultValue="El Mouradi Palace - Port El Kantaoui"
              className="w-full bg-[#18181E] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] shadow-inner"
            />
          </div>

          <div>
            <label className="block text-[#A6A6B2] mb-1 font-medium">Sélecteur Déroulant Stylisé</label>
            <select className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]">
              <option>Berline Prestige Mercedes (Classe E/S)</option>
              <option>Van VIP Privilège Mercedes (Classe V)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Sélecteur de Paiement Multi-Options */}
      <div className="rounded-3xl border border-white/10 bg-[#101014] p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#E5C378]">
          <CreditCard className="w-4 h-4 text-[#D4AF37]" />
          <span>05. Sélecteur de Moyens de Paiement (Spécifications UI)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#16161B] border border-[#D4AF37] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-[#D4AF37]" />
              <div>
                <span className="font-semibold text-white block">Carte CIB / Edahabia</span>
                <span className="text-[10px] text-[#8E8E9A]">Monétique Tunisie · 3D-Secure</span>
              </div>
            </div>
            <span className="w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Check className="w-3 h-3 text-black stroke-[3]" />
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#16161B] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#E5C378]" />
              <div>
                <span className="font-semibold text-white block">Paiement à l'arrivée</span>
                <span className="text-[10px] text-[#8E8E9A]">Règlement au lobby à la réception</span>
              </div>
            </div>
            <span className="w-4 h-4 rounded-full border border-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
