// app/section3.tsx
"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

type Pin = {
  label: string;
  lat: number;
  lon: number;
  color?: string;
  level: "Expert" | "Strong" | "Working";
  exp: string;
};

const pins: Pin[] = [
  {
    label: "Next.js",
    lat: 62,
    lon: -20,
    color: "#e5e7eb",
    level: "Strong",
    exp: "Build production UI with App Router, SSR, and performance-first patterns.",
  },
  {
    label: "TypeScript",
    lat: 58,
    lon: 40,
    color: "#60a5fa",
    level: "Strong",
    exp: "Typed APIs, component systems, and clean contracts across frontend/backends.",
  },
  {
    label: "React",
    lat: 62,
    lon: 100,
    color: "#67e8f9",
    level: "Strong",
    exp: "Reusable UI, motion, and state patterns for product-grade experiences.",
  },
  {
    label: "FastAPI",
    lat: 52,
    lon: 160,
    color: "#5eead4",
    level: "Strong",
    exp: "High-throughput endpoints, background jobs, and clean service boundaries.",
  },
  {
    label: "Python",
    lat: 58,
    lon: 220,
    color: "#93c5fd",
    level: "Expert",
    exp: "ML pipelines, automation, signal processing work, and backend services.",
  },

  {
    label: "Docker",
    lat: 8,
    lon: -30,
    color: "#22d3ee",
    level: "Strong",
    exp: "Containerize services, reproducible builds, and dev/prod parity.",
  },
  {
    label: "Kubernetes",
    lat: 0,
    lon: 40,
    color: "#60a5fa",
    level: "Working",
    exp: "Hands-on with AKS workflows, deployments, and scaling fundamentals.",
  },
  {
    label: "Azure",
    lat: 10,
    lon: 110,
    color: "#38bdf8",
    level: "Strong",
    exp: "GenAI workflows + cloud deployment experience (AKS + supporting services).",
  },
  {
    label: "PostgreSQL",
    lat: 0,
    lon: 180,
    color: "#a78bfa",
    level: "Strong",
    exp: "Schema design, queries, and reliability-minded data modeling.",
  },
  {
    label: "Redis",
    lat: -8,
    lon: 250,
    color: "#fb7185",
    level: "Working",
    exp: "Caching, rate-limits/queues basics, and performance-oriented patterns.",
  },

  {
    label: "RAG",
    lat: -52,
    lon: -10,
    color: "#f472b6",
    level: "Strong",
    exp: "Retrieval + grounding, chunking strategy, and evaluation mindset.",
  },
  {
    label: "Agents",
    lat: -58,
    lon: 60,
    color: "#c084fc",
    level: "Working",
    exp: "Tool-using flows, routing, and guardrails for reliable automation.",
  },
  {
    label: "Vector DBs",
    lat: -52,
    lon: 130,
    color: "#67e8f9",
    level: "Working",
    exp: "Semantic search basics, embeddings, and retrieval tuning patterns.",
  },
  {
    label: "Observability",
    lat: -58,
    lon: 200,
    color: "#34d399",
    level: "Working",
    exp: "Logs/metrics mindset, alerting basics, and debugging workflows.",
  },
  {
    label: "CI/CD",
    lat: -52,
    lon: 270,
    color: "#e5e7eb",
    level: "Working",
    exp: "Build/test pipelines and shipping with smaller, safer increments.",
  },
];

const toXYZ = (lat: number, lon: number, r = 1.03) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ] as const;
};

function SceneTuning() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.03;
  }, [gl]);
  return null;
}

function Atmosphere() {
  return (
    <>
      <mesh scale={1.065}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.052}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.045}>
        <sphereGeometry args={[1, 72, 72]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.038}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function LatRings() {
  const rings = useMemo(() => [55, 20, -15, -50], []);
  return (
    <>
      {rings.map((lat) => {
        const radius = Math.cos((lat * Math.PI) / 180);
        const y = Math.sin((lat * Math.PI) / 180);
        const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI);
        const pts = curve.getSpacedPoints(220).map((p) => new THREE.Vector3(p.x, y, p.y));
        return (
          <line key={lat}>
            <bufferGeometry attach="geometry" setFromPoints={pts} />
            <lineBasicMaterial attach="material" color="#60a5fa" transparent opacity={0.1} />
          </line>
        );
      })}
    </>
  );
}

