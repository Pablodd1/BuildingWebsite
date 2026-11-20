'use client';

import { useState } from 'react';
import { MapPin, Building2, Globe2 } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';

const COUNTRY_PINS = [
  { id: 'us', es: 'Estados Unidos', en: 'United States', city: 'Doral, Miami (Sede / HQ)', x: 265, y: 122, highlight: 'hq' },
  { id: 'mx', es: 'México', en: 'Mexico', city: 'México', x: 185, y: 175 },
  { id: 'gt', es: 'Guatemala', en: 'Guatemala', city: 'Guatemala', x: 215, y: 212 },
  { id: 'sv', es: 'El Salvador', en: 'El Salvador', city: 'El Salvador', x: 224, y: 225 },
  { id: 'hn', es: 'Honduras', en: 'Honduras', city: 'Honduras', x: 242, y: 215 },
  { id: 'do', es: 'República Dominicana', en: 'Dominican Republic', city: 'Rep. Dominicana', x: 318, y: 188 },
  { id: 'co', es: 'Colombia', en: 'Colombia', city: 'Medellín (Showroom)', x: 295, y: 272, highlight: 'showroom' },
  { id: 've', es: 'Venezuela', en: 'Venezuela', city: 'Venezuela', x: 332, y: 258 },
  { id: 'ec', es: 'Ecuador', en: 'Ecuador', city: 'Ecuador', x: 274, y: 300 },
  { id: 'pe', es: 'Perú', en: 'Peru', city: 'Perú', x: 288, y: 336 },
];

export default function AmericasMap() {
  const { isEs, bi } = useLanguage();
  const [selectedId, setSelectedId] = useState('us');

  const activePin = COUNTRY_PINS.find((c) => c.id === selectedId) || COUNTRY_PINS[0];

  return (
    <div className="bg-white rounded-[26px] border border-[#e5e7e5] p-5 sm:p-7 shadow-[0_18px_50px_rgba(16,36,50,0.06)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
        {/* Stylized Architectural Vector Map of the Americas */}
        <div className="relative rounded-[20px] bg-gradient-to-br from-[#eef3f5] via-[#f4f1eb] to-[#e7eff2] border border-[#dce4e7] p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#245b77]">
              <Globe2 className="w-3.5 h-3.5 text-[#d68a50]" />
              {isEs ? '10 Países · Américas' : '10 Countries · Americas'}
            </span>
            <span className="text-[11px] font-semibold text-[#66737c]">
              {isEs ? activePin.es : activePin.en}
            </span>
          </div>

          <svg
            viewBox="0 0 520 500"
            className="w-full h-auto max-h-[380px]"
            role="img"
            aria-label={isEs ? 'Mapa de las Américas con presencia en 10 países' : 'Map of the Americas showing 10 countries'}
          >
            {/* Subtle Latitude/Longitude Grid */}
            <g stroke="#d5e0e4" strokeWidth="1" strokeDasharray="3 4">
              <line x1="0" y1="125" x2="520" y2="125" />
              <line x1="0" y1="250" x2="520" y2="250" />
              <line x1="0" y1="375" x2="520" y2="375" />
              <line x1="170" y1="0" x2="170" y2="500" />
              <line x1="340" y1="0" x2="340" y2="500" />
            </g>

            {/* North America silhouette */}
            <path
              d="M95,25 L265,20 L315,65 L280,105 L268,142 L250,132 L222,135 L195,155 L205,188 L175,185 L145,148 L115,112 L90,65 Z"
              fill="#cddbe0"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Highlighted United States & Mexico Corridor */}
            <path
              d="M115,72 L272,72 L268,132 L248,125 L212,130 L185,155 L140,135 Z"
              fill="#245b77"
              fillOpacity="0.22"
            />
            <path
              d="M140,135 L195,148 L215,192 L188,200 L156,172 Z"
              fill="#245b77"
              fillOpacity="0.28"
            />

            {/* Central America + Caribbean */}
            <path
              d="M195,192 L222,202 L248,215 L264,235 L278,248 L266,256 L246,240 L220,226 L192,208 Z"
              fill="#245b77"
              fillOpacity="0.32"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            {/* Caribbean islands including Dominican Republic */}
            <path
              d="M285,172 L306,174 L330,184 L322,196 L298,186 Z"
              fill="#245b77"
              fillOpacity="0.35"
              stroke="#ffffff"
              strokeWidth="1.2"
            />

            {/* South America silhouette */}
            <path
              d="M278,248 L328,244 L375,264 L415,305 L395,375 L350,435 L312,482 L292,475 L292,410 L276,345 L264,295 L272,262 Z"
              fill="#cddbe0"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Highlighted Andean + Caribbean South America (CO, VE, EC, PE) */}
            <path
              d="M276,250 L345,248 L350,285 L310,305 L298,358 L272,340 L268,288 Z"
              fill="#245b77"
              fillOpacity="0.28"
            />

            {/* Connection Arc from Miami HQ to Medellín Showroom */}
            <path
              d="M265,122 Q325,190 295,272"
              fill="none"
              stroke="#d68a50"
              strokeWidth="2"
              strokeDasharray="5 4"
            />

            {/* Country Markers */}
            {COUNTRY_PINS.map((pin) => {
              const isSelected = pin.id === activePin.id;
              const isHub = Boolean(pin.highlight);
              return (
                <g
                  key={pin.id}
                  onMouseEnter={() => setSelectedId(pin.id)}
                  onClick={() => setSelectedId(pin.id)}
                  className="cursor-pointer"
                >
                  {(isSelected || isHub) && (
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isHub ? 14 : 11}
                      fill={pin.highlight === 'hq' ? '#d68a50' : '#245b77'}
                      fillOpacity="0.2"
                    />
                  )}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isHub ? 7 : isSelected ? 6.5 : 5}
                    fill={
                      pin.highlight === 'hq'
                        ? '#d68a50'
                        : pin.highlight === 'showroom'
                        ? '#142d3d'
                        : isSelected
                        ? '#d68a50'
                        : '#245b77'
                    }
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              );
            })}

            {/* Fixed Hub Labels */}
            <g transform="translate(278, 114)">
              <rect x="0" y="-12" width="126" height="22" rx="11" fill="#142d3d" />
              <text x="10" y="3" fontSize="10" fontWeight="700" fill="#ffffff">
                Doral, Miami (HQ)
              </text>
            </g>
            <g transform="translate(309, 270)">
              <rect x="0" y="-11" width="128" height="22" rx="11" fill="#ffffff" stroke="#d5e0e4" />
              <text x="10" y="4" fontSize="10" fontWeight="700" fill="#17242e">
                Medellín (Showroom)
              </text>
            </g>
          </svg>

          <p className="text-[11px] text-[#66737c] mt-2 text-center">{bi.home.presence.mapHint}</p>
        </div>

        {/* Country List & Dual Hubs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {COUNTRY_PINS.map((pin) => {
              const active = pin.id === activePin.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onMouseEnter={() => setSelectedId(pin.id)}
                  onClick={() => setSelectedId(pin.id)}
                  className={`text-left px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    active
                      ? 'bg-[#142d3d] text-white border-[#142d3d]'
                      : 'bg-[#f4f1eb]/70 text-[#17242e] border-[#e5e7e5] hover:border-[#d68a50]'
                  }`}
                >
                  <span className="truncate">{isEs ? pin.es : pin.en}</span>
                  {pin.highlight && (
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        pin.highlight === 'hq' ? 'bg-[#d68a50]' : 'bg-[#278d62]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-[#142d3d] text-white p-4 space-y-1">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#d68a50]">
              <Building2 className="w-3.5 h-3.5" />
              <span>{bi.home.presence.hqLabel}</span>
            </div>
            <p className="font-heading font-bold text-base text-white">{bi.home.presence.hqTitle}</p>
            <p className="text-xs text-[#d4dce1] leading-relaxed">{bi.home.presence.hqDesc}</p>
          </div>

          <div className="rounded-2xl bg-[#f4f1eb] border border-[#e5e7e5] p-4 space-y-1">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-bold text-[#245b77]">
              <MapPin className="w-3.5 h-3.5 text-[#d68a50]" />
              <span>{bi.home.presence.showroomLabel}</span>
            </div>
            <p className="font-heading font-bold text-base text-[#17242e]">
              {bi.home.presence.showroomTitle}
            </p>
            <p className="text-xs text-[#66737c] leading-relaxed">{bi.home.presence.showroomDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
