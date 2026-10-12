import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Plane,
  Crown,
  Sparkles,
  Compass,
  Navigation,
  Car,
  Clock,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Check,
  RotateCcw,
  Eye,
  List,
  Map as MapIcon,
  Star,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import {
  MAP_HOTELS,
  MAP_AIRPORTS,
  MAP_ATTRACTIONS,
  ALL_MAP_POINTS,
  MAP_REGIONS,
  PROXIMITY_CONNECTIONS,
  MapRegion,
} from '../data/mapData';
import { HOTELS } from '../data/hotels';
import { MapPoint, Hotel, TouristAttraction } from '../types';

interface InteractiveHotelsMapProps {
  currency: 'TND' | 'EUR';
  onBookHotel: (hotel: Hotel) => void;
  onNavigateToTransfer?: (airportCode?: string, hotelId?: string) => void;
  initialSelectedHotelId?: string;
}

export const InteractiveHotelsMap: React.FC<InteractiveHotelsMapProps> = ({
  currency,
  onBookHotel,
  onNavigateToTransfer,
  initialSelectedHotelId,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<MapRegion['id']>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'hotel' | 'airport' | 'attraction'>('all');
  const [selectedPointId, setSelectedPointId] = useState<string>(
    initialSelectedHotelId || 'mouradi-palace'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayMode, setDisplayMode] = useState<'map' | 'list'>('map');
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'calculator'>('details');

  // Calculator state
  const [calcOrigin, setCalcOrigin] = useState<string>('airport-nbe');
  const [calcDestination, setCalcDestination] = useState<string>('mouradi-palace');

  const currentRegion = useMemo(() => {
    return MAP_REGIONS.find((r) => r.id === selectedRegionId) || MAP_REGIONS[0];
  }, [selectedRegionId]);

  // SVG coordinate projection tuned for Tunisia map
  const projectPoint = (lat: number, lng: number) => {
    const box = currentRegion.zoomBox;
    const paddingX = 40;
    const paddingY = 40;
    const width = 580;
    const height = 720;

    const normX = (lng - box.minLng) / (box.maxLng - box.minLng);
    const normY = (box.maxLat - lat) / (box.maxLat - box.minLat);

    return {
      x: paddingX + Math.max(0.05, Math.min(0.95, normX)) * (width - 2 * paddingX),
      y: paddingY + Math.max(0.05, Math.min(0.95, normY)) * (height - 2 * paddingY),
    };
  };

  // Filtered points
  const filteredPoints = useMemo(() => {
    return ALL_MAP_POINTS.filter((pt) => {
      // Category filter
      if (activeCategory !== 'all' && pt.type !== activeCategory) return false;

      // Region filter if not 'all'
      if (selectedRegionId !== 'all' && pt.region !== selectedRegionId) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = pt.name.toLowerCase().includes(query);
        const matchesCity = pt.city.toLowerCase().includes(query);
        const matchesIata = pt.iataCode?.toLowerCase().includes(query);
        return matchesName || matchesCity || matchesIata;
      }

      return true;
    });
  }, [activeCategory, selectedRegionId, searchQuery]);

  // Selected point object
  const selectedPoint = useMemo(() => {
    return ALL_MAP_POINTS.find((p) => p.id === selectedPointId) || ALL_MAP_POINTS[0];
  }, [selectedPointId]);

  // Associated connections for the selected point
  const relevantConnections = useMemo(() => {
    if (!selectedPoint) return [];

    if (selectedPoint.type === 'hotel') {
      return PROXIMITY_CONNECTIONS.filter((c) => c.hotelId === selectedPoint.id);
    }
    if (selectedPoint.type === 'airport') {
      return PROXIMITY_CONNECTIONS.filter((c) => c.targetId === selectedPoint.id);
    }
    if (selectedPoint.type === 'attraction') {
      return PROXIMITY_CONNECTIONS.filter((c) => c.targetId === selectedPoint.id);
    }
    return [];
  }, [selectedPoint]);

  // Full hotel data if selected point is a hotel
  const selectedHotelData = useMemo(() => {
    if (selectedPoint && selectedPoint.type === 'hotel') {
      return HOTELS.find((h) => h.id === selectedPoint.id) || null;
    }
    return null;
  }, [selectedPoint]);

  // Calculator calculation
  const calculatedRoute = useMemo(() => {
    const originPt = ALL_MAP_POINTS.find((p) => p.id === calcOrigin);
    const destPt = ALL_MAP_POINTS.find((p) => p.id === calcDestination);

    if (!originPt || !destPt) return null;

    // Check pre-configured connection
    const directConn = PROXIMITY_CONNECTIONS.find(
      (c) =>
        (c.hotelId === originPt.id && c.targetId === destPt.id) ||
        (c.hotelId === destPt.id && c.targetId === originPt.id)
    );

    if (directConn) {
      return {
        distanceKm: directConn.distanceKm,
        driveTimeMin: directConn.driveTimeMin,
        priceTND: directConn.vipMercedesPriceTND || 95,
        priceEUR: directConn.vipMercedesPriceEUR || 29,
        description: directConn.description,
      };
    }

    // Rough geodesic estimation for any other pair
    const dLat = (destPt.latitude - originPt.latitude) * 111;
    const dLng = (destPt.longitude - originPt.longitude) * 90;
    const straightKm = Math.sqrt(dLat * dLat + dLng * dLng);
    const roadKm = Math.round(straightKm * 1.35) || 15;
    const minutes = Math.max(12, Math.round(roadKm * 0.9));
    const priceTND = Math.max(45, Math.round(roadKm * 1.8));
    const priceEUR = Math.round(priceTND / 3.3);

    return {
      distanceKm: roadKm,
      driveTimeMin: minutes,
      priceTND,
      priceEUR,
      description: 'Trajet optimisé par la conciergerie VIP El Mouradi en berline de prestige',
    };
  }, [calcOrigin, calcDestination]);

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#181822] via-[#101015] to-[#0A0A0D] border border-[#D4AF37]/30 p-4 sm:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C378]">
                <Compass className="w-4 h-4" />
              </span>
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#E5C378] font-bold">
                Cartographie d'Excellence
              </span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              Emplacements & Accès Aéroports
            </h2>
            <p className="text-xs text-[#A0A0AB] mt-1 max-w-xl leading-relaxed">
              Visualisez les 5 Palais El Mouradi par rapport aux aéroports internationaux de Tunisie et aux joyaux touristiques (Carthage, Marina Kantaoui, Colisée d’El Jem, Djerbahood).
            </p>
          </div>

          {/* Quick Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              type="button"
              onClick={() => setDisplayMode(displayMode === 'map' ? 'list' : 'map')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#191922] text-[#F3E5AB] border border-[#D4AF37]/35 hover:bg-[#23232F] text-xs font-medium transition-colors shadow-sm"
            >
              {displayMode === 'map' ? (
                <>
                  <List className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Vue Liste & Distances</span>
                </>
              ) : (
                <>
                  <MapIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Vue Carte Interactive</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Region Filters Strip */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-[#8E8E9A] mr-1 hidden sm:inline">Région :</span>
          {MAP_REGIONS.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => setSelectedRegionId(region.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedRegionId === region.id
                  ? 'bg-gold-gradient text-black font-semibold shadow-md shadow-[#D4AF37]/25'
                  : 'bg-[#15151D] text-[#B0B0BD] hover:text-white border border-white/10 hover:border-[#D4AF37]/40'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-2xl bg-[#111116] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#22222E] text-white border border-white/20'
                : 'text-[#8E8E9A] hover:text-white'
            }`}
          >
            Tous ({ALL_MAP_POINTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('hotel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeCategory === 'hotel'
                ? 'bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/50 font-semibold'
                : 'text-[#8E8E9A] hover:text-[#E5C378]'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Hôtels El Mouradi ({MAP_HOTELS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('airport')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeCategory === 'airport'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 font-semibold'
                : 'text-[#8E8E9A] hover:text-sky-300'
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-sky-400" />
            <span>Aéroports ({MAP_AIRPORTS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('attraction')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeCategory === 'attraction'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-semibold'
                : 'text-[#8E8E9A] hover:text-emerald-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Attractions ({MAP_ATTRACTIONS.length})</span>
          </button>
        </div>

        {/* Search input & route toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E9A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher (ex: Sousse, TUN, Palace)..."
              className="w-full bg-[#181822] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#6E6E78] focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowRoutes(!showRoutes)}
            title="Activer/Désactiver le tracé des trajets VIP"
            className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1 shrink-0 ${
              showRoutes
                ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#F3E5AB]'
                : 'bg-[#181822] border-white/10 text-[#8E8E9A]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lignes VIP</span>
          </button>
        </div>
      </div>

      {/* Main View Mode: Interactive Map Canvas vs Detailed List */}
      {displayMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Interactive SVG Map Container */}
          <div className="lg:col-span-7 xl:col-span-8 bg-[#0D0D12] rounded-3xl border border-[#D4AF37]/25 p-3 sm:p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Map Top Status Bar */}
            <div className="flex items-center justify-between mb-2 px-1 z-10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
                </span>
                <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                  TUNISIE · {currentRegion.label.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] text-[#8E8E9A] bg-[#16161F] px-2 py-0.5 rounded-md border border-white/5">
                Cliquez sur un marqueur pour voir les accès
              </span>
            </div>

            {/* SVG Map Canvas */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.8] max-h-[640px] rounded-2xl overflow-hidden bg-[#07070A] border border-white/5 flex items-center justify-center">
              <svg
                viewBox="0 0 580 720"
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8))' }}
              >
                <defs>
                  {/* Subtle maritime grid pattern */}
                  <pattern id="marineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,175,55,0.04)" strokeWidth="0.8" />
                  </pattern>

                  {/* Gold glow filter */}
                  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient for animated route lines */}
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFF2B2" stopOpacity="0.9" />
                  </linearGradient>

                  <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14141D" />
                    <stop offset="50%" stopColor="#101016" />
                    <stop offset="100%" stopColor="#0B0B0E" />
                  </linearGradient>
                </defs>

                {/* Marine Background Grid */}
                <rect width="580" height="720" fill="url(#marineGrid)" />

                {/* Latitude and Longitude coordinate lines */}
                <g stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" strokeWidth="0.6">
                  <line x1="0" y1="180" x2="580" y2="180" />
                  <line x1="0" y1="360" x2="580" y2="360" />
                  <line x1="0" y1="540" x2="580" y2="540" />
                  <line x1="160" y1="0" x2="160" y2="720" />
                  <line x1="320" y1="0" x2="320" y2="720" />
                  <line x1="480" y1="0" x2="480" y2="720" />
                </g>

                {/* Sea/Maritime Labels */}
                <text x="440" y="80" fill="rgba(212,175,55,0.18)" fontSize="13" fontFamily="serif" fontStyle="italic" letterSpacing="4">
                  MER MÉDITERRANÉE
                </text>
                <text x="390" y="240" fill="rgba(212,175,55,0.15)" fontSize="10" fontFamily="serif" fontStyle="italic" letterSpacing="2">
                  GOLFE DE HAMMAMET
                </text>
                <text x="410" y="450" fill="rgba(212,175,55,0.15)" fontSize="10" fontFamily="serif" fontStyle="italic" letterSpacing="2">
                  GOLFE DE GABÈS
                </text>

                {/* Stylized Coastal Contour & Borders of Tunisia */}
                {/* Drawn to match real geographical features: Cap Blanc, Golfe de Tunis, Cap Bon, Sahel, Djerba, Chott El Djérid */}
                <g>
                  {/* Main Land Polygon */}
                  <path
                    d={`
                      M 80 120 
                      C 120 90, 190 70, 240 65
                      C 260 63, 275 80, 290 95
                      C 310 115, 335 125, 350 110
                      C 370 90, 395 105, 415 130
                      C 435 155, 410 190, 395 210
                      C 380 230, 370 250, 380 280
                      C 390 310, 420 330, 430 360
                      C 440 390, 420 420, 390 440
                      C 365 455, 360 480, 375 510
                      C 390 540, 420 560, 435 580
                      C 450 600, 420 640, 390 680
                      L 340 700
                      C 300 680, 280 650, 260 600
                      C 240 550, 210 520, 170 500
                      C 130 480, 110 440, 120 400
                      C 130 360, 110 320, 100 280
                      C 90 240, 70 180, 80 120
                      Z
                    `}
                    fill="url(#landGradient)"
                    stroke="rgba(212,175,55,0.4)"
                    strokeWidth="1.5"
                  />

                  {/* Île de Djerba Island */}
                  <path
                    d={`
                      M 440 540
                      C 460 535, 485 545, 480 565
                      C 475 585, 450 585, 435 570
                      C 425 560, 430 545, 440 540
                      Z
                    `}
                    fill="#151522"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                  />

                  {/* Kerkennah Islands */}
                  <path
                    d="M 445 405 C 455 400, 465 408, 458 418 C 450 422, 442 414, 445 405 Z"
                    fill="#14141F"
                    stroke="rgba(212,175,55,0.3)"
                    strokeWidth="1"
                  />

                  {/* Chott El Djérid Salt Flat (Pale gold silhouette) */}
                  <path
                    d="M 180 500 C 220 495, 270 515, 250 535 C 220 545, 170 530, 180 500 Z"
                    fill="rgba(212,175,55,0.06)"
                    stroke="rgba(212,175,55,0.2)"
                    strokeDasharray="2 3"
                    strokeWidth="0.8"
                  />
                  <text x="210" y="520" fill="rgba(212,175,55,0.3)" fontSize="8" fontFamily="serif" textAnchor="middle">
                    CHOTT EL DJÉRID
                  </text>
                </g>

                {/* Animated VIP Connection Routes */}
                {showRoutes && selectedPoint && (
                  <g className="routes-layer">
                    {relevantConnections.map((conn, idx) => {
                      const origin = projectPoint(
                        selectedPoint.latitude,
                        selectedPoint.longitude
                      );
                      const targetPt = ALL_MAP_POINTS.find(
                        (p) =>
                          p.id ===
                          (selectedPoint.type === 'hotel'
                            ? conn.targetId
                            : conn.hotelId)
                      );
                      if (!targetPt) return null;

                      const dest = projectPoint(targetPt.latitude, targetPt.longitude);

                      // Create a curved path
                      const dx = dest.x - origin.x;
                      const dy = dest.y - origin.y;
                      const cx = origin.x + dx * 0.5 - dy * 0.15;
                      const cy = origin.y + dy * 0.5 + dx * 0.15;

                      return (
                        <g key={`route-${idx}`}>
                          {/* Outer glow background line */}
                          <path
                            d={`M ${origin.x} ${origin.y} Q ${cx} ${cy} ${dest.x} ${dest.y}`}
                            fill="none"
                            stroke="rgba(212,175,55,0.2)"
                            strokeWidth="4"
                          />
                          {/* Animated dash line */}
                          <path
                            d={`M ${origin.x} ${origin.y} Q ${cx} ${cy} ${dest.x} ${dest.y}`}
                            fill="none"
                            stroke="url(#routeGrad)"
                            strokeWidth="1.8"
                            strokeDasharray="5 5"
                            className="animate-dash"
                          />
                          {/* Distance badge on curve midpoint */}
                          <g transform={`translate(${cx}, ${cy})`}>
                            <rect
                              x="-34"
                              y="-9"
                              width="68"
                              height="18"
                              rx="9"
                              fill="#0E0E14"
                              stroke="#D4AF37"
                              strokeWidth="0.8"
                            />
                            <text
                              x="0"
                              y="3"
                              fill="#F3E5AB"
                              fontSize="8"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="sans-serif"
                            >
                              {conn.distanceKm} km · {conn.driveTimeMin} min
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Map Markers for all filtered points */}
                <g className="markers-layer">
                  {filteredPoints.map((pt) => {
                    const pos = projectPoint(pt.latitude, pt.longitude);
                    const isSelected = selectedPointId === pt.id;

                    // Hotel Marker
                    if (pt.type === 'hotel') {
                      return (
                        <g
                          key={pt.id}
                          transform={`translate(${pos.x}, ${pos.y})`}
                          className="cursor-pointer transition-transform hover:scale-125"
                          onClick={() => setSelectedPointId(pt.id)}
                        >
                          {/* Pulsing ring if selected */}
                          {isSelected && (
                            <>
                              <circle
                                r="22"
                                fill="none"
                                stroke="#D4AF37"
                                strokeWidth="1.5"
                                opacity="0.6"
                                className="animate-ping"
                              />
                              <circle
                                r="17"
                                fill="none"
                                stroke="#FFF2B2"
                                strokeWidth="1"
                                opacity="0.8"
                              />
                            </>
                          )}

                          {/* Pin Coin Base */}
                          <circle
                            r={isSelected ? '13' : '10'}
                            fill="#121218"
                            stroke="#D4AF37"
                            strokeWidth={isSelected ? '2' : '1.5'}
                            filter="url(#goldGlow)"
                          />
                          <circle r={isSelected ? '10' : '7.5'} fill="#D4AF37" />

                          {/* Crown Icon center */}
                          <path
                            d="M -4 -2 L -2 3 L 2 3 L 4 -2 L 2 -0.5 L 0 -3 L -2 -0.5 Z"
                            fill="#0A0A0E"
                          />

                          {/* Label Tooltip */}
                          <g transform="translate(0, 20)">
                            <rect
                              x="-48"
                              y="-8"
                              width="96"
                              height="16"
                              rx="8"
                              fill={isSelected ? '#D4AF37' : '#14141C'}
                              stroke={isSelected ? '#FFF2B2' : 'rgba(212,175,55,0.4)'}
                              strokeWidth="0.8"
                            />
                            <text
                              x="0"
                              y="3"
                              fill={isSelected ? '#0A0A0E' : '#E8E8EE'}
                              fontSize="8"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="sans-serif"
                            >
                              {pt.name}
                            </text>
                          </g>
                        </g>
                      );
                    }

                    // Airport Marker
                    if (pt.type === 'airport') {
                      return (
                        <g
                          key={pt.id}
                          transform={`translate(${pos.x}, ${pos.y})`}
                          className="cursor-pointer transition-transform hover:scale-125"
                          onClick={() => setSelectedPointId(pt.id)}
                        >
                          {isSelected && (
                            <circle
                              r="18"
                              fill="none"
                              stroke="#38BDF8"
                              strokeWidth="1.5"
                              opacity="0.8"
                              className="animate-ping"
                            />
                          )}

                          {/* Circle badge */}
                          <circle
                            r={isSelected ? '11' : '8.5'}
                            fill="#0C2333"
                            stroke="#38BDF8"
                            strokeWidth="1.5"
                          />
                          {/* Airplane simplified shape */}
                          <path
                            d="M 0 -4 L 1.5 -1 L 5 0 L 1.5 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z"
                            fill="#38BDF8"
                          />

                          {/* Airport IATA Badge */}
                          <g transform="translate(0, -14)">
                            <rect
                              x="-18"
                              y="-7"
                              width="36"
                              height="14"
                              rx="7"
                              fill={isSelected ? '#38BDF8' : '#0F172A'}
                              stroke="#38BDF8"
                              strokeWidth="0.8"
                            />
                            <text
                              x="0"
                              y="3"
                              fill={isSelected ? '#080E1A' : '#E0F2FE'}
                              fontSize="7.5"
                              fontWeight="bold"
                              textAnchor="middle"
                              fontFamily="monospace"
                            >
                              {pt.iataCode}
                            </text>
                          </g>
                        </g>
                      );
                    }

                    // Attraction Marker
                    return (
                      <g
                        key={pt.id}
                        transform={`translate(${pos.x}, ${pos.y})`}
                        className="cursor-pointer transition-transform hover:scale-125"
                        onClick={() => setSelectedPointId(pt.id)}
                      >
                        {isSelected && (
                          <circle
                            r="15"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1.2"
                            opacity="0.8"
                            className="animate-ping"
                          />
                        )}

                        <circle
                          r={isSelected ? '9' : '6.5'}
                          fill="#06281E"
                          stroke="#10B981"
                          strokeWidth="1.2"
                        />
                        {/* Star / Sparkle shape */}
                        <circle r="2.5" fill="#10B981" />

                        {/* Text pin if selected or hovered */}
                        {isSelected && (
                          <g transform="translate(0, 16)">
                            <rect
                              x="-42"
                              y="-7"
                              width="84"
                              height="14"
                              rx="7"
                              fill="#06281E"
                              stroke="#10B981"
                              strokeWidth="0.8"
                            />
                            <text
                              x="0"
                              y="3"
                              fill="#A7F3D0"
                              fontSize="7"
                              fontWeight="600"
                              textAnchor="middle"
                            >
                              {pt.name}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* Compass Rose in Corner */}
                <g transform="translate(520, 60)">
                  <circle r="18" fill="#111118" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
                  <path d="M 0 -13 L 4 -2 L 13 0 L 2 4 L 0 13 L -4 2 L -13 0 L -2 -4 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                  <polygon points="0,-13 3,-2 0,0 -3,-2" fill="#D4AF37" />
                  <text x="0" y="-15" fill="#D4AF37" fontSize="8" fontWeight="bold" textAnchor="middle">
                    N
                  </text>
                </g>
              </svg>
            </div>

            {/* Map Bottom Legend */}
            <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#A0A0AB]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-gradient" />
                  <span className="text-white">Palais El Mouradi (5★)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-sky-300">Aéroports Internationaux</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-300">Attractions & UNESCO</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#8E8E9A]">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>Navettes VIP directes 24/7</span>
              </div>
            </div>
          </div>

          {/* Interactive Detail & Proximity Panel */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            {/* Sub-Tabs: Point Info vs VIP Trip Calculator */}
            <div className="p-1 rounded-xl bg-[#14141B] border border-white/10 flex text-xs">
              <button
                type="button"
                onClick={() => setActiveSubTab('details')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeSubTab === 'details'
                    ? 'bg-gold-gradient text-black font-semibold'
                    : 'text-[#8E8E9A] hover:text-white'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Fiche & Trajets Proches</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('calculator')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeSubTab === 'calculator'
                    ? 'bg-gold-gradient text-black font-semibold'
                    : 'text-[#8E8E9A] hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Calculateur VIP</span>
              </button>
            </div>

            {/* TAB 1: Selected Point Details */}
            {activeSubTab === 'details' && selectedPoint && (
              <div className="rounded-3xl bg-[#121217] border border-white/10 p-4 sm:p-5 flex-1 flex flex-col justify-between shadow-xl">
                <div>
                  {/* Category Pill and Region */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        selectedPoint.type === 'hotel'
                          ? 'bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40'
                          : selectedPoint.type === 'airport'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {selectedPoint.categoryTag || selectedPoint.type}
                    </span>

                    <span className="text-[11px] text-[#8E8E9A] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{selectedPoint.city}</span>
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                    {selectedPoint.name}
                  </h3>
                  <p className="text-xs text-[#E5C378] font-medium mt-0.5">
                    {selectedPoint.subtitle}
                  </p>

                  <p className="text-xs text-[#A0A0AB] mt-2.5 leading-relaxed">
                    {selectedPoint.description}
                  </p>

                  {/* If Hotel: Price and Stars */}
                  {selectedPoint.type === 'hotel' && selectedHotelData && (
                    <div className="mt-4 p-3 rounded-2xl bg-[#181822] border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-[#8E8E9A] uppercase tracking-wider">
                          Tarif Privilège
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="font-mono text-xl font-bold text-[#F3E5AB]">
                            {currency === 'TND'
                              ? selectedHotelData.pricePerNightTND
                              : selectedHotelData.pricePerNightEUR}
                          </span>
                          <span className="text-xs text-[#8E8E9A]">{currency} / nuit</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: selectedHotelData.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#8E8E9A]">
                          Avis d’élite : {selectedHotelData.rating}/5
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Relevant Connections Matrix */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                      <span className="flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Accès Rapides & Distances Réelles</span>
                      </span>
                      <span className="text-[10px] text-[#8E8E9A]">
                        {relevantConnections.length} liaisons
                      </span>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {relevantConnections.length > 0 ? (
                        relevantConnections.map((conn, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#171720] border border-white/5 hover:border-[#D4AF37]/30 transition-colors flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="min-w-0">
                              <span className="font-medium text-white block truncate">
                                {selectedPoint.type === 'hotel'
                                  ? conn.targetName
                                  : conn.hotelName}
                              </span>
                              <span className="text-[10px] text-[#8E8E9A] block truncate">
                                {conn.description}
                              </span>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-mono font-bold text-[#F3E5AB] block text-xs">
                                {conn.distanceKm} km
                              </span>
                              <span className="text-[10px] text-[#8E8E9A]">
                                ~{conn.driveTimeMin} min VIP
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-xs text-[#8E8E9A] bg-[#16161D] rounded-xl">
                          Aucun trajet direct calculé pour ce point.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-5 pt-3.5 border-t border-white/10 space-y-2">
                  {selectedPoint.type === 'hotel' && selectedHotelData && (
                    <button
                      type="button"
                      onClick={() => onBookHotel(selectedHotelData)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-black font-semibold text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Réserver ce Palais</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  )}

                  {selectedPoint.type === 'airport' && (
                    <button
                      type="button"
                      onClick={() =>
                        onNavigateToTransfer &&
                        onNavigateToTransfer(selectedPoint.iataCode, 'mouradi-palace')
                      }
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-200 font-semibold text-xs hover:bg-sky-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plane className="w-3.5 h-3.5 text-sky-400" />
                      <span>Commander Navette depuis cet Aéroport</span>
                    </button>
                  )}

                  {selectedPoint.type === 'attraction' && (
                    <button
                      type="button"
                      onClick={() => {
                        const closest = MAP_HOTELS.find(
                          (h) => h.id === selectedPoint.hotelId
                        );
                        if (closest) setSelectedPointId(closest.id);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E5AB] font-semibold text-xs hover:bg-[#D4AF37]/25 transition-colors flex items-center justify-center gap-2"
                    >
                      <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Voir le Palais El Mouradi le plus proche</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: VIP Distance & Shuttle Calculator */}
            {activeSubTab === 'calculator' && (
              <div className="rounded-3xl bg-[#121217] border border-white/10 p-4 sm:p-5 flex-1 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#D4AF37]" />
                      <span>Calculateur de Transfert VIP</span>
                    </h4>
                    <p className="text-xs text-[#8E8E9A] mt-1">
                      Estimez le temps et le coût d’un transfert en Berline Mercedes de prestige entre nos points de desserte.
                    </p>
                  </div>

                  {/* Origin Selector */}
                  <div>
                    <label className="block text-[11px] text-[#A0A0AB] mb-1 font-medium">
                      Point de Départ (Aéroport ou Gare) :
                    </label>
                    <select
                      value={calcOrigin}
                      onChange={(e) => setCalcOrigin(e.target.value)}
                      className="w-full bg-[#181822] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <optgroup label="Aéroports Internationaux">
                        {MAP_AIRPORTS.map((a) => (
                          <option key={a.id} value={a.id}>
                            ✈️ {a.name} ({a.iataCode})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Hôtels El Mouradi">
                        {MAP_HOTELS.map((h) => (
                          <option key={h.id} value={h.id}>
                            🏨 {h.name} ({h.city})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Destination Selector */}
                  <div>
                    <label className="block text-[11px] text-[#A0A0AB] mb-1 font-medium">
                      Destination d’Arrivée :
                    </label>
                    <select
                      value={calcDestination}
                      onChange={(e) => setCalcDestination(e.target.value)}
                      className="w-full bg-[#181822] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <optgroup label="Hôtels El Mouradi">
                        {MAP_HOTELS.map((h) => (
                          <option key={h.id} value={h.id}>
                            🏨 {h.name} ({h.city})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Attractions & Sites Touristiques">
                        {MAP_ATTRACTIONS.map((att) => (
                          <option key={att.id} value={att.id}>
                            🏛️ {att.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Result Box */}
                  {calculatedRoute && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1A1A24] to-[#121216] border border-[#D4AF37]/30 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 rounded-xl bg-[#0E0E12] border border-white/5">
                          <span className="text-[10px] text-[#8E8E9A] uppercase block">
                            Distance Routière
                          </span>
                          <span className="font-mono text-base font-bold text-[#F3E5AB]">
                            {calculatedRoute.distanceKm} km
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#0E0E12] border border-white/5">
                          <span className="text-[10px] text-[#8E8E9A] uppercase block">
                            Durée Estimée
                          </span>
                          <span className="font-mono text-base font-bold text-white">
                            ~{calculatedRoute.driveTimeMin} min
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-[#8E8E9A] block">
                            Tarif Forfait VIP Mercedes
                          </span>
                          <span className="font-mono text-lg font-bold text-[#D4AF37]">
                            {currency === 'TND'
                              ? `${calculatedRoute.priceTND} TND`
                              : `${calculatedRoute.priceEUR} €`}
                          </span>
                        </div>
                        <div className="text-right text-[10px] text-[#A0A0AB]">
                          <span>Berline Classe E</span>
                          <span className="block text-emerald-400">Eau & Wi-Fi Inclus</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#8E8E9A] leading-relaxed italic border-t border-white/5 pt-2">
                        {calculatedRoute.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToTransfer) {
                        const originAirport = MAP_AIRPORTS.find((a) => a.id === calcOrigin);
                        onNavigateToTransfer(originAirport?.iataCode || 'TUN', calcDestination);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-black font-semibold text-xs sm:text-sm shadow-md shadow-[#D4AF37]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Réserver cette Navette Directe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Detailed List View: Categorized by Region with Distances */
        <div className="space-y-6">
          {MAP_REGIONS.filter((r) => r.id !== 'all').map((region) => {
            const hotelsInRegion = MAP_HOTELS.filter((h) => h.region === region.id);
            const airportsInRegion = MAP_AIRPORTS.filter((a) => a.region === region.id);
            const attractionsInRegion = MAP_ATTRACTIONS.filter((att) => att.region === region.id);

            return (
              <div
                key={region.id}
                className="p-4 sm:p-5 rounded-3xl bg-[#111116] border border-white/10 space-y-4"
              >
                {/* Region Heading */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-cinzel text-lg font-bold text-white">
                        {region.label}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#E5C378] border border-[#D4AF37]/30">
                        {region.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#8E8E9A] mt-0.5">
                      {hotelsInRegion.length} hôtel(s) · {airportsInRegion.length} aéroport(s) · {attractionsInRegion.length} attraction(s)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegionId(region.id);
                      setDisplayMode('map');
                    }}
                    className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
                  >
                    <span>Voir sur la carte</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Hotels in Region */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5C378] mb-2.5 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Hôtels El Mouradi</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hotelsInRegion.map((hotel) => {
                      const fullHotel = HOTELS.find((h) => h.id === hotel.id);
                      return (
                        <div
                          key={hotel.id}
                          className="p-3.5 rounded-2xl bg-[#171720] border border-white/5 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h5 className="font-semibold text-white text-sm">
                                  {hotel.name}
                                </h5>
                                <span className="text-[11px] text-[#8E8E9A] block">
                                  {hotel.city}
                                </span>
                              </div>
                              <span className="font-mono text-xs font-bold text-[#F3E5AB]">
                                {currency === 'TND' ? `${hotel.pricePerNightTND} TND` : `${hotel.pricePerNightEUR} €`}
                              </span>
                            </div>

                            <p className="text-xs text-[#A0A0AB] mt-2 line-clamp-2">
                              {hotel.description}
                            </p>

                            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-sky-300 bg-sky-950/40 p-2 rounded-xl border border-sky-500/20">
                              <Plane className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                              <span className="truncate">
                                À {hotel.distanceToNearestAirportKm} km de {hotel.nearestAirportName}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPointId(hotel.id);
                                setDisplayMode('map');
                              }}
                              className="text-xs text-[#E5C378] hover:underline"
                            >
                              Localiser & Trajets
                            </button>

                            {fullHotel && (
                              <button
                                type="button"
                                onClick={() => onBookHotel(fullHotel)}
                                className="px-3 py-1.5 rounded-lg bg-gold-gradient text-black font-semibold text-xs hover:brightness-110"
                              >
                                Réserver
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Nearby Attractions */}
                {attractionsInRegion.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Attractions Touristiques & Culture</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {attractionsInRegion.map((att) => (
                        <div
                          key={att.id}
                          className="p-2.5 rounded-xl bg-[#14141B] border border-white/5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-white block truncate">
                              {att.name}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono">
                              {att.category}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#8E8E9A] block mt-0.5">
                            {att.highlight}
                          </span>
                          <span className="text-[11px] text-[#D4AF37] block mt-1.5">
                            À {att.distanceToClosestHotelKm} km du complexe
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