function OrbitArcs() {
  return (
    <>
      {[1.18, 1.26].map((r, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, idx ? 0.62 : 0.22, 0]}>
          <torusGeometry args={[r, 0.0022, 16, 280]} />
          <meshBasicMaterial
            color={idx ? "#a78bfa" : "#22d3ee"}
            transparent
            opacity={0.14}
          />
        </mesh>
      ))}
    </>
  );
}

function Dot({
  color,
  active,
  onClick,
  onHover,
  onOut,
}: {
  color: string;
  active: boolean;
  onClick: () => void;
  onHover: () => void;
  onOut: () => void;
}) {
  return (
    <group>
      <mesh scale={active ? 0.1 : 0.072}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.2 : 0.1} />
      </mesh>

      <mesh
        scale={active ? 0.04 : 0.03}
        onClick={onClick}
        onPointerOver={onHover}
        onPointerOut={onOut}
      >
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial
          color={active ? "#f472b6" : color}
          emissive={active ? "#f472b6" : color}
          emissiveIntensity={active ? 1.25 : 0.55}
          metalness={0.2}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function Earth({
  active,
  setActive,
  onHover,
}: {
  active: string | null;
  setActive: (l: string | null) => void;
  onHover: (l: string | null) => void;
}) {
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "/earth1.jpg",
    "/earth_bump.jpg",
  ]);

  const earthRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = t * 0.05;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 80, 80]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.045}
          metalness={0.08}
          roughness={0.95}
        />
      </mesh>

      <LatRings />
      <OrbitArcs />

      {pins.map((p) => {
        const [x, y, z] = toXYZ(p.lat, p.lon);
        const isActive = active === p.label;
        return (
          <group key={p.label} position={[x, y, z]}>
            <Dot
              color={p.color ?? "#e5e7eb"}
              active={isActive}
              onClick={() => setActive(isActive ? null : p.label)}
              onHover={() => onHover(p.label)}
              onOut={() => onHover(null)}
            />

            {/* label only when pinned/active */}
            {isActive && (
              <Html
                distanceFactor={10}
                style={{
                  pointerEvents: "none",
                  userSelect: "none",
                  transform: "translate3d(-50%, -150%, 0)",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: p.color ?? "#e5e7eb",
                    textShadow: "0 0 14px rgba(0,0,0,0.8)",
                  }}
                >
                  {p.label}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function LevelPill({ level }: { level: Pin["level"] }) {
  const map = {
    Expert: {
      dot: "bg-emerald-400/80",
      text: "text-emerald-200/90",
      glow: "shadow-[0_0_18px_rgba(52,211,153,0.25)]",
      border: "border-emerald-300/15",
      bg: "bg-emerald-400/5",
      label: "Expert",
    },
    Strong: {
      dot: "bg-sky-400/80",
      text: "text-sky-200/90",
      glow: "shadow-[0_0_18px_rgba(56,189,248,0.22)]",
      border: "border-sky-300/15",
      bg: "bg-sky-400/5",
      label: "Strong",
    },
    Working: {
      dot: "bg-violet-400/80",
      text: "text-violet-200/90",
      glow: "shadow-[0_0_18px_rgba(167,139,250,0.22)]",
      border: "border-violet-300/15",
      bg: "bg-violet-400/5",
      label: "Working",
    },
  }[level];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] ${map.border} ${map.bg} backdrop-blur`}
    >
      <span className={`h-2 w-2 rounded-full ${map.dot} ${map.glow}`} />
      <span className={`${map.text} font-medium`}>{map.label}</span>
    </span>
  );
}

function ColorDot({ hex }: { hex?: string }) {
  const c = hex ?? "rgba(255,255,255,0.35)";
  return (
    <span
      className="h-2.5 w-2.5 rounded-full"
      style={{
        background: c,
        boxShadow: hex ? `0 0 18px ${hex}55` : "none",
      }}
    />
  );
}

export default function SectionThree() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openSkills, setOpenSkills] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selected = useMemo(
    () => pins.find((p) => p.label === (active ?? hovered)),
    [active, hovered]
  );

  return (
    <section
      id="tech-vault"
      className="relative w-full h-[72vh] md:h-screen bg-[#070A12] overflow-hidden"
    >
      {/* Prevent any accidental horizontal scrollbars */}
      <div className="absolute inset-0 overflow-hidden">
        {/* hero-like mesh background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.22]">
            <div className="absolute -top-24 left-1/3 h-[520px] w-[520px] rounded-full bg-indigo-500/30 blur-[120px]" />
            <div className="absolute top-1/3 -left-28 h-[520px] w-[520px] rounded-full bg-cyan-400/25 blur-[120px]" />
            <div className="absolute -bottom-40 right-[-120px] h-[560px] w-[560px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.78))]" />
        </div>

        {/* heading (smaller + wraps safely) */}
        <div className="pointer-events-none absolute left-1/2 top-8 md:top-10 z-10 -translate-x-1/2 text-center px-4 max-w-[92vw]">
          <p className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/50">
            Tech Vault
          </p>
          <h2 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight text-white/90">
            Systems I build with
          </h2>
        </div>

        {/* LEFT: Skills list toggle + panel */}
        <div className="absolute left-4 md:left-10 top-24 md:top-28 z-10 w-[260px] md:w-[320px] max-w-[calc(100vw-2rem)]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.25)] overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSkills((s) => !s)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div>
                <p className="text-[11px] tracking-wider uppercase text-white/55">
                  Skills
                </p>
                <p className="mt-1 text-sm font-semibold text-white/85">
                  {openSkills ? "Hide all nodes" : "Show all nodes"}
                </p>
              </div>
              <span className="text-white/55 text-sm">
                {openSkills ? "—" : "+"}
              </span>
            </button>

            {openSkills && (
              <div className="border-t border-white/10">
                {/* no scrollbars on page; only this panel scrolls internally if needed */}
                <div className="max-h-[38vh] md:max-h-[46vh] overflow-auto px-4 py-3">
                  <p className="text-[11px] text-white/55">
                    Tap an item to pin it on the globe.
                  </p>

                  <div className="mt-3 space-y-2">
                    {pins.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setActive(p.label);
                          setHovered(null);
                        }}
                        className={`w-full rounded-xl border px-3 py-2 text-left transition
                          ${
                            active === p.label
                              ? "border-white/18 bg-white/[0.06]"
                              : "border-white/10 bg-white/[0.03] hover:bg-white/[0.045]"
                          }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <ColorDot hex={p.color} />
                            <span className="text-sm font-semibold text-white/85">
                              {p.label}
                            </span>
                          </div>
                          <span className="shrink-0">
                            <LevelPill level={p.level} />
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] text-slate-300/80">
                          {p.exp}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Selected info box (responsive so it never causes side scrolling) */}
        <div className="absolute right-4 md:right-10 top-24 md:top-28 z-10 w-[260px] md:w-[300px] max-w-[calc(100vw-2rem)]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur px-4 py-4 shadow-[0_0_40px_rgba(0,0,0,0.25)]">
            {!selected ? (
              <>
                <p className="text-[11px] tracking-wider uppercase text-white/55">
                  How it works
                </p>
                <p className="mt-2 text-sm font-semibold text-white/85">
                  Touch the dots
                </p>
                <p className="mt-1 text-sm text-slate-300/85">
                  Tap a node to reveal what I’ve built with it and my comfort level.
                </p>
              </>
            ) : (
              <>
                <p className="text-[11px] tracking-wider uppercase text-white/55">
                  Selected
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ColorDot hex={selected.color} />
                    <p className="text-base font-semibold text-white/90">
                      {selected.label}
                    </p>
                  </div>
                  <LevelPill level={selected.level} />
                </div>
                <p className="mt-2 text-sm text-slate-300/85">
                  {selected.exp}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <p className="text-[11px] text-white/55">
                    {active
                      ? "Pinned (tap the dot again to unpin)"
                      : "Tip: tap a dot to pin it"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Canvas */}
        <Canvas
          className="w-full h-full"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 45 }}
        >
          <SceneTuning />
          <Stars radius={95} depth={40} count={6500} factor={4} fade />

          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 2.5, 5]} intensity={1.2} color="#b9ccff" />
          <pointLight position={[-3, -1.5, -4]} intensity={0.5} color="#22d3ee" />

          <Atmosphere />

          <Suspense fallback={null}>
            <Earth active={active} setActive={setActive} onHover={setHovered} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            autoRotate={!isMobile}
            autoRotateSpeed={0.25}
            rotateSpeed={0.55}
            enableDamping
            dampingFactor={0.06}
          />
        </Canvas>
      </div>
    </section>
  );
}