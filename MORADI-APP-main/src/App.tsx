/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Crown,
  Smartphone,
  LayoutGrid,
  Globe,
  Sliders,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Plane,
  Ticket,
  MapPin,
} from 'lucide-react';
import { HeaderTopBar } from './components/HeaderTopBar';
import { BottomTabBar, TabDestination } from './components/BottomTabBar';
import { HotelCard } from './components/HotelCard';
import { ReveillonBanner } from './components/ReveillonBanner';
import { ReveillonView } from './components/ReveillonView';
import { TransferView } from './components/TransferView';
import { ReservationsView } from './components/ReservationsView';
import { BookingModal } from './components/BookingModal';
import { InteractiveHotelsMap } from './components/InteractiveHotelsMap';
import { UIKitShowcase } from './components/UIKitShowcase';
import { PagesCatalog } from './components/PagesCatalog';
import { HOTELS, REVEILLON_DATA, IMAGES } from './data/hotels';
import { Hotel, BookingPayload } from './types';

export default function App() {
  const [currency, setCurrency] = useState<'TND' | 'EUR'>('TND');
  const [activeTab, setActiveTab] = useState<TabDestination>('hotels');
  const [activeAppMode, setActiveAppMode] = useState<'app' | 'uikit'>('app');
  const [isFramedView, setIsFramedView] = useState<boolean>(true);
  const [catalogPageId, setCatalogPageId] = useState<number>(3); // Defaults to Home (Page 3)

  // Booking Modal State
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState<Hotel | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isReveillonBooking, setIsReveillonBooking] = useState<boolean>(false);
  const [selectedMapHotelId, setSelectedMapHotelId] = useState<string>('mouradi-palace');

  // Initial demo confirmed booking
  const [bookings, setBookings] = useState<BookingPayload[]>([
    {
      id: 'EM-890214',
      hotelId: 'mouradi-palace',
      hotelName: 'El Mouradi Palace',
      roomId: 'suite-royale-or',
      roomName: 'Suite Royale "Palais d’Or"',
      checkIn: '2025-12-30',
      checkOut: '2026-01-02',
      nights: 3,
      guests: 2,
      clientName: 'Karim Mansour',
      clientEmail: 'karim.mansour@gmail.com',
      clientPhone: '+216 98 440 221',
      airportTransfer: {
        enabled: true,
        airportCode: 'TUN',
        vehicleType: 'sedan',
        flightNumber: 'TU 721',
        arrivalDate: '2025-12-30',
        arrivalTime: '14:30',
        passengers: 2,
        luggageCount: 2,
        specialRequests: 'Pancarte VIP dorée au nom de Mansour',
        returnTransfer: true,
      },
      paymentMethod: 'cib_edahabia',
      promoCodeApplied: 'REVEILLON-GOLD',
      totalTND: 1470,
      totalEUR: 445,
      status: 'confirmed',
      bookingDate: '10/10/2025',
      qrCodeToken: 'ELMOURADI-GOLD-890214',
    },
  ]);

  const handleOpenBooking = (hotel: Hotel, withReveillon = false) => {
    setSelectedHotelForBooking(hotel);
    setIsReveillonBooking(withReveillon);
    setIsBookingModalOpen(true);
  };

  const handleOpenReveillonBooking = () => {
    setSelectedHotelForBooking(HOTELS[0]); // El Mouradi Palace
    setIsReveillonBooking(true);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking: BookingPayload) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleViewOnMap = (hotel: Hotel) => {
    setSelectedMapHotelId(hotel.id);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#E8E8EE] flex flex-col font-sans-app selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Universal Luxury Top Bar */}
      <HeaderTopBar
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'TND' ? 'EUR' : 'TND'))}
        activeAppMode={activeAppMode}
        onToggleAppMode={(mode) => {
          setActiveAppMode(mode);
          if (mode === 'uikit') setCatalogPageId(20);
        }}
        onOpenVIPClub={() => {
          setActiveAppMode('app');
          setActiveTab('bookings');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Sub-toolbar when in App mode: Device frame toggle & Quick 20 pages selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-2.5 rounded-2xl bg-[#111116] border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs text-[#E5C378] font-bold">
              EXPÉRIENCE MOBILE EL MOURADI
            </span>
            <span className="text-[10px] text-[#8E8E9A] hidden sm:inline">
              · Noir & Doré Impérial · 20 Écrans Interactifs
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Framed Phone Mockup vs Expanded */}
            <button
              type="button"
              onClick={() => setIsFramedView(!isFramedView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#191922] text-[#C5C5CE] hover:text-white border border-white/10 hover:border-[#D4AF37]/40 transition-colors"
            >
              {isFramedView ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Vue Écran Large</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Cadre Smartphone</span>
                </>
              )}
            </button>

            {/* Jump to 20-screen catalog */}
            <button
              type="button"
              onClick={() => {
                setActiveAppMode('uikit');
                setCatalogPageId(1);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] hover:bg-[#D4AF37]/25 font-medium transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Index des 20 Pages</span>
            </button>
          </div>
        </div>

        {/* View Mode: Interactive App vs 20-Page UI Kit Catalog */}
        {activeAppMode === 'app' ? (
          <div className="flex justify-center w-full">
            {/* Container: If isFramedView, wrap in iPhone-like chassis */}
            <div
              className={`w-full transition-all duration-300 ${
                isFramedView
                  ? 'max-w-[420px] rounded-[42px] border-[6px] border-[#22222B] shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[#0A0A0D] p-3 sm:p-4 relative overflow-hidden ring-1 ring-[#D4AF37]/30'
                  : 'max-w-4xl'
              }`}
            >
              {/* Smartphone Dynamic Island & Speaker Bar if framed */}
              {isFramedView && (
                <div className="w-28 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              )}

              {/* Mobile Tab Content */}
              <div className="relative">
                {activeTab === 'hotels' && (
                  <div className="space-y-6 pb-24">
                    {/* Grand Réveillon 2026 Promotional Banner */}
                    <ReveillonBanner
                      onBookReveillon={handleOpenReveillonBooking}
                      currency={currency}
                    />

                    {/* Quick Highlights Strip */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div
                        onClick={() => setActiveTab('map')}
                        className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-[#1C1A14] to-[#121216] border border-[#D4AF37]/50 cursor-pointer hover:border-[#D4AF37] transition-all flex items-center gap-2"
                      >
                        <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                          <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-[#F3E5AB] block truncate">Carte & Accès</span>
                          <span className="text-[9px] sm:text-[10px] text-[#8E8E9A] block truncate">5 Palais & Aéroports</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setActiveTab('transfer')}
                        className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-[#181820] to-[#121216] border border-white/10 cursor-pointer hover:border-[#D4AF37] transition-all flex items-center gap-2"
                      >
                        <div className="p-1.5 sm:p-2 rounded-xl bg-sky-500/15 text-sky-400 shrink-0">
                          <Plane className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-white block truncate">Navette VIP</span>
                          <span className="text-[9px] sm:text-[10px] text-[#8E8E9A] block truncate">Flotte Mercedes</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setActiveTab('reveillon')}
                        className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-[#1C1810] to-[#121216] border border-[#D4AF37]/40 cursor-pointer hover:border-[#D4AF37] transition-all flex items-center gap-2"
                      >
                        <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                          <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-[#F3E5AB] block truncate">Réveillon 2026</span>
                          <span className="text-[9px] sm:text-[10px] text-[#8E8E9A] block truncate">-25% Code GOLD</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Hotel Collection */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide">
                            Les Joyaux El Mouradi
                          </h3>
                          <p className="text-xs text-[#8E8E9A]">Palais 5 étoiles & Hôtels en bord de mer</p>
                        </div>
                        <span className="text-xs text-[#E5C378] font-mono">5 établissements</span>
                      </div>

                      <div className="space-y-4">
                        {HOTELS.map((hotel) => (
                          <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onBook={(h) => handleOpenBooking(h)}
                            currency={currency}
                            onViewOnMap={handleViewOnMap}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'map' && (
                  <InteractiveHotelsMap
                    currency={currency}
                    onBookHotel={(h) => handleOpenBooking(h)}
                    onNavigateToTransfer={(airportCode) => {
                      setActiveTab('transfer');
                    }}
                    initialSelectedHotelId={selectedMapHotelId}
                  />
                )}

                {activeTab === 'reveillon' && (
                  <ReveillonView
                    onBookReveillon={handleOpenReveillonBooking}
                    currency={currency}
                  />
                )}

                {activeTab === 'transfer' && (
                  <TransferView currency={currency} />
                )}

                {activeTab === 'bookings' && (
                  <ReservationsView
                    bookings={bookings}
                    onOpenBookingModal={() => handleOpenBooking(HOTELS[0])}
                    currency={currency}
                  />
                )}
              </div>

              {/* Bottom Sticky Tab Bar for Ergonomic Navigation */}
              <BottomTabBar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                bookingCount={bookings.length}
              />
            </div>
          </div>
        ) : (
          /* UI Kit Catalog & 20 Pages Inspector */
          <PagesCatalog
            currentPageId={catalogPageId}
            onSelectPage={setCatalogPageId}
            currency={currency}
            onBookHotel={(h) => handleOpenBooking(h)}
            onBookReveillon={handleOpenReveillonBooking}
          />
        )}
      </main>

      {/* Interactive Reservation Modal (Step-by-step with Airport shuttle & Payment methods) */}
      <BookingModal
        hotel={selectedHotelForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
        currency={currency}
        initialWithReveillon={isReveillonBooking}
      />
    </div>
  );
}
