import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Plane,
  CreditCard,
  QrCode,
  Download,
  ShieldCheck,
  Tag,
  Building,
} from 'lucide-react';
import { Hotel, RoomOption, AirportTransferBooking, PaymentMethodId, BookingPayload } from '../types';
import { ROOMS, REVEILLON_DATA, VEHICLE_OPTIONS } from '../data/hotels';
import { AirportShuttleWidget } from './AirportShuttleWidget';
import { PaymentSelector } from './PaymentSelector';

interface BookingModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: BookingPayload) => void;
  currency: 'TND' | 'EUR';
  initialWithReveillon?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  hotel,
  isOpen,
  onClose,
  onBookingSuccess,
  currency,
  initialWithReveillon = false,
}) => {
  if (!isOpen || !hotel) return null;

  const [step, setStep] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>('2025-12-30');
  const [checkOut, setCheckOut] = useState<string>('2026-01-02');
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(ROOMS[0].id);

  // Airport transfer
  const [airportTransfer, setAirportTransfer] = useState<AirportTransferBooking>({
    enabled: initialWithReveillon ? true : false,
    airportCode: 'TUN',
    vehicleType: 'sedan',
    flightNumber: 'TU 721',
    arrivalDate: '2025-12-30',
    arrivalTime: '14:30',
    passengers: 2,
    luggageCount: 2,
    specialRequests: 'Pancarte VIP dorée au nom de la famille',
    returnTransfer: true,
  });

  // Client info
  const [clientName, setClientName] = useState<string>('Karim Mansour');
  const [clientEmail, setClientEmail] = useState<string>('karim.mansour@gmail.com');
  const [clientPhone, setClientPhone] = useState<string>('+216 98 440 221');

  // Promo & Payment
  const [promoCode, setPromoCode] = useState<string>(initialWithReveillon ? REVEILLON_DATA.promoCode : '');
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(initialWithReveillon);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    initialWithReveillon ? { type: 'success', text: 'Code REVEILLON-GOLD activé (-25% de remise)' } : null
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('cib_edahabia');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);

  // Calculations
  const selectedRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];
  const roomPrice = currency === 'TND' ? selectedRoom.pricePerNightTND : selectedRoom.pricePerNightEUR;
  const nights = 3; // 30 dec to 02 jan = 3 nights

  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === airportTransfer.vehicleType) || VEHICLE_OPTIONS[0];
  const vehPricePerWay = currency === 'TND' ? selectedVehicle.priceTND : selectedVehicle.priceEUR;
  const shuttleCost = airportTransfer.enabled
    ? airportTransfer.returnTransfer
      ? vehPricePerWay * 2
      : vehPricePerWay
    : 0;

  const subtotal = roomPrice * nights + shuttleCost;
  const discountRate = isPromoApplied ? REVEILLON_DATA.discountPercentage / 100 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === REVEILLON_DATA.promoCode) {
      setIsPromoApplied(true);
      setPromoMessage({ type: 'success', text: 'Code REVEILLON-GOLD validé ! Remise de -25% appliquée.' });
    } else {
      setIsPromoApplied(false);
      setPromoMessage({ type: 'error', text: 'Code invalide. Essayez le code officiel : REVEILLON-GOLD' });
    }
  };

  const handleConfirmReservation = () => {
    const payload: BookingPayload = {
      id: `EM-${Math.floor(100000 + Math.random() * 900000)}`,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guests,
      clientName,
      clientEmail,
      clientPhone,
      airportTransfer,
      paymentMethod,
      promoCodeApplied: isPromoApplied ? promoCode : undefined,
      totalTND: currency === 'TND' ? finalTotal : Math.round(finalTotal * 3.3),
      totalEUR: currency === 'EUR' ? finalTotal : Math.round(finalTotal / 3.3),
      status: 'confirmed',
      bookingDate: new Date().toLocaleDateString('fr-FR'),
      qrCodeToken: `ELMOURADI-VIP-${Date.now()}`,
    };

    setConfirmedBooking(payload);
    onBookingSuccess(payload);
    setStep(4); // Move to confirmation voucher
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-[#D4AF37]/40 bg-[#0E0E12] text-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#141419]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                {confirmedBooking ? 'Réservation Confirmée' : `Réservation · ${hotel.name}`}
              </h3>
              <p className="text-[11px] text-[#9E9EA8]">{hotel.city}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (if not completed) */}
        {!confirmedBooking && (
          <div className="flex items-center justify-between px-6 py-2.5 bg-[#101015] border-b border-white/5 text-xs">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#D4AF37] font-semibold' : 'text-gray-400'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
              <span>Séjour</span>
            </div>
            <div className="w-6 h-px bg-white/10" />
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#D4AF37] font-semibold' : 'text-gray-400'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
              <span>Navette</span>
            </div>
            <div className="w-6 h-px bg-white/10" />
            <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#D4AF37] font-semibold' : 'text-gray-400'}`}>
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
              <span>Paiement</span>
            </div>
          </div>
        )}

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: DATES & ROOM */}
          {step === 1 && !confirmedBooking && (
            <div className="space-y-4">
              {/* Promo Réveillon Callout if active */}
              {isPromoApplied && (
                <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div className="text-xs">
                    <span className="font-semibold text-[#F3E5AB] block">Offre Privilège Réveillon 2026 Appliquée</span>
                    <span className="text-[#D1D1D8]">Remise de 25% et priorité pour la table de Gala de la Saint-Sylvestre.</span>
                  </div>
                </div>
              )}

              {/* Dates & Travelers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#A0A0AA] mb-1">Arrivée (Check-in)</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#16161B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#A0A0AA] mb-1">Départ (Check-out)</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#16161B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <label className="block text-xs font-semibold text-white mb-2">Sélectionnez votre Hébergement</label>
                <div className="space-y-2.5">
                  {ROOMS.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    const rPrice = currency === 'TND' ? room.pricePerNightTND : room.pricePerNightEUR;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg ring-1 ring-[#D4AF37]/40'
                            : 'border-white/10 bg-[#15151A] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs sm:text-sm text-white">{room.name}</span>
                              {room.seaView && (
                                <span className="text-[10px] text-[#E5C378] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                                  Vue Mer
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#8E8E9A] mt-0.5">
                              {room.sizeM2} m² · {room.capacity}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {room.amenities.slice(0, 2).map((a, i) => (
                                <span key={i} className="text-[10px] text-[#A6A6B2] bg-[#1E1E26] px-2 py-0.5 rounded">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-base font-bold text-[#F3E5AB]">
                              {rPrice} {currency}
                            </span>
                            <span className="text-[10px] text-[#7E7E8A] block">/ nuit</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AIRPORT SHUTTLE OPTION */}
          {step === 2 && !confirmedBooking && (
            <div className="space-y-4">
              <AirportShuttleWidget
                value={airportTransfer}
                onChange={setAirportTransfer}
                currency={currency}
              />
            </div>
          )}

          {/* STEP 3: CONTACT & PAYMENT SELECTION */}
          {step === 3 && !confirmedBooking && (
            <div className="space-y-5">
              {/* Guest details */}
              <div className="p-4 rounded-2xl bg-[#141419] border border-white/10 space-y-3">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Coordonnées du Voyageur</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] text-[#A6A6B2] mb-1">Nom complet</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A6A6B2] mb-1">Téléphone mobile</label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#A6A6B2] mb-1">Adresse E-mail pour le Voucher</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Promo code field */}
              <div className="p-3.5 rounded-2xl bg-[#141419] border border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Tag className="w-4 h-4 text-[#D4AF37]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Code Promo (ex: REVEILLON-GOLD)"
                    className="bg-transparent text-xs text-white placeholder-gray-500 uppercase tracking-wider focus:outline-none w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 rounded-lg bg-[#252530] text-[#E5C378] text-xs font-medium hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Appliquer
                </button>
              </div>

              {promoMessage && (
                <div
                  className={`text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 ${
                    promoMessage.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  <span>{promoMessage.type === 'success' ? '✓' : '⚠'}</span>
                  <span>{promoMessage.text}</span>
                </div>
              )}

              {/* Payment selector */}
              <PaymentSelector
                selectedMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
                currency={currency}
                amount={finalTotal}
              />

              {/* Summary breakdown */}
              <div className="p-4 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-[#A0A0AA]">
                  <span>{selectedRoom.name} ({nights} nuits)</span>
                  <span className="font-mono text-white">{roomPrice * nights} {currency}</span>
                </div>
                {airportTransfer.enabled && (
                  <div className="flex justify-between text-[#A0A0AA]">
                    <span>Navette VIP {selectedVehicle.name} ({airportTransfer.returnTransfer ? 'A/R' : 'Aller simple'})</span>
                    <span className="font-mono text-white">+{shuttleCost} {currency}</span>
                  </div>
                )}
                {isPromoApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise Réveillon Privilège (-25%)</span>
                    <span className="font-mono">-{discountAmount} {currency}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-bold text-sm sm:text-base text-white">
                  <span>Total à régler</span>
                  <span className="font-mono text-lg text-[#F3E5AB]">
                    {finalTotal} {currency}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION VOUCHER / BILLET DE SÉJOUR */}
          {confirmedBooking && (
            <div className="space-y-5 text-center">
              {/* VIP Badge */}
              <div className="mx-auto w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">Séjour Confirmé avec Succès</h3>
                <p className="text-xs text-[#A6A6B2] mt-1">
                  Un email de confirmation ainsi que votre Pass VIP ont été transmis à{' '}
                  <span className="text-[#F3E5AB] font-medium">{confirmedBooking.clientEmail}</span>
                </p>
              </div>

              {/* Luxury Digital Boarding Pass / Voucher */}
              <div className="rounded-2xl border border-[#D4AF37]/50 bg-gradient-to-b from-[#181820] to-[#0D0D10] p-5 text-left text-xs space-y-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />

                {/* Card header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-cinzel font-bold text-sm text-[#F3E5AB] tracking-wider block">
                      {confirmedBooking.hotelName}
                    </span>
                    <span className="text-[10px] text-[#8E8E9A]">RÉFÉRENCE : {confirmedBooking.id}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                    VIP GOLD PASS
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#7E7E8A] block">VOYAGEUR</span>
                    <span className="font-semibold text-white">{confirmedBooking.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7E7E8A] block">CHAMBRE RÉSERVÉE</span>
                    <span className="font-semibold text-[#F3E5AB] truncate block">{confirmedBooking.roomName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7E7E8A] block">DATES DU SÉJOUR</span>
                    <span className="font-mono text-white">{confirmedBooking.checkIn} → {confirmedBooking.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7E7E8A] block">TRANSPORT AÉROPORT</span>
                    <span className="font-semibold text-white">
                      {confirmedBooking.airportTransfer.enabled
                        ? `Navette VIP ${confirmedBooking.airportTransfer.airportCode}`
                        : 'Non inclus'}
                    </span>
                  </div>
                </div>

                {/* QR Code section */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-black">
                      <QrCode className="w-12 h-12" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8E9A] block">PRÉSENTER À L'ARRIVÉE</span>
                      <span className="font-mono text-xs font-bold text-[#E5C378] tracking-widest">
                        {confirmedBooking.qrCodeToken}
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5">● Statut: Garanti & Enregistré</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#8E8E9A] block">TOTAL RÉGLÉ</span>
                    <span className="font-mono text-base font-bold text-[#F3E5AB]">
                      {confirmedBooking.totalTND} TND
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Voucher PDF téléchargé sur votre appareil.')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C1C24] border border-white/15 text-xs text-white hover:border-[#D4AF37] transition-colors"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Enregistrer le Pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs shadow-md"
                >
                  <span>Fermer & Explorer</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls (for steps 1-3) */}
        {!confirmedBooking && (
          <div className="px-5 py-3.5 border-t border-white/10 bg-[#141419] flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs text-[#A6A6B2] hover:text-white bg-[#1A1A22] border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs shadow-md shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>Continuer ({step === 1 ? 'Navette VIP' : 'Paiement'})</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-black font-bold text-xs sm:text-sm shadow-xl shadow-[#D4AF37]/30 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirmer & Valider ({finalTotal} {currency})</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
