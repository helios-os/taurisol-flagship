export const colors = {
  sandLight: "oklch(0.972 0.012 85)",
  sand: "oklch(0.918 0.028 82)",
  stoneWarm: "oklch(0.835 0.034 75)",
  olive: "oklch(0.55 0.055 115)",
  oliveDeep: "oklch(0.32 0.04 115)",
  sun: "oklch(0.71 0.08 82)",         // Taurisol Gold ~#C8A15A
  sunDeep: "oklch(0.65 0.075 80)",
  sunSoft: "oklch(0.78 0.075 84)",
  oliveNight: "oklch(0.15 0.012 110)",
  shadowDeep: "oklch(0.22 0.025 90)",
} as const;

export const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
} as const;

export const radius = {
  base: "0.25rem",
} as const;

export const spacing = {
  sectionY: { mobile: "py-28", desktop: "md:py-40" },
  containerX: { mobile: "px-6", desktop: "md:px-12" },
  maxWidth: {
    full: "max-w-7xl",
    content: "max-w-5xl",
    narrow: "max-w-4xl",
    text: "max-w-3xl",
    copy: "max-w-2xl",
  },
} as const;

export const typography = {
  displayXl: "font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]",
  displayLg: "font-serif text-4xl leading-[1.1] md:text-5xl lg:text-6xl",
  displayMd: "font-serif text-4xl leading-[1.1] md:text-6xl",
  displaySm: "font-serif text-3xl md:text-4xl",
  eyebrow: "text-xs uppercase tracking-[0.35em]",
  navItem: "text-[11px] uppercase tracking-[0.22em]",
  bodyLg: "text-base font-light leading-relaxed md:text-lg",
  bodySm: "text-sm font-light leading-relaxed md:text-base",
} as const;
