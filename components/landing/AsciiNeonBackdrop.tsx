// Each row shifts the ╲ one column right — continuous diagonal strokes.
// Two independent stroke streams at different column offsets give the
// impression of sparse, wide-set triangular shapes echoing the isotipo.
const TRIANGLE_PATTERN = `
·                   ╲                                        ╲                                        ·
                     ╲                                        ╲
                      ╲                                        ╲
                       ╲                         ·              ╲
                        ╲                                        ╲
          ·              ╲                                        ╲              ·
                          ╲                                        ╲
                           ╲                                        ╲
                            ╲                                        ╲
·                            ╲                    ·                   ╲                                ·
                              ╲                                        ╲
                               ╲                                        ╲
                                ╲                                        ╲
                                 ╲              ·                         ╲
                                  ╲                                        ╲
               ·                   ╲                                        ╲           ·
                                    ╲                                        ╲
                                     ╲                                        ╲
                                      ╲                                        ╲
·                                      ╲                   ·                    ╲                      ·
                                        ╲                                        ╲
                                         ╲                                        ╲
                                          ╲                         ·              ╲
                                           ╲                                        ╲
                    ·                       ╲                                        ╲   ·
`.trim();

export default function AsciiNeonBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute left-1/2 top-[8%] w-[min(130vw,80rem)] max-w-none -translate-x-1/2">
        <pre className="eq-ascii-backdrop-pre eq-ascii-backdrop-drift text-[0.6rem] leading-[1.55] tracking-tight whitespace-pre sm:text-[0.68rem]">
          {TRIANGLE_PATTERN}
        </pre>
      </div>
      <div className="absolute bottom-[6%] left-1/2 w-[min(120vw,74rem)] max-w-none -translate-x-1/2">
        <pre
          className="eq-ascii-backdrop-pre eq-ascii-backdrop-drift text-[0.55rem] leading-[1.55] tracking-tight whitespace-pre opacity-60 sm:text-[0.62rem]"
          style={{ animationDelay: '-18s' }}
        >
          {TRIANGLE_PATTERN}
        </pre>
      </div>
    </div>
  );
}
