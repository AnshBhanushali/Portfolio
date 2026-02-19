// app/section2.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineCode } from "react-icons/hi";
import { useEffect, useMemo, useState } from "react";

/* scroll-reveal */
const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

/* hover glow only (no outline ring) */
const hoverFX =
  "hover:before:opacity-100 before:pointer-events-none before:absolute before:inset-0 \
   before:rounded-3xl before:opacity-0 \
   hover:shadow-[0_0_28px_-6px_rgba(0,192,255,0.40)] transition";

/* ---------- Premium Typography Tokens (Hero-like) ---------- */
const T = {
  h: "text-white/90",
  body: "text-slate-300/90",
  meta: "text-white/55",
  subtle: "text-slate-400",
};

/* ---------- Neon chip (hero-style rim) ---------- */
function NeonChip({ label }: { label: string }) {
  return (
    <span
      className="
        relative inline-flex items-center justify-center
        rounded-full px-3 py-1.5 text-[11px] font-medium
        text-slate-200/90
        border border-white/10 bg-white/[0.035]
        backdrop-blur
        transition
        hover:text-white hover:border-white/15
        hover:shadow-[0_0_18px_rgba(56,189,248,0.18)]
        before:pointer-events-none before:absolute before:inset-0 before:rounded-full
        before:bg-[linear-gradient(135deg,rgba(34,211,238,0.35),rgba(99,102,241,0.10),rgba(236,72,153,0.30))]
        before:opacity-0 hover:before:opacity-100
        before:blur-[10px]
      "
    >
      {label}
    </span>
  );
}

/* ---------- Sliding rows (alternating directions) ---------- */
function SlidingRows({ rows }: { rows: string[][] }) {
  return (
    <div className="relative mt-4 space-y-3">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#11121d] to-transparent opacity-90" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#11121d] to-transparent opacity-90" />

      {rows.map((row, idx) => {
        const dirClass = idx % 2 === 0 ? "marquee-right" : "marquee-left";
        const duration = idx === 0 ? 22 : idx === 1 ? 26 : 24;

        return (
          <div key={idx} className="overflow-hidden">
            <div
              className={`flex w-max gap-2 ${dirClass}`}
              style={{ animationDuration: `${duration}s` }}
            >
              {[...row, ...row].map((t, i) => (
                <NeonChip key={`${idx}-${t}-${i}`} label={t} />
              ))}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .marquee-right {
          animation: slideRight linear infinite;
        }
        .marquee-left {
          animation: slideLeft linear infinite;
        }
        @keyframes slideRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }
        @keyframes slideLeft {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-right,
          .marquee-left {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Dotted Globe (screenshot-style) ---------- */
function DottedGlobe({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 560"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gGlow" cx="50%" cy="100%" r="85%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.14" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="sphere" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#0b1b4a" stopOpacity="1" />
          <stop offset="55%" stopColor="#08123a" stopOpacity="1" />
          <stop offset="100%" stopColor="#060a24" stopOpacity="1" />
        </radialGradient>

        <linearGradient id="orbit" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
        </linearGradient>

        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="#c7d2fe" opacity="0.28" />
        </pattern>

        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* vignette */}
        <linearGradient id="fadeTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#11121d" stopOpacity="0.0" />
          <stop offset="70%" stopColor="#11121d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#11121d" stopOpacity="0.92" />
        </linearGradient>
      </defs>

      {/* horizon glow */}
      <rect x="0" y="0" width="1200" height="560" fill="url(#gGlow)" opacity="0.95" />

      {/* globe */}
      <g transform="translate(600 560)">
        <circle r="360" fill="url(#sphere)" />
        <circle r="360" fill="url(#dots)" opacity="0.95" />

        {/* subtle "continent-ish" blobs */}
        <g opacity="0.32">
          <path
            d="M-220 -130 C-250 -175,-225 -220,-165 -235 C-70 -255,-60 -170,-110 -150 C-140 -136,-175 -120,-220 -130Z"
            fill="#93c5fd"
          />
          <path
            d="M40 -240 C110 -260,185 -220,165 -170 C145 -120,90 -100,40 -115 C-10 -130,-20 -220,40 -240Z"
            fill="#a78bfa"
          />
          <path
            d="M140 -130 C205 -150,260 -120,250 -70 C240 -20,165 -10,130 -40 C95 -70,95 -120,140 -130Z"
            fill="#67e8f9"
          />
        </g>

        {/* orbit arc */}
        <path
          d="M-560 120 C -250 -10, 250 -10, 560 120"
          fill="none"
          stroke="url(#orbit)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 24"
          opacity="0.95"
          filter="url(#softGlow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="240"
            to="0"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* orbit dots */}
        {[
          { x: -380, y: 80, c: "#22d3ee" },
          { x: -120, y: 25, c: "#60a5fa" },
          { x: 180, y: 35, c: "#a78bfa" },
          { x: 420, y: 90, c: "#22d3ee" },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="6"
            fill={p.c}
            opacity="0.85"
            filter="url(#softGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.55;0.95;0.55"
              dur={`${2.8 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      <rect x="0" y="0" width="1200" height="560" fill="url(#fadeTop)" opacity="0.9" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */

export function SectionTwo() {
  /* Hydration-safe timezone (compute on client only) */
  const [formattedOffset, setFormattedOffset] = useState<string | null>(null);
  useEffect(() => {
    const offset = new Date().getTimezoneOffset() / -60;
    const str =
      (offset >= 0 ? "+" : "-") +
      String(Math.abs(Math.trunc(offset))).padStart(2, "0") +
      ":00";
    setFormattedOffset(str);
  }, []);

  // Updated modern stack (AI/ML + systems + your interests)
  const techRows = useMemo(
    () => [
      [
        "Next.js",
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "Docker",
        "Kubernetes",
        "Azure",
        "PostgreSQL",
        "MongoDB",
      ],
      [
        "RAG",
        "Agents",
        "LangChain",
        "LlamaIndex",
        "Vector DBs",
        "Eval",
        "Observability",
        "CI/CD",
        "Redis",
        "Kafka",
      ],
      [
        "PyTorch",
        "Transformers",
        "OpenAI API",
        "Prompting",
        "A/B Testing",
        "Security",
        "Rate Limiting",
        "Monitoring",
        "MLOps",
        "ETL",
      ],
    ],
    []
  );

  return (
    <section
      id="portfolio"
      className="relative pb-32 pt-24 text-white px-4 lg:px-0 bg-[#070A12] overflow-hidden"
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

      <div className="relative mx-auto grid max-w-6xl auto-rows-auto md:auto-rows-[260px] gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* 1 ▸ About Me (TEXT UNCHANGED, only style harmonized) */}
        <motion.article
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`
            flex flex-col lg:flex-row
            col-span-1 row-span-1
            lg:col-span-3 lg:row-span-2
            overflow-hidden
            rounded-3xl
            bg-[#11121d]
            ${hoverFX}
          `}
        >
          <div className="flex-1 p-4 lg:pr-12 lg:pl-8 flex flex-col justify-center">
            <h3 className={`text-2xl sm:text-3xl font-semibold leading-snug mb-4 ${T.h}`}>
              About Me
            </h3>

            <p className={`text-xs sm:text-sm mb-2 ${T.body}`}>
              Hi, I’m <span className="text-sky-300/90 font-medium">Ansh Bhanushali</span>. I’m a junior at the University
              of Cincinnati pursuing Computer Science with a minor in Finance. Ever since I wrote my first algorithm in high
              school, I’ve been captivated by how AI powered software can address real world challenges.
            </p>

            <p className={`text-xs sm:text-sm mb-2 ${T.body}`}>
              At <span className="text-indigo-300/90 font-medium">Siemens</span> I interned on a team building GenAI
              solutions on Azure. I helped develop automated workflows that processed large datasets with machine learning
              models and deployed them on Azure Kubernetes Service. Working alongside data scientists and software engineers
              taught me how to design scalable web services and leverage Azure Cognitive Services for real time analytics.
            </p>

            <p className={`text-xs sm:text-sm mb-2 ${T.body}`}>
              As a <span className="text-indigo-300/90 font-medium">research assistant</span> I assisted with research on
              voice modulation for assistive technologies. My role involves implementing signal processing pipelines that use
              Python and PyTorch to adapt speech output dynamically. Our prototype won a best poster award at the CEAS
              symposium, and I continue refining algorithms that make synthetic voices sound more natural.
            </p>

            <p className={`text-xs sm:text-sm mb-2 ${T.body}`}>
              Beyond internships and research, I mentor first year engineering students in CEAS lab coding sessions. I organize
              weekly “AI and Engineering” meetups to demonstrate building full stack applications with FastAPI and React.
              Hands on collaboration drives my belief that learning by doing accelerates mastery.
            </p>

            <p className={`text-xs sm:text-sm ${T.body}`}>
              When I’m not coding or in lab, I’m exploring the latest AI papers or shooting hoops with friends. I also enjoy
              hiking on the Little Miami Scenic Trail. My goal is to build intelligent systems that feel seamless and
              empowering so people can focus on creative problem solving instead of fighting with technology.
            </p>
          </div>

          <div className="flex justify-center items-center mt-6 lg:mt-0">
            <Image
              src="/myphoto.jpeg"
              alt="Ansh Bhanushali"
              width={300}
              height={300}
              className="object-cover rounded-tr-3xl rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-br-3xl"
            />
          </div>
        </motion.article>

        {/* 2 ▸ Collaboration (globe like screenshot, NOT CUT) */}
        <motion.article
          custom={1}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`
            relative
            col-span-1 row-span-1
            lg:col-span-1 lg:row-start-3 lg:col-start-1
            overflow-hidden
            rounded-3xl
            bg-[#11121d]
            ${hoverFX}
            flex flex-col
            min-h-0
          `}
        >
          {/* background wash */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-[70px]" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[85px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
          </div>

          <div className="relative px-6 pt-6">
            <p className={`text-[11px] tracking-wider uppercase ${T.meta}`}>Collaboration</p>
            <h3 className={`mt-2 text-lg sm:text-xl font-semibold ${T.h}`}>Across time zones</h3>
            <p className={`mt-2 text-xs sm:text-sm ${T.body}`}>
              Clean handoffs, tight feedback loops, and decisions that stay documented.
            </p>
          </div>

          {/* globe visual */}
          <div className="relative mt-2 flex-1 min-h-0">
            <DottedGlobe className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[150%] h-auto pointer-events-none" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11121d] via-[#11121d]/40 to-transparent" />

            {/* footer chips */}
            <div className="relative z-10 px-6 pb-6 pt-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
                  <p className={`text-[11px] uppercase tracking-wider ${T.meta}`}>Response</p>
                  <p className="mt-1 text-sm font-medium text-white/85">&lt; 24 hours</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
                  <p className={`text-[11px] uppercase tracking-wider ${T.meta}`}>Timezone</p>
                  <p className="mt-1 text-sm font-medium text-white/85">UTC {formattedOffset ?? "—"}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        {/* 3 ▸ Tech Stack (hero-like typography + sliding neon rows) */}
        <motion.article
          custom={2}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`
            flex flex-col
            col-span-1 row-span-1
            lg:col-span-1 lg:row-start-3 lg:col-start-2
            overflow-hidden
            rounded-3xl
            bg-[#11121d]
            ${hoverFX}
          `}
        >
          {/* subtle wash to match collaboration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 right-[-40px] h-56 w-56 rounded-full bg-indigo-500/10 blur-[80px]" />
            <div className="absolute -bottom-24 left-[-60px] h-64 w-64 rounded-full bg-cyan-400/10 blur-[85px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
          </div>

          <div className="relative flex flex-col justify-center px-4 sm:px-6 pt-5">
            <p className={`text-[11px] tracking-wider uppercase ${T.meta}`}>Tech stack</p>
            <div className="mt-2 flex items-center gap-2">
              <HiOutlineCode className="h-5 w-5 sm:h-6 sm:w-6 text-sky-300/90" />
              <h3 className={`text-xl sm:text-2xl font-bold leading-snug ${T.h}`}>Tools I ship with</h3>
            </div>
            <p className={`mt-2 text-[10px] sm:text-sm ${T.body}`}>
              Current market stack for AI products, systems, and production reliability.
            </p>
          </div>

          <div className="relative px-4 sm:px-6 pb-5">
            <SlidingRows rows={techRows} />
            <p className={`mt-4 text-[10px] ${T.meta}`}>Motion respects “Reduced Motion” accessibility settings.</p>
          </div>
        </motion.article>

        {/* 4 ▸ Curiosity card (same content, typography aligned + same wash) */}
        <motion.article
          custom={3}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`
            relative
            col-span-1 row-span-1
            lg:col-span-1 lg:row-start-3 lg:col-start-3
            overflow-hidden
            rounded-3xl
            bg-[#11121d]
            ${hoverFX}
            flex items-center justify-center
            px-4 sm:px-6 py-4
          `}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-violet-500/10 blur-[85px]" />
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-cyan-400/8 blur-[90px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
          </div>

          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="relative text-center"
          >
            <p className={`text-[11px] tracking-wider uppercase ${T.meta}`}>Principle</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Fueling innovation with boundless curiosity
            </h3>
            <p className={`mt-2 text-[10px] sm:text-sm ${T.body}`}>
              Grounded in elegant solutions and clean code—never settling for “just enough.”
            </p>
            <div className="mt-4 inline-flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400/80 shadow-[0_0_18px_rgba(167,139,250,0.35)]" />
              <span className={`text-[9px] sm:text-xs italic ${T.subtle}`}>Driven by curiosity</span>
            </div>
          </motion.div>
        </motion.article>

        {/* 5 ▸ CTA (same, keep your gradient card) */}
        <motion.article
          custom={4}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`
            col-span-1 row-span-1
            lg:col-span-1 lg:row-start-4 lg:col-start-1
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-cyan-500
            ${hoverFX}
            flex items-center justify-center
            px-4 sm:px-6 py-4
          `}
        >
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 bg-[#0b0c14] p-4 sm:p-6 rounded-[inherit] text-center">
            <p className={`text-[11px] tracking-wider uppercase ${T.meta}`}>Let’s talk</p>
            <h3 className={`text-sm sm:text-lg font-semibold ${T.h}`}>Ready to build something visionary?</h3>
            <Link
              href="mailto:bhanusad@mail.uc.edu"
              className="rounded-full border border-white/20 px-4 sm:px-6 py-2 text-[10px] sm:text-sm backdrop-blur hover:bg-white/10"
            >
              Let’s talk →
            </Link>
          </div>
        </motion.article>

        {/* 6 ▸ Spotlight (same) */}
        <motion.article
          custom={5}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`
            relative
            col-span-1 row-span-1
            lg:col-span-2 lg:row-start-4 lg:col-start-2
            overflow-hidden
            rounded-3xl
            bg-[#11121d]
            ${hoverFX}
            flex items-end justify-end
          `}
        >
          <Image src="/ai.png" alt="Workspace with code & design" fill className="absolute inset-0 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/45 to-black/90" />
          <div className="relative z-10 flex w-full flex-col justify-end gap-2 p-4 sm:p-6">
            <p className={`text-[11px] tracking-wider uppercase ${T.meta}`}>Spotlight</p>
            <h3 className={`text-xl sm:text-2xl font-semibold leading-tight ${T.h}`}>
              Where design intuition meets real-time GPU engineering
            </h3>
          </div>
        </motion.article>
      </div>
    </section>
  );
}