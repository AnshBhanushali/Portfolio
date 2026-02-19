/* components/SectionFour.tsx */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPython,
  SiDocker,
  SiFastapi,
  SiSolidity,
  SiPostgresql,
} from "react-icons/si";

/* ---------- hero-like typography tokens ---------- */
const T = {
  h: "text-white/90",
  body: "text-slate-300/90",
  meta: "text-white/55",
};

/* ---------- animations ---------- */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.55, ease: "easeOut" },
  }),
};

/* ---------- premium hover (glow only, no ring outline) ---------- */
const hoverFX =
  "transition hover:shadow-[0_0_34px_-10px_rgba(56,189,248,0.28)]";

/* ---------- tech icon badge ---------- */
function TechBadge({
  Icon,
  color,
  label,
}: {
  Icon: any;
  color: string;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] text-slate-200/90 backdrop-blur"
      title={label}
    >
      <Icon className="h-4 w-4" style={{ color }} />
      <span className="text-white/70">{label}</span>
    </span>
  );
}

/* ---------- project list (UPDATED) ---------- */
const projects = [
  {
    name: "Cognify",
    blurb:
      "AI-powered human-in-the-loop labeling system. Multimodal embeddings + vector search with confidence-based workflows, smart suggestions, and dataset management.",
    live: "", // add if you deploy later
    repo: "https://github.com/AnshBhanushali/Cognify",
    tech: [
      { Icon: SiReact, color: "#67e8f9", label: "React" },
      { Icon: SiTypescript, color: "#60a5fa", label: "TypeScript" },
      { Icon: SiFastapi, color: "#5eead4", label: "FastAPI" },
      { Icon: SiPython, color: "#93c5fd", label: "Python" },
    ],
  },
  {
    name: "MarketScope",
    blurb:
      "Real-time market intelligence platform with a multi-agent architecture (CrewAI + MCP). Scrapes web data, analyzes trends, and produces executive summaries with contextual memory.",
    live: "https://marketscope.vercel.app",
    repo: "https://github.com/AnshBhanushali/MarketScope",
    tech: [
      { Icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
      { Icon: SiTypescript, color: "#60a5fa", label: "TypeScript" },
      { Icon: SiPython, color: "#93c5fd", label: "Python" },
      { Icon: SiDocker, color: "#22d3ee", label: "Docker" },
    ],
  },
  {
    name: "DocuQuest",
    blurb:
      "RAG + MCP document Q&A assistant with uploads, chunking, vector indexing, and citation-aware answers in a chat-like UI. Built for fast, accurate retrieval over any document.",
    live: "https://docuquest-sigma.vercel.app",
    repo: "https://github.com/AnshBhanushali/DocuQuest",
    tech: [
      { Icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
      { Icon: SiPython, color: "#93c5fd", label: "Python" },
      { Icon: SiFastapi, color: "#5eead4", label: "FastAPI" },
      { Icon: SiPostgresql, color: "#a78bfa", label: "PostgreSQL" },
    ],
  },
  {
    name: "Genesis AI Assistant",
    blurb:
      "A next-gen AI helper powered by LangChain RAG flows. Next.js + TypeScript frontend with a FastAPI backend for fast retrieval and clean summarization.",
    live: "https://genesisaiassistant.vercel.app",
    repo: "https://github.com/AnshBhanushali/Genesis-AI-Assistant",
    tech: [
      { Icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
      { Icon: SiTypescript, color: "#60a5fa", label: "TypeScript" },
      { Icon: SiPython, color: "#93c5fd", label: "Python" },
      { Icon: SiDocker, color: "#22d3ee", label: "Docker" },
    ],
  },
  {
    name: "Decentralized Digital Wallet",
    blurb:
      "Ethereum light-wallet for ERC-20 tokens. Built with React + Solidity. Send/receive, check balances, and interact with contracts trustlessly.",
    live: "", // keep blank if no live link
    repo: "https://github.com/AnshBhanushali/Decentralized-Digital-Wallet",
    tech: [
      { Icon: SiReact, color: "#67e8f9", label: "React" },
      { Icon: SiSolidity, color: "#cbd5e1", label: "Solidity" },
      { Icon: SiTypescript, color: "#60a5fa", label: "TypeScript" },
      { Icon: SiDocker, color: "#22d3ee", label: "Docker" },
    ],
  },
  {
    name: "Chat Application + AI",
    blurb:
      "Real-time chat with WebSocket features and GPT integration. Built for smooth UX with fast messaging, clean UI, and AI-assisted interactions.",
    live: "", // add if deployed
    repo: "https://github.com/AnshBhanushali/ChatApplicationAI",
    tech: [
      { Icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
      { Icon: SiTypescript, color: "#60a5fa", label: "TypeScript" },
      { Icon: SiPython, color: "#93c5fd", label: "Python" },
    ],
  },
];

/* ---------- SectionFour component ---------- */
export default function SectionFour() {
  return (
    <section id="projects" className="relative py-32 px-4 lg:px-0 bg-[#070A12] overflow-hidden">
      {/* Hero-matching mesh background (same language as other sections) */}
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
        <div className="mb-14 text-center">
          <p className={`text-[11px] tracking-[0.22em] uppercase ${T.meta}`}>Projects</p>
          <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold ${T.h}`}>
            A curated showcase of{" "}
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              latest creations
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${T.body}`}>
            High-signal work across agents, retrieval, multimodal systems, and product-grade engineering.
          </p>
        </div>

        <motion.div
          className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              custom={i}
              variants={cardVariants}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur p-6 ${hoverFX}`}
            >
              {/* premium glow wash */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-[70px]" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[80px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
              </div>

              {/* content */}
              <div className="relative z-10">
                <h3 className={`text-xl font-semibold ${T.h}`}>{p.name}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${T.body}`}>{p.blurb}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => (
                    <TechBadge key={idx} Icon={t.Icon} color={t.color} label={t.label} />
                  ))}
                </div>
              </div>

              {/* actions */}
              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
                {p.live ? (
                  <Link
                    href={p.live}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur transition hover:bg-white/[0.07]"
                  >
                    Live <HiOutlineExternalLink className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-white/45">
                    Live soon
                  </span>
                )}

                <Link
                  href={p.repo}
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500/90 via-violet-500/90 to-sky-500/90 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:opacity-95"
                >
                  GitHub <HiOutlineExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}