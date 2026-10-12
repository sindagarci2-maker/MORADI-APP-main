import React from 'react';
import { Plane, Car, Users, Luggage, Check, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { AIRPORTS, VEHICLE_OPTIONS, IMAGES } from '../data/hotels';
import { AirportTransferBooking, VehicleType } from '../types';

interface AirportShuttleWidgetProps {
  value: AirportTransferBooking;
  onChange: (value: AirportTransferBooking) => void;
  currency: 'TND' | 'EUR';
  compact?: boolean;
}

export const AirportShuttleWidget: React.FC<AirportShuttleWidgetProps> = ({
  value,
  onChange,
  currency,
  compact = false,
}) => {
  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === value.vehicleType) || VEHICLE_OPTIONS[0];

  const handleToggle = (enabled: boolean) => {
    onChange({ ...value, enabled });
  };

  const handleVehicleSelect = (vehicleType: VehicleType) => {
    onChange({ ...value, vehicleType });
  };

  const handleAirportSelect = (airportCode: string) => {
    onChange({ ...value, airportCode });
  };

  const price = currency === 'TND' ? selectedVehicle.priceTND : selectedVehicle.priceEUR;
  const totalPrice = value.returnTransfer ? price * 2 : price;

  return (
    <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#121216] p-4 sm:p-5 text-white shadow-xl transition-all">
      {/* Header with Switch */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C378]">
            <Plane className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm sm:text-base text-white">Transfert Aéroport VIP</h4>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                Chauffeur Privé
              </span>
            </div>
            <p className="text-xs text-[#9E9EA8] mt-0.5">
              Accueil personnalisé à la sortie des bagages avec pancarte dorée
            </p>
          </div>
        </div>

        {/* Toggle switch */}
        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#26262F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#D4AF37] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]/30 border border-white/20 peer-checked:border-[#D4AF37]"></div>
        </label>
      </div>

      {/* Expanded options when enabled */}
      {value.enabled ? (
        <div className="mt-4 space-y-4">
          {/* Fleet banner image preview */}
          <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden border border-[#D4AF37]/20">
            <img
              src={IMAGES.airportTransfer}
              alt="Flotte VIP Mercedes El Mouradi"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
              <span className="text-white font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Flotte officielle El Mouradi VIP & Chauffeurs certifiés
              </span>
              <span className="text-[#F3E5AB] font-mono font-bold">
                +{totalPrice} {currency} {value.returnTransfer ? '(A/R)' : ''}
              </span>
            </div>
          </div>

          {/* 1. Airport Selection */}
          <div>
            <label className="block text-xs font-medium text-[#D1D1D8] mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Aéroport de prise en charge
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AIRPORTS.map((airport) => {
                const isSelected = value.airportCode === airport.code;
                return (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleAirportSelect(airport.code)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white'
                        : 'border-white/10 bg-[#17171C] text-[#A0A0AA] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[#E5C378]">{airport.code}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </div>
                    <div className="text-[11px] font-medium text-white truncate mt-0.5">{airport.name}</div>
                    <div className="text-[10px] text-[#7E7E8A] truncate">{airport.city}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Vehicle Selection */}
          <div>
            <label className="block text-xs font-medium text-[#D1D1D8] mb-2 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
              Gamme de véhicule souhaitée
            </label>
            <div className="space-y-2">
              {VEHICLE_OPTIONS.map((veh) => {
                const isSelected = value.vehicleType === veh.id;
                const vehPrice = currency === 'TND' ? veh.priceTND : veh.priceEUR;
                return (
                  <div
                    key={veh.id}
                    onClick={() => handleVehicleSelect(veh.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-white/10 bg-[#16161B] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <div>
                          <span className="font-semibold text-xs sm:text-sm text-white">{veh.name}</span>
                          <span className="text-[11px] text-[#8E8E9A] block">{veh.model}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-[#F3E5AB]">
                          {vehPrice} {currency}
                        </span>
                        <span className="text-[10px] text-[#7E7E8A] block">par trajet</span>
                      </div>
                    </div>

                    {/* Metadata & Perks */}
                    <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap items-center gap-3 text-[11px] text-[#A6A6B2]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#D4AF37]" />
                        {veh.capacity}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Luggage className="w-3 h-3 text-[#D4AF37]" />
                        {veh.luggage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Flight info inputs */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div>
              <label className="block text-[11px] text-[#A6A6B2] mb-1">Numéro de vol</label>
              <input
                type="text"
                placeholder="ex: TU 721"
                value={value.flightNumber}
                onChange={(e) => onChange({ ...value, flightNumber: e.target.value })}
                className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#A6A6B2] mb-1">Heure estimée d'arrivée</label>
              <input
                type="time"
                value={value.arrivalTime}
                onChange={(e) => onChange({ ...value, arrivalTime: e.target.value })}
                className="w-full bg-[#18181E] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Round trip toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#17171D] border border-white/10">
            <div>
              <span className="text-xs font-medium text-white block">Inclure le trajet retour à l'aéroport</span>
              <span className="text-[10px] text-[#8E8E9A]">Prise en charge au lobby à l'heure convenue</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value.returnTransfer}
                onChange={(e) => onChange({ ...value, returnTransfer: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#26262F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#D4AF37] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]/30 border border-white/20 peer-checked:border-[#D4AF37]"></div>
            </label>
          </div>
        </div>
      ) : (
        /* Inactive quick summary */
        <div className="mt-3 flex items-center justify-between text-xs text-[#8E8E9A] bg-[#16161B] p-2.5 rounded-xl border border-white/5">
          <span>Pas de transport aéroport sélectionné</span>
          <button
            type="button"
            onClick={() => handleToggle(true)}
            className="text-[#E5C378] hover:text-white font-medium text-xs underline underline-offset-2"
          >
            Activer (+ à partir de 40 TND)
          </button>
        </div>
      )}
    </div>
  );
};
