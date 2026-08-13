export type ProjectsLang = "en" | "fi";

export type Metric = { label: string; value: string };
export type Gate = { n: string; title: string; question: string };
export type Phase = { period: string; items: string[] };

export type ProjectsIndexContent = {
  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    note: string;
  };
  card: {
    status: string;
    name: string;
    location: string;
    summary: string;
    metrics: Metric[];
    cta: string;
    imageAlt: string;
  };
  governance: {
    heading: string;
    body: string[];
  };
};

export type MontefrioContent = {
  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageAlt: string;
    status: Metric[];
  };
  facts: {
    heading: string;
    lead: string;
    items: Metric[];
    note: string;
  };
  strategy: {
    heading: string;
    lead: string;
    sequence: string[];
    body: string;
  };
  concept: {
    heading: string;
    body: string[];
    positioning: string;
    items: string[];
  };
  why: {
    heading: string;
    lead: string;
    items: string[];
    closing: string;
  };
  knowledge: {
    heading: string;
    lead: string;
    documentedLabel: string;
    documented: string[];
    verifyLabel: string;
    verify: string[];
    note: string;
  };
  permitting: {
    heading: string;
    body: string[];
    frameworks: Metric[];
  };
  durcal: {
    heading: string;
    lead: string;
    items: string[];
    closing: string;
  };
  timeline: {
    heading: string;
    lead: string;
    phases: Phase[];
    note: string;
  };
  gates: {
    heading: string;
    lead: string;
    items: Gate[];
  };
  mission: {
    heading: string;
    lead: string;
    items: string[];
    closing: string;
  };
  gated: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: string[];
    disclaimer: string;
    cta: string;
    secondaryCta: string;
  };
  conclusion: {
    heading: string;
    question: string;
    decision: string;
    sequence: string;
    thesis: string;
    note: string;
  };
  signature: string;
};

export const projectsIndex: Record<ProjectsLang, ProjectsIndexContent> = {
  en: {
    hero: {
      eyebrow: "Taurisol Projects",
      heading: "One project at a time. One gate at a time.",
      lead:
        "Taurisol develops places, not listings. Every project is documented openly through its own due diligence process — including what is still unknown.",
      note:
        "This page describes development status. It is not an offer to sell property, securities or usage rights.",
    },
    card: {
      status: "Pre-Due Diligence — Open",
      name: "Montefrío Olive Garden",
      location: "Montefrío, Granada, Andalusia, Spain",
      summary:
        "Taurisol's first Proof of Concept candidate: an olive property in inland Andalusia at roughly 850 metres altitude, currently under preliminary investment and development due diligence.",
      metrics: [
        { label: "Land area", value: "≈ 7.6 ha" },
        { label: "Olive trees", value: "202" },
        { label: "Current decision", value: "Investigate" },
      ],
      cta: "Open project file",
      imageAlt: "Olive grove in the Montefrío countryside at golden hour",
    },
    governance: {
      heading: "How we publish project information",
      body: [
        "Documented facts and working assumptions are kept strictly separate. Anything not yet verified by an independent professional is named as unverified.",
        "Financial figures, capital structure and commercial modelling are shared only on request, with context, to parties with a legitimate interest.",
      ],
    },
  },
  fi: {
    hero: {
      eyebrow: "Taurisol-hankkeet",
      heading: "Yksi hanke kerrallaan. Yksi portti kerrallaan.",
      lead:
        "Taurisol kehittää paikkoja, ei myynti-ilmoituksia. Jokainen hanke dokumentoidaan avoimesti oman due diligence -prosessinsa kautta — myös se, mitä ei vielä tiedetä.",
      note:
        "Tämä sivu kuvaa hankkeen kehitysvaihetta. Se ei ole tarjous myydä kiinteistöä, arvopapereita tai käyttöoikeuksia.",
    },
    card: {
      status: "Pre-Due Diligence — avoinna",
      name: "Montefrío Olive Garden",
      location: "Montefrío, Granada, Andalusia, Espanja",
      summary:
        "Taurisolin ensimmäinen Proof of Concept -kandidaatti: oliivitila sisämaan Andalusiassa noin 850 metrin korkeudella, tällä hetkellä alustavassa investointi- ja kehitys-due diligencessä.",
      metrics: [
        { label: "Maa-alue", value: "≈ 7,6 ha" },
        { label: "Oliivipuita", value: "202" },
        { label: "Nykyinen päätös", value: "Selvitetään" },
      ],
      cta: "Avaa hankekortti",
      imageAlt: "Oliivilehto Montefríon maaseudulla kultaisessa illan valossa",
    },
    governance: {
      heading: "Miten julkaisemme hanketietoa",
      body: [
        "Dokumentoidut tiedot ja työoletukset pidetään tiukasti erillään. Kaikki, mitä riippumaton ammattilainen ei ole vielä todentanut, kerrotaan todentamattomana.",
        "Talousluvut, pääomarakenne ja kaupallinen mallinnus jaetaan vain pyynnöstä ja asiayhteydessään niille, joilla on perusteltu intressi.",
      ],
    },
  },
};

export const montefrio: Record<ProjectsLang, MontefrioContent> = {
  en: {
    hero: {
      eyebrow: "Taurisol Pre-Due Diligence — Proof of Concept",
      heading: "Montefrío Olive Garden — 7.6 ha, 202 olive trees",
      lead:
        "A preliminary investment and development due diligence on Taurisol's first Proof of Concept candidate, near Montefrío in the province of Granada, Andalusia.",
      imageAlt: "Ancient olive tree above the Andalusian hills at sunset",
      status: [
        { label: "Status", value: "Pre-Due Diligence: Open" },
        { label: "Current decision", value: "Investigate" },
        { label: "Land purchase", value: "Conditional — not yet" },
        { label: "Next milestone", value: "Site & regulatory DD, autumn 2026" },
      ],
    },
    facts: {
      heading: "What the property is",
      lead:
        "The following figures come from the current sales listing (Inland Andalucía, PL264). They are treated as listing information, not as verified facts.",
      items: [
        { label: "Land area", value: "≈ 76,000 m² / 7.6 ha" },
        { label: "Olive trees", value: "202 (as listed)" },
        { label: "Altitude", value: "≈ 850 m above sea level" },
        { label: "Water", value: "Own abstraction right (declared)" },
        { label: "Streams", value: "Confluence of two streams" },
        { label: "Access", value: "Existing road connection" },
      ],
      note:
        "Area, boundaries, ownership, encumbrances, water rights, road rights and the actual number of olive trees are all subject to independent verification before any purchase.",
    },
    strategy: {
      heading: "The sequence",
      lead:
        "Taurisol does not intend to buy land first and then find out whether anything can be built on it. The strategy is the opposite.",
      sequence: [
        "Control the land",
        "De-risk",
        "Permit",
        "Finance",
        "Buy",
        "Build",
        "Sell",
        "Scale",
      ],
      body:
        "In the first phase the land is secured for roughly two years with a small option fee. Legal, technical, environmental, water, road and planning due diligence follows, together with the formal permitting process. The purchase is completed only once the intended tourism use has a sufficiently strong official position.",
    },
    concept: {
      heading: "What is planned here",
      body: [
        "The preliminary plan for Montefrío is 13 high-quality modular Taurisol units: 12 for the commercial usage-right model and one for founder, management, Living Lab or other strategic use.",
        "A possible camping classification would be primarily a legal and administrative route, not the commercial positioning.",
      ],
      positioning: "Luxury Remote Workplace",
      items: [
        "Factory-built modules",
        "Light pillar foundations",
        "Minimal alteration of the terrain",
        "Solar power and battery storage",
        "Own water solution",
        "Local wastewater and sanitation solution",
        "Preservation of the existing olive landscape",
        "Shared outdoor and service areas",
        "High-quality pool area",
        "Excellent connectivity",
      ],
    },
    why: {
      heading: "Why Montefrío",
      lead:
        "The value of the site is not assessed as the price of olive farmland. It is the combination that is interesting.",
      items: [
        "≈ 7.6 ha of continuous rural land",
        "202 existing olive trees",
        "Montefrío nearby — a National Geographic Pueblo Blanco selection",
        "The province of Granada",
        "≈ 850 m above sea level",
        "The confluence of two streams",
        "Arroyo de los Molinos through or adjacent to the area",
        "A declared own water abstraction right",
        "An existing road connection",
        "Casa del Agua rural tourism site ≈ 1.2–1.5 km further up",
        "Existing rural tourism activity in the area",
      ],
      closing:
        "Altitude, olives, water, mountain landscape and the proximity of Montefrío are not only environmental factors for Taurisol. They are part of the product. The intention is not to urbanise the countryside, but to build a tourism product whose value comes precisely from preserving it.",
    },
    knowledge: {
      heading: "What is known — and what is not yet known",
      lead:
        "At this stage it is essential to separate documented information from assumptions.",
      documentedLabel: "Documented listing information",
      documented: ["≈ 76,000 m² of land", "202 olive trees", "Inland Andalucía, reference PL264"],
      verifyLabel: "To be verified in due diligence",
      verify: [
        "Exact area and boundaries",
        "The seller's registered title",
        "Freedom from encumbrances",
        "Right of way",
        "Legal substance of the water abstraction right",
        "Transfer of the water right to the buyer",
        "Legal protection zones of the streams",
        "Flood risk",
        "Exact number and varieties of the 202 olive trees",
        "Buildable and usable land area",
        "Acceptability of Taurisol's tourism use",
        "Acceptability of 13 fixed modular units",
      ],
      note:
        "Taurisol will not complete the land purchase before the critical questions are either resolved or their risk is acceptable.",
    },
    permitting: {
      heading: "Permitting — the current Andalusian system",
      body: [
        "Andalusian land-use legislation has changed since Taurisol's original 2018 study. The current framework recognises extraordinary actions on rural land (actuaciones extraordinarias en suelo rústico).",
        "For a project of this kind a prior authorisation is required before the building permit itself; on that basis the land is qualified for the intended use. The urbanistic building permit must then be applied for within one year of the authorisation.",
        "As a general rule the current regulation can grant the land-use qualification an unlimited duration where the case is not specifically time-limited. If the authorised activity ceases for more than five consecutive years, the authorisation may be lost and the land may have to be returned to its natural state.",
        "Taurisol's exact tourism classification — camping, rural tourism, thematic accommodation or another suitable category — is not yet resolved. It will be settled together with an urbanismo lawyer, an architect, the municipality of Montefrío and the Junta de Andalucía before the architecture is locked.",
      ],
      frameworks: [
        { label: "Land use", value: "Ley 7/2021 (LISTA)" },
        { label: "Implementing decree", value: "Decreto 550/2022" },
        { label: "Tourism camping", value: "Decreto 26/2018" },
      ],
    },
    durcal: {
      heading: "Dúrcal 2019 — an administrative benchmark",
      lead:
        "On 16 December 2019 the municipal council of Dúrcal, in the same province of Granada, unanimously approved a Proyecto de Actuación for a first-category tourism camping site on approximately 6,376.69 m² of rural land.",
      items: [
        "Camping use on undeveloped rural land",
        "A 30-year authorisation",
        "A 10 % guarantee",
        "A reduced 6 % compensation levy on employment grounds",
        "An obligation to apply for the actual permit within one year",
        "Technical report 2 Apr 2019, legal report 24 Apr 2019, public consultation, sectoral and Junta de Andalucía statements, final municipal decision 16 Dec 2019",
      ],
      closing:
        "Dúrcal does not guarantee a permit in Montefrío, and it was decided under the earlier LOUA legislation. It does prove that a rural land plus tourism camping project has already been taken successfully through the full authority process in the province of Granada — which makes it a benchmark for argumentation, documentation and timing.",
    },
    timeline: {
      heading: "Indicative permitting timeline",
      lead:
        "Taurisol's working assumption is 6–8 months from the option agreement to the point where the land can be purchased in a controlled way from a permitting perspective.",
      phases: [
        {
          period: "0–2 months",
          items: [
            "Option agreement",
            "Legal DD",
            "Catastro + Registro",
            "Topography",
            "Water",
            "Road",
            "Environment",
            "First site plan",
            "First authority meeting",
          ],
        },
        {
          period: "2–6 months",
          items: [
            "Full design material",
            "Required sectoral statements",
            "Junta de Andalucía",
            "Possible supplements",
            "Environmental and infrastructure solutions",
          ],
        },
        {
          period: "≈ 1 month",
          items: ["Municipal decision process in Montefrío once the dossier and statements are complete"],
        },
      ],
      note:
        "The one-month municipal phase is a Taurisol planning assumption, not a statutory processing promise. The timeline is not presented to any investor as a guarantee.",
    },
    gates: {
      heading: "Investment gates",
      lead: "Taurisol proceeds one gate at a time.",
      items: [
        { n: "01", title: "Land control", question: "Can the land be secured at an option risk of roughly €3,000?" },
        { n: "02", title: "Clean title", question: "Can the property be transferred and registered properly?" },
        { n: "03", title: "Land + water + access", question: "Are land, water and road documented as sufficient?" },
        { n: "04", title: "Planning feasibility", question: "Do Montefrío and the Junta de Andalucía see a realistic permitting route?" },
        { n: "05", title: "Formal authorisation", question: "Is the extraordinary rural tourism use authorised?" },
        { n: "06", title: "Land purchase", question: "Only after authorisation is the purchase executed." },
        { n: "07", title: "Construction permit", question: "Is the final building and implementation permit granted?" },
        { n: "08", title: "Living Lab", question: "The first two modules and the infrastructure are built." },
        { n: "09", title: "18 customer take-off", question: "The first 18 usage-right customers are reached." },
        { n: "10", title: "36 customer break-even", question: "Net usage-right revenue exceeds the PoC investment assumption." },
      ],
    },
    mission: {
      heading: "Autumn 2026 — Montefrío Due Diligence Mission",
      lead:
        "The next practical step is on-site work in October–November 2026. This is not a property viewing; it is Taurisol's first Site Due Diligence Mission.",
      items: [
        "Walk the whole 7.6 ha",
        "Document the area",
        "Verify the road",
        "Locate the water abstraction point",
        "Locate both streams",
        "Assess flood and erosion traces",
        "Photograph the olives and identify the varieties",
        "Identify possible module areas and the Living Lab site",
        "Assess sun exposure and access routes",
        "Meet the seller and the agent",
        "Obtain Registro and Catastro material",
        "Meet an urbanismo lawyer and an architect",
        "Open a preliminary discussion with the municipality of Montefrío",
      ],
      closing:
        "The objective is not a verbal “Sí, probablemente.” The objective is to find the professionals and the process that later produce a written “Autorizado.”",
    },
    gated: {
      eyebrow: "Restricted section",
      heading: "Full Pre-Due Diligence file",
      lead:
        "The complete file contains the material that is not published openly. It is shared on request, with context, to parties with a legitimate interest.",
      items: [
        "Conditional land acquisition structure and option terms",
        "Pre-development budget and cost estimates",
        "Capital structure and founder investment requirement",
        "Usage-right model and commercial assumptions",
        "Revenue scenarios and break-even modelling",
        "Take-off point analysis and operating benchmark",
        "Downside case and asset position",
        "Specialist team requirements and scope of work",
      ],
      disclaimer:
        "Access is granted case by case. Nothing in the file constitutes an offer, a solicitation, investment advice or a promise of return. All figures are working assumptions until verified by independent professionals.",
      cta: "Request access",
      secondaryCta: "Ask a question about the project",
    },
    conclusion: {
      heading: "Preliminary conclusion",
      question:
        "The key question is not whether a €50,000 olive plot is cheap. It is whether roughly €50,000 of rural land can be turned, through a controlled 6–8 month process, into the permitted Proof of Concept site of the first globally scalable Taurisol concept.",
      decision: "Investigate — do not buy yet",
      sequence: "Permit → Buy → Build two → Sell 18 → Scale",
      thesis: "External capital starts the machine. Customer sales build the machine.",
      note:
        "The first objective is not to own land in Montefrío. The first objective is to remove uncertainty.",
    },
    signature: "Pre-Due Diligence, August 2026 — Markku Tauriainen, Founder of Taurisol",
  },

  fi: {
    hero: {
      eyebrow: "Taurisol Pre-Due Diligence — Proof of Concept",
      heading: "Montefrío Olive Garden — 7,6 ha, 202 oliivipuuta",
      lead:
        "Alustava investointi- ja kehitys-due diligence Taurisolin ensimmäisestä Proof of Concept -kandidaatista Montefríon lähellä Granadan maakunnassa, Andalusiassa.",
      imageAlt: "Ikivanha oliivipuu Andalusian kukkuloiden yllä auringonlaskussa",
      status: [
        { label: "Tila", value: "Pre-Due Diligence: avoinna" },
        { label: "Nykyinen päätös", value: "Selvitetään" },
        { label: "Tontin osto", value: "Ehdollinen — ei vielä" },
        { label: "Seuraava etappi", value: "Kohde- ja lupa-DD, syksy 2026" },
      ],
    },
    facts: {
      heading: "Mikä kohde on",
      lead:
        "Seuraavat tiedot perustuvat nykyiseen myynti-ilmoitukseen (Inland Andalucía, PL264). Niitä käsitellään ilmoitustietona, ei todennettuina faktoina.",
      items: [
        { label: "Maa-alue", value: "≈ 76 000 m² / 7,6 ha" },
        { label: "Oliivipuita", value: "202 (ilmoitettu)" },
        { label: "Korkeus", value: "≈ 850 m merenpinnasta" },
        { label: "Vesi", value: "Oma vedenotto-oikeus (ilmoitettu)" },
        { label: "Purot", value: "Kahden puron yhtymäalue" },
        { label: "Kulkuyhteys", value: "Olemassa oleva tieyhteys" },
      ],
      note:
        "Pinta-ala, rajat, omistus, rasitteet, vesioikeus, tieoikeus ja oliivipuiden todellinen määrä todennetaan riippumattomasti ennen mitään kauppaa.",
    },
    strategy: {
      heading: "Etenemisjärjestys",
      lead:
        "Taurisolin tavoitteena ei ole ostaa ensin maa-aluetta ja alkaa sen jälkeen selvittää, voiko sille rakentaa. Strategia on päinvastainen.",
      sequence: [
        "Maa hallintaan",
        "Riskin poisto",
        "Luvitus",
        "Rahoitus",
        "Osto",
        "Rakentaminen",
        "Myynti",
        "Skaalaus",
      ],
      body:
        "Ensimmäisessä vaiheessa maa pyritään saamaan noin kahdeksi vuodeksi Taurisolin hallintaan pienellä option-/varausmaksulla. Sen jälkeen tehdään juridinen, tekninen, ympäristö-, vesi-, tie- ja kaavoituksellinen due diligence sekä käynnistetään varsinainen luvitus. Tonttikauppa viedään loppuun vasta, kun suunnitellulle matkailukäytölle on saatu riittävän vahva viranomaisasema.",
    },
    concept: {
      heading: "Mitä tähän suunnitellaan",
      body: [
        "Montefríon kohteeseen suunnitellaan alustavasti 13 korkeatasoista modulaarista Taurisol-yksikköä: 12 kaupalliseen käyttöoikeusmalliin ja yksi founder-, management-, Living Lab- tai muuhun strategiseen käyttöön.",
        "Mahdollinen camping-luokitus olisi ensisijaisesti juridinen ja hallinnollinen väylä — ei kaupallinen positio.",
      ],
      positioning: "Luxury Remote Workplace",
      items: [
        "Tehdasvalmisteiset moduulit",
        "Kevyt pilariperustus",
        "Mahdollisimman vähäinen maaston muuttaminen",
        "Aurinkosähkö ja akkuvarastointi",
        "Oma vesiratkaisu",
        "Paikallinen jätevesi- ja sanitaatioratkaisu",
        "Olemassa olevan oliivimaiseman säilyttäminen",
        "Yhteiset ulko- ja palvelualueet",
        "Korkeatasoinen uima-allasalue",
        "Erittäin hyvä tietoliikenne",
      ],
    },
    why: {
      heading: "Miksi juuri Montefrío",
      lead:
        "Kohteen arvoa ei tarkastella pelkästään oliiviviljelymaan hintana. Kiinnostava on yhdistelmä.",
      items: [
        "≈ 7,6 ha yhtenäistä rural-maata",
        "202 olemassa olevaa oliivipuuta",
        "Montefrío lähellä — National Geographicin Pueblo Blanco -valinta",
        "Granada maakuntana",
        "≈ 850 metriä merenpinnan yläpuolella",
        "Kahden puron yhtymäalue",
        "Arroyo de los Molinos alueen kautta tai sen välittömässä yhteydessä",
        "Ilmoitettu oma vedenotto-oikeus",
        "Olemassa oleva tieyhteys",
        "Casa del Agua -maaseutumatkailukohde ≈ 1,2–1,5 km ylempänä",
        "Alueella on jo maaseutumatkailua",
      ],
      closing:
        "Korkeus, oliivit, vesi, vuoristoinen maisema ja Montefríon läheisyys eivät ole Taurisolille vain ympäristötekijöitä. Ne ovat osa tuotetta. Tarkoitus ei ole urbanisoida maaseutua, vaan rakentaa matkailutuote, jonka arvo syntyy nimenomaan maaseudun säilyttämisestä.",
    },
    knowledge: {
      heading: "Mitä tiedetään — ja mitä ei vielä tiedetä",
      lead:
        "Tässä vaiheessa on tärkeää erottaa dokumentoidut tiedot ja oletukset toisistaan.",
      documentedLabel: "Dokumentoitu myyntitieto",
      documented: ["≈ 76 000 m² maata", "202 oliivipuuta", "Inland Andalucía, viite PL264"],
      verifyLabel: "Due diligencessä todennettavat asiat",
      verify: [
        "Tarkka pinta-ala ja rajat",
        "Myyjän rekisteröity omistusoikeus",
        "Kiinteistön rasitteettomuus",
        "Tieoikeus",
        "Vedenotto-oikeuden juridinen sisältö",
        "Vedenotto-oikeuden siirtyminen ostajalle",
        "Purojen juridiset suoja-alueet",
        "Tulvariskit",
        "202 oliivipuun tarkka määrä ja lajikkeet",
        "Rakennettavissa oleva maa-ala",
        "Taurisolin matkailukäytön hyväksyttävyys",
        "13 kiinteän modulaarisen yksikön hyväksyttävyys",
      ],
      note:
        "Taurisol ei tee lopullista tonttikauppaa ennen kuin kriittiset kysymykset on ratkaistu tai niiden riski on hyväksyttävissä.",
    },
    permitting: {
      heading: "Luvitus — nykyinen Andalusian järjestelmä",
      body: [
        "Andalusian maankäyttölainsäädäntö on muuttunut vuoden 2018 alkuperäisen Taurisol-selvityksen jälkeen. Nykyinen sääntely tunnistaa poikkeukselliset hankkeet rural-maalla eli actuaciones extraordinarias en suelo rústico.",
        "Tällaisessa hankkeessa tarvitaan ennen varsinaista rakennuslupaa ennakkohyväksyntä, jonka perusteella maa kvalifioidaan suunnitellulle käytölle. Varsinainen urbanistinen lupa on haettava hyväksynnän jälkeen enintään vuoden kuluessa.",
        "Yleissääntönä nykyinen sääntely voi antaa käyttökvalifikaatiolle rajoittamattoman keston, jos kyse ei ole erityisestä määräaikaisesta tapauksesta. Jos hyväksytty toiminta loppuu yli viideksi peräkkäiseksi vuodeksi, lupa voidaan menettää ja maa voidaan velvoittaa palauttamaan luonnolliseen tilaansa.",
        "Taurisolin tarkkaa juridista matkailuluokitusta — camping, rural tourism, temaattinen majoitus tai muu soveltuva kategoria — ei ole vielä ratkaistu. Se ratkaistaan yhdessä urbanismo-juristin, arkkitehdin, Montefríon kunnan ja Junta de Andalucían kanssa ennen arkkitehtuurin lukitsemista.",
      ],
      frameworks: [
        { label: "Maankäyttö", value: "Ley 7/2021 (LISTA)" },
        { label: "Toimeenpanoasetus", value: "Decreto 550/2022" },
        { label: "Leirintämatkailu", value: "Decreto 26/2018" },
      ],
    },
    durcal: {
      heading: "Dúrcal 2019 — hallinnollinen benchmark",
      lead:
        "Dúrcalin kunnanvaltuusto samassa Granadan maakunnassa hyväksyi 16.12.2019 yksimielisesti Proyecto de Actuación -hankkeen ensimmäisen luokan leirintämatkailukohteelle noin 6 376,69 m² rural-maalla.",
      items: [
        "Camping-käyttö rakentamattomalla rural-maalla",
        "30 vuoden hyväksyntä",
        "10 % vakuus",
        "Alennettu 6 % kompensaatiomaksu työllisyysvaikutusten perusteella",
        "Velvoite hakea varsinaista lupaa vuoden sisällä",
        "Tekninen lausunto 2.4.2019, juridinen lausunto 24.4.2019, julkinen kuuleminen, sektoriviranomaisten ja Junta de Andalucían lausunnot, kunnan päätös 16.12.2019",
      ],
      closing:
        "Dúrcal ei takaa lupaa Montefríossa, ja se ratkaistiin vanhan LOUA-lainsäädännön aikana. Se kuitenkin todistaa, että Granadan maakunnassa on jo kerran viety rural-maa + tourism camping -hanke koko viranomaisprosessin läpi — siksi se toimii argumentaatio-, dokumentaatio- ja aikataulubenchmarkina.",
    },
    timeline: {
      heading: "Luvituksen alustava aikataulu",
      lead:
        "Taurisolin working assumption on 6–8 kuukautta option-sopimuksesta siihen pisteeseen, jossa maa voidaan luvituksen puolesta ostaa hallitusti.",
      phases: [
        {
          period: "0–2 kk",
          items: [
            "Option-sopimus",
            "Legal DD",
            "Catastro + Registro",
            "Topografia",
            "Vesi",
            "Tie",
            "Ympäristö",
            "Ensimmäinen site plan",
            "Viranomaisneuvottelu",
          ],
        },
        {
          period: "2–6 kk",
          items: [
            "Varsinainen suunnitteluaineisto",
            "Tarvittavat sektorilausunnot",
            "Junta de Andalucía",
            "Mahdolliset täydennykset",
            "Ympäristö- ja infrastruktuuriratkaisut",
          ],
        },
        {
          period: "≈ 1 kk",
          items: ["Montefríon kunnallinen päätösprosessi, kun dossier ja lausunnot ovat kunnossa"],
        },
      ],
      note:
        "Yhden kuukauden kunnallinen loppuvaihe on Taurisolin suunnitteluoletus eikä lakisääteinen lupaus käsittelyajasta. Aikataulua ei käsitellä sijoittajalle takuuna.",
    },
    gates: {
      heading: "Investment Gates",
      lead: "Taurisol etenee vain portti kerrallaan.",
      items: [
        { n: "01", title: "Land control", question: "Saadaanko maa hallintaan noin 3 000 € option-riskillä?" },
        { n: "02", title: "Clean title", question: "Voidaanko maa siirtää ja rekisteröidä asianmukaisesti?" },
        { n: "03", title: "Land + water + access", question: "Ovatko maa, vesi ja tie dokumentoidusti riittävät?" },
        { n: "04", title: "Planning feasibility", question: "Näkevätkö Montefrío ja Junta de Andalucía realistisen lupareitin?" },
        { n: "05", title: "Formal authorisation", question: "Saadaanko extraordinary rural tourism -käytölle hyväksyntä?" },
        { n: "06", title: "Land purchase", question: "Vasta tämän jälkeen toteutetaan tonttikauppa." },
        { n: "07", title: "Construction permit", question: "Saadaanko lopullinen rakennus-/toteutuslupa?" },
        { n: "08", title: "Living Lab", question: "Rakennetaan ensimmäiset kaksi moduulia ja infra." },
        { n: "09", title: "18 customer take-off", question: "Saavutetaan ensimmäiset 18 käyttöoikeusasiakasta." },
        { n: "10", title: "36 customer break-even", question: "Käyttöoikeusmyynnin nettotulovirta ylittää PoC-investointioletuksen." },
      ],
    },
    mission: {
      heading: "Syksy 2026 — Montefrío Due Diligence Mission",
      lead:
        "Seuraava käytännön työvaihe on paikan päällä tehtävä tutkimus loka–marraskuussa 2026. Matka ei ole kiinteistönäyttö, vaan Taurisolin ensimmäinen Site Due Diligence Mission.",
      items: [
        "Kävellä koko 7,6 ha",
        "Dokumentoida alue",
        "Varmistaa tie",
        "Paikantaa vedenotto",
        "Paikantaa molemmat purot",
        "Arvioida tulva- ja eroosiojäljet",
        "Kuvata oliivit ja selvittää lajikkeet",
        "Tunnistaa mahdolliset moduulialueet ja Living Lab -paikka",
        "Arvioida aurinko ja pääsytiet",
        "Tavata myyjä ja välittäjä",
        "Hankkia Registro- ja Catastro-aineisto",
        "Tavata urbanismo-juristi ja arkkitehti",
        "Käydä alustava keskustelu Montefríon kunnan kanssa",
      ],
      closing:
        "Tavoitteena ei ole saada suullista “Sí, probablemente.” Tavoitteena on löytää ammattilaiset ja prosessi, joilla saadaan myöhemmin kirjallinen “Autorizado.”",
    },
    gated: {
      eyebrow: "Rajattu osio",
      heading: "Koko Pre-Due Diligence -aineisto",
      lead:
        "Täysi aineisto sisältää materiaalin, jota ei julkaista avoimesti. Se jaetaan pyynnöstä ja asiayhteydessään niille, joilla on perusteltu intressi.",
      items: [
        "Tontin ehdollisen hankinnan rakenne ja option ehdot",
        "Pre-development-budjetti ja kustannusarviot",
        "Pääomarakenne ja founder-sijoitustarve",
        "Käyttöoikeusmalli ja kaupalliset oletukset",
        "Tulorahoitusskenaariot ja break-even-mallinnus",
        "Take-off-analyysi ja operating benchmark",
        "Downside-case ja omaisuusasema",
        "Asiantuntijatiimin tarve ja työn laajuus",
      ],
      disclaimer:
        "Pääsy myönnetään tapauskohtaisesti. Aineisto ei ole tarjous, kehotus, sijoitusneuvo tai lupaus tuotosta. Kaikki luvut ovat työoletuksia, kunnes riippumattomat ammattilaiset ovat ne todentaneet.",
      cta: "Pyydä pääsyä",
      secondaryCta: "Kysy hankkeesta",
    },
    conclusion: {
      heading: "Alustava johtopäätös",
      question:
        "Keskeinen kysymys ei ole, onko 50 000 euron oliivitontti halpa. Kysymys on, voidaanko noin 50 000 euron rural-maa muuttaa hallitulla 6–8 kuukauden prosessilla ensimmäisen globaalisti skaalautuvan Taurisol-konseptin luvitetuksi Proof of Concept -kohteeksi.",
      decision: "Investigate — do not buy yet",
      sequence: "Lupa → Osto → Kaksi yksikköä → 18 käyttöoikeutta → Skaalaus",
      thesis: "External capital starts the machine. Customer sales build the machine.",
      note:
        "Ensimmäinen tavoite ei ole omistaa Montefríon maata. Ensimmäinen tavoite on poistaa epävarmuus.",
    },
    signature: "Pre-Due Diligence, elokuu 2026 — Markku Tauriainen, Taurisolin perustaja",
  },
};