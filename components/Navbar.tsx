"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (
    link: (typeof navLinks)[0],
    mobile = false
  ) => {
    const isAnchor = link.href.startsWith("#");
    const resolvedHref = isAnchor
      ? pathname === "/"
        ? link.href
        : "/" + link.href
      : link.href;

    const isActive =
      link.href === "/"
        ? pathname === "/"
        : pathname.startsWith(link.href);

    const baseClass = mobile
      ? `block px-4 py-3 rounded-[var(--radius)] text-base font-medium transition-all duration-200 ${
          isActive
            ? "text-[var(--primary)] bg-[var(--primary)]/10"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
        }`
      : `relative text-sm font-medium transition-all duration-200 ${
          isActive
            ? "text-[var(--primary)]"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        }`;

    return (
      <Link
        key={link.key}
        href={resolvedHref}
        className={baseClass}
        onClick={
          isAnchor
            ? (e) => handleAnchorClick(e, link.href)
            : undefined
        }
      >
        {navT[link.key] ?? link.label}
        {!mobile && isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--primary)]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
        >
          <span className="text-[var(--primary)]">{"{"}</span>
          {APP_NAME.split(" ")[0]}
          <span className="text-[var(--primary)]">{"}"}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => renderLink(link))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-[var(--radius)] bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-200 shadow-[var(--shadow-glow)]"
          >
            {t("nav.hire")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-[var(--radius)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => renderLink(link, true))}
              <Link
                href="/contact"
                className="mt-2 px-4 py-3 rounded-[var(--radius)] bg-[var(--primary)] text-white text-base font-medium text-center hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-200"
              >
                {t("nav.hire")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}