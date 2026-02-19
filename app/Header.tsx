"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };

export default function Header() {
  const navItems = useMemo<NavItem[]>(
    () => [
      { label: "About", href: "#about" },
      { label: "Tech Stack", href: "#tech-vault" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");
  const [isHeroZone, setIsHeroZone] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Glass intensity changes when scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine if we're "in hero zone" (navbar at bottom)
  useEffect(() => {
    const hero = document.getElementById("hero");

    // If hero exists, use IntersectionObserver for a clean signal
    if (hero) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          setIsHeroZone(entry.isIntersecting);
          // When hero is in view, force active to About (fix underline bug)
          if (entry.isIntersecting) setActive("#about");
        },
        {
          threshold: 0.35, // tweak if you want it to switch sooner/later
        }
      );

      obs.observe(hero);
      return () => obs.disconnect();
    }

    // Fallback (if no #hero exists): treat top ~60% of first viewport as hero zone
    const onScrollFallback = () => {
      const heroLike = window.scrollY < window.innerHeight * 0.6;
      setIsHeroZone(heroLike);
      if (heroLike) setActive("#about");
    };

    onScrollFallback();
    window.addEventListener("scroll", onScrollFallback, { passive: true });
    return () => window.removeEventListener("scroll", onScrollFallback);
  }, []);

  // Active link highlight based on visible sections
  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // If hero zone is active, keep About highlighted
        if (isHeroZone) {
          setActive("#about");
          return;
        }

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.55, 0.7],
      }
    );

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [navItems, isHeroZone]);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={[
          "fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
          isHeroZone ? "bottom-6 top-auto" : "top-5 bottom-auto",
        ].join(" ")}
      >
        {/* Premium gradient edge wrapper */}
        <div className="rounded-full p-[1px] bg-gradient-to-r from-white/10 via-white/5 to-white/10">
          <div
            className={[
              "relative flex items-center justify-center rounded-full",
              "px-4 py-2.5 sm:px-6",
              "border border-white/10 backdrop-blur-md transition-all duration-300",
              scrolled ? "bg-black/30 shadow-[0_18px_60px_rgba(0,0,0,0.45)]" : "bg-black/15",
            ].join(" ")}
          >
            {/* Mobile toggle */}
            <button
              className="sm:hidden mr-2 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/90"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop nav */}
            <ul className="hidden sm:flex items-center gap-7">
              {navItems.map(({ label, href }) => {
                const isActive = active === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        "relative text-sm font-medium transition-colors",
                        isActive ? "text-white" : "text-white/70 hover:text-white",
                      ].join(" ")}
                    >
                      {label}
                      {isActive && (
                        <span className="absolute -bottom-2 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile label (keeps pill balanced) */}
            <span className="sm:hidden text-sm font-medium text-white/85">
              {navItems.find((n) => n.href === active)?.label ?? "Menu"}
            </span>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden mt-3 rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-white/10">
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.5)]">
              <ul className="flex flex-col">
                {navItems.map(({ label, href }) => {
                  const isActive = active === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={[
                          "block rounded-xl px-3 py-2 text-sm font-medium transition",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/75 hover:bg-white/5 hover:text-white",
                        ].join(" ")}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Click-outside overlay */}
      {menuOpen && (
        <button
          aria-label="Close overlay"
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}