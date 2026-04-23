'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;

type RingDir = 'cw' | 'ccw';

type Ring = {
  id: number;
  r: number;
  chars: string;
  rep: number;
  speed: number;
  dir: RingDir;
  alpha: number;
  fs: number;
  offset: string;
  hoverScale: number;
};

// Rings ordered inner → outer. Speeds are in seconds per full revolution
// and are intentionally on the slower side so the token feels calm.
// The three innermost rings sit inside the isotipo's bounding box — they
// peek through the logo's transparent areas and add a tight, "dense core"
// feel that makes the whole piece read as a token.
const RINGS: Ring[] = [
  { id: 0, r: 48,  chars: '·+·',               rep: 28, speed: 44,  dir: 'cw',  alpha: 0.90, fs: 5.4, offset: '0%',  hoverScale: 1.08 },
  { id: 1, r: 62,  chars: '·∗·+·',             rep: 22, speed: 52,  dir: 'ccw', alpha: 0.85, fs: 5.6, offset: '6%',  hoverScale: 1.07 },
  { id: 2, r: 74,  chars: '·╱·╲·',             rep: 24, speed: 64,  dir: 'cw',  alpha: 0.78, fs: 5.8, offset: '18%', hoverScale: 1.065 },
  { id: 3, r: 88,  chars: '·+·∗·',             rep: 18, speed: 58,  dir: 'ccw', alpha: 0.78, fs: 6.4, offset: '0%',  hoverScale: 1.06 },
  { id: 4, r: 104, chars: '·╱·╲·',              rep: 20, speed: 72,  dir: 'cw',  alpha: 0.72, fs: 6.6, offset: '15%', hoverScale: 1.05 },
  { id: 5, r: 124, chars: '─·░·╱·╲·+·─·',       rep: 18, speed: 88,  dir: 'ccw', alpha: 0.60, fs: 6.2, offset: '25%', hoverScale: 1.04 },
  { id: 6, r: 144, chars: '·○·+·○·∗·',           rep: 18, speed: 110, dir: 'cw',  alpha: 0.50, fs: 6.0, offset: '8%',  hoverScale: 1.035 },
  { id: 7, r: 164, chars: ':·╱·╲·═·+·:·',       rep: 22, speed: 96,  dir: 'ccw', alpha: 0.42, fs: 5.8, offset: '12%', hoverScale: 1.03 },
  { id: 8, r: 184, chars: '·+·╱·╲··░·+·',       rep: 28, speed: 130, dir: 'cw',  alpha: 0.34, fs: 5.2, offset: '62%', hoverScale: 1.025 },
  { id: 9, r: 200, chars: '·│·',                 rep: 96, speed: 180, dir: 'ccw', alpha: 0.26, fs: 4.8, offset: '0%',  hoverScale: 1.02 },
];

function circlePath(r: number) {
  return `M ${CX},${CY - r} A ${r},${r} 0 0,1 ${CX},${CY + r} A ${r},${r} 0 0,1 ${CX},${CY - r}`;
}

export default function HeroAsciiArt() {
  return (
    <div className="eq-hero-ascii-art group relative flex w-full max-w-[320px] items-center justify-center sm:max-w-[390px] lg:max-w-[420px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        style={{ aspectRatio: '1' }}
        aria-hidden
        className="block"
      >
        <defs>
          <filter id="eq-ring-glow" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {RINGS.map((ring) => (
            <path key={ring.id} id={`eq-rp-${ring.id}`} d={circlePath(ring.r)} fill="none" />
          ))}
        </defs>

        {/* Token coin edges — subtle concentric borders to sell the "token" feel */}
        <circle
          cx={CX}
          cy={CY}
          r={206}
          fill="none"
          stroke="rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.14)"
          strokeWidth={0.75}
          className="eq-token-edge"
        />
        <circle
          cx={CX}
          cy={CY}
          r={198}
          fill="none"
          stroke="rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.10)"
          strokeWidth={0.5}
          strokeDasharray="1 3"
          className="eq-token-edge"
        />
        {/* Inner bezel — dashed ring hugging the token's core, moved in to
            sit underneath the isotipo so the new inner ASCII rings can
            breathe between it and the mid rings. */}
        <circle
          cx={CX}
          cy={CY}
          r={40}
          fill="none"
          stroke="rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.28)"
          strokeWidth={0.75}
          strokeDasharray="2 4"
          className="eq-token-edge eq-token-edge-inner"
        />
        {/* Inner-core hairline — a tiny faint circle at the token's face */}
        <circle
          cx={CX}
          cy={CY}
          r={30}
          fill="none"
          stroke="rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.18)"
          strokeWidth={0.5}
          className="eq-token-edge eq-token-edge-inner"
        />

        {/* Rotating ASCII ring groups. Outer <g> handles hover scale;
            inner <g> handles continuous rotation so the two transforms
            can compose without stomping each other. */}
        {RINGS.map((ring) => (
          <g
            key={ring.id}
            className="eq-ascii-ring-wrap"
            style={
              {
                transformOrigin: `${CX}px ${CY}px`,
                '--eq-ring-hover-scale': ring.hoverScale,
              } as CSSProperties
            }
          >
            <g
              className="eq-ascii-ring"
              style={{
                animationName: ring.dir === 'cw' ? 'eq-ring-cw' : 'eq-ring-ccw',
                animationDuration: `${ring.speed}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                transformOrigin: `${CX}px ${CY}px`,
                color: `rgba(var(--eq-page-accent-rgb, 0, 180, 196), ${ring.alpha})`,
              }}
            >
              <text
                filter="url(#eq-ring-glow)"
                style={{
                  fill: 'currentColor',
                  fontSize: `${ring.fs}px`,
                  fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", monospace',
                  letterSpacing: '0.05em',
                }}
              >
                <textPath href={`#eq-rp-${ring.id}`} startOffset={ring.offset}>
                  {ring.chars.repeat(ring.rep)}
                </textPath>
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* EQUITTY isotipo — absolutely centered over the SVG */}
      <div className="eq-hero-isotipo-wrapper pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/equitty_isotipo.png"
          alt="EQUITTY"
          width={152}
          height={152}
          className="eq-hero-isotipo block"
          priority
        />
      </div>
    </div>
  );
}
