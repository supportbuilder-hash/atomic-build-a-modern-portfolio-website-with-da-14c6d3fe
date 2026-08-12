export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export const APP_NAME = "Alex Rivera";
export const APP_TAGLINE = "Full-Stack Developer";
export const APP_EMAIL = "hello@alexrivera.dev";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];