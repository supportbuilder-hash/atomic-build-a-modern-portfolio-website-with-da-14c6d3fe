"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Briefcase, Code2, Database, Globe, Layers, Mail, MapPin, Smartphone, Terminal, Wrench, Zap } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type BRAND = any;
const BRAND: any = [];
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline mock data ──────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    id: "1",
    period: "2022 – Present",
    role: "Senior Full-Stack Engineer",
    company: "Vercel",
    location: "San Francisco, CA",
    bullets: [
      "Led the redesign of the deployment pipeline UI, reducing time-to-deploy by 40%.",
      "Built and maintained Next.js-based internal tooling used by 200+ engineers.",
      "Mentored three junior engineers through structured code-review cycles.",
    ],
  },
  {
    id: "2",
    period: "2020 – 2022",
    role: "Full-Stack Developer",
    company: "Stripe",
    location: "Remote",
    bullets: [
      "Developed React-based dashboard components for the Stripe Dashboard used by millions.",
      "Integrated real-time webhook monitoring with WebSocket and Redis pub/sub.",
      "Improved API response times by 30% through query optimization and caching.",
    ],
  },
  {
    id: "3",
    period: "2018 – 2020",
    role: "Frontend Engineer",
    company: "Figma",
    location: "San Francisco, CA",
    bullets: [
      "Built plugin marketplace UI from scratch using TypeScript and React.",
      "Collaborated with design systems team to ship a new component library.",
      "Reduced bundle size by 25% through code splitting and lazy loading.",
    ],
  },
  {
    id: "4",
    period: "2016 – 2018",
    role: "Junior Web Developer",
    company: "Freelance",
    location: "San Francisco, CA",
    bullets: [
      "Delivered 15+ client websites using HTML, CSS, JavaScript, and WordPress.",
      "Established a design-to-code workflow that cut revision cycles in half.",
    ],
  },
];

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Globe,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
  },
  {
    id: "backend",
    name: "Backend",
    icon: Terminal,
    skills: ["Node.js", "Express", "tRPC", "GraphQL", "REST APIs", "WebSockets"],
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    skills: ["PostgreSQL", "Prisma", "Redis", "Supabase", "PlanetScale", "MongoDB"],
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Expo", "iOS (Swift basics)", "Android (Kotlin basics)"],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    icon: Layers,
    skills: ["Vercel", "AWS", "Docker", "GitHub Actions", "Terraform", "Cloudflare"],
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    icon: Wrench,
    skills: ["Git", "Figma", "Linear", "Notion", "Zod", "Vitest"],
  },
];

const STATS = [
  { value: "8+", label: "Years building" },
  { value: "60+", label: "Projects shipped" },
  { value: "3", label: "Open-source libs" },
  { value: "12k+", label: "GitHub stars" },
];

// ─── Hero heading animation ────────────────────────────────────────────────────

const heroHeading: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const heroWord: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
      <span className="text-3xl font-bold tracking-tight text-[var(--accent)]">{value}</span>
      <span className="text-xs font-medium uppercase tracking-widest text-white/50">{label}</span>
    </div>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 transition-colors duration-200 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]">
      {label}
    </span>
  );
}

function TimelineCard({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <div
      className={cn(
        "relative flex w-full items-start gap-6 md:gap-0",
        isLeft ? "md:flex-row" : "md:flex-row-reverse",
      )}
    >
      {/* Card */}
      <motion.div
        variants={isLeft ? slideInLeft : slideInRight}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-white/8 md:w-[calc(50%-2rem)]",
        )}
      >
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--accent)]/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {item.period}
          </span>
          <span className="text-xs text-white/40">{item.location}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-white">{item.role}</h3>
        <p className="mb-3 text-sm font-semibold text-[var(--accent)]/80">{item.company}</p>
        <ul className="space-y-1.5">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-white/60">
              <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]/60" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-0 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] shadow-[0_0_12px_var(--accent)] md:left-1/2 md:block" />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-32 md:pt-40">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[600px] w-[600px] rounded-full bg-[var(--accent)]/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            {t("about.eyebrow")}
          </motion.p>

          <motion.h1
            variants={heroHeading}
            initial="hidden"
            animate="visible"
            className="text-balance text-5xl font-bold tracking-tight text-white md:text-7xl"
            aria-label={t("about.heroHeading")}
          >
            {t("about.heroHeading")
              .split(" ")
              .map((word, i) => (
                <motion.span key={i} variants={heroWord} className="mr-[0.25em] inline-block last:mr-0">
                  {word}
                </motion.span>
              ))}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60"
          >
            {t("about.heroSubtitle")}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeInUp}>
                <StatPill value={s.value} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. Bio split ────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[280px_1fr]">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="h-56 w-56 overflow-hidden rounded-full border-4 border-[var(--accent)]/60 shadow-[0_0_40px_var(--accent)/20]">
                  <img
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7ad4e2ebafc944908a51355f7203e1bc.jpg"
                    alt={`${BRAND.name} profile photo`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const parent = el.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-white/5 text-6xl font-bold text-[var(--accent)]">AR</div>`;
                      }
                    }}
                  />
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--background)] bg-emerald-400">
                  <span className="sr-only">Available for work</span>
                </span>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold tracking-tight text-white">{BRAND.name}</h2>
                <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--accent)]">
                  {BRAND.role}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {BRAND.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {BRAND.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                  {t("about.bioAvailability")}
                </span>
              </div>

              <p className="leading-relaxed text-white/70">{t("about.bio1")}</p>
              <p className="leading-relaxed text-white/70">{t("about.bio2")}</p>
              <p className="leading-relaxed text-white/70">{t("about.bio3")}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── 3. Experience Timeline ───────────────────────────────────────────── */}
      <Reveal>
        <section className="relative px-6 py-24">
          {/* Subtle tinted background */}
          <div className="absolute inset-0 bg-white/[0.02]" aria-hidden="true" />

          <div className="relative mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t("about.experienceEyebrow")}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("about.experienceHeading")}
              </h2>
            </div>

            {/* Timeline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative space-y-10"
            >
              {/* Vertical line — desktop only */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
              />

              {EXPERIENCE.map((item, i) => (
                <TimelineCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── 4. Skills Grid ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t("about.skillsEyebrow")}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("about.skillsHeading")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/50">
                {t("about.skillsSubtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {SKILL_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.id}
                    variants={fadeInUp}
                    transition={{ delay: i * 0.07 }}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-white/8"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/15">
                        <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-white">{cat.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <SkillBadge key={skill} label={skill} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── 5. CTA Section ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 pb-32 pt-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-[0_2px_4px_rgba(0,0,0,0.2),0_20px_60px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-[80px]" />
            </div>

            <div className="relative">
              <Code2 className="mx-auto mb-4 h-10 w-10 text-[var(--accent)]" aria-hidden="true" />
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("about.ctaHeading")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-white/60">
                {t("about.ctaSubtitle")}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-black shadow-[0_0_20px_var(--accent)/30] transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {t("about.ctaPrimary")}
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {t("about.ctaSecondary")}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}