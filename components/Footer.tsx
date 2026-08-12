"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, APP_NAME, APP_EMAIL } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/alexrivera",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/alexrivera",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/alexrivera_dev",
    label: "Twitter",
  },
  {
    icon: Mail,
    href: `mailto:${APP_EMAIL}`,
    label: "Email",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link
              href="/"
              className="inline-block font-bold text-xl tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 mb-4"
            >
              <span className="text-[var(--primary)]">{"{"}</span>
              {APP_NAME.split(" ")[0]}
              <span className="text-[var(--primary)]">{"}"}</span>
            </Link>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-[var(--radius)] bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all duration-200"
                >
                  <social.icon size={16} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isAnchor = link.href.startsWith("#");
                const resolvedHref = isAnchor
                  ? pathname === "/"
                    ? link.href
                    : "/" + link.href
                  : link.href;
                return (
                  <li key={link.key}>
                    <Link
                      href={resolvedHref}
                      onClick={
                        isAnchor
                          ? (e) => handleAnchorClick(e, link.href)
                          : undefined
                      }
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {navT[link.key] ?? link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                >
                  {APP_EMAIL}
                </a>
              </li>
              <li className="text-sm text-[var(--muted-foreground)]">
                {t("footer.location")}
              </li>
              <li className="text-sm text-[var(--muted-foreground)]">
                {t("footer.availability")}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright", { name: APP_NAME })}
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-[var(--radius)] bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-all duration-200"
          >
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}