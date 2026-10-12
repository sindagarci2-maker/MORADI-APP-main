import React, { useState } from 'react';
import { CreditCard, Globe, Smartphone, Building2, Zap, Check, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/hotels';
import { PaymentMethodId } from '../types';

interface PaymentSelectorProps {
  selectedMethod: PaymentMethodId;
  onSelectMethod: (method: PaymentMethodId) => void;
  currency: 'TND' | 'EUR';
  amount: number;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  currency,
  amount,
}) => {
  const [cardNumber, setCardNumber] = useState('4560 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState('Sami Ben Amor');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('•••');
  const [saveCard, setSaveCard] = useState(true);

  const getIcon = (id: PaymentMethodId) => {
    switch (id) {
      case 'cib_edahabia':
        return <CreditCard className="w-5 h-5 text-[#D4AF37]" />;
      case 'card_international':
        return <Globe className="w-5 h-5 text-[#E5C378]" />;
      case 'flouci_konnect':
        return <Smartphone className="w-5 h-5 text-amber-300" />;
      case 'pay_at_hotel':
        return <Building2 className="w-5 h-5 text-[#D4AF37]" />;
      case 'apple_pay':
        return <Zap className="w-5 h-5 text-amber-200" />;
    }
  };

  return (
    <div className="space-y-4 text-white">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-sm sm:text-base text-white flex items-center gap-2">
            <span>Mode de Règlement</span>
            <span className="flex items-center gap-1 text-[11px] font-normal text-[#8E8E9A]">
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              Cryptage SSL 256-bit
            </span>
          </h4>
          <p className="text-xs text-[#9E9EA8] mt-0.5">
            Sélectionnez votre moyen de paiement sécurisé pour valider votre séjour
          </p>
        </div>
      </div>

      {/* Methods List */}
      <div className="space-y-2.5">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#D4AF37] bg-gradient-to-r from-[#1E1C16] to-[#141418] shadow-lg shadow-black/50 ring-1 ring-[#D4AF37]/50'
                  : 'border-white/10 bg-[#141418] hover:border-white/20 hover:bg-[#18181E]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB]'
                        : 'bg-[#1C1C22] border border-white/10 text-gray-400'
                    }`}
                  >
                    {getIcon(method.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs sm:text-sm text-white">{method.name}</span>
                      {method.badge && (
                        <span className="text-[10px] font-medium tracking-tight text-[#E5C378] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                          {method.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8E8E9A] mt-1 leading-relaxed">{method.subtitle}</p>
                  </div>
                </div>

                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                    isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/30'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail depending on selected method */}
      <div className="pt-2">
        {selectedMethod === 'cib_edahabia' || selectedMethod === 'card_international' ? (
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#0E0E12] p-4 space-y-3">
            {/* Visual Gold-Accented Card */}
            <div className="relative h-40 sm:h-44 w-full rounded-2xl overflow-hidden p-4 flex flex-col justify-between text-white border border-[#D4AF37]/40 shadow-xl bg-gradient-to-tr from-[#1B1B22] via-[#0D0D10] to-[#262114]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-cinzel text-xs tracking-widest text-[#E5C378] font-bold">
                    EL MOURADI PRIVILÈGE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#8E8E9A]">
                  {selectedMethod === 'cib_edahabia' ? 'CIB / EDAHABIA' : 'VISA / MASTERCARD'}
                </span>
              </div>

              {/* Chip */}
              <div className="relative z-10 w-9 h-7 rounded bg-gradient-to-br from-[#E5C378] to-[#997316] border border-[#F3E5AB]/40 shadow-inner" />

              {/* Card number & details */}
              <div className="relative z-10">
                <div className="font-mono text-base tracking-widest text-[#FBF7EE]">{cardNumber}</div>
                <div className="flex items-center justify-between text-[11px] text-[#A6A6B2] mt-2">
                  <span className="uppercase tracking-wider">{cardHolder}</span>
                  <span className="font-mono">{expiry}</span>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-2.5 pt-1 text-xs">
              <div>
                <label className="block text-[#A6A6B2] text-[11px] mb-1">Numéro de carte</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-[#16161B] border border-white/15 rounded-xl px-3 py-2 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#A6A6B2] text-[11px] mb-1">Expiration (MM/AA)</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full bg-[#16161B] border border-white/15 rounded-xl px-3 py-2 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[#A6A6B2] text-[11px] mb-1">CVV / CVC</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full bg-[#16161B] border border-white/15 rounded-xl px-3 py-2 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A6A6B2] text-[11px] mb-1">Nom du titulaire</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Nom Prénom"
                  className="w-full bg-[#16161B] border border-white/15 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="accent-[#D4AF37] rounded"
                />
                <label htmlFor="saveCard" className="text-[11px] text-[#A6A6B2] cursor-pointer">
                  Mémoriser cette carte pour mes prochains séjours El Mouradi
                </label>
              </div>
            </div>
          </div>
        ) : selectedMethod === 'flouci_konnect' ? (
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-[#15130D] space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <Smartphone className="w-4 h-4 text-[#D4AF37]" />
              <span>Paiement Mobile Tunisien Instantané</span>
            </div>
            <p className="text-xs text-[#C5C5CE] leading-relaxed">
              Un QR Code dynamique s’affichera sur votre écran ou vous recevrez une notification push sur votre application
              Flouci / Konnect pour autoriser le montant de <span className="font-bold text-[#F3E5AB]">{amount} {currency}</span> sans commission supplémentaire.
            </p>
          </div>
        ) : selectedMethod === 'pay_at_hotel' ? (
          <div className="p-4 rounded-2xl border border-[#D4AF37]/30 bg-[#141419] space-y-2.5">
            <div className="flex items-center gap-2 text-[#E5C378] text-xs font-semibold">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Règlement Direct à la Réception</span>
            </div>
            <p className="text-xs text-[#C5C5CE] leading-relaxed">
              Aucun prélèvement immédiat. Votre réservation est immédiatement garantie. Vous paierez l'intégralité lors de
              votre arrivée au comptoir El Mouradi en Dinars Tunisiens (espèces, chèque de banque certifié ou carte bancaire).
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl border border-white/20 bg-[#16161C] space-y-2.5">
            <div className="flex items-center gap-2 text-white text-xs font-semibold">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span>Apple Pay & Portefeuille Numérique</span>
            </div>
            <p className="text-xs text-[#C5C5CE] leading-relaxed">
              Appuyez sur le bouton Apple Pay pour valider instantanément avec Face ID ou Touch ID. Vos coordonnées et adresses de facturation seront automatiquement synchronisées.
            </p>
          </div>
        )}
      </div>

      {/* Security footer reassurance */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-[#80808C] pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Transactions cryptées et garanties par le groupe hôtelier El Mouradi</span>
      </div>
    </div>
  );
};
