"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Clock, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, FileText, ChevronDown, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type BRAND = any;
const BRAND: any = [];
type socialLinks = any;
const socialLinks: any = [];
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline FAQ data ────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What types of projects do you take on?",
    a: "I work on full-stack web applications, API design, performance optimization, and design-system builds. I'm especially interested in products that need both strong engineering and thoughtful UX.",
  },
  {
    q: "What does your typical engagement look like?",
    a: "Most projects start with a scoping call, followed by a written proposal covering timeline, deliverables, and pricing. I work in two-week sprints with async updates and a weekly sync.",
  },
  {
    q: "Are you available for part-time or contract work?",
    a: "Yes. I take on select contract engagements alongside my main projects. Reach out with your timeline and I'll let you know my current availability.",
  },
  {
    q: "How quickly do you respond to messages?",
    a: "I reply to all inquiries within one business day. For urgent matters, mention it in the subject line and I'll prioritize accordingly.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. I've collaborated with teams across North America, Europe, and Asia. I'm comfortable with async-first workflows and flexible on meeting times.",
  },
];

// ─── Social icon map ────────────────────────────────────────────────────────────
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  Twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
  "Dev.to": <FileText className="h-5 w-5" aria-hidden="true" />,
};

// ─── Contact methods ────────────────────────────────────────────────────────────
const CONTACT_METHODS = [
  {
    icon: <Mail className="h-5 w-5" aria-hidden="true" />,
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
    label: "Location",
    value: BRAND.location,
    href: null,
  },
  {
    icon: <Clock className="h-5 w-5" aria-hidden="true" />,
    label: "Response time",
    value: "Within 24 hours",
    href: null,
  },
];

// ─── Form state type ────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ─── FAQ Accordion Item ─────────────────────────────────────────────────────────
function FaqItem({ item, index, isOpen, onToggle }: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--brand-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-surface)]"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-white leading-snug">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="shrink-0 text-[var(--brand-accent)]"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Form ───────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 20) next.message = "Message must be at least 20 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputBase =
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)]/60";
  const inputNormal = "border-white/10";
  const inputError = "border-red-500/60 focus:ring-red-500/50";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={cn(inputBase, errors.name ? inputError : inputNormal)}
        />
        {errors.name && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={cn(inputBase, errors.email ? inputError : inputNormal)}
        />
        {errors.email && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/50">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className={cn(inputBase, errors.subject ? inputError : inputNormal)}
        />
        {errors.subject && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/50">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project, timeline, and goals..."
          className={cn(inputBase, "resize-none", errors.message ? inputError : inputNormal)}
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "submitting" || status === "success"}
        whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
        whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
        className={cn(
          "relative flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300",
          status === "success"
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
            : "bg-[var(--brand-accent)] text-[var(--brand-dark)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {status === "submitting" && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
          />
        )}
        {status === "success" && <CheckCircle className="h-4 w-4" aria-hidden="true" />}
        {status === "idle" && <Send className="h-4 w-4" aria-hidden="true" />}
        {status === "submitting" ? "Sending..." : status === "success" ? "Message sent!" : "Send message"}
      </motion.button>

      {/* Success toast */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"
          >
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-emerald-400">Message received.</p>
              <p className="mt-0.5 text-xs text-emerald-400/70">
                Thanks for reaching out. I'll get back to you within one business day.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[var(--brand-dark)] text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pt-40">
        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse at center, var(--brand-accent) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="mb-4 inline-block rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
              {t("contact.badge")}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
              {t("contact.hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-white/60 text-pretty max-w-xl mx-auto">
              {t("contact.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Two-column: Form + Sidebar ────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_360px]">
          {/* Left: Contact form */}
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-16px_rgba(0,0,0,0.5)]">
              <h2 className="mb-1 text-xl font-semibold text-white">{t("contact.form.heading")}</h2>
              <p className="mb-7 text-sm text-white/50">{t("contact.form.subheading")}</p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Right: Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Availability badge */}
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    {t("contact.availability.status")}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/60">
                  {t("contact.availability.description")}
                </p>
              </div>
            </Reveal>

            {/* Contact methods */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                  {t("contact.methods.heading")}
                </h3>
                <ul className="flex flex-col gap-4">
                  {CONTACT_METHODS.map((method) => (
                    <li key={method.label} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-[var(--brand-accent)]">{method.icon}</span>
                      <div>
                        <p className="text-xs text-white/40">{method.label}</p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="text-sm font-medium text-white transition-colors hover:text-[var(--brand-accent)]"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white">{method.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Social links */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                  {t("contact.social.heading")}
                </h3>
                <ul className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <li key={link.platform}>
                      <motion.a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-white/10 hover:bg-white/5"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors group-hover:border-[var(--brand-accent)]/30 group-hover:text-[var(--brand-accent)]">
                          {SOCIAL_ICONS[link.platform] ?? <FileText className="h-5 w-5" aria-hidden="true" />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">{link.platform}</p>
                          <p className="truncate text-xs text-white/40">{link.handle}</p>
                        </div>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("contact.faq.eyebrow")}
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {t("contact.faq.heading")}
              </h2>
              <p className="mt-3 text-base text-white/50">{t("contact.faq.subheading")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-16px_rgba(0,0,0,0.4)]">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 text-center text-sm text-white/40">
              {t("contact.faq.footer")}{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="text-[var(--brand-accent)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                {BRAND.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}