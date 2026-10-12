export interface Hotel {
  id: string;
  name: string;
  stars: number;
  city: string;
  location: string;
  tagline: string;
  description: string;
  pricePerNightTND: number;
  pricePerNightEUR: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  features: string[];
  hasAirportShuttle: boolean;
  distanceToAirportKm: number;
  nearestAirport: string;
  reveillonAvailable: boolean;
}

export interface RoomOption {
  id: string;
  hotelId: string;
  name: string;
  type: string;
  sizeM2: number;
  capacity: string;
  seaView: boolean;
  pricePerNightTND: number;
  pricePerNightEUR: number;
  imageUrl: string;
  amenities: string[];
  inclusions: string[];
}

export interface AirportOption {
  id: string;
  code: string;
  name: string;
  city: string;
}

export type VehicleType = 'sedan' | 'van' | 'shared';

export interface VehicleOption {
  id: VehicleType;
  name: string;
  model: string;
  capacity: string;
  luggage: string;
  priceTND: number;
  priceEUR: number;
  vipPerks: string[];
}

export type PaymentMethodId = 'cib_edahabia' | 'card_international' | 'flouci_konnect' | 'pay_at_hotel' | 'apple_pay';

export type MapPointCategory = 'hotel' | 'airport' | 'attraction';

export interface TouristAttraction {
  id: string;
  name: string;
  category: 'UNESCO' | 'Marina & Golf' | 'Culture & Histoire' | 'Nature & Désert' | 'Loisirs';
  city: string;
  region: 'tunis' | 'hammamet' | 'sousse' | 'djerba' | 'tozeur';
  description: string;
  highlight: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  closestHotelId: string;
  distanceToClosestHotelKm: number;
}

export interface MapPoint {
  id: string;
  type: MapPointCategory;
  name: string;
  subtitle: string;
  city: string;
  region: 'tunis' | 'hammamet' | 'sousse' | 'djerba' | 'tozeur';
  latitude: number;
  longitude: number;
  iataCode?: string;
  stars?: number;
  rating?: number;
  pricePerNightTND?: number;
  pricePerNightEUR?: number;
  categoryTag?: string;
  description: string;
  distanceToNearestAirportKm?: number;
  nearestAirportName?: string;
  hotelId?: string;
}

export interface PaymentMethodOption {
  id: PaymentMethodId;
  name: string;
  subtitle: string;
  badge?: string;
  iconName: string;
  isPopular?: boolean;
}

export interface AirportTransferBooking {
  enabled: boolean;
  airportCode: string;
  vehicleType: VehicleType;
  flightNumber: string;
  arrivalDate: string;
  arrivalTime: string;
  passengers: number;
  luggageCount: number;
  specialRequests: string;
  returnTransfer: boolean;
  returnFlightNumber?: string;
  returnDate?: string;
}

export interface BookingPayload {
  id: string;
  hotelId: string;
  hotelName: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  airportTransfer: AirportTransferBooking;
  paymentMethod: PaymentMethodId;
  promoCodeApplied?: string;
  totalTND: number;
  totalEUR: number;
  status: 'confirmed' | 'pending';
  bookingDate: string;
  qrCodeToken: string;
}
