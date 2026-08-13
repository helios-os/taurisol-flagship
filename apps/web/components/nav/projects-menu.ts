import type { Lang } from "@/lib/i18n";

/**
 * Projects available in the navbar dropdown.
 * Add future projects here — the nav renders the list generically.
 */
export type ProjectNavItem = {
  key: string;
  /** Locale-aware path builder */
  href: (lang: Lang) => string;
  name: string;
  meta: { en: string; fi: string };
};

export const projectNavItems: ProjectNavItem[] = [
  {
    key: "montefrio",
    href: (lang) => (lang === "fi" ? "/fi/projects/montefrio" : "/projects/montefrio"),
    name: "Montefrío Olive Garden",
    meta: {
      en: "7.6 ha · 202 Olive Trees · Granada",
      fi: "7,6 ha · 202 oliivipuuta · Granada",
    },
  },
];

export const projectsOverviewLabel = {
  en: "All projects",
  fi: "Kaikki hankkeet",
};
