'use client';

import Image from 'next/image';

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;

const RINGS = [
  { id: 0, r: 96,  chars: '·╱·╲·─·+·░·', rep: 13, speed: 30, dir: 'cw',  alpha: 0.80, fs: 6.8, offset: '0%'   },
  { id: 1, r: 124, chars: '─·░·╱·╲·+·─·', rep: 16, speed: 46, dir: 'ccw', alpha: 0.62, fs: 6.2, offset: '25%'  },
  { id: 2, r: 153, chars: ':·╱·╲·═·+·:·', rep: 20, speed: 38, dir: 'cw',  alpha: 0.48, fs: 5.6, offset: '12%'  },
  { id: 3, r: 182, chars: '·+·╱·╲··░·+·', rep: 25, speed: 60, dir: 'ccw', alpha: 0.32, fs: 5.0, offset: '62%'  },
] as const;

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

        {/* Layered radial glows behind isotipo */}
        {/* <circle
          cx={CX}
          cy={CY}
          r={84}
          style={{ fill: 'rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.07)' }}
          className="eq-hero-center-outer"
        />
        <circle
          cx={CX}
          cy={CY}
          r={56}
          style={{ fill: 'rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.13)' }}
          className="eq-hero-center-inner"
        /> */}

        {/* Rotating ASCII ring groups */}
        {RINGS.map((ring) => (
          <g
            key={ring.id}
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
