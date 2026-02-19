"use client";

import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

/* ---------- hero-like typography tokens ---------- */
const T = {
  h: "text-white/90",
  body: "text-slate-300/90",
  meta: "text-white/55",
};

/* ---------- premium hover (glow only) ---------- */
const hoverFX = "transition hover:shadow-[0_0_30px_-12px_rgba(56,189,248,0.22)]";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#070A12] text-white">
      {/* hero-matching mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute -top-24 left-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/25 blur-[110px]" />
          <div className="absolute top-1/3 -left-28 h-[420px] w-[420px] rounded-full bg-cyan-400/18 blur-[110px]" />
          <div className="absolute -bottom-40 right-[-120px] h-[460px] w-[460px] rounded-full bg-fuchsia-500/18 blur-[130px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.0),rgba(0,0,0,0.72))]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          {/* Left: branding */}
          <div className="text-center md:text-left">
            <div className={`text-lg font-semibold ${T.h}`}>Ansh Bhanushali</div>
            <p className={`mt-1 text-sm ${T.meta}`}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Center: quick links */}
          <nav className="flex items-center justify-center gap-6">
            {[
              { href: "#projects", label: "Projects" },
              { href: "#experience", label: "Experience" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`
                  rounded-full border border-white/10 bg-white/[0.02] px-4 py-2
                  text-sm ${T.body} backdrop-blur
                  hover:bg-white/[0.05] hover:text-white
                  ${hoverFX}
                `}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: socials */}
          <div className="flex items-center justify-center gap-3 md:justify-end">
            <Link
              href="https://github.com/AnshBhanushali"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`
                inline-flex items-center justify-center
                rounded-full border border-white/10 bg-white/[0.02]
                p-3 text-white/70 backdrop-blur
                hover:bg-white/[0.05] hover:text-white
                ${hoverFX}
              `}
            >
              <SiGithub className="h-5 w-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/anshbhanushali"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`
                inline-flex items-center justify-center
                rounded-full border border-white/10 bg-white/[0.02]
                p-3 text-white/70 backdrop-blur
                hover:bg-white/[0.05] hover:text-white
                ${hoverFX}
              `}
            >
              <SiLinkedin className="h-5 w-5 text-[#0a66c2]" />
            </Link>
          </div>
        </div>

        {/* subtle divider + tiny line */}
        <div className="mt-10 h-px w-full bg-white/10" />
        <p className="mt-4 text-center text-[11px] text-white/45">
          Built with Next.js • Tailwind • Framer Motion
        </p>
      </div>
    </footer>
  );
}