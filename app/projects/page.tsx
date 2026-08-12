"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Code2 as Github, ExternalLink, Sparkles } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline project data ────────────────────────────────────────────────────
type ProjectCategory = "Frontend" | "Backend" | "Design" | "Open Source";

interface InlineProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  href: string;
  github?: string;
  featured?: boolean;
  year: string;
}

const PROJECTS: InlineProject[] = [
  {
    id: "1",
    title: "Pulse Dashboard",
    description:
      "A real-time analytics dashboard for SaaS teams. Tracks user events, revenue metrics, and churn signals with live WebSocket updates and customizable chart layouts.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/99d27a81603f469491f20cbb80bcde61.png",
    tags: ["Next.js", "TypeScript", "Recharts", "WebSockets", "Tailwind"],
    category: "Frontend",
    href: "#",
    github: "https://github.com/alexrivera/pulse-dashboard",
    featured: true,
    year: "2024",
  },
  {
    id: "2",
    title: "Meridian API",
    description:
      "A high-throughput REST and GraphQL API gateway built with Node.js and Fastify. Handles 50k+ requests per minute with Redis caching and JWT-based auth.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/954726acb58740dd94d759c93096fa1b.png",
    tags: ["Node.js", "Fastify", "GraphQL", "Redis", "PostgreSQL"],
    category: "Backend",
    href: "#",
    github: "https://github.com/alexrivera/meridian-api",
    featured: true,
    year: "2024",
  },
  {
    id: "3",
    title: "Folio Design System",
    description:
      "A comprehensive component library and design system built for cross-team consistency. Includes 60+ accessible components, dark/light tokens, and Storybook docs.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/853b2f81b9f34c47ba71cc9d79ba5d2a.png",
    tags: ["React", "Storybook", "Radix UI", "CSS Variables", "Figma"],
    category: "Design",
    href: "#",
    featured: true,
    year: "2023",
  },
  {
    id: "4",
    title: "Inkwell CMS",
    description:
      "An open-source headless CMS with a visual block editor, multi-locale support, and a plugin ecosystem. Used by 1,200+ developers worldwide.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7257cddcbf134204b75f4ee361733b8a.jpg",
    tags: ["TypeScript", "Prisma", "Next.js", "tRPC", "S3"],
    category: "Open Source",
    href: "#",
    github: "https://github.com/alexrivera/inkwell",
    featured: false,
    year: "2023",
  },
  {
    id: "5",
    title: "Terrain Map Explorer",
    description:
      "An interactive 3D terrain visualization tool using WebGL and Mapbox. Lets users explore elevation data, draw routes, and export GPX files.",
    image: "https://picsum.photos/seed/d96cf460dd96/800/600",
    tags: ["WebGL", "Mapbox", "React", "Three.js"],
    category: "Frontend",
    href: "#",
    github: "https://github.com/alexrivera/terrain-explorer",
    year: "2023",
  },
  {
    id: "6",
    title: "Beacon Notifications",
    description:
      "A multi-channel notification service supporting email, SMS, push, and in-app alerts. Built with a queue-based architecture for reliable delivery at scale.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa9444810a8643349884b05d501f4441.png",
    tags: ["Go", "RabbitMQ", "PostgreSQL", "Docker", "Twilio"],
    category: "Backend",
    href: "#",
    github: "https://github.com/alexrivera/beacon",
    year: "2022",
  },
  {
    id: "7",
    title: "Sprout Finance App",
    description:
      "A personal finance tracker with AI-powered categorization, budget forecasting, and a clean mobile-first UI. Connects to 10,000+ banks via Plaid.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/eb0d251ae6fa4140b51abc0c2eec29d3.svg",
    tags: ["React Native", "Expo", "Plaid", "OpenAI", "Supabase"],
    category: "Frontend",
    href: "#",
    year: "2022",
  },
  {
    id: "8",
    title: "Chromatic Icons",
    description:
      "An open-source icon library with 800+ hand-crafted SVG icons in three weights. Available as React, Vue, and Svelte packages with tree-shaking support.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8d7b808eebea4298add99be63571df47.png",
    tags: ["SVG", "React", "Vue", "Figma", "npm"],
    category: "Open Source",
    href: "#",
    github: "https://github.com/alexrivera/chromatic-icons",
    year: "2022",
  },
  {
    id: "9",
    title: "Lattice Auth",
    description:
      "A drop-in authentication service with passkey support, OAuth providers, and a self-hosted option. Designed for developer teams who want full control.",
    image: "https://www.latticesemi.com/-/media/LatticeSemi/Images/Blogs/2022/Rapid-Product-Portfolio-Expansion.ashx?la=en",
    tags: ["TypeScript", "WebAuthn", "OAuth2", "Docker", "SQLite"],
    category: "Open Source",
    href: "#",
    github: "https://github.com/alexrivera/lattice-auth",
    year: "2021",
  },
];

const FILTER_TABS = [
  "All",
  "Frontend",
  "Backend",
  "Design",
  "Open Source",
] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// ─── Framer-motion variants ─────────────────────────────────────────────────
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
  }),
};

// ─── Sub-components ─────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: InlineProject; index: number }) {
  const t = useTranslations();
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-white/5 backdrop-blur-sm",
        "shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]",
        "transition-all duration-300 ease-out",
        "hover:border-[var(--accent)]/40 hover:shadow-[0_0_0_1px_var(--accent)/20,0_16px_48px_-12px_rgba(0,0,0,0.5)]",
        project.featured && "ring-1 ring-[var(--accent)]/20",
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={t("projects.card.imageAlt", { title: project.title })}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-black">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {t("projects.card.featured")}
          </div>
        )}

        {/* Year badge */}
        <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-white">
            {project.title}
          </h3>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
            {project.category}
          </span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs font-medium text-white/50 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1 border-t border-white/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("projects.card.githubLabel", { title: project.title })}
              className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              {t("projects.card.source")}
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("projects.card.liveLabel", { title: project.title })}
            className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          >
            {t("projects.card.live")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page component ──────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: PROJECTS.length };
    FILTER_TABS.forEach((tab) => {
      if (tab !== "All") {
        map[tab] = PROJECTS.filter((p) => p.category === tab).length;
      }
    });
    return map;
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="h-[500px] w-[700px] rounded-full bg-[var(--accent)]/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            custom={0}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              {t("projects.hero.eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl"
          >
            {t("projects.hero.title")}
          </motion.h1>

          <motion.p
            custom={2}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
          >
            {t("projects.hero.subtitle")}
          </motion.p>

          {/* Stats row */}
          <motion.div
            custom={3}
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-6"
          >
            {(
              Array.isArray(t.raw("projects.hero.stats"))
                ? t.raw("projects.hero.stats")
                : []
            ).map(
              (
                stat: { value: string; label: string },
                i: number,
              ) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/50">{stat.label}</span>
                </div>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Filter tabs ──────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl">
            <div
              role="tablist"
              aria-label={t("projects.filter.ariaLabel")}
              className="flex flex-wrap gap-2"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeFilter === tab}
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    activeFilter === tab
                      ? "text-black"
                      : "text-white/60 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10",
                  )}
                >
                  {activeFilter === tab && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab}
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                        activeFilter === tab
                          ? "bg-black/20 text-black"
                          : "bg-white/10 text-white/50",
                      )}
                    >
                      {counts[tab] ?? 0}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Projects grid ────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center text-white/40"
              >
                {t("projects.grid.empty")}
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA section ──────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-28">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/10 via-white/5 to-transparent p-10 md:p-14 text-center">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div className="h-64 w-64 rounded-full bg-[var(--accent)]/15 blur-[80px]" />
              </div>

              <div className="relative">
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {t("projects.cta.title")}
                </h2>
                <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                  {t("projects.cta.subtitle")}
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {t("projects.cta.primary")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href="https://github.com/alexrivera"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    {t("projects.cta.secondary")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}