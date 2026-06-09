/**
 * Journal (Pillar) content layer for taurisol-flagship.
 *
 * Load order:
 *   1. Static fallback defined here — always succeeds, never throws.
 *   2. Attempt WP REST fetch for the given language.
 *   3. If WP returns ≥1 result: return mapped WP data.
 *   4. If WP is unreachable or returns empty: return fallback silently.
 *
 * WP source: /wp-json/wp/v2/pillar  (custom post type, ACF pillar_data group)
 * Language: acf.pillar_data.content_lang === "en" | "fi"
 */

import type { Lang } from "./i18n";
import { fetchPillarsByLang, type WPPillar } from "./wordpress";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface JournalPillar {
  id: number | string;
  slug: string;
  lang: Lang;
  title: string;
  intro: string;
  expertView: string;
}

export interface JournalData {
  pillars: JournalPillar[];
  source: "wordpress" | "fallback";
}

// ---------------------------------------------------------------------------
// Static fallback content
// Shown when WordPress is unavailable. Matches real WP pillar slugs where known.
// ---------------------------------------------------------------------------

const FALLBACK: Record<Lang, JournalPillar[]> = {
  en: [
    {
      id: "fallback-en-1",
      slug: "customer-insight-value-creation",
      lang: "en",
      title: "Customer Insight & Value Creation",
      intro:
        "Companies talk about their products. Customers think about their risk.\n\nMost sales problems are not caused by price. They are caused by unclear value. A value proposition is not a list of features — it is an answer to one question: why does this matter to me, now?\n\nWithout insight, there is no value. Without value, there is no decision.",
      expertView: "",
    },
    {
      id: "fallback-en-2",
      slug: "sales-leadership-culture",
      lang: "en",
      title: "Sales Leadership & Culture",
      intro:
        "Sales performance does not decline in a single quarter. It erodes in culture.\n\nWhen sales teams lose momentum, the problem is rarely market conditions alone. More often, it is leadership clarity, incentive design or internal trust.\n\nWithout sustainable culture, results are temporary. With the right culture, performance becomes consistent.",
      expertView: "",
    },
    {
      id: "fallback-en-3",
      slug: "b2b-decision-psychology",
      lang: "en",
      title: "B2B Decision Psychology",
      intro:
        "Business buyers do not make rational decisions. They make defensible ones.\n\nUnderstanding the psychology behind business decision-making is the foundation of effective B2B sales. Price is rarely the true obstacle — perceived risk almost always is.",
      expertView: "",
    },
  ],
  fi: [
    {
      id: "fallback-fi-1",
      slug: "asiakasymmarrys-arvonluonti",
      lang: "fi",
      title: "Asiakasymmärrys & Arvonluonti",
      intro:
        "Yritykset puhuvat tuotteistaan. Asiakkaat ajattelevat riskiään.\n\nUseimmat myyntihaasteet eivät johdu hinnasta — ne johtuvat epäselvästä arvosta. Arvolupaus ei ole ominaisuuslista. Se on vastaus yhteen kysymykseen: miksi tämä on minulle tärkeää juuri nyt?\n\nIlman ymmärrystä ei ole arvoa. Ilman arvoa ei ole päätöstä.",
      expertView: "",
    },
    {
      id: "fallback-fi-2",
      slug: "myynnin-johtaminen-kulttuuri",
      lang: "fi",
      title: "Myynnin Johtaminen & Kulttuuri",
      intro:
        "Myyntitulokset eivät synny eivätkä romahda yhdessä yössä. Ne murenevat kulttuurissa.\n\nKun myyntitiimi alkaa väsyä, syy ei yleensä ole markkinassa. Se on johtamisessa, kannustimissa tai tiimin sisäisessä luottamuksessa.\n\nIlman kestävää myynnin kulttuuria ei ole kestävää tulosta.",
      expertView: "",
    },
    {
      id: "fallback-fi-3",
      slug: "b2b-paatoksenteon-psykologia",
      lang: "fi",
      title: "B2B-päätöksenteon psykologia",
      intro:
        "Yritysostajat eivät tee rationaalisia päätöksiä. He tekevät puolustettavia päätöksiä.\n\nPäätöksenteon psykologian ymmärtäminen on tehokkaan B2B-myynnin perusta. Hinta on harvoin todellinen este — koettu riski on lähes aina.",
      expertView: "",
    },
  ],
};

// ---------------------------------------------------------------------------
// WP mapping
// ---------------------------------------------------------------------------

function mapWPPillar(wp: WPPillar): JournalPillar | null {
  const data = wp.acf?.pillar_data;
  if (!data?.content_lang) return null;
  return {
    id: wp.id,
    slug: wp.slug,
    lang: data.content_lang,
    title: wp.title.rendered
      .replace(/&amp;/g, "&")
      .replace(/&#038;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#8217;/g, "’"),
    intro: data.pillar_intro ?? "",
    expertView: data.pillar_expert_view ?? "",
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getJournalPillars(lang: Lang): Promise<JournalData> {
  try {
    const wpPillars = await fetchPillarsByLang(lang);
    if (wpPillars.length === 0) {
      return { pillars: FALLBACK[lang], source: "fallback" };
    }
    const mapped = wpPillars
      .map(mapWPPillar)
      .filter((p): p is JournalPillar => p !== null);
    if (mapped.length === 0) {
      return { pillars: FALLBACK[lang], source: "fallback" };
    }
    return { pillars: mapped, source: "wordpress" };
  } catch {
    return { pillars: FALLBACK[lang], source: "fallback" };
  }
}
