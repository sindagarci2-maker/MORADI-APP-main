import React, { useState } from 'react';
import { Plane, Car, Users, Luggage, Phone, ShieldCheck, MapPin, Check, Clock, ArrowRight } from 'lucide-react';
import { AIRPORTS, VEHICLE_OPTIONS, IMAGES } from '../data/hotels';
import { AirportTransferBooking, VehicleType } from '../types';

interface TransferViewProps {
  currency: 'TND' | 'EUR';
}

export const TransferView: React.FC<TransferViewProps> = ({ currency }) => {
  const [selectedAirport, setSelectedAirport] = useState<string>('TUN');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('sedan');
  const [flightNumber, setFlightNumber] = useState<string>('TU 721');
  const [date, setDate] = useState<string>('2025-12-30');
  const [time, setTime] = useState<string>('14:30');
  const [hotelDestination, setHotelDestination] = useState<string>('El Mouradi Palace (Port El Kantaoui)');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];
  const price = currency === 'TND' ? vehicle.priceTND : vehicle.priceEUR;

  const handleBookStandalone = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 pb-24 text-white">
      {/* Visual Header */}
      <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
        <img
          src={IMAGES.airportTransfer}
          alt="Navette VIP Mercedes El Mouradi"
          referrerPolicy="no-referrer"
          className="w-full h-56 sm:h-64 object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/40 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
              Service Officiel
            </span>
            <span className="text-xs text-[#E5C378] font-medium">Chauffeur Privé & VIP</span>
          </div>
          <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
            Transport Aéroportuaire Haut de Gamme
          </h1>
          <p className="text-xs text-[#C5C5CE] mt-0.5 max-w-md">
            Liaisons directes et sans escale entre tous les aéroports internationaux de Tunisie et les Hôtels El Mouradi.
          </p>
        </div>
      </div>

      {/* Trust reassurance cards */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-3 rounded-2xl bg-[#141419] border border-white/5">
          <Clock className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
          <div className="font-semibold text-white text-[11px]">Suivi de Vol</div>
          <div className="text-[10px] text-[#8E8E9A]">Ajustement automatique en cas de retard</div>
        </div>
        <div className="p-3 rounded-2xl bg-[#141419] border border-white/5">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
          <div className="font-semibold text-white text-[11px]">Accueil Nominatif</div>
          <div className="text-[10px] text-[#8E8E9A]">Pancarte dorée à la sortie douane</div>
        </div>
        <div className="p-3 rounded-2xl bg-[#141419] border border-white/5">
          <Car className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
          <div className="font-semibold text-white text-[11px]">Flotte Mercedes</div>
          <div className="text-[10px] text-[#8E8E9A]">Climatisation, Wi-Fi & eau fraîche</div>
        </div>
      </div>

      {/* Active Driver Simulation Preview Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#17171E] to-[#121216] border border-[#D4AF37]/30 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#E5C378]">
            Chauffeur de Permanence · VIP Concierge
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            En Service 24/7
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#252530] flex items-center justify-center text-[#D4AF37] font-bold text-base">
            MK
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-white">Mohamed Khemiri</h4>
            <p className="text-xs text-[#9E9EA8]">Chauffeur Exécutif Senior · Mercedes-Benz Classe E Noire</p>
            <div className="flex items-center gap-2 text-[11px] text-[#7E7E8A] mt-0.5">
              <span>Immatriculation : 214 TUN 8902</span>
              <span>·</span>
              <span className="text-emerald-400">Temps d'attente offert : 60 min</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/5 text-xs">
          <a
            href="tel:+21671123456"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#1C1C24] text-white hover:bg-[#252530] transition-colors border border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Assistance Téléphonique VIP</span>
          </a>
        </div>
      </div>

      {/* Standalone Transfer Booking Form */}
      <form onSubmit={handleBookStandalone} className="rounded-2xl border border-white/10 bg-[#121216] p-5 space-y-4">
        <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
          <span>Commander une Navette Privée</span>
          <span className="text-xs font-normal text-[#8E8E9A]">(Sans chambre d'hôtel)</span>
        </h3>

        {/* Airport choice */}
        <div>
          <label className="block text-xs font-medium text-[#A6A6B2] mb-1.5">Aéroport de départ / arrivée</label>
          <div className="grid grid-cols-2 gap-2">
            {AIRPORTS.map((air) => (
              <button
                key={air.code}
                type="button"
                onClick={() => setSelectedAirport(air.code)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedAirport === air.code
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white'
                    : 'border-white/10 bg-[#16161B] text-[#8E8E9A]'
                }`}
              >
                <div className="font-mono font-bold text-[#E5C378]">{air.code}</div>
                <div className="truncate text-white font-medium text-[11px] mt-0.5">{air.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hotel Destination */}
        <div>
          <label className="block text-xs font-medium text-[#A6A6B2] mb-1.5">Hôtel El Mouradi de Destination</label>
          <select
            value={hotelDestination}
            onChange={(e) => setHotelDestination(e.target.value)}
            className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option>El Mouradi Palace (Port El Kantaoui)</option>
            <option>El Mouradi Palm Marina (Sousse)</option>
            <option>El Mouradi Gammarth (Côtes de Carthage)</option>
            <option>El Mouradi Hammamet (Yasmine Hammamet)</option>
            <option>El Mouradi Djerba Menzel (Île de Djerba)</option>
          </select>
        </div>

        {/* Vehicle Selection */}
        <div>
          <label className="block text-xs font-medium text-[#A6A6B2] mb-1.5">Modèle de véhicule</label>
          <div className="space-y-2">
            {VEHICLE_OPTIONS.map((veh) => {
              const isSelected = selectedVehicle === veh.id;
              const vPrice = currency === 'TND' ? veh.priceTND : veh.priceEUR;
              return (
                <div
                  key={veh.id}
                  onClick={() => setSelectedVehicle(veh.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-[#16161B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-white">{veh.name}</div>
                      <div className="text-[11px] text-[#8E8E9A]">{veh.model}</div>
                    </div>
                    <div className="font-mono font-bold text-sm text-[#F3E5AB]">
                      {vPrice} {currency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flight & Time */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="block text-[#A6A6B2] mb-1">N° de vol</label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div>
            <label className="block text-[#A6A6B2] mb-1">Heure de prise en charge</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {bookingSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-xs text-emerald-300 text-center font-medium">
            ✓ Demande de navette enregistrée. Le concierge vous contacte par SMS/WhatsApp sous 15 min.
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Réserver le Chauffeur ({price} {currency})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
