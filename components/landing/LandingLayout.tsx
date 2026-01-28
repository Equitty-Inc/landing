"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type Props = {
  locale: "en" | "es";
  onSubmitWaitlist: (payload: { email: string; nationality: string; locale: string }) => Promise<void>;
};

const countries = ["El Salvador", "United States", "Panama", "Mexico", "Colombia", "Argentina", "Chile", "Spain", "Brazil", "Canada", "Germany", "France"]
  .slice()
  .sort();

export default function LandingLayout({ locale, onSubmitWaitlist }: Props) {
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState(countries[0] ?? "");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const t = {
    en: {
      badge: "● Early Access Open",
      h1a: "The investment platform for",
      h1b: "Real-World Assets",
      desc: "Be among the first to discover how the future of digital investing is being built.",
      labelCountry: "Nationality",
      labelEmail: "Email Address",
      btn: "Reserve your spot",
      disclaimer: "Joining the waitlist is not an offer to sell. Investing involves risk. Please review our",
      privacy: "Privacy Policy",
      successTitle: "You are on the list!",
      successDesc: "Your signup was saved successfully.",
    },
    es: {
      badge: "● Acceso Anticipado Abierto",
      h1a: "La plataforma de inversión para",
      h1b: "Activos Reales",
      desc: "Sé de los primeros en conocer cómo se está construyendo el futuro de la inversión digital.",
      labelCountry: "Nacionalidad",
      labelEmail: "Correo Electrónico",
      btn: "Reserva tu lugar",
      disclaimer: "Unirse a la lista no es una oferta de venta. Invertir conlleva riesgo. Revisa nuestra",
      privacy: "Política de Privacidad",
      successTitle: "¡Estás en la lista!",
      successDesc: "Tu registro fue guardado correctamente.",
    },
  }[locale];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmitWaitlist({ email, nationality, locale });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#050A14] text-white">
      {/* NAV */}
      <nav className="fixed w-full z-50 top-0 bg-[#050A14]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" onClick={() => window.location.reload()} className="group hover:scale-105 transition-transform duration-300">
            <Image
              src="/equitty_logo_white.png"
              alt="EQUITTY"
              width={140}
              height={28}
              className="h-6 md:h-7 w-auto group-hover:drop-shadow-[0_0_15px_rgba(0,180,196,0.6)] transition-all"
              priority
            />
          </a>

          {/* Language buttons: usa rutas /en y /es (mejor que el JS del HTML) */}
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <Link
              href="/es"
              className={`cursor-pointer px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all ${
                locale === "es" ? "bg-[#00B4C4] text-[#050A14] shadow-[0_0_10px_rgba(0,180,196,0.4)]" : "text-slate-400 hover:text-white"
              }`}
            >
              ES
            </Link>
            <Link
              href="/en"
              className={`cursor-pointer px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all ${
                locale === "en" ? "bg-[#00B4C4] text-[#050A14] shadow-[0_0_10px_rgba(0,180,196,0.4)]" : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center relative pt-24 pb-12 px-6">
        {/* Isotipo glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <Image src="/equitty_isotipo.png" alt="" width={700} height={700} className="w-[70vw] md:w-[45vw] max-w-[500px] animate-pulse-glow" />
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 mx-auto">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border border-[#00B4C4]/30 bg-[#00B4C4]/10 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-[#00B4C4] tracking-widest uppercase">{t.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.h1a} <br />
              <span className="text-gradient">{t.h1b}</span>
            </h1>

            <p className="text-gray-400 text-lg font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">{t.desc}</p>
          </div>

          {/* Right card */}
          <div className="w-full max-w-[420px] mx-auto lg:ml-auto">
            {!submitted ? (
              <div className="glass-panel p-8 rounded-2xl border-t border-white/10 transition-all duration-500 transform relative z-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-[#00B4C4] uppercase ml-1">{t.labelCountry}</label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full mt-1 bg-[#050A14]/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#00B4C4] outline-none transition-colors"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#00B4C4] uppercase ml-1">{t.labelEmail}</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full mt-1 bg-[#050A14]/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#00B4C4] outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#00B4C4] to-[#006AD5] font-bold text-white shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {loading ? "Processing..." : t.btn}
                  </button>
                </form>

                <div className="mt-6 text-center border-t border-white/5 pt-4">
                  <p className="text-[10px] text-gray-500 leading-tight">
                    {t.disclaimer}{" "}
                    <button type="button" onClick={() => setPrivacyOpen(true)} className="text-[#00B4C4] hover:underline font-bold">
                      {t.privacy}
                    </button>
                    .
                  </p>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-2xl border-t border-white/10 text-center transition-all duration-500 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-[#00B4C4]/20 rounded-full flex items-center justify-center mb-4 text-[#00B4C4]">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h2>
                <p className="text-gray-400 text-sm mb-6">{t.successDesc}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 flex justify-center">
          <div className="flex space-x-8 text-gray-400">
            {/* puedes copiar tus íconos tal cual, aquí solo dejo placeholders */}
            <a className="hover:text-[#00B4C4] transition-all" href="https://x.com/EQUITTY_" target="_blank">X</a>
            <a className="hover:text-[#00B4C4] transition-all" href="https://www.instagram.com/equitty_/" target="_blank">IG</a>
            <a className="hover:text-[#00B4C4] transition-all" href="https://www.linkedin.com/company/equitty0/" target="_blank">IN</a>
          </div>
        </div>
      </footer>

      {/* PRIVACY MODAL simple */}
      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPrivacyOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl p-8 animate-fade-in z-[101]">
            <h3 className="text-xl font-bold text-white mb-4">Privacy Policy</h3>
            <div className="text-sm text-gray-400 space-y-3 mb-6 leading-relaxed">
              <p><strong>1. Data Collection:</strong> We collect your email solely for managing the waitlist.</p>
              <p><strong>2. Security:</strong> Your data is stored securely and is never sold.</p>
              <p><strong>3. Communications:</strong> By joining, you agree to receive transactional emails.</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setPrivacyOpen(false)} className="bg-[#00B4C4] text-[#050A14] font-bold px-5 py-2 rounded-lg hover:bg-white transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
