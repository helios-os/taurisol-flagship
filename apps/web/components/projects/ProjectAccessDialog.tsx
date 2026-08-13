"use client";

import { useId, useState, type ReactNode, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProjectsLang } from "@/app/projects/content";

const inputCls =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

type Variant = "access" | "question";

const copy = {
  en: {
    titleAccess: "Request access — Montefrío Pre-Due Diligence",
    titleQuestion: "Ask a question about the Montefrío project",
    intro:
      "Access to the full file is granted case by case. Tell us who you are and in what capacity you are reviewing the project.",
    name: "Name",
    email: "Email",
    organisation: "Organisation",
    country: "Country",
    roleLabel: "Your interest",
    roles: {
      founderInvestor: "Founder Investor interest",
      professional: "Professional adviser (legal, planning, technical)",
      partner: "Development or construction partner",
      customer: "Future Taurisol user / member",
      other: "Other",
    },
    message: "Message",
    submit: "Send request",
    required: "Please add your name and email.",
    legal:
      "By sending this request you agree that we may contact you about the Montefrío project. The Pre-Due Diligence file is preliminary, contains working assumptions and is not an offer, a solicitation or investment advice.",
    success:
      "Your email client should now be open with the request prepared. Send it and we will reply personally. If nothing opened, write to info@heliosdigitech.com.",
    subject: "Taurisol — Montefrío Pre-Due Diligence access request",
    subjectQuestion: "Taurisol — Montefrío project question",
    bodyHeading: "Montefrío Pre-Due Diligence — request",
    labels: {
      intent: "Request type",
      name: "Name",
      email: "Email",
      org: "Organisation",
      country: "Country",
      role: "Interest",
      message: "Message",
    },
    intentAccess: "Full Pre-Due Diligence file access",
    intentQuestion: "Question about the project",
  },
  fi: {
    titleAccess: "Pyydä pääsyä — Montefrío Pre-Due Diligence",
    titleQuestion: "Kysy Montefrío-hankkeesta",
    intro:
      "Pääsy koko aineistoon myönnetään tapauskohtaisesti. Kerro kuka olet ja missä roolissa tarkastelet hanketta.",
    name: "Nimi",
    email: "Sähköposti",
    organisation: "Organisaatio",
    country: "Maa",
    roleLabel: "Kiinnostuksesi",
    roles: {
      founderInvestor: "Founder Investor -kiinnostus",
      professional: "Ammattilainen (juridiikka, kaavoitus, tekniikka)",
      partner: "Kehitys- tai rakennuskumppani",
      customer: "Tuleva Taurisol-käyttäjä / jäsen",
      other: "Muu",
    },
    message: "Viesti",
    submit: "Lähetä pyyntö",
    required: "Lisää nimesi ja sähköpostisi.",
    legal:
      "Lähettämällä pyynnön hyväksyt, että voimme olla sinuun yhteydessä Montefrío-hankkeesta. Pre-Due Diligence -aineisto on alustava, sisältää työoletuksia eikä ole tarjous, kehotus tai sijoitusneuvo.",
    success:
      "Sähköpostiohjelmasi pitäisi nyt avautua valmiiksi kirjoitetulla pyynnöllä. Lähetä se, niin vastaamme henkilökohtaisesti. Jos mikään ei avautunut, kirjoita osoitteeseen info@heliosdigitech.com.",
    subject: "Taurisol — Montefrío Pre-Due Diligence -pääsypyyntö",
    subjectQuestion: "Taurisol — kysymys Montefrío-hankkeesta",
    bodyHeading: "Montefrío Pre-Due Diligence — pyyntö",
    labels: {
      intent: "Pyynnön tyyppi",
      name: "Nimi",
      email: "Sähköposti",
      org: "Organisaatio",
      country: "Maa",
      role: "Kiinnostus",
      message: "Viesti",
    },
    intentAccess: "Pääsy koko Pre-Due Diligence -aineistoon",
    intentQuestion: "Kysymys hankkeesta",
  },
} as const;

export function ProjectAccessDialog({
  children,
  variant,
  lang,
}: {
  children: ReactNode;
  variant: Variant;
  lang: ProjectsLang;
}) {
  const uid = useId();
  const c = copy[lang];
  const roleKeys = Object.keys(c.roles) as (keyof typeof c.roles)[];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState<keyof typeof c.roles>("founderInvestor");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  function reset() {
    setName("");
    setEmail("");
    setOrganisation("");
    setCountry("");
    setRole("founderInvestor");
    setMessage("");
    setError(false);
    setSent(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const body = [
      c.bodyHeading,
      "",
      `${c.labels.intent}: ${variant === "access" ? c.intentAccess : c.intentQuestion}`,
      `${c.labels.name}: ${name}`,
      `${c.labels.email}: ${email}`,
      `${c.labels.org}: ${organisation}`,
      `${c.labels.country}: ${country}`,
      `${c.labels.role}: ${c.roles[role]}`,
      `${c.labels.message}: ${message}`,
    ].join("\n");

    const subject = variant === "access" ? c.subject : c.subjectQuestion;
    window.location.href = `mailto:info@heliosdigitech.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 200);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl leading-snug">
            {variant === "access" ? c.titleAccess : c.titleQuestion}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{c.intro}</DialogDescription>
        </DialogHeader>

        {sent ? (
          <p className="py-6 text-sm leading-relaxed text-foreground">{c.success}</p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 pt-2" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label={c.name} required>
                <input
                  id={`${uid}-name`}
                  autoComplete="name"
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-email`} label={c.email} required>
                <input
                  id={`${uid}-email`}
                  type="email"
                  autoComplete="email"
                  className={inputCls}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-org`} label={c.organisation}>
                <input
                  id={`${uid}-org`}
                  autoComplete="organization"
                  className={inputCls}
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-country`} label={c.country}>
                <input
                  id={`${uid}-country`}
                  autoComplete="country-name"
                  className={inputCls}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Field>
            </div>

            <Field id={`${uid}-role`} label={c.roleLabel}>
              <select
                id={`${uid}-role`}
                className={inputCls}
                value={role}
                onChange={(e) => setRole(e.target.value as keyof typeof c.roles)}
              >
                {roleKeys.map((k) => (
                  <option key={k} value={k}>
                    {c.roles[k]}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={`${uid}-msg`} label={c.message}>
              <textarea
                id={`${uid}-msg`}
                rows={4}
                className={`${inputCls} resize-y`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>

            {error && <p className="text-xs text-destructive">{c.required}</p>}

            <p className="text-xs leading-relaxed text-muted-foreground">{c.legal}</p>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="inline-flex w-full max-w-full items-center justify-center rounded-[10px] border border-sun bg-sun px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-sun-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun sm:w-auto sm:tracking-[0.25em]"
              >
                {c.submit}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}