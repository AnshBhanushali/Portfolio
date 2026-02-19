// app/section5.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineOfficeBuilding, HiOutlineCalendar } from "react-icons/hi";
import {
  SiDocker,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiTensorflow,
  SiKubernetes,
  SiOpenai,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";

/* ---------- hero-like typography tokens ---------- */
const T = {
  h: "text-white/90",
  body: "text-slate-300/90",
  meta: "text-white/55",
  subtle: "text-slate-400",
};

const hoverFX =
  "transition hover:shadow-[0_0_34px_-10px_rgba(56,189,248,0.28)]";

type Exp = {
  role: string;
  company: string;
  dates: string;
  tech: { icon: any; color: string; label: string }[];
  details: string[];
};

const experiences: Exp[] = [
  {
    role: "Software Engineer Intern — Generative AI & Cloud",
    company: "Siemens Digital Industries",
    dates: "Summer 2024",
    tech: [
      { icon: FaMicrosoft, color: "#0078D4", label: "Azure" },
      { icon: SiKubernetes, color: "#326CE5", label: "AKS" },
      { icon: SiPython, color: "#93c5fd", label: "Python" },
      { icon: SiOpenai, color: "#e5e7eb", label: "LLMs" },
      { icon: SiDocker, color: "#22d3ee", label: "Docker" },
    ],
    details: [
      "Built and deployed GenAI workflows on <strong>Azure</strong>, packaging services into containers and shipping them through a production-friendly pipeline.",
      "Integrated model + data processing stages into scalable services on <strong>AKS</strong>, focusing on reliability, monitoring, and clean handoffs across the team.",
      "Collaborated with data scientists and engineers to operationalize ML outputs into a product surface (dashboards, metrics, and iteration loops).",
    ],
  },
  {
    role: "Research Assistant — Voice AI / Signal Processing",
    company: "University of Cincinnati (TruVox / Dr. Vesna Novak Lab)",
    dates: "2024 – Present",
    tech: [
      { icon: SiPython, color: "#93c5fd", label: "Python" },
      { icon: SiTensorflow, color: "#FF6F00", label: "TensorFlow" },
      { icon: SiPostgresql, color: "#a78bfa", label: "PostgreSQL" },
      { icon: SiDocker, color: "#22d3ee", label: "Docker" },
      { icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
    ],
    details: [
      "Implemented end-to-end pipelines for speech/voice research, combining signal processing + ML experimentation with reproducible tooling.",
      "Built interfaces and visualizations for research iteration (metrics, demos, and artifact tracking), keeping outputs usable for non-technical stakeholders.",
      "Worked closely with researchers/clinicians to translate requirements into testable prototypes and measurable outcomes.",
    ],
  },
  {
    role: "Research Assistant — DVT Ultrasound AI (BUCL Lab)",
    company: "University of Cincinnati (BUCL Lab)",
    dates: "2025 – Present",
    tech: [
      { icon: SiPython, color: "#93c5fd", label: "Python" },
      { icon: SiTensorflow, color: "#FF6F00", label: "Deep Learning" },
      { icon: SiDocker, color: "#22d3ee", label: "Docker" },
      { icon: SiPostgresql, color: "#a78bfa", label: "Data Pipelines" },
    ],
    details: [
      "Supported an AI-assisted ultrasound workflow for deep vein thrombosis (DVT) detection, focusing on reproducible experimentation and clean data handling.",
      "Built/maintained data prep and evaluation utilities (splits, metrics, sanity checks) to keep model iteration reliable and comparable over time.",
      "Collaborated with researchers to translate lab objectives into measurable experiments and presentable research artifacts.",
    ],
  },
  {
    role: "Software Developer — ML & AI",
    company: "CEAS Innovation Lab",
    dates: "Aug 2023 – Dec 2023",
    tech: [
      { icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
      { icon: SiPython, color: "#93c5fd", label: "Python" },
      { icon: SiPostgresql, color: "#a78bfa", label: "PostgreSQL" },
      { icon: SiDocker, color: "#22d3ee", label: "Docker" },
    ],
    details: [
      "Designed and shipped internal web tooling with a clean UI, stable data flows, and production-minded defaults.",
      "Added monitoring and performance improvements in data/ML utilities, reducing response time via indexing, caching, and pipeline tuning.",
      "Established reproducible dev environments and deployment workflows to keep iteration fast and consistent across the team.",
    ],
  },
];

/* ---------- motion ---------- */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
  }),
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[12px] text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function TechChip({
  Icon,
  color,
  label,
}: {
  Icon: any;
  color: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[12px] text-slate-200/85 backdrop-blur transition group-hover:bg-white/[0.06]">
      <Icon className="h-4 w-4" style={{ color }} />
      <span className="text-white/70">{label}</span>
    </span>
  );
}

function Drawer({
  open,
  onClose,
  exp,
}: {
  open: boolean;
  onClose: () => void;
  exp: Exp | null;
}) {
  return (
    <AnimatePresence>
      {open && exp && (
        <>
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="
              fixed right-4 top-4 bottom-4 z-[70]
              w-[min(520px,calc(100vw-2rem))]
              overflow-hidden rounded-3xl
              border border-white/10 bg-[#0b0c14]/75 backdrop-blur-xl
              shadow-[0_0_60px_rgba(0,0,0,0.55)]
            "
          >
            <div className="relative h-full overflow-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none]">
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 0px;
                  height: 0px;
                }
              `}</style>

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className={`text-[11px] tracking-[0.22em] uppercase ${T.meta}`}>
                    Role
                  </p>
                  <h3 className={`mt-2 text-xl sm:text-2xl font-semibold ${T.h}`}>
                    {exp.role}
                  </h3>
                  <p className={`mt-2 text-sm ${T.subtle}`}>{exp.company}</p>
                </div>
                <Pill>{exp.dates}</Pill>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tech.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <TechChip
                      key={`drawer-tech-${i}`}
                      Icon={Icon}
                      color={t.color}
                      label={t.label}
                    />
                  );
                })}
              </div>

              <div className={`mt-6 space-y-3 text-sm ${T.body}`}>
                {exp.details.map((line, i) => (
                  <p
                    key={`drawer-detail-${i}`}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
              </div>

              <div className="mt-7 h-px w-full bg-white/10" />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[12px] text-white/75 backdrop-blur transition hover:bg-white/[0.06]"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-[70px]" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[80px]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CardPreview({
  exp,
  idx,
  onOpen,
}: {
  exp: Exp;
  idx: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      custom={idx}
      variants={card}
      className={`
        group relative overflow-hidden rounded-3xl
        border border-white/10 bg-white/[0.035] backdrop-blur
        p-6 ${hoverFX}
        flex flex-col
        min-h-[360px] sm:min-h-[380px]
      `}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-[70px]" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <HiOutlineOfficeBuilding className="h-5 w-5 text-white/45" />
              <h3 className={`text-base sm:text-lg font-semibold ${T.h}`}>
                <span className="line-clamp-2">{exp.role}</span>
              </h3>
            </div>

            <div className={`mt-2 flex items-center gap-2 text-sm ${T.subtle}`}>
              <HiOutlineCalendar className="h-4 w-4 text-white/40" />
              <span className="line-clamp-1">{exp.company}</span>
            </div>
          </div>

          <Pill>{exp.dates}</Pill>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.tech.map((t, i) => {
            const Icon = t.icon;
            return (
              <TechChip
                key={`${exp.role}-tech-${i}`}
                Icon={Icon}
                color={t.color}
                label={t.label}
              />
            );
          })}
        </div>

        {/* short, consistent preview */}
        <p
          className={`mt-5 text-sm leading-relaxed ${T.body} line-clamp-5`}
          dangerouslySetInnerHTML={{ __html: exp.details[0] }}
        />
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <div className="h-px w-full bg-white/10" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-[11px] text-white/55">
            Tap for full details.
          </div>
          <button
            onClick={onOpen}
            className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[12px] text-white/75 backdrop-blur transition hover:bg-white/[0.06]"
          >
            View
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function SectionFive() {
  const [drawerIdx, setDrawerIdx] = useState<number | null>(null);

  const drawerExp = useMemo(
    () => (drawerIdx === null ? null : experiences[drawerIdx]),
    [drawerIdx]
  );

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#070A12] py-24 sm:py-28 px-4 lg:px-0"
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
        <div className="mb-10 sm:mb-14 text-center">
          <p className={`text-[11px] tracking-[0.22em] uppercase ${T.meta}`}>
            Experience
          </p>
          <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold ${T.h}`}>
            My{" "}
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${T.body}`}>
            Building real systems — from research prototypes to cloud-deployed GenAI workflows.
          </p>
        </div>

        {/* ✅ 2x2 layout on desktop (same card size) */}
        <motion.div
          className="
            grid gap-6
            sm:grid-cols-2
            xl:grid-cols-2
            items-stretch
          "
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experiences.map((exp, idx) => (
            <CardPreview
              key={`${exp.role}-${idx}`}
              exp={exp}
              idx={idx}
              onOpen={() => setDrawerIdx(idx)}
            />
          ))}
        </motion.div>

        <p className="mt-6 text-center text-[11px] text-white/45">
          Tip: Use “View” to open full details in the side panel.
        </p>
      </div>

      <Drawer
        open={drawerIdx !== null}
        onClose={() => setDrawerIdx(null)}
        exp={drawerExp}
      />
    </section>
  );
}