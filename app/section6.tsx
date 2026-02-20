// app/section6.tsx
"use client";

import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { HiOutlineMail, HiCheck } from "react-icons/hi";
import Link from "next/link";

/* ---------- hero-like typography tokens ---------- */
const T = {
  h: "text-white/90",
  body: "text-slate-300/90",
  meta: "text-white/55",
  subtle: "text-slate-400",
};

/* ---------- premium hover (glow only) ---------- */
const hoverFX =
  "transition hover:shadow-[0_0_34px_-10px_rgba(56,189,248,0.28)]";

/* ---------- helper card component ---------- */
function ContactCard({
  children,
  href,
  onClick,
  label,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  label: string;
}) {
  const [beam, setBeam] = useState(false);

  const baseCard =
    "group relative flex h-full w-full select-none flex-col items-center justify-center overflow-hidden rounded-3xl " +
    "border border-white/10 bg-white/[0.035] backdrop-blur p-6 " +
    hoverFX;

  const wash =
    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100";

  const scan =
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.06),transparent_60%)]";

  const Inner = (
    <>
      {/* premium glow wash */}
      <div className={wash}>
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-[70px]" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      {/* neon scan beam */}
      {beam && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "200%" }}
          transition={{ duration: 1.25, ease: "linear", repeat: Infinity }}
          className={scan}
        />
      )}

      <div className="relative z-10 flex flex-col items-center gap-4">
        {children}
        <span className={`text-base font-semibold ${T.h}`}>{label}</span>
        <span className={`text-[11px] ${T.meta}`}>Tap to open</span>
      </div>
    </>
  );

  // link card
  if (href) {
    return (
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable={false}
        className="h-56 w-full sm:w-64"
        onEnter={() => setBeam(true)}
        onLeave={() => setBeam(false)}
      >
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          className={baseCard}
          aria-label={label}
        >
          {Inner}
        </motion.a>
      </Tilt>
    );
  }

  // clickable card (copy)
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={false}
      className="h-56 w-full sm:w-64"
      onEnter={() => setBeam(true)}
      onLeave={() => setBeam(false)}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={baseCard + " cursor-pointer"}
        aria-label={label}
      >
        {Inner}
      </motion.button>
    </Tilt>
  );
}

/* ---------- main section ---------- */
export default function SectionSix() {
  const [copied, setCopied] = useState(false);

<<<<<<< HEAD
  const EMAIL = "bhanusad@mail.uc.edu";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback: open mail client if clipboard blocked
      window.location.href = `mailto:${EMAIL}`;
    }
=======
  const copyEmail = () => {
    navigator.clipboard.writeText("bhanusad@mail.uc.edu");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
>>>>>>> 205598d44a3df67bf29ad18dad53ffedc93d5522
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#070A12] py-24 sm:py-28 px-4 lg:px-0 text-white"
    >
      {/* Hero-matching mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.22]">
          <div className="absolute -top-24 left-1/3 h-[520px] w-[520px] rounded-full bg-indigo-500/30 blur-[120px]" />
          <div className="absolute top-1/3 -left-28 h-[520px] w-[520px] rounded-full bg-cyan-400/25 blur-[120px]" />
          <div className="absolute -bottom-40 right-[-120px] h-[560px] w-[560px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.78))]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-12 sm:mb-14 text-center">
          <p className={`text-[11px] tracking-[0.22em] uppercase ${T.meta}`}>
            Contact
          </p>
          <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold ${T.h}`}>
            Let’s{" "}
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              connect
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${T.body}`}>
            Fast replies, clean context, and clear next steps.
          </p>
        </div>

        {/* contact cards */}
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          <ContactCard
            href="https://www.linkedin.com/in/anshbhanushali"
            label="LinkedIn"
          >
            <SiLinkedin className="h-11 w-11 text-[#0a66c2]" />
          </ContactCard>

          <ContactCard onClick={copyEmail} label={copied ? "Copied!" : "Email"}>
            {copied ? (
              <HiCheck className="h-11 w-11 text-emerald-400" />
            ) : (
              <HiOutlineMail className="h-11 w-11 text-slate-200/80" />
            )}
          </ContactCard>

          <ContactCard
            href="https://github.com/AnshBhanushali"
            label="GitHub"
          >
            <SiGithub className="h-11 w-11 text-slate-200/80" />
          </ContactCard>
        </div>

        {/* resume CTA (premium) */}
        <div className="mt-14 sm:mt-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur p-7 sm:p-9">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className={`text-[11px] tracking-[0.22em] uppercase ${T.meta}`}>
                Resume
              </p>
              <h3 className={`text-xl sm:text-2xl font-semibold ${T.h}`}>
                Explore my{" "}
                <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  professional story
                </span>
              </h3>
              <p className={`max-w-2xl text-sm ${T.body}`}>
                Download my latest resume for a detailed view of projects, impact,
                and technical depth.
              </p>

              <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/Ansh_Bhanushali_Resume.pdf"
                  download
                  className="
                    inline-flex items-center justify-center
                    rounded-full border border-white/12 bg-white/[0.035]
                    px-6 py-2.5 text-[13px] font-medium text-white/85
                    backdrop-blur transition hover:bg-white/[0.06]
                  "
                >
                  Download Resume
                </Link>

                <a
                  href={`mailto:${EMAIL}`}
                  className="
                    inline-flex items-center justify-center
                    rounded-full border border-white/10
                    px-6 py-2.5 text-[13px] font-medium text-white/75
                    transition hover:bg-white/[0.04]
                  "
                >
                  Email me
                </a>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}