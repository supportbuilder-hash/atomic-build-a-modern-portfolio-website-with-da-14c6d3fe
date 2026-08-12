"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Star, Sparkles, Code2, Layers, Zap, Globe, CheckCircle, ExternalLink } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type BRAND = any;
const BRAND: any = [];
type socialLinks = any;
const socialLinks: any = [];
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: "1",
    title: "Pulse Analytics",
    description:
      "Real-time dashboard for SaaS metrics. Built with Next.js, Supabase, and Recharts. Handles 2M+ events per day with sub-100ms query times.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/99d27a81603f469491f20cbb80bcde61.png",
    tags: ["Next.js", "Supabase", "TypeScript", "Recharts"],
    href: "/projects",
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: "2",
    title: "Forma Design System",
    description:
      "An accessible, themeable component library used across four production apps. 60+ components, full Storybook docs, and zero runtime dependencies.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8b020ecabb184122bc468ad9162e142f.png",
    tags: ["React", "Radix UI", "Storybook", "CSS Variables"],
    href: "/projects",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "3",
    title: "Relay API Gateway",
    description:
      "Open-source edge proxy for rate limiting, auth, and request routing. 1.4k GitHub stars. Written in Go with a Next.js management console.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/219c0c568a2944398cbb542a92575fb0.jpg",
    tags: ["Go", "Next.js", "Redis", "Docker"],
    href: "/projects",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

const VALUE_PROPS = [
  {
    id: "speed",
    icon: Zap,
    title: "Performance first",
    body: "Every project ships with Core Web Vitals in the green. Lighthouse scores are a deliverable, not an afterthought.",
  },
  {
    id: "craft",
    icon: Layers,
    title: "Design-aware engineering",
    body: "I work directly from Figma and push back when something will hurt the user. Pixel-perfect is the floor, not the ceiling.",
  },
  {
    id: "access",
    icon: Globe,
    title: "Accessible by default",
    body: "WCAG 2.1 AA compliance, keyboard navigation, and screen-reader testing are baked into every component I ship.",
  },
  {
    id: "code",
    icon: Code2,
    title: "Maintainable code",
    body: "Typed end-to-end, documented, and tested. Future-you (or your next hire) will thank present-me.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Alex rewrote our checkout flow in three weeks and conversion went up 18%. The code is cleaner than anything our internal team had shipped.",
    name: "Priya Nair",
    role: "CTO, Cartify",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Nair",
  },
  {
    id: "t2",
    quote:
      "Rare to find someone who can talk design tokens with the brand team in the morning and optimize a Postgres query in the afternoon. Alex does both.",
    name: "Marcus Webb",
    role: "VP Engineering, Lumen Health",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus%20Webb",
  },
  {
    id: "t3",
    quote:
      "We hired Alex for a two-week audit. Six months later the design system is live and our sprint velocity doubled. Best investment we made last year.",
    name: "Sofia Delgado",
    role: "Head of Product, Stackwise",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Delgado",
  },
];

const STATS = [
  { value: "8+", label: "Years shipping" },
  { value: "40+", label: "Products launched" },
  { value: "12", label: "Open-source repos" },
  { value: "99%", label: "Client satisfaction" },
];

const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

// ─── Hero variants ───────────────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroLine: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        {/* Mesh background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[var(--brand-primary)]/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[var(--brand-primary)]/5 blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={heroBadge}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  variants={heroLine}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] text-balance leading-[1.05]"
                >
                  {t("hero.headline1")}
                  <br />
                  <span className="text-[var(--brand-primary)]">
                    {t("hero.headline2")}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                variants={heroLine}
                className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-xl text-pretty"
              >
                {t("hero.subhead")}
              </motion.p>

              <motion.div
                variants={heroLine}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-[0_4px_24px_-4px_var(--brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                >
                  {t("hero.cta_primary")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </motion.div>

              {/* Social row */}
              <motion.div
                variants={heroLine}
                className="flex items-center gap-5 pt-2"
              >
                <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-widest">
                  {t("hero.find_me")}
                </span>
                <div className="flex gap-3">
                  {socialLinks
                    .filter((s) => SOCIAL_ICON_MAP[s.platform])
                    .map((s) => {
                      const Icon = SOCIAL_ICON_MAP[s.platform];
                      return (
                        <a
                          key={s.platform}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform}
                          className="h-9 w-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/40 transition-all duration-200"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      );
                    })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: stats card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_16px_48px_-12px_rgba(0,0,0,0.24)]">
                {/* Glow accent */}
                <div
                  aria-hidden="true"
                  className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/60 to-transparent"
                />
                <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-widest mb-6">
                  {t("hero.stats_label")}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1">
                      <span className="text-3xl font-bold text-[var(--foreground)] tracking-tight">
                        {s.value}
                      </span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center">
                    <CheckCircle
                      className="h-4 w-4 text-[var(--brand-primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {t("hero.availability_title")}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {t("hero.availability_sub")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 bg-[var(--background)]">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <p className="text-xs text-[var(--brand-primary)] uppercase tracking-widest font-semibold mb-2">
                  {t("projects.eyebrow")}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">
                  {t("projects.heading")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:gap-2.5 transition-all duration-200 shrink-0"
              >
                {t("projects.view_all")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.16)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_20px_48px_-12px_rgba(0,0,0,0.28)] hover:border-[var(--brand-primary)]/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:gap-2.5 transition-all duration-200 mt-auto"
                  >
                    {t("projects.case_study")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 md:py-32 bg-[var(--muted)]/40 border-y border-[var(--border)]"
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
            {/* Left sticky label */}
            <Reveal>
              <div className="lg:sticky lg:top-28 flex flex-col gap-5">
                <p className="text-xs text-[var(--brand-primary)] uppercase tracking-widest font-semibold">
                  {t("values.eyebrow")}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance leading-tight">
                  {t("values.heading")}
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                  {t("values.body")}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-medium text-sm hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/5 transition-all duration-300 w-fit"
                >
                  {t("values.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            {/* Right: 2x2 grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {VALUE_PROPS.map((vp, i) => {
                const Icon = vp.icon;
                return (
                  <motion.div
                    key={vp.id}
                    variants={fadeInUp}
                    custom={i}
                    className="flex flex-col gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--brand-primary)]/30 transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--brand-primary)]/12 flex items-center justify-center">
                      <Icon
                        className="h-5 w-5 text-[var(--brand-primary)]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-semibold text-[var(--foreground)] tracking-tight">
                        {vp.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                        {vp.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[var(--background)]">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs text-[var(--brand-primary)] uppercase tracking-widest font-semibold mb-2">
                {t("testimonials.eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance">
                {t("testimonials.heading")}
              </h2>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t_item, i) => (
              <motion.figure
                key={t_item.id}
                variants={fadeInUp}
                custom={i}
                className="flex flex-col gap-5 p-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className="h-4 w-4 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--foreground)] leading-relaxed flex-1">
                  {t_item.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                  <img
                    src={t_item.avatar}
                    alt={t_item.name}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-[var(--border)]"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {t_item.name}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {t_item.role}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-[var(--muted)]/40 border-t border-[var(--border)]"
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <Reveal>
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_48px_-12px_rgba(0,0,0,0.2)]">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[var(--brand-primary)]/10 blur-[80px]" />
                <div
                  aria-hidden="true"
                  className="absolute -top-px left-16 right-16 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/50 to-transparent"
                />
              </div>

              <div className="relative flex flex-col items-center gap-6 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-sm font-medium">
                  <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("cta.badge")}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] text-balance leading-tight">
                  {t("cta.heading")}
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty max-w-lg">
                  {t("cta.body")}
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-[0_4px_24px_-4px_var(--brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                  >
                    {t("cta.primary")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--brand-primary)]/50 hover:bg-[var(--brand-primary)]/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                  >
                    {t("cta.secondary")}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}