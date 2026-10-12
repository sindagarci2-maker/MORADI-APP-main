import React, { useState } from 'react';
import {
  Crown,
  Sparkles,
  Plane,
  CreditCard,
  Ticket,
  Search,
  Key,
  ShieldCheck,
  Utensils,
  MapPin,
  Calendar,
  Clock,
  Car,
  ChevronLeft,
  ChevronRight,
  Layers,
  Check,
  QrCode,
  Download,
  Users,
  Smartphone,
  Luggage,
  Lock,
  Globe,
  Tag,
  Star,
} from 'lucide-react';
import { IMAGES, HOTELS, ROOMS, AIRPORTS, VEHICLE_OPTIONS, REVEILLON_DATA, PAYMENT_METHODS } from '../data/hotels';
import { ReveillonBanner } from './ReveillonBanner';
import { AirportShuttleWidget } from './AirportShuttleWidget';
import { PaymentSelector } from './PaymentSelector';
import { HotelCard } from './HotelCard';
import { InteractiveHotelsMap } from './InteractiveHotelsMap';
import { UIKitShowcase } from './UIKitShowcase';
import { Hotel, RoomOption, AirportTransferBooking, PaymentMethodId, BookingPayload } from '../types';

export interface PageDefinition {
  id: number;
  slug: string;
  title: string;
  category: 'Bienvenue & Découverte' | 'Sélection & Réservation' | 'Transport & Paiement' | 'Réveillon & Gala' | 'Fidélité & Services' | 'Kit UI Specs';
  description: string;
}

export const PAGES_LIST: PageDefinition[] = [
  { id: 1, slug: 'splash', title: '01. Splash & Écran d’Accueil Royal', category: 'Bienvenue & Découverte', description: 'Armoiries dorées El Mouradi, devise d’hospitalité et sélection de langue' },
  { id: 2, slug: 'onboarding', title: '02. Onboarding Privilège (3 Slides)', category: 'Bienvenue & Découverte', description: 'Présentation des palais côtiers, navettes aéroport et galas féeriques' },
  { id: 3, slug: 'home', title: '03. Accueil Principal & Bannière Réveillon', category: 'Bienvenue & Découverte', description: 'Bannière promotionnelle Réveillon 2026, recherche rapide et collection d’hôtels' },
  { id: 4, slug: 'search', title: '04. Cartographie & Recherche Avancée', category: 'Bienvenue & Découverte', description: 'Visualisation cartographique des hôtels El Mouradi par rapport aux aéroports et attractions touristiques' },
  { id: 5, slug: 'hotel-detail', title: '05. Fiche Hôtel d’Exception (Palace)', category: 'Sélection & Réservation', description: 'Palais El Mouradi Port El Kantaoui : photos réelles, commodités et distance aéroports' },
  { id: 6, slug: 'rooms-catalog', title: '06. Catalogue des Suites & Chambres', category: 'Sélection & Réservation', description: 'Suite Royale "Palais d’Or", vue mer panoramique, jacuzzi privatif et tarifs' },
  { id: 7, slug: 'booking-dates', title: '07. Réservation · Étape 1 : Dates & Invités', category: 'Sélection & Réservation', description: 'Sélecteur de calendrier, durée de séjour et nombre de voyageurs' },
  { id: 8, slug: 'booking-transfer', title: '08. Réservation · Étape 2 : Navette VIP', category: 'Transport & Paiement', description: 'Option transport aéroportuaire avec flotte Mercedes et chauffeur dédié' },
  { id: 9, slug: 'booking-guest', title: '09. Réservation · Étape 3 : Coordonnées VIP', category: 'Sélection & Réservation', description: 'Informations passager, heure d’atterrissage et demandes particulières' },
  { id: 10, slug: 'booking-payment', title: '10. Réservation · Étape 4 : Choix de Paiement', category: 'Transport & Paiement', description: 'CIB, Visa/Mastercard, Flouci, règlement à l’arrivée ou Apple Pay' },
  { id: 11, slug: 'booking-voucher', title: '11. Réservation · Étape 5 : Pass & QR Voucher', category: 'Transport & Paiement', description: 'Confirmation officielle, référence dossier, QR code et téléchargement PDF' },
  { id: 12, slug: 'reveillon-hub', title: '12. Hub Promo Réveillon 2026', category: 'Réveillon & Gala', description: 'Grand Réveillon d’Or : compte à rebours, -25% avec code REVEILLON-GOLD' },
  { id: 13, slug: 'reveillon-menu', title: '13. Menu Gastronomique 7 Services', category: 'Réveillon & Gala', description: 'Menu d’exception de la Saint-Sylvestre et spectacle musical symphonique' },
  { id: 14, slug: 'transfer-hub', title: '14. Espace Transport Aéroport Dédié', category: 'Transport & Paiement', description: 'Réservation autonome de transfert sans hôtel, tarification par trajet' },
  { id: 15, slug: 'transfer-tracking', title: '15. Suivi Chauffeur & Radar de Vol', category: 'Transport & Paiement', description: 'Chauffeur en direct, plaque d’immatriculation, hotline conciergerie VIP' },
  { id: 16, slug: 'vip-card', title: '16. Carte Fidélité "Mouradi Privilège"', category: 'Fidélité & Services', description: 'Carte noire et or embossée, solde de 14 850 pts, rang Ambassadeur VIP' },
  { id: 17, slug: 'my-bookings', title: '17. Mes Séjours & Vouchers Actifs', category: 'Fidélité & Services', description: 'Gestion des réservations, statut de la navette et check-in express' },
  { id: 18, slug: 'digital-key', title: '18. Clé Mobile de Suite Dématérialisée', category: 'Fidélité & Services', description: 'Ouverture sans contact Bluetooth de la porte de la suite royale' },
  { id: 19, slug: 'concierge-spa', title: '19. Conciergerie VIP & Thalasso Spa', category: 'Fidélité & Services', description: 'Réservation soins marins, hammam oriental et parcours golf 36 trous' },
  { id: 20, slug: 'uikit-specs', title: '20. Kit UI Noir & Doré (Design Tokens)', category: 'Kit UI Specs', description: 'Planche complète des tokens chromatiques, typographie et composants' },
];

interface PagesCatalogProps {
  currentPageId: number;
  onSelectPage: (id: number) => void;
  currency: 'TND' | 'EUR';
  onBookHotel: (hotel: Hotel) => void;
  onBookReveillon: () => void;
}

export const PagesCatalog: React.FC<PagesCatalogProps> = ({
  currentPageId,
  onSelectPage,
  currency,
  onBookHotel,
  onBookReveillon,
}) => {
  const currentPage = PAGES_LIST.find((p) => p.id === currentPageId) || PAGES_LIST[0];

  // Airport transfer local state for interactive testing
  const [testTransfer, setTestTransfer] = useState<AirportTransferBooking>({
    enabled: true,
    airportCode: 'TUN',
    vehicleType: 'sedan',
    flightNumber: 'TU 721',
    arrivalDate: '2025-12-30',
    arrivalTime: '14:30',
    passengers: 2,
    luggageCount: 2,
    specialRequests: 'Pancarte VIP dorée',
    returnTransfer: true,
  });

  const [testPaymentMethod, setTestPaymentMethod] = useState<PaymentMethodId>('cib_edahabia');
  const [activeOnboardingSlide, setActiveOnboardingSlide] = useState(0);
  const [activeSearchCity, setActiveSearchCity] = useState('Tous');

  // Render content of specific page
  const renderScreen = () => {
    switch (currentPageId) {
      // PAGE 1: SPLASH & ROYAL WELCOME
      case 1:
        return (
          <div className="relative min-h-[580px] rounded-3xl overflow-hidden border border-[#D4AF37]/40 bg-gradient-to-b from-[#16161D] via-[#0E0E12] to-[#08080A] p-6 flex flex-col justify-between text-center text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent pointer-events-none" />

            {/* Top Language Switcher */}
            <div className="relative z-10 flex justify-between items-center text-xs text-[#8E8E9A]">
              <span className="font-mono text-[11px] text-[#D4AF37]">VERSION MOBILE 4.2</span>
              <div className="flex gap-2">
                <span className="text-[#F3E5AB] font-bold">FR</span>
                <span>·</span>
                <span className="hover:text-white cursor-pointer">EN</span>
                <span>·</span>
                <span className="hover:text-white cursor-pointer font-sans">العربية</span>
              </div>
            </div>

            {/* Central Crest & Welcome */}
            <div className="relative z-10 my-auto py-8">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gold-gradient p-[1px] shadow-2xl shadow-[#D4AF37]/30 mb-5">
                <div className="w-full h-full bg-[#0E0E12] rounded-[15px] flex items-center justify-center">
                  <Crown className="w-10 h-10 text-[#D4AF37]" />
                </div>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-widest text-white">
                EL MOURADI
              </h1>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#E5C378] font-semibold mt-1">
                HÔTELS & RESORTS DE LUXE
              </p>
              <div className="w-12 h-0.5 bg-gold-gradient mx-auto my-4" />
              <p className="text-xs text-[#B5B5BE] max-w-xs mx-auto leading-relaxed italic">
                « L'hospitalité souveraine au bord de la Méditerranée et aux portes du Sahara »
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 space-y-2.5">
              <button
                type="button"
                onClick={() => onSelectPage(3)}
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs sm:text-sm shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Entrer dans l'Expérience El Mouradi
              </button>
              <button
                type="button"
                onClick={() => onSelectPage(2)}
                className="w-full py-2.5 rounded-xl bg-transparent border border-white/15 text-xs text-[#A6A6B2] hover:text-white hover:border-[#D4AF37] transition-colors"
              >
                Découvrir nos Privilèges (Onboarding)
              </button>
            </div>
          </div>
        );

      // PAGE 2: ONBOARDING PRIVILÈGE
      case 2:
        const slides = [
          {
            title: 'Palais Côtiers & Résidences Royales',
            desc: 'Découvrez les plus beaux resorts de Tunisie : Port El Kantaoui, Carthage, Djerba et Hammamet avec plages privées et thalasso.',
            img: IMAGES.heroPalace,
          },
          {
            title: 'Transferts VIP & Chauffeur Privé',
            desc: 'Prise en charge personnalisée dès votre sortie d’avion à Tunis-Carthage, Enfidha ou Monastir en berline Mercedes.',
            img: IMAGES.airportTransfer,
          },
          {
            title: 'Grand Réveillon 2026 de Prestige',
            desc: 'Célébrez la Saint-Sylvestre avec un dîner de gala 7 services, orchestre symphonique et champagne millésimé.',
            img: IMAGES.reveillonGala,
          },
        ];
        const currentSlide = slides[activeOnboardingSlide];
        return (
          <div className="relative min-h-[580px] rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#0E0E12] flex flex-col justify-between text-white">
            <div className="relative h-72 w-full overflow-hidden">
              <img
                src={currentSlide.img}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover brightness-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-black/30" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 mb-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveOnboardingSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeOnboardingSlide === i ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <h2 className="font-cinzel text-xl font-bold text-white mb-2">
                  {currentSlide.title}
                </h2>
                <p className="text-xs text-[#A6A6B2] leading-relaxed">
                  {currentSlide.desc}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => onSelectPage(3)}
                  className="text-xs text-[#8E8E9A] hover:text-white"
                >
                  Passer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (activeOnboardingSlide < slides.length - 1) {
                      setActiveOnboardingSlide((s) => s + 1);
                    } else {
                      onSelectPage(3);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs shadow-md"
                >
                  {activeOnboardingSlide < slides.length - 1 ? 'Suivant' : 'Commencer'}
                </button>
              </div>
            </div>
          </div>
        );

      // PAGE 3: ACCUEIL & BANNIÈRE RÉVEILLON (HOME SCREEN)
      case 3:
        return (
          <div className="space-y-5 pb-6">
            {/* Promotional Banner for Réveillon */}
            <ReveillonBanner
              onBookReveillon={onBookReveillon}
              currency={currency}
            />

            {/* Quick Destination Search Strip */}
            <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Recherche Rapide de Séjour
                </span>
                <button
                  type="button"
                  onClick={() => onSelectPage(4)}
                  className="text-[11px] text-[#E5C378] hover:underline"
                >
                  Tous les filtres
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#18181E] border border-white/10">
                  <span className="text-[10px] text-[#7E7E8A] block">Destination</span>
                  <span className="text-white font-medium">Port El Kantaoui</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#18181E] border border-white/10">
                  <span className="text-[10px] text-[#7E7E8A] block">Dates</span>
                  <span className="text-white font-medium">31 Déc - 02 Jan</span>
                </div>
              </div>
            </div>

            {/* Featured Luxury Hotels */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                  <span>Palais & Établissements d'Exception</span>
                </h3>
                <span className="text-xs text-[#8E8E9A]">5 étoiles</span>
              </div>

              <div className="space-y-4">
                {HOTELS.slice(0, 2).map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onBook={onBookHotel}
                    currency={currency}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      // PAGE 4: CARTOGRAPHIE, RECHERCHE & FILTRES AVANCÉS
      case 4:
        return (
          <div className="space-y-4 pb-6">
            <InteractiveHotelsMap
              currency={currency}
              onBookHotel={onBookHotel}
              onNavigateToTransfer={() => onSelectPage(14)}
            />
          </div>
        );

      // PAGE 5: FICHE HÔTEL D'EXCEPTION
      case 5:
        const featuredHotel = HOTELS[0];
        return (
          <div className="space-y-4 pb-6 text-white">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl h-64">
              <img
                src={featuredHotel.imageUrl}
                alt={featuredHotel.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-black/40" />

              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                  <span className="text-white text-xs font-bold ml-1">4.9 / 5</span>
                </div>
                <h2 className="font-cinzel text-xl font-bold text-white">{featuredHotel.name}</h2>
                <p className="text-xs text-[#E5C378]">{featuredHotel.location}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#121216] border border-white/10 space-y-3 text-xs">
              <p className="text-[#C5C5CE] leading-relaxed">{featuredHotel.description}</p>
              <div className="p-3 rounded-xl bg-[#181820] border border-[#D4AF37]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="font-semibold text-white block">Accès Aéroport Express</span>
                    <span className="text-[11px] text-[#8E8E9A]">À 28 km d'Enfidha (NBE) & 30 km de Monastir (MIR)</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Chauffeur Privé</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookHotel(featuredHotel)}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs sm:text-sm shadow-xl"
            >
              Sélectionner une Suite & Réserver
            </button>
          </div>
        );

      // PAGE 6: CATALOGUE DES SUITES & CHAMBRES
      case 6:
        return (
          <div className="space-y-4 pb-6 text-white">
            <h3 className="font-cinzel text-base font-bold text-white">Suites & Chambres Royales</h3>
            <div className="space-y-4">
              {ROOMS.map((room) => (
                <div key={room.id} className="rounded-2xl border border-white/10 bg-[#121217] overflow-hidden">
                  <div className="h-40 w-full overflow-hidden relative">
                    <img src={room.imageUrl} alt={room.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-[#F3E5AB]">
                      {room.sizeM2} m²
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-white">{room.name}</h4>
                        <span className="text-xs text-[#8E8E9A]">{room.capacity}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-[#F3E5AB]">
                          {currency === 'TND' ? room.pricePerNightTND : room.pricePerNightEUR} {currency}
                        </span>
                        <span className="text-[10px] text-[#7E7E8A] block">/ nuit</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {room.amenities.map((a, i) => (
                        <span key={i} className="text-[10px] bg-[#1A1A22] text-[#B5B5BE] px-2 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // PAGE 7: RÉSERVATION ÉTAPE 1 (DATES)
      case 7:
        return (
          <div className="p-5 rounded-2xl bg-[#121216] border border-white/10 space-y-4 text-white">
            <h3 className="font-cinzel text-base font-bold">Étape 1 : Dates & Voyageurs</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A6A6B2] mb-1">Période du séjour</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" defaultValue="2025-12-30" className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white" />
                  <input type="date" defaultValue="2026-01-02" className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-[#A6A6B2] mb-1">Nombre d'adultes & enfants</label>
                <select className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white">
                  <option>2 Adultes (Suite Royale)</option>
                  <option>2 Adultes + 1 Enfant</option>
                  <option>Famille (4 personnes)</option>
                </select>
              </div>
            </div>
            <button onClick={() => onSelectPage(8)} className="w-full py-3 rounded-xl bg-gold-gradient text-black font-semibold text-xs">
              Continuer vers l'Option Navette Aéroport VIP →
            </button>
          </div>
        );

      // PAGE 8: RÉSERVATION ÉTAPE 2 (OPTION TRANSPORT AÉROPORT)
      case 8:
        return (
          <div className="space-y-4 pb-6">
            <AirportShuttleWidget
              value={testTransfer}
              onChange={setTestTransfer}
              currency={currency}
            />
            <button onClick={() => onSelectPage(9)} className="w-full py-3 rounded-xl bg-gold-gradient text-black font-semibold text-xs">
              Continuer vers les Coordonnées Client →
            </button>
          </div>
        );

      // PAGE 9: RÉSERVATION ÉTAPE 3 (COORDONNÉES CLIENT)
      case 9:
        return (
          <div className="p-5 rounded-2xl bg-[#121216] border border-white/10 space-y-4 text-white text-xs">
            <h3 className="font-cinzel text-base font-bold">Étape 3 : Coordonnées du Voyageur</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[#A6A6B2] mb-1">Nom & Prénom</label>
                <input type="text" defaultValue="Karim Mansour" className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#A6A6B2] mb-1">Email</label>
                  <input type="email" defaultValue="karim.mansour@gmail.com" className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-[#A6A6B2] mb-1">Téléphone</label>
                  <input type="tel" defaultValue="+216 98 440 221" className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white" />
                </div>
              </div>
            </div>
            <button onClick={() => onSelectPage(10)} className="w-full py-3 rounded-xl bg-gold-gradient text-black font-semibold text-xs">
              Continuer vers les Choix de Paiement →
            </button>
          </div>
        );

      // PAGE 10: RÉSERVATION ÉTAPE 4 (CHOIX DE PAIEMENT)
      case 10:
        return (
          <div className="space-y-4 pb-6">
            <PaymentSelector
              selectedMethod={testPaymentMethod}
              onSelectMethod={setTestPaymentMethod}
              currency={currency}
              amount={currency === 'TND' ? 1470 : 445}
            />
            <button onClick={() => onSelectPage(11)} className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs sm:text-sm shadow-xl">
              Confirmer la Réservation & Obtenir le Pass VIP →
            </button>
          </div>
        );

      // PAGE 11: RÉSERVATION ÉTAPE 5 (VOUCHER & PASS VIP)
      case 11:
        return (
          <div className="p-5 rounded-2xl bg-[#121217] border border-[#D4AF37]/50 space-y-4 text-white text-center">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-cinzel text-lg font-bold">Séjour El Mouradi Confirmé</h3>
            <div className="p-4 rounded-xl bg-[#171720] border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8E8E9A]">RÉFÉRENCE</span>
                <span className="font-mono text-[#D4AF37]">EM-890214</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8E9A]">ÉTABLISSEMENT</span>
                <span className="text-white font-semibold">El Mouradi Palace (Port El Kantaoui)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8E9A]">NAVETTE AÉROPORT</span>
                <span className="text-emerald-400 font-semibold">Mercedes Classe E (TUN)</span>
              </div>
              <div className="pt-2 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-[#F3E5AB]" />
              </div>
            </div>
          </div>
        );

      // PAGE 12: HUB RÉVEILLON 2026
      case 12:
        return <ReveillonBanner onBookReveillon={onBookReveillon} currency={currency} />;

      // PAGE 13: MENU GALA RÉVEILLON
      case 13:
        return (
          <div className="p-5 rounded-2xl bg-[#121217] border border-[#D4AF37]/40 space-y-4 text-white text-xs">
            <h3 className="font-cinzel text-base font-bold text-[#F3E5AB]">Menu de Gala de la Saint-Sylvestre</h3>
            <p className="text-[#8E8E9A]">7 services raffinés accompagnés d'accords mets et vins d'exception.</p>
            <div className="space-y-3 border-t border-white/10 pt-3">
              <div>
                <span className="text-[#D4AF37] font-mono">SERVICE 1 · ENTRÉE ROYALE</span>
                <p className="text-white font-medium">Foie gras poêlé & chutney de figues de Djebba</p>
              </div>
              <div>
                <span className="text-[#D4AF37] font-mono">SERVICE 2 · TRÉSOR DE LA MER</span>
                <p className="text-white font-medium">Loup sauvage de Méditerranée rôti au safran</p>
              </div>
              <div>
                <span className="text-[#D4AF37] font-mono">SERVICE 3 · LA PIÈCE MAÎTRESSE</span>
                <p className="text-white font-medium">Filet de bœuf Rossini aux truffes noires</p>
              </div>
              <div>
                <span className="text-[#D4AF37] font-mono">SERVICE 4 · DESSERT DE MINUIT</span>
                <p className="text-white font-medium">Lingot chocolat grand cru et feuille d'or 24 carats</p>
              </div>
            </div>
          </div>
        );

      // PAGE 14: ESPACE NAVETTE AÉROPORT DÉDIÉ
      case 14:
        return (
          <div className="p-5 rounded-2xl bg-[#121217] border border-white/10 space-y-4 text-white">
            <h3 className="font-cinzel text-base font-bold">Transport Aéroportuaire Dédié</h3>
            <div className="relative h-44 rounded-xl overflow-hidden border border-[#D4AF37]/30">
              <img src={IMAGES.airportTransfer} alt="Flotte VIP" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#181820] border border-white/10">
                <span className="text-white font-semibold block">Berline Mercedes</span>
                <span className="text-[#F3E5AB] font-mono">95 TND (~29 €)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#181820] border border-white/10">
                <span className="text-white font-semibold block">Van VIP Famille</span>
                <span className="text-[#F3E5AB] font-mono">150 TND (~45 €)</span>
              </div>
            </div>
          </div>
        );

      // PAGE 15: SUIVI CHAUFFEUR & RADAR VOL
      case 15:
        return (
          <div className="p-5 rounded-2xl bg-[#121217] border border-white/10 space-y-4 text-white text-xs">
            <h3 className="font-cinzel text-base font-bold flex items-center gap-2">
              <Car className="w-4 h-4 text-[#D4AF37]" />
              <span>Suivi Chauffeur VIP en Direct</span>
            </h3>
            <div className="p-4 rounded-xl bg-[#181822] border border-[#D4AF37]/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Mohamed K. (Chauffeur Officiel)</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">En approche</span>
              </div>
              <p className="text-[#8E8E9A]">Mercedes Classe E Noire · 214-TUN-8902</p>
              <div className="text-[11px] text-[#F3E5AB] font-mono pt-1">Vol TU 721 · Atterrissage prévu 14h25</div>
            </div>
          </div>
        );

      // PAGE 16: CARTE DE FIDÉLITÉ MOURADI PRIVILÈGE
      case 16:
        return (
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-[#16161D] via-[#101014] to-[#2B2312] border border-[#D4AF37] space-y-4 text-white">
            <div className="flex justify-between items-center">
              <span className="font-cinzel font-bold text-sm text-[#F3E5AB]">EL MOURADI PRIVILÈGE</span>
              <span className="bg-gold-gradient text-black font-bold text-[10px] px-2.5 py-0.5 rounded-full">AMBASSADEUR</span>
            </div>
            <div className="pt-4">
              <div className="text-[10px] text-[#8E8E9A]">SOLDE POINTS OR</div>
              <div className="font-mono text-2xl font-bold text-[#F3E5AB]">14 850 PTS</div>
            </div>
            <div className="text-xs text-[#B5B5BE]">Avantages : Navettes aéroport offertes, surclassement en suite, départ tardif 16h00.</div>
          </div>
        );

      // PAGE 17: MES RÉSERVATIONS & HISTORIQUE
      case 17:
        return (
          <div className="space-y-3 pb-6 text-white text-xs">
            <h3 className="font-cinzel text-base font-bold">Séjours Enregistrés</h3>
            <div className="p-4 rounded-2xl bg-[#141419] border border-white/10 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>El Mouradi Palace (3 nuits)</span>
                <span className="text-emerald-400">Confirmé</span>
              </div>
              <p className="text-[#8E8E9A]">Du 30 Déc 2025 au 02 Jan 2026 · Suite Royale Palais d'Or</p>
              <div className="text-[#D4AF37] font-mono">Option navette aéroport incluse</div>
            </div>
          </div>
        );

      // PAGE 18: CLÉ NUMÉRIQUE DE CHAMBRE
      case 18:
        return (
          <div className="p-6 rounded-3xl bg-[#121217] border border-[#D4AF37]/50 text-center space-y-4 text-white">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-lg font-bold">Clé Mobile Dématérialisée</h3>
            <p className="text-xs text-[#8E8E9A]">Approchez votre smartphone de la serrure de la Suite 402 pour déverrouiller.</p>
            <div className="p-3 bg-[#1A1A22] rounded-xl text-xs font-mono text-[#F3E5AB]">
              BLUETOOTH CONNECTÉ · SUITE 402
            </div>
          </div>
        );

      // PAGE 19: CONCIERGERIE & THALASSO SPA
      case 19:
        return (
          <div className="p-5 rounded-2xl bg-[#121217] border border-white/10 space-y-4 text-white text-xs">
            <h3 className="font-cinzel text-base font-bold">Conciergerie & Soins Thalasso</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#181820] border border-white/5 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-white">Cure Thalasso "L'Élixir d'Or" (80 min)</div>
                  <div className="text-[#8E8E9A]">Bain marin bouillonnant & massage oriental</div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-gold-gradient text-black font-semibold text-xs">Réserver</button>
              </div>
              <div className="p-3 rounded-xl bg-[#181820] border border-white/5 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-white">Green Fee Golf Port El Kantaoui</div>
                  <div className="text-[#8E8E9A]">Parcours 18 trous Panorama & Sea Course</div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-gold-gradient text-black font-semibold text-xs">Réserver</button>
              </div>
            </div>
          </div>
        );

      // PAGE 20: SPÉCIFICATIONS UI KIT NOIR & DORÉ
      case 20:
      default:
        return <UIKitShowcase />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 20-Page Visual Selector Bar */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#121218] p-4 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                Kit UI 20 Écrans · Hôtels El Mouradi
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40">
                Page {currentPage.id} / 20
              </span>
            </div>
            <p className="text-xs text-[#8E8E9A] mt-0.5">
              {currentPage.title} · <span className="text-[#C5A059]">{currentPage.category}</span>
            </p>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPageId <= 1}
              onClick={() => onSelectPage(Math.max(1, currentPageId - 1))}
              className="p-2 rounded-xl bg-[#1A1A22] border border-white/10 hover:border-[#D4AF37] disabled:opacity-30 disabled:hover:border-white/10 text-white transition-colors"
              title="Page précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#F3E5AB] px-1">
              {currentPageId} / 20
            </span>
            <button
              type="button"
              disabled={currentPageId >= 20}
              onClick={() => onSelectPage(Math.min(20, currentPageId + 1))}
              className="p-2 rounded-xl bg-[#1A1A22] border border-white/10 hover:border-[#D4AF37] disabled:opacity-30 disabled:hover:border-white/10 text-white transition-colors"
              title="Page suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 20 Numerical Pill Matrix */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PAGES_LIST.map((p) => {
            const isSelected = p.id === currentPageId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPage(p.id)}
                className={`h-7 px-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-gold-gradient text-black font-bold shadow-md shadow-[#D4AF37]/30 scale-105'
                    : 'bg-[#181820] text-[#9E9EA8] hover:text-white hover:bg-[#22222C] border border-white/5'
                }`}
                title={`${p.title}: ${p.description}`}
              >
                {String(p.id).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen Container */}
      <div className="relative">
        {renderScreen()}
      </div>
    </div>
  );
};
