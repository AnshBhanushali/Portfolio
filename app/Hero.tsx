"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ---------------- Rotating Text ---------------- */
function RotatingText({
  items,
  typingSpeed = 60,
  deletingSpeed = 40,
  pause = 1100,
}: {
  items: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || items.length === 0) return;

    if (!del && len === items[i].length) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }

    if (del && len === 0) {
      setDel(false);
      setI((prev) => (prev + 1) % items.length);
      return;
    }

    const t = setTimeout(
      () => setLen((prev) => prev + (del ? -1 : 1)),
      del ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(t);
  }, [mounted, items, i, len, del, typingSpeed, deletingSpeed, pause]);

  if (!mounted) return null;

  return (
    <span className="whitespace-nowrap" aria-live="polite" suppressHydrationWarning>
      {items[i].slice(0, len)}
      <span
        className="ml-1 inline-block align-baseline w-[2px] h-[1em] bg-slate-200/80 animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}

/* ---------------- Spec Chip (compact + premium) ---------------- */
function SpecChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className={`relative rounded-2xl p-[1px] bg-gradient-to-br ${accent}`}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur transition-all duration-300 hover:bg-white/[0.09] hover:border-white/15 hover:-translate-y-0.5">
        <p className="text-[11px] tracking-wider uppercase text-white/55">{label}</p>
        <p className="mt-1 text-sm font-medium text-white/90">{value}</p>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
export default function Hero() {
  const rotating = useMemo(
    () => [
      "AI products that ship",
      "RAG systems with real retrieval",
      "distributed platforms at scale",
      "financial intelligence tools",
      "secure ML pipelines",
    ],
    []
  );

  // subtle cursor spotlight
  const [spot, setSpot] = useState({ x: 50, y: 35 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpot({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen ...">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* mesh blobs */}
        <div className="absolute inset-0 opacity-[0.22]">
          <div className="absolute -top-24 left-1/3 h-[520px] w-[520px] rounded-full bg-indigo-500/30 blur-[120px]" />
          <div className="absolute top-1/3 -left-28 h-[520px] w-[520px] rounded-full bg-cyan-400/25 blur-[120px]" />
          <div className="absolute -bottom-40 right-[-120px] h-[560px] w-[560px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
        </div>

        {/* spotlight */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background: `radial-gradient(700px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.12), transparent 55%)`,
          }}
        />

        {/* grain + vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.78))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="w-full">
          {/* Top pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.55)]" />
            <span className="text-xs tracking-wider text-slate-200/90">
              OPEN TO NEW GRAD · SWE / AI / SYSTEMS
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl md:text-5xl leading-[1.06]">
            I’m{" "}
            <span className="relative inline-block">
              <span className="text-white">Ansh </span>
              <span className="text-white/70">Bhanushali</span>
              <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/60 to-fuchsia-300/0" />
            </span>

            <span className="block mt-5 text-white/85">
              I build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-200 to-fuchsia-200">
                <RotatingText items={rotating} />
              </span>
              .
            </span>
          </h1>

          {/* Premium bio copy */}
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-300/90 sm:text-lg">
  I like to turn ideas into{" "}
  <span className="text-white/90">products people use -</span> shipping fast, iterating with feedback,
  and engineering for{" "}
  <span className="text-white/90">quality</span> from day one.
</p>

          {/* Signature line */}
          <p className="mt-4 text-sm text-white/55">
            Precision. Depth. Engineering
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#tech-vault"
              className="group inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition
                         hover:opacity-95 hover:shadow-[0_18px_60px_rgba(255,255,255,0.12)]"
            >
              Explore work
              <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            <Link
              href="/Ansh_Bhanushali_Resume.pdf"
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90
                         backdrop-blur transition hover:border-white/25 hover:bg-white/10 hover:shadow-[0_18px_60px_rgba(99,102,241,0.12)]"
            >
              Resume
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 transition
                         hover:text-white hover:border-white/20"
            >
              Contact
            </Link>
          </div>

          {/* Compact spec chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            <SpecChip
              label="Focus"
              value="AI Systems · RAG · Agents"
              accent="from-cyan-400/30 via-indigo-400/10 to-fuchsia-400/30"
            />
            <SpecChip
              label="Stack"
              value="Next.js · React · Python"
              accent="from-fuchsia-400/30 via-indigo-400/10 to-cyan-400/30"
            />
            <SpecChip
              label="Edge"
              value="Finance + Product Thinking"
              accent="from-emerald-400/25 via-indigo-400/10 to-cyan-400/25"
            />
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/40">
        Scroll ↓
      </div>
    </section>
  );
}