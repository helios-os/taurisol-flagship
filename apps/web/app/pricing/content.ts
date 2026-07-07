export type HeroLine = {
  text: string;
  variant: "lead" | "body" | "medium" | "strong";
};

export type PricingTier = {
  name: string;
  badge?: string;
  tagline: string;
  price: string;
  stay: string;
  term: string;
  description: string;
  bullets: string[];
  additionalLabel: string;
  additional: string[];
  cta: string;
  featured: boolean;
};

export type PricingFaq = { q: string; a: string };
export type PricingStep = { title: string; body: string };

export type PricingContent = {
  hero: {
    eyebrow: string;
    heading: string;
    lines: HeroLine[];
    trustPill: string;
    imageAlt: string;
  };
  transition: {
    heading: string;
    body: string[];
    reflective: string;
  };
  cardsHeading: string;
  tiers: PricingTier[];
  cardsNote: string;
  included: {
    heading: string;
    items: string[];
    note: string;
  };
  whoFor: {
    heading: string;
    body: string;
    supportLabel: string;
    uses: string[];
    note: string;
  };
  hostPrivileges: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    mutedNote: string;
    items: string[];
    finalNote: string;
  };
  privateByDesign: {
    heading: string;
    body1: string;
    body2: string;
    quote: string;
  };
  priorityList: {
    eyebrow: string;
    heading: string;
    feeIntro: string;
    feeAmount: string;
    paragraphs: string[];
    mutedParagraphs: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  notThis: {
    heading: string;
    prefix: string;
    items: string[];
    body: string;
    quote: string;
  };
  process: {
    heading: string;
    steps: PricingStep[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: PricingFaq[];
  };
  finalCta: {
    heading: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const en: PricingContent = {
  hero: {
    eyebrow: "Taurisol Membership",
    heading: "Your anchor place in Andalusia.",
    lines: [
      { text: "Buy the membership once. Return year after year.", variant: "lead" },
      {
        text: "Stay your reserved period — and longer when Taurisol has free capacity.",
        variant: "body",
      },
      {
        text: "For the price of a car, Taurisol gives you a place to return to.",
        variant: "strong",
      },
    ],
    trustPill:
      "Approval-based membership. Final rights defined in the Taurisol Membership Agreement.",
    imageAlt: "Ancient olive tree in Andalusia",
  },
  transition: {
    heading: "A new category of second-home access",
    body: [
      "You do not need to buy a second home to have a place to return to. You need a trusted place, a clear membership model and enough flexibility to use it in the way your life actually works.",
    ],
    reflective:
      "Life has a limited number of quality years. Why spend them searching, comparing, booking and worrying every year?",
  },
  cardsHeading: "Choose your annual return rhythm.",
  tiers: [
    {
      name: "Return One",
      tagline: "Your annual anchor month.",
      price: "€30,000",
      stay: "1 month every year",
      term: "20-year membership period",
      description:
        "For those who want a long-term place to return to, without committing to the full 30-year rhythm.",
      bullets: [
        "Defined annual return rhythm",
        "Operating contribution included",
        "Private approval-based membership",
        "Additional stays from free capacity",
      ],
      additionalLabel: "Additional stays",
      additional: ["Request extra months from free capacity at €500 / month."],
      cta: "Apply for Return One",
      featured: false,
    },
    {
      name: "Legacy One",
      badge: "Recommended",
      tagline: "Your 30-year return rhythm. Recommended.",
      price: "€35,000",
      stay: "1 month every year",
      term: "30-year membership period",
      description: "The most natural Taurisol rhythm: one month every year, for three decades.",
      bullets: [
        "Long-term annual return rhythm",
        "Operating contribution included",
        "Private member environment",
        "Additional stays from free capacity",
        "Designed for founder recovery and clarity",
      ],
      additionalLabel: "Additional stays",
      additional: [
        "Request extra stays from free capacity:",
        "€400 / month for 1–3 additional months",
        "€600 / month for 3–6 additional months",
      ],
      cta: "Apply for Legacy One",
      featured: true,
    },
    {
      name: "Host One",
      tagline: "Your private hosted base in Andalusia.",
      price: "€60,000",
      stay: "2 months every year",
      term: "30-year membership period",
      description:
        "For companies, founders and family offices who want Taurisol not only as a personal return place, but as a private hosted environment for family, clients, partners and selected guests.",
      bullets: [
        "Two annual stay periods",
        "Operating contribution included",
        "Host family, clients or selected guests",
        "Request additional homes from free capacity",
        "More time for remote work, recovery and retreats",
        "Private approval-based membership",
      ],
      additionalLabel: "Additional stays",
      additional: [
        "Request additional weeks, months or additional homes from free capacity for family, client or retreat use.",
      ],
      cta: "Apply for Host One",
      featured: false,
    },
  ],
  cardsNote:
    "Additional stays and additional homes are available only from free capacity and must not reduce other members’ reserved annual stays.",
  included: {
    heading: "Included in every Taurisol Membership",
    items: [
      "Defined annual stay allocation",
      "Operating contribution included for the membership period",
      "Access to the Taurisol member environment",
      "Private approval-based membership model",
      "Possibility to request additional stays from free capacity",
      "Energy-independent village concept",
      "Governance designed to protect the long-term character of Taurisol",
      "A calm Andalusian place designed for recovery, clarity and return",
    ],
    note: "Final legal terms, stay rules, transfer rules, verification requirements and accepted payment methods are defined in the Taurisol Membership Agreement.",
  },
  whoFor: {
    heading: "Who Taurisol Membership is for",
    body: "Taurisol Membership is primarily designed for companies, founders and professional entities looking for a long-term private retreat environment in Andalusia.",
    supportLabel: "It can support:",
    uses: [
      "founder recovery",
      "strategy weeks",
      "leadership clarity",
      "remote work periods",
      "board and partner retreats",
      "key person reward stays",
      "quiet creative work",
      "long-term personal and professional rhythm",
    ],
    note: "Private applications may be considered separately, subject to Taurisol approval and the final Taurisol Membership Agreement.",
  },
  hostPrivileges: {
    eyebrow: "Host Privileges",
    heading: "Host Privileges",
    paragraphs: [
      "Taurisol Membership is designed for more than personal stays.",
      "Subject to Taurisol rules, approval and available capacity, members may invite family members, relatives, selected clients, partners, key employees or other trusted guests to experience Taurisol.",
      "This makes Taurisol useful not only as a place for recovery, but also as a private hosted environment for strategy weeks, client relationships, family gatherings and carefully selected retreats.",
    ],
    mutedNote:
      "Additional stays and additional homes are available only from free capacity and must not reduce other members’ reserved annual stays.",
    items: [
      "Invite selected family members or trusted guests",
      "Host clients, partners or key people in a private setting",
      "Request additional weeks or months from free capacity",
      "Request additional homes for selected retreat weeks when available",
      "Keep all use governed by Taurisol's private approval-based member model",
    ],
    finalNote:
      "Final guest, booking, capacity and approval rules are defined in the Taurisol Membership Agreement.",
  },
  privateByDesign: {
    heading: "Private by design",
    body1: "Taurisol Membership is designed to protect member privacy.",
    body2:
      "It is not based on a public property-owner list or an open shareholder register. Member identity, stay rhythm and membership details are managed privately within Taurisol’s own approval-based membership system, subject to applicable legal, tax and regulatory requirements.",
    quote:
      "The purpose is simple: to protect the peace, privacy and long-term stability of the Taurisol community.",
  },
  priorityList: {
    eyebrow: "Founding Member Priority List",
    heading:
      "Before public launch, Taurisol may invite a limited number of early applicants to join the Founding Member Priority List.",
    feeIntro: "The Priority Application Fee is",
    feeAmount: "€1,000",
    paragraphs: [
      "If you are approved and later proceed to Taurisol Membership, the full €1,000 is credited toward your membership price.",
      "If Taurisol does not approve your application, the fee is refunded in full.",
      "If you decide not to proceed after your application has been reviewed and the initial cancellation period has passed, €500 is refunded and €500 is retained as an openly stated application, priority reservation and administration fee.",
    ],
    mutedParagraphs: [
      "The Priority Application Fee does not purchase Taurisol Membership, real estate, ownership, investment rights, resale rights, rental income rights or guaranteed stay dates.",
      "Final membership rights are defined only in the Taurisol Membership Agreement.",
    ],
    primaryCta: "Join the Priority List",
    secondaryCta: "Request Membership Details",
  },
  notThis: {
    heading: "What Taurisol Membership is not",
    prefix: "Taurisol Membership is not a",
    items: [
      "a timeshare",
      "holiday club",
      "fractional ownership",
      "real estate ownership",
      "property investment",
      "crypto asset",
      "yield product",
      "rental income product",
      "buyback promise",
      "resale value promise",
    ],
    body: "Taurisol does not promise appreciation, rental income, passive income, financial return, resale value or buyback.",
    quote:
      "Taurisol Membership is a long-term, approval-based membership model for returning to the same place year after year.",
  },
  process: {
    heading: "How the process works",
    steps: [
      {
        title: "Apply",
        body: "You apply for Taurisol Membership or join the Founding Member Priority List.",
      },
      {
        title: "Verify",
        body: "Taurisol reviews the applicant, company profile and intended use. The goal is to protect the long-term quality, privacy and stability of the Taurisol community.",
      },
      {
        title: "Approve",
        body: "If the applicant is a good fit, Taurisol may invite them to proceed toward Membership. Membership is approval-based. Not every application is accepted.",
      },
      {
        title: "Confirm",
        body: "Final terms, accepted payment methods, verification requirements and membership details are confirmed before signing the Taurisol Membership Agreement.",
      },
      {
        title: "Join",
        body: "After approval, agreement and payment confirmation, the member receives access to the Taurisol member environment and annual stay planning.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    items: [
      {
        q: "Is this property ownership?",
        a: "No. Taurisol Membership does not represent ownership of real estate. Final legal terms are defined in the Taurisol Membership Agreement.",
      },
      {
        q: "Is this a timeshare or holiday club?",
        a: "No. Taurisol is not marketed or sold as a timeshare, holiday club or fractional ownership product. It is an approval-based, fixed-term membership model with defined annual stays.",
      },
      {
        q: "Is Taurisol an investment product?",
        a: "No. Taurisol does not promise yield, resale value, rental income, appreciation, buyback or financial return. Taurisol Membership is designed for use, not speculation.",
      },
      {
        q: "Are operating contributions included?",
        a: "Yes. Each Taurisol Membership price includes the operating contribution for the stated membership period. This is designed to reduce uncertainty and avoid the traditional problem of unpredictable annual fee increases. Final cost coverage and legal details are defined in the Taurisol Membership Agreement.",
      },
      {
        q: "Are additional months guaranteed?",
        a: "No. Additional months are available only from free capacity. They do not reduce other members' reserved annual stays.",
      },
      {
        q: "Can a membership be transferred?",
        a: "Possible transfer rules are defined in the Taurisol Membership Agreement and may require Taurisol approval. Taurisol is designed as a curated, approval-based membership environment, not as an open secondary market.",
      },
      {
        q: "Are member names public?",
        a: "No. Taurisol Membership is not structured as a public property-owner list or shareholder register. Member details are managed privately within Taurisol's approval-based membership system, subject to applicable legal, tax and regulatory requirements.",
      },
      {
        q: "Who can apply?",
        a: "Taurisol Membership is primarily designed for companies, founders and professional entities. Private applications may be considered separately, subject to Taurisol approval and the final Membership Agreement.",
      },
      {
        q: "Can my family, clients or guests use Taurisol?",
        a: "Subject to Taurisol rules, approval and available capacity, members may invite family members, relatives, selected clients, partners, key employees or other trusted guests. Guest use, additional homes, additional weeks and capacity rules are defined in the Taurisol Membership Agreement.",
      },
      {
        q: "Can I book more than one home for a retreat week?",
        a: "Possibly. Members may request additional homes from free capacity for selected retreat, family or client weeks. Availability is not guaranteed and must not reduce other members' reserved annual stays.",
      },
      {
        q: "Why does Taurisol publish pricing?",
        a: "Because serious applicants should be able to understand whether Taurisol is financially possible before entering a deeper conversation. Pricing creates clarity. The final conversation is about fit, rhythm, use and long-term alignment.",
      },
      {
        q: "What does the Priority Application Fee mean?",
        a: "The Priority Application Fee is a way to join the early application process before public launch. It does not purchase Taurisol Membership, ownership, investment rights or guaranteed stay dates. If approved and you proceed to Membership, the fee is credited toward your membership price. If Taurisol does not approve your application, it is refunded in full. If you decide not to proceed after your application has been reviewed and the initial cancellation period has passed, €500 is refunded and €500 is retained as an openly stated application, priority reservation and administration fee.",
      },
    ],
  },
  finalCta: {
    heading: "Could Taurisol become part of your life rhythm?",
    body: "If the idea of returning to the same peaceful Andalusian place year after year feels right, apply for the Taurisol Priority List.",
    primaryCta: "Join the Priority List",
    secondaryCta: "Request Membership Details",
  },
};

const fi: PricingContent = {
  hero: {
    eyebrow: "Taurisol-jäsenyys",
    heading: "Paikka, johon haluat palata.",
    lines: [
      {
        text: "Ostat jäsenyyden kerran. Palaat samaan valoon vuodesta toiseen.",
        variant: "lead",
      },
      {
        text: "Andalusian aurinko, vuoret ja hiljainen rytmi tekevät Taurisolista paikan, joka alkaa tuntua tutulta — ja joka kerta paremmalta.",
        variant: "body",
      },
      {
        text: "Taurisol-jäsenyys antaa sinulle määritellyn vuosittaisen paluujakson. Kun vapaata kapasiteettia on, voit pyytää lisäviikkoja tai pidempää oleskelua.",
        variant: "body",
      },
      { text: "Viikko. Kuukausi. Tai pidempi kausi.", variant: "medium" },
      {
        text: "Auton hinnalla saat jotain arvokasta: upean paikan etätyölle, palautumiselle ja voimaantumiselle.",
        variant: "strong",
      },
    ],
    trustPill:
      "Hyväksynnänvarainen jäsenyys. Lopulliset oikeudet määritellään Taurisol Membership Agreement -sopimuksessa.",
    imageAlt: "Vanha oliivipuu Andalusian vuoristossa",
  },
  transition: {
    heading: "Uusi tapa löytää itselle toinen koti etelästä",
    body: [
      "Sinun ei tarvitse ostaa asuntoa Espanjasta saadaksesi paikan, johon palata.",
      "Tarvitset luotettavan paikan, selkeän jäsenmallin ja riittävästi joustavuutta käyttää sitä tavalla, joka sopii omaan elämääsi.",
    ],
    reflective:
      "Elämässä on vain rajallinen määrä laadukkaita vuosia. Miksi käyttää niitä etsimiseen, vertailuun, varaamiseen ja murehtimiseen joka vuosi?",
  },
  cardsHeading: "Valitse vuosittainen paluurytmisi.",
  tiers: [
    {
      name: "Return One",
      tagline: "Sinun vuosittainen ankkurikuukautesi.",
      price: "€30,000",
      stay: "1 kuukausi joka vuosi",
      term: "20 vuoden jäsenyyskausi",
      description:
        "Sinulle, joka haluat pitkäaikaisen paikan johon palata, mutta et vielä sitoudu täyteen 30 vuoden rytmiin.",
      bullets: [
        "Määritelty vuosittainen paluujakso",
        "Käyttövastike sisältyy jäsenyyskaudelle",
        "Yksityinen hyväksynnänvarainen jäsenmalli",
        "Lisäjaksot vapaasta kapasiteetista",
      ],
      additionalLabel: "Lisäjaksot",
      additional: ["Voit pyytää lisäkuukausia vapaasta kapasiteetista hintaan €500 / kk."],
      cta: "Hae Return One -jäsenyyttä",
      featured: false,
    },
    {
      name: "Legacy One",
      badge: "Suositeltu",
      tagline: "Sinun 30 vuoden paluurytmisi. Suositeltu.",
      price: "€35,000",
      stay: "1 kuukausi joka vuosi",
      term: "30 vuoden jäsenyyskausi",
      description:
        "Luontevin Taurisol-rytmi: yksi kuukausi joka vuosi, kolmen vuosikymmenen ajan.",
      bullets: [
        "Pitkä vuosittainen paluurytmi",
        "Käyttövastike sisältyy jäsenyyskaudelle",
        "Yksityinen jäsenympäristö",
        "Lisäjaksot vapaasta kapasiteetista",
        "Suunniteltu yrittäjän palautumiseen ja kirkkaaseen ajatteluun",
      ],
      additionalLabel: "Lisäjaksot",
      additional: [
        "Pyydä lisäjaksoja vapaasta kapasiteetista:",
        "€400 / kk 1–3 lisäkuukaudelle vapaasta kapasiteetista",
        "€600 / kk 3–6 lisäkuukaudelle vapaasta kapasiteetista",
      ],
      cta: "Hae Legacy One -jäsenyyttä",
      featured: true,
    },
    {
      name: "Host One",
      tagline: "Sinun yksityinen hostattu tukikohtasi Andalusiassa.",
      price: "€60,000",
      stay: "2 kuukautta joka vuosi",
      term: "30 vuoden jäsenyyskausi",
      description:
        "Yrityksille, yrittäjille ja family office -tyyppisille jäsenille, jotka haluavat Taurisolin paitsi omaksi paluupaikaksi myös yksityiseksi hostatuksi ympäristöksi perheelle, asiakkaille, kumppaneille ja valituille vieraille.",
      bullets: [
        "Kaksi vuosittaista oleskelujaksoa",
        "Käyttövastike sisältyy jäsenyyskaudelle",
        "Mahdollisuus hostata perhettä, asiakkaita tai valittuja vieraita",
        "Lisäkotien pyynnöt vapaasta kapasiteetista",
        "Enemmän aikaa etätyöhön, palautumiseen ja retriitteihin",
        "Yksityinen hyväksynnänvarainen jäsenmalli",
      ],
      additionalLabel: "Lisäjaksot",
      additional: [
        "Voit pyytää lisäviikkoja, lisäkuukausia tai lisäkoteja vapaasta kapasiteetista perhe-, asiakas- tai retriittikäyttöön.",
      ],
      cta: "Hae Host One -jäsenyyttä",
      featured: false,
    },
  ],
  cardsNote:
    "Lisäjaksot ja lisäkodit ovat saatavilla vain vapaasta kapasiteetista, eivätkä ne vähennä muiden jäsenten varattuja vuosittaisia oleskelujaksoja.",
  included: {
    heading: "Sisältyy jokaiseen Taurisol-jäsenyyteen",
    items: [
      "Määritelty vuosittainen oleskelujakso",
      "Käyttövastike sisältyy koko jäsenyyskaudelle",
      "Pääsy Taurisolin jäsenympäristöön",
      "Yksityinen hyväksynnänvarainen jäsenmalli",
      "Mahdollisuus pyytää lisäjaksoja vapaasta kapasiteetista",
      "Energiaomavarainen kyläkonsepti",
      "Hallintomalli, joka suojaa Taurisolin pitkäaikaista luonnetta",
      "Rauhallinen andalusialainen paikka, joka on suunniteltu palautumiseen, kirkkauteen ja paluuseen",
    ],
    note: "Lopulliset oikeudelliset ehdot, oleskelusäännöt, siirtosäännöt, todentamisvaatimukset ja hyväksytyt maksutavat määritellään Taurisol Membership Agreement -sopimuksessa.",
  },
  whoFor: {
    heading: "Kenelle Taurisol-jäsenyys sopii",
    body: "Taurisol-jäsenyys on suunniteltu ensisijaisesti yrityksille, yrittäjille ja ammattimaisille toimijoille, jotka etsivät pitkäaikaista yksityistä retriittiympäristöä Andalusiasta.",
    supportLabel: "Se voi tukea esimerkiksi:",
    uses: [
      "yrittäjän palautumista",
      "strategiaviikkoja",
      "johtamisen kirkkautta",
      "etätyöjaksoja",
      "hallitus- ja kumppaniretriittejä",
      "avainhenkilöiden palkitsemisoleskeluja",
      "rauhallista luovaa työtä",
      "pitkäaikaista henkilökohtaista ja ammatillista rytmiä",
    ],
    note: "Yksityishakemuksia voidaan harkita erikseen Taurisolin hyväksynnän ja lopullisen Taurisol Membership Agreement -sopimuksen mukaisesti.",
  },
  hostPrivileges: {
    eyebrow: "Hostausoikeudet",
    heading: "Hostausoikeudet",
    paragraphs: [
      "Taurisol-jäsenyys on suunniteltu muuhunkin kuin vain henkilökohtaisiin oleskeluihin.",
      "Taurisolin sääntöjen, hyväksynnän ja käytettävissä olevan kapasiteetin mukaisesti jäsen voi kutsua perheenjäseniä, sukulaisia, valittuja asiakkaita, kumppaneita, avainhenkilöitä tai muita luotettuja vieraita kokemaan Taurisolin.",
      "Tämä tekee Taurisolista hyödyllisen paitsi palautumisen paikkana, myös yksityisenä ympäristönä strategiapäiville, asiakassuhteille, perhetapaamisille ja huolella valituille retriiteille.",
    ],
    mutedNote:
      "Lisäjaksot ja lisäkodit ovat saatavilla vain vapaasta kapasiteetista, eivätkä ne vähennä muiden jäsenten varattuja vuosittaisia oleskelujaksoja.",
    items: [
      "Kutsu valittuja perheenjäseniä tai luotettuja vieraita",
      "Hostaa asiakkaita, kumppaneita tai avainhenkilöitä yksityisessä ympäristössä",
      "Pyydä lisäviikkoja tai -kuukausia vapaasta kapasiteetista",
      "Pyydä lisäkoteja valituille retriittiviikoille, kun niitä on saatavilla",
      "Kaikkea käyttöä ohjaa Taurisolin yksityinen hyväksynnänvarainen jäsenmalli",
    ],
    finalNote:
      "Lopulliset vieras-, varaus-, kapasiteetti- ja hyväksyntäsäännöt määritellään Taurisol Membership Agreement -sopimuksessa.",
  },
  privateByDesign: {
    heading: "Suunniteltu yksityiseksi",
    body1: "Taurisol-jäsenyys on suunniteltu suojaamaan jäsenten yksityisyyttä.",
    body2:
      "Se ei perustu julkiseen kiinteistönomistajaluetteloon tai avoimeen osakasrekisteriin. Jäsenen henkilöllisyys, paluurytmi ja jäsenyyden tiedot hallinnoidaan yksityisesti Taurisolin omassa hyväksynnänvaraisessa jäsenjärjestelmässä, sovellettavien laki-, vero- ja sääntelyvaatimusten mukaisesti.",
    quote:
      "Tarkoitus on yksinkertainen: suojella Taurisol-yhteisön rauhaa, yksityisyyttä ja pitkäaikaista vakautta.",
  },
  priorityList: {
    eyebrow: "Perustajajäsenten prioriteettilista",
    heading:
      "Ennen julkista lanseerausta Taurisol voi kutsua rajatun määrän varhaisia hakijoita liittymään perustajajäsenten prioriteettilistalle.",
    feeIntro: "Prioriteettihakemuksen maksu on",
    feeAmount: "€1,000",
    paragraphs: [
      "Jos hakemuksesi hyväksytään ja etenet myöhemmin Taurisol-jäsenyyteen, koko €1,000 hyvitetään jäsenyyden hintaan.",
      "Jos Taurisol ei hyväksy hakemustasi, maksu palautetaan kokonaisuudessaan.",
      "Jos päätät olla etenemättä sen jälkeen, kun hakemuksesi on käsitelty ja alkuperäinen peruutusaika on kulunut umpeen, €500 palautetaan ja €500 pidätetään avoimesti ilmoitettuna hakemus-, prioriteettivaraus- ja hallinnointimaksuna.",
    ],
    mutedParagraphs: [
      "Prioriteettihakemuksen maksu ei osta Taurisol-jäsenyyttä, kiinteistöä, omistusoikeutta, sijoitusoikeuksia, jälleenmyyntioikeuksia, vuokratulo-oikeuksia tai taattuja oleskeluajankohtia.",
      "Lopulliset jäsenyysoikeudet määritellään ainoastaan Taurisol Membership Agreement -sopimuksessa.",
    ],
    primaryCta: "Liity prioriteettilistalle",
    secondaryCta: "Pyydä lisätietoja jäsenyydestä",
  },
  notThis: {
    heading: "Mitä Taurisol-jäsenyys ei ole",
    prefix: "Taurisol-jäsenyys ei ole",
    items: [
      "viikko-osake",
      "lomaosake",
      "lomaklubi",
      "murto-osaomistus",
      "kiinteistöomistus",
      "kiinteistösijoitus",
      "kryptotuote",
      "sijoitustuote",
      "vuokratulotuote",
      "takaisinostolupaus",
      "jälleenmyyntiarvolupaus",
    ],
    body: "Taurisol ei lupaa arvonnousua, vuokratuloa, passiivista tuloa, taloudellista hyötyä, jälleenmyyntiarvoa tai takaisinostoa.",
    quote:
      "Taurisol-jäsenyys on pitkäaikainen, hyväksynnänvarainen jäsenmalli, joka mahdollistaa paluun samaan paikkaan vuodesta toiseen.",
  },
  process: {
    heading: "Miten prosessi etenee",
    steps: [
      {
        title: "Hakeminen",
        body: "Haet Taurisol-jäsenyyttä tai liityt perustajajäsenten prioriteettilistalle.",
      },
      {
        title: "Tarkistus",
        body: "Taurisol käy läpi hakijan, yrityksen profiilin ja aiotun käyttötarkoituksen. Tavoitteena on suojella Taurisol-yhteisön pitkäaikaista laatua, yksityisyyttä ja vakautta.",
      },
      {
        title: "Hyväksyntä",
        body: "Jos hakija sopii hyvin yhteisöön, Taurisol voi kutsua hänet etenemään kohti jäsenyyttä. Jäsenyys on hyväksynnänvarainen — kaikkia hakemuksia ei hyväksytä.",
      },
      {
        title: "Vahvistus",
        body: "Lopulliset ehdot, hyväksytyt maksutavat, todentamisvaatimukset ja jäsenyyden yksityiskohdat vahvistetaan ennen Taurisol Membership Agreement -sopimuksen allekirjoittamista.",
      },
      {
        title: "Liittyminen",
        body: "Hyväksynnän, sopimuksen ja maksun vahvistamisen jälkeen jäsen saa pääsyn Taurisolin jäsenympäristöön ja vuosittaisen oleskelun suunnitteluun.",
      },
    ],
  },
  faq: {
    eyebrow: "UKK",
    heading: "Usein kysytyt kysymykset",
    items: [
      {
        q: "Onko tämä kiinteistön omistusta?",
        a: "Ei. Taurisol-jäsenyys ei ole kiinteistön omistusoikeus. Lopulliset oikeudelliset ehdot määritellään Taurisol Membership Agreement -sopimuksessa.",
      },
      {
        q: "Onko tämä lomaosake tai lomaklubi?",
        a: "Ei. Taurisolia ei markkinoida tai myydä lomaosakkeena, lomaklubina tai murto-osaomistustuotteena. Se on hyväksynnänvarainen, määräaikainen jäsenmalli, jossa on määritellyt vuosittaiset oleskelujaksot.",
      },
      {
        q: "Onko Taurisol sijoitustuote?",
        a: "Ei. Taurisol ei lupaa jälleenmyyntiarvoa, vuokratuloa, arvonnousua, takaisinostoa tai taloudellista hyötyä. Taurisol-jäsenyys on suunniteltu käyttöön, ei spekulaatioon.",
      },
      {
        q: "Sisältyykö käyttövastike hintaan?",
        a: "Kyllä. Jokainen Taurisol-jäsenyyden hinta sisältää käyttövastikkeen ilmoitetulle jäsenyyskaudelle. Tämä on suunniteltu vähentämään epävarmuutta ja välttämään perinteisen ongelman, jossa vuosittaiset maksut nousevat ennakoimattomasti. Lopulliset kustannuskattavuuden ja oikeudelliset yksityiskohdat määritellään Taurisol Membership Agreement -sopimuksessa.",
      },
      {
        q: "Onko lisäkuukausia taattu?",
        a: "Ei. Lisäkuukaudet ovat saatavilla vain vapaasta kapasiteetista. Ne eivät vähennä muiden jäsenten varattuja vuosittaisia oleskelujaksoja.",
      },
      {
        q: "Voiko jäsenyyden siirtää?",
        a: "Mahdolliset siirtosäännöt määritellään Taurisol Membership Agreement -sopimuksessa, ja siirto voi edellyttää Taurisolin hyväksyntää. Taurisol on suunniteltu kuratoiduksi, hyväksynnänvaraiseksi jäsenympäristöksi, ei avoimeksi jälkimarkkinaksi.",
      },
      {
        q: "Ovatko jäsenten nimet julkisia?",
        a: "Ei. Taurisol-jäsenyys ei perustu julkiseen kiinteistönomistajaluetteloon tai osakasrekisteriin. Jäsenten tiedot hallinnoidaan yksityisesti Taurisolin hyväksynnänvaraisessa jäsenjärjestelmässä, sovellettavien laki-, vero- ja sääntelyvaatimusten mukaisesti.",
      },
      {
        q: "Kuka voi hakea?",
        a: "Taurisol-jäsenyys on suunniteltu ensisijaisesti yrityksille, yrittäjille ja ammattimaisille toimijoille. Yksityishakemuksia voidaan harkita erikseen Taurisolin hyväksynnän ja lopullisen Membership Agreement -sopimuksen mukaisesti.",
      },
      {
        q: "Voivatko perheeni, asiakkaani tai vieraani käyttää Taurisolia?",
        a: "Taurisolin sääntöjen, hyväksynnän ja käytettävissä olevan kapasiteetin mukaisesti jäsenet voivat kutsua perheenjäseniä, sukulaisia, valittuja asiakkaita, kumppaneita, avainhenkilöitä tai muita luotettuja vieraita. Vieraiden käyttöä, lisäkoteja, lisäviikkoja ja kapasiteettisääntöjä koskevat ehdot määritellään Taurisol Membership Agreement -sopimuksessa.",
      },
      {
        q: "Voinko varata useamman kodin retriittiviikoksi?",
        a: "Mahdollisesti. Jäsenet voivat pyytää lisäkoteja vapaasta kapasiteetista valituille retriitti-, perhe- tai asiakasviikoille. Saatavuutta ei taata, eikä se saa vähentää muiden jäsenten varattuja vuosittaisia oleskelujaksoja.",
      },
      {
        q: "Miksi Taurisol julkaisee hinnoittelun?",
        a: "Koska vakavasti kiinnostuneiden hakijoiden tulisi voida arvioida, onko Taurisol taloudellisesti mahdollinen, ennen syvempää keskustelua. Hinnoittelu luo selkeyttä. Varsinainen keskustelu koskee sopivuutta, rytmiä, käyttöä ja pitkän aikavälin yhteensopivuutta.",
      },
      {
        q: "Mitä prioriteettihakemuksen maksu tarkoittaa?",
        a: "Prioriteettihakemuksen maksu on tapa liittyä varhaiseen hakuprosessiin ennen julkista lanseerausta. Se ei osta Taurisol-jäsenyyttä, omistusoikeutta, sijoitusoikeuksia tai taattuja oleskeluajankohtia. Jos hakemuksesi hyväksytään ja etenet jäsenyyteen, maksu hyvitetään jäsenyyden hintaan. Jos Taurisol ei hyväksy hakemustasi, maksu palautetaan kokonaisuudessaan. Jos päätät olla etenemättä sen jälkeen, kun hakemuksesi on käsitelty ja alkuperäinen peruutusaika on kulunut umpeen, €500 palautetaan ja €500 pidätetään avoimesti ilmoitettuna hakemus-, prioriteettivaraus- ja hallinnointimaksuna.",
      },
    ],
  },
  finalCta: {
    heading: "Voisiko Taurisolista tulla osa elämäsi rytmiä?",
    body: "Jos ajatus paluusta samaan rauhalliseen andalusialaiseen paikkaan vuodesta toiseen tuntuu oikealta, hae Taurisolin prioriteettilistalle.",
    primaryCta: "Liity prioriteettilistalle",
    secondaryCta: "Pyydä lisätietoja jäsenyydestä",
  },
};

export const pricingContent = { en, fi } as const;
export type PricingLang = keyof typeof pricingContent;
