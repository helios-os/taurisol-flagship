/**
 * Taurisol WordPress Headless Content Model
 * ACF field definitions per section
 * Locale pattern: content_lang (no WPML) — Helios standard
 * Each bilingual field has _en and _fi suffixes
 */

export const CONTENT_MODEL = {
  /**
   * Page: taurisol-flagship (single page)
   * WordPress page slug: taurisol-flagship / home
   */
  page: {
    acfGroup: "taurisol_page",
    fields: [
      // SEO
      { name: "seo_title_en", type: "text", label: "SEO Title (EN)" },
      { name: "seo_title_fi", type: "text", label: "SEO Title (FI)" },
      { name: "seo_description_en", type: "textarea", label: "SEO Description (EN)" },
      { name: "seo_description_fi", type: "textarea", label: "SEO Description (FI)" },
    ],
  },

  /**
   * Section: Hero
   */
  hero: {
    acfGroup: "taurisol_hero",
    fields: [
      { name: "hero_image", type: "image", label: "Hero Background Image", note: "Recommended 1920×1280px" },
      { name: "hero_eyebrow_en", type: "text", label: "Eyebrow (EN)", default: "A new way to live in Spain" },
      { name: "hero_eyebrow_fi", type: "text", label: "Eyebrow (FI)", default: "Uusi tapa elää Espanjassa" },
      { name: "hero_title_en", type: "text", label: "Title (EN)", default: "Make your Spain dream a reality." },
      { name: "hero_title_fi", type: "text", label: "Title (FI)", default: "Tee Espanja-unelmastasi totta." },
      { name: "hero_subtitle_en", type: "text", label: "Subtitle (EN)", default: "Freedom, certainty and a place to return." },
      { name: "hero_subtitle_fi", type: "text", label: "Subtitle (FI)", default: "Vapautta, varmuutta ja paikka, johon palata." },
      { name: "hero_body_en", type: "textarea", label: "Body text (EN)" },
      { name: "hero_body_fi", type: "textarea", label: "Body text (FI)" },
      { name: "hero_cta_primary_text_en", type: "text", label: "Primary CTA text (EN)", default: "Discover Taurisol" },
      { name: "hero_cta_primary_text_fi", type: "text", label: "Primary CTA text (FI)", default: "Tutustu Taurisoliin" },
      { name: "hero_cta_primary_url", type: "url", label: "Primary CTA URL", default: "#philosophy" },
      { name: "hero_cta_secondary_text_en", type: "text", label: "Secondary CTA text (EN)", default: "Start Taurisol One" },
      { name: "hero_cta_secondary_text_fi", type: "text", label: "Secondary CTA text (FI)", default: "Aloita Taurisol One" },
      { name: "hero_cta_secondary_url", type: "url", label: "Secondary CTA URL", default: "https://one.taurisol.com/" },
    ],
  },

  /**
   * Section: Problem
   */
  problem: {
    acfGroup: "taurisol_problem",
    fields: [
      { name: "problem_title_en", type: "text", label: "Section title (EN)" },
      { name: "problem_title_fi", type: "text", label: "Section title (FI)" },
      {
        name: "problem_cards",
        type: "repeater",
        label: "Problem cards",
        maxRows: 4,
        subfields: [
          { name: "card_title_en", type: "text", label: "Card title (EN)" },
          { name: "card_title_fi", type: "text", label: "Card title (FI)" },
          { name: "card_body_en", type: "textarea", label: "Card body (EN)" },
          { name: "card_body_fi", type: "textarea", label: "Card body (FI)" },
        ],
      },
      { name: "problem_footer_en", type: "text", label: "Footer line (EN)" },
      { name: "problem_footer_fi", type: "text", label: "Footer line (FI)" },
    ],
  },

  /**
   * Section: Outcome
   */
  outcome: {
    acfGroup: "taurisol_outcome",
    fields: [
      { name: "outcome_title_en", type: "text", label: "Section title (EN)" },
      { name: "outcome_title_fi", type: "text", label: "Section title (FI)" },
      { name: "outcome_image", type: "image", label: "Side image", note: "Recommended 1600×1100px, aspect 4/5" },
      {
        name: "outcome_items",
        type: "repeater",
        label: "Outcome bullet items",
        subfields: [
          { name: "item_en", type: "text", label: "Item text (EN)" },
          { name: "item_fi", type: "text", label: "Item text (FI)" },
        ],
      },
      { name: "outcome_closer1_en", type: "text", label: "Closer line 1 (EN)" },
      { name: "outcome_closer1_fi", type: "text", label: "Closer line 1 (FI)" },
      { name: "outcome_closer2_en", type: "text", label: "Closer line 2 italic (EN)" },
      { name: "outcome_closer2_fi", type: "text", label: "Closer line 2 italic (FI)" },
    ],
  },

  /**
   * Section: Pillars (Freedom / Certainty / Place to Return)
   */
  pillars: {
    acfGroup: "taurisol_pillars",
    fields: [
      {
        name: "pillars_cards",
        type: "repeater",
        label: "Pillar cards",
        maxRows: 3,
        subfields: [
          { name: "pillar_title_en", type: "text", label: "Pillar title (EN)" },
          { name: "pillar_title_fi", type: "text", label: "Pillar title (FI)" },
          { name: "pillar_body_en", type: "textarea", label: "Pillar body (EN)" },
          { name: "pillar_body_fi", type: "textarea", label: "Pillar body (FI)" },
        ],
      },
    ],
  },

  /**
   * Section: Why (Technology)
   */
  why: {
    acfGroup: "taurisol_why",
    fields: [
      { name: "why_intro1_en", type: "text", label: "Intro line 1 (EN)" },
      { name: "why_intro1_fi", type: "text", label: "Intro line 1 (FI)" },
      { name: "why_intro2_en", type: "text", label: "Intro line 2 italic (EN)" },
      { name: "why_intro2_fi", type: "text", label: "Intro line 2 italic (FI)" },
      { name: "why_image", type: "image", label: "Editorial image (olive detail)", note: "Aspect 4/5" },
      { name: "why_title_en", type: "text", label: "Image caption title (EN)" },
      { name: "why_title_fi", type: "text", label: "Image caption title (FI)" },
      { name: "why_body_en", type: "textarea", label: "Image caption body (EN)" },
      { name: "why_body_fi", type: "textarea", label: "Image caption body (FI)" },
      {
        name: "why_cards",
        type: "repeater",
        label: "Technology cards",
        maxRows: 3,
        subfields: [
          { name: "card_icon", type: "text", label: "Icon (emoji)" },
          { name: "card_title_en", type: "text", label: "Card title (EN)" },
          { name: "card_title_fi", type: "text", label: "Card title (FI)" },
          { name: "card_body_en", type: "textarea", label: "Card body (EN)" },
          { name: "card_body_fi", type: "textarea", label: "Card body (FI)" },
        ],
      },
    ],
  },

  /**
   * Section: Location
   */
  location: {
    acfGroup: "taurisol_location",
    fields: [
      { name: "location_image", type: "image", label: "Hero image (Montefrío countryside)", note: "Recommended 1600×900px" },
      { name: "location_eyebrow_en", type: "text", label: "Eyebrow (EN)", default: "The Location" },
      { name: "location_eyebrow_fi", type: "text", label: "Eyebrow (FI)", default: "Sijainti" },
      { name: "location_title_en", type: "text", label: "Title (EN)", default: "Why Here?" },
      { name: "location_title_fi", type: "text", label: "Title (FI)", default: "Miksi juuri täällä?" },
      { name: "location_subtitle_en", type: "textarea", label: "Subtitle (EN)" },
      { name: "location_subtitle_fi", type: "textarea", label: "Subtitle (FI)" },
      { name: "location_story1_en", type: "text", label: "Story line 1 (EN)" },
      { name: "location_story1_fi", type: "text", label: "Story line 1 (FI)" },
      { name: "location_story2_en", type: "textarea", label: "Story line 2 italic (EN)" },
      { name: "location_story2_fi", type: "textarea", label: "Story line 2 italic (FI)" },
      {
        name: "location_bullets",
        type: "repeater",
        label: "Location bullet points",
        subfields: [
          { name: "bullet_en", type: "text", label: "Bullet (EN)" },
          { name: "bullet_fi", type: "text", label: "Bullet (FI)" },
        ],
      },
      {
        name: "location_cards",
        type: "repeater",
        label: "Location benefit cards",
        maxRows: 4,
        subfields: [
          { name: "card_title_en", type: "text", label: "Card title (EN)" },
          { name: "card_title_fi", type: "text", label: "Card title (FI)" },
          { name: "card_body_en", type: "textarea", label: "Card body (EN)" },
          { name: "card_body_fi", type: "textarea", label: "Card body (FI)" },
        ],
      },
      { name: "location_credibility_en", type: "textarea", label: "National Geographic quote (EN)" },
      { name: "location_credibility_fi", type: "textarea", label: "National Geographic quote (FI)" },
      { name: "location_quote_en", type: "text", label: "Pull quote (EN)" },
      { name: "location_quote_fi", type: "text", label: "Pull quote (FI)" },
      { name: "location_quote_support_en", type: "textarea", label: "Pull quote support text (EN)" },
      { name: "location_quote_support_fi", type: "textarea", label: "Pull quote support text (FI)" },
      { name: "location_micro_title_en", type: "text", label: "Microclimate title (EN)" },
      { name: "location_micro_title_fi", type: "text", label: "Microclimate title (FI)" },
      { name: "location_cta_title_en", type: "text", label: "CTA title (EN)" },
      { name: "location_cta_title_fi", type: "text", label: "CTA title (FI)" },
      { name: "location_cta_btn_en", type: "text", label: "CTA button text (EN)" },
      { name: "location_cta_btn_fi", type: "text", label: "CTA button text (FI)" },
      { name: "location_cta_url", type: "url", label: "CTA URL", default: "https://one.taurisol.com/" },
    ],
  },

  /**
   * Section: Winters
   */
  winters: {
    acfGroup: "taurisol_winters",
    fields: [
      { name: "winters_image", type: "image", label: "Background image", note: "Recommended 1600×1100px" },
      { name: "winters_title_en", type: "text", label: "Title (EN)" },
      { name: "winters_title_fi", type: "text", label: "Title (FI)" },
      { name: "winters_body_en", type: "textarea", label: "Body text (EN)" },
      { name: "winters_body_fi", type: "textarea", label: "Body text (FI)" },
      { name: "winters_cta_text_en", type: "text", label: "CTA text (EN)", default: "Explore the possibility" },
      { name: "winters_cta_text_fi", type: "text", label: "CTA text (FI)", default: "Tutki mahdollisuutta" },
      { name: "winters_cta_url", type: "url", label: "CTA URL", default: "#audience" },
    ],
  },

  /**
   * Section: Trust
   */
  trust: {
    acfGroup: "taurisol_trust",
    fields: [
      { name: "trust_title_en", type: "text", label: "Title (EN)" },
      { name: "trust_title_fi", type: "text", label: "Title (FI)" },
      { name: "trust_body1_en", type: "text", label: "Body line 1 (EN)" },
      { name: "trust_body1_fi", type: "text", label: "Body line 1 (FI)" },
      { name: "trust_body2_en", type: "text", label: "Body line 2 (EN)" },
      { name: "trust_body2_fi", type: "text", label: "Body line 2 (FI)" },
      { name: "trust_body3_en", type: "text", label: "Body line 3 italic (EN)" },
      { name: "trust_body3_fi", type: "text", label: "Body line 3 italic (FI)" },
    ],
  },

  /**
   * Section: Audience
   */
  audience: {
    acfGroup: "taurisol_audience",
    fields: [
      { name: "audience_eyebrow_en", type: "text", label: "Eyebrow (EN)", default: "Who it's for" },
      { name: "audience_eyebrow_fi", type: "text", label: "Eyebrow (FI)", default: "Kenelle" },
      { name: "audience_title_en", type: "text", label: "Title (EN)" },
      { name: "audience_title_fi", type: "text", label: "Title (FI)" },
      { name: "audience_subtitle_en", type: "textarea", label: "Subtitle (EN)" },
      { name: "audience_subtitle_fi", type: "textarea", label: "Subtitle (FI)" },
      {
        name: "audience_cards",
        type: "repeater",
        label: "Audience cards",
        maxRows: 4,
        subfields: [
          { name: "card_title_en", type: "text", label: "Card title (EN)" },
          { name: "card_title_fi", type: "text", label: "Card title (FI)" },
          { name: "card_body_en", type: "textarea", label: "Card body (EN)" },
          { name: "card_body_fi", type: "textarea", label: "Card body (FI)" },
        ],
      },
      { name: "audience_footer1_en", type: "text", label: "Footer line 1 (EN)" },
      { name: "audience_footer1_fi", type: "text", label: "Footer line 1 (FI)" },
      { name: "audience_footer2_en", type: "textarea", label: "Footer line 2 (EN)" },
      { name: "audience_footer2_fi", type: "textarea", label: "Footer line 2 (FI)" },
      { name: "audience_cta_text_en", type: "text", label: "CTA text (EN)", default: "Start Taurisol One" },
      { name: "audience_cta_text_fi", type: "text", label: "CTA text (FI)", default: "Aloita Taurisol One" },
      { name: "audience_cta_url", type: "url", label: "CTA URL", default: "https://one.taurisol.com/" },
    ],
  },

  /**
   * Section: Taurisol One
   */
  taurisolOne: {
    acfGroup: "taurisol_one",
    fields: [
      { name: "one_eyebrow_en", type: "text", label: "Eyebrow (EN)", default: "Taurisol One" },
      { name: "one_eyebrow_fi", type: "text", label: "Eyebrow (FI)", default: "Taurisol One" },
      { name: "one_title_en", type: "text", label: "Title (EN)" },
      { name: "one_title_fi", type: "text", label: "Title (FI)" },
      { name: "one_body_en", type: "textarea", label: "Body text (EN)" },
      { name: "one_body_fi", type: "textarea", label: "Body text (FI)" },
      { name: "one_cta_text_en", type: "text", label: "CTA text (EN)", default: "Start Taurisol One" },
      { name: "one_cta_text_fi", type: "text", label: "CTA text (FI)", default: "Aloita Taurisol One" },
      { name: "one_cta_url", type: "url", label: "CTA URL", default: "https://one.taurisol.com/" },
    ],
  },

  /**
   * Navigation (global)
   */
  navigation: {
    acfGroup: "taurisol_navigation",
    note: "Applies to Nav and Footer. Override labels without touching anchors.",
    fields: [
      { name: "nav_cta_text_en", type: "text", label: "Nav CTA text (EN)", default: "Discover Taurisol" },
      { name: "nav_cta_text_fi", type: "text", label: "Nav CTA text (FI)", default: "Tutustu Taurisoliin" },
    ],
  },
} as const;

export type ContentModelKey = keyof typeof CONTENT_MODEL;
