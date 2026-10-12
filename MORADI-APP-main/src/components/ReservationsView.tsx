import React, { useState } from 'react';
import { Ticket, QrCode, Calendar, MapPin, Plane, Crown, Key, Download, ChevronRight, Phone, X, Check, ShieldCheck } from 'lucide-react';
import { BookingPayload } from '../types';
import { IMAGES } from '../data/hotels';

interface ReservationsViewProps {
  bookings: BookingPayload[];
  onOpenBookingModal: () => void;
  currency: 'TND' | 'EUR';
}

export const ReservationsView: React.FC<ReservationsViewProps> = ({
  bookings,
  onOpenBookingModal,
  currency,
}) => {
  const [selectedQrBooking, setSelectedQrBooking] = useState<BookingPayload | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  const handleDownloadVoucher = (bookingId: string) => {
    setDownloadNotification(`Voucher officiel #${bookingId} téléchargé en PDF haute résolution`);
    setTimeout(() => setDownloadNotification(null), 3500);
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Download Notification Toast */}
      {downloadNotification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#181822] border border-[#D4AF37] shadow-2xl flex items-center gap-2 text-xs text-[#F3E5AB] animate-bounce">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* QR Code Luxury Modal */}
      {selectedQrBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#181820] to-[#0D0D12] border border-[#D4AF37]/50 p-6 text-center space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedQrBooking(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#202028] text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
              <Crown className="w-6 h-6" />
            </div>

            <div>
              <span className="font-cinzel text-xs font-bold text-[#E5C378] tracking-widest block uppercase">
                Pass VIP Dématérialisé
              </span>
              <h3 className="font-cinzel text-lg font-bold text-white mt-1">
                {selectedQrBooking.hotelName}
              </h3>
              <p className="text-xs text-[#8E8E9A]">{selectedQrBooking.roomName}</p>
            </div>

            {/* Simulated QR Code Canvas */}
            <div className="p-4 rounded-2xl bg-white mx-auto w-48 h-48 flex flex-col items-center justify-center gap-2 shadow-inner">
              <QrCode className="w-36 h-36 text-black" />
            </div>

            <div className="font-mono text-xs text-[#D4AF37] tracking-wider">
              {selectedQrBooking.qrCodeToken}
            </div>

            <p className="text-[11px] text-[#A6A6B2] leading-relaxed">
              Présentez ce QR Code au lobby pour un enregistrement prioritaire et l'accès à votre navette VIP.
            </p>

            <button
              type="button"
              onClick={() => setSelectedQrBooking(null)}
              className="w-full py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs shadow-md"
            >
              Fermer le Pass
            </button>
          </div>
        </div>
      )}
      {/* VIP Membership Card: El Mouradi Privilège Noir & Or */}
      <div className="relative rounded-3xl p-6 bg-gradient-to-tr from-[#16161D] via-[#101014] to-[#2B2312] border border-[#D4AF37]/50 shadow-2xl overflow-hidden">
        {/* Glow & Watermark */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-[#D4AF37]/20 rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-cinzel text-xs font-bold tracking-widest text-[#E5C378]">
                EL MOURADI PRIVILÈGE
              </span>
            </div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#A0A0AB] mt-0.5">
              CARTE MEMBRE NOIR & OR
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-black bg-gold-gradient px-3 py-1 rounded-full shadow-md">
            AMBASSADEUR VIP
          </span>
        </div>

        <div className="relative z-10 mt-6 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] text-[#8E8E9A] uppercase tracking-wider">Titulaire</div>
            <div className="font-semibold text-sm sm:text-base text-white tracking-wide">
              M. Karim Mansour
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#8E8E9A] uppercase tracking-wider">Solde Points Or</div>
            <div className="font-mono text-lg font-bold text-[#F3E5AB]">14 850 pts</div>
          </div>
        </div>

        <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A6A6B2]">
          <span className="font-mono text-[11px] tracking-widest">N° VIP : 8902 4410 7721</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
            ● Navette VIP offerte active
          </span>
        </div>
      </div>

      {/* Bookings Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#D4AF37]" />
            <span>Mes Séjours & Vouchers</span>
          </h3>
          <span className="text-xs text-[#A0A0AB]">{bookings.length} séjour(s)</span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#121216] border border-white/10 text-center space-y-3">
            <Ticket className="w-10 h-10 text-[#8E8E9A] mx-auto opacity-50" />
            <h4 className="text-sm font-semibold text-white">Aucun séjour réservé pour le moment</h4>
            <p className="text-xs text-[#8E8E9A] max-w-xs mx-auto">
              Découvrez nos palais balnéaires ou réservez votre Forfait Réveillon 2026 avec navette aéroport VIP.
            </p>
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="px-4 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs shadow-md"
            >
              Réserver un Séjour
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-[#D4AF37]/35 bg-[#121217] p-5 shadow-xl space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                      RÉFÉRENCE : {booking.id}
                    </span>
                    <h4 className="font-cinzel text-base font-bold text-white mt-0.5">
                      {booking.hotelName}
                    </h4>
                    <p className="text-xs text-[#9E9EA8]">{booking.roomName}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Confirmé
                  </span>
                </div>

                {/* Stay Dates */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#17171E] p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <div>
                      <div className="text-[10px] text-[#7E7E8A]">Arrivée</div>
                      <div className="font-medium text-white">{booking.checkIn}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <div>
                      <div className="text-[10px] text-[#7E7E8A]">Départ</div>
                      <div className="font-medium text-white">{booking.checkOut}</div>
                    </div>
                  </div>
                </div>

                {/* Airport Shuttle Status if included */}
                {booking.airportTransfer.enabled && (
                  <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-[#D4AF37]" />
                      <div>
                        <span className="font-semibold text-white block">
                          Navette Aéroport VIP {booking.airportTransfer.airportCode}
                        </span>
                        <span className="text-[11px] text-[#B5B5BE]">
                          Vol {booking.airportTransfer.flightNumber} · Chauffeur privé assigné
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#E5C378] bg-black/40 px-2 py-1 rounded">
                      Prise en charge OK
                    </span>
                  </div>
                )}

                {/* Digital Key & Actions */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#22222C] text-[#E5C378]">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-white">Clé Mobile Bluetooth</div>
                      <div className="text-[10px] text-[#7E7E8A]">Activée le jour de votre arrivée</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedQrBooking(booking)}
                      className="p-2 rounded-xl bg-[#1C1C24] border border-white/10 text-white hover:border-[#D4AF37] transition-colors"
                      title="Afficher le QR Code VIP"
                    >
                      <QrCode className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadVoucher(booking.id)}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gold-gradient text-black font-semibold text-xs shadow hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Voucher</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
