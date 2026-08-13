"use client";

import Link from "next/link";
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

const copy = {
  en: {
    titleAccess: "Request access — Montefrío Pre-Due Diligence",
    intro:
      "Access to the full file is granted case by case. Tell us who you are and in what capacity you are reviewing the project.",
    name: "Name",
    email: "Email",
    organisation: "Organisation",
    roleLabel: "Your interest",
    roles: {
      founderInvestor: "Founder Investor interest",
      professional: "Professional adviser (legal, planning, technical)",
      partner: "Development or construction partner",
      customer: "Future Taurisol user / member",
      other: "Other",
    },
    submit: "Continue to document",
    required: "Please add your name and email.",
    legal:
      "By sending this request you agree that we may contact you about the Montefrío project. The Pre-Due Diligence file is preliminary, contains working assumptions and is not an offer, a solicitation or investment advice.",
    success: "Access details",
    successIntro: "The full 30-section Pre-Due Diligence is available in the formats below.",
    readOnline: "Read online",
    downloadPdf: "Download PDF",
    subject: "Taurisol — Montefrío Pre-Due Diligence access request",
    bodyHeading: "Montefrío Pre-Due Diligence — request",
    labels: {
      name: "Name",
      email: "Email",
      org: "Organisation",
      role: "Interest",
    },
  },
  fi: {
    titleAccess: "Pyydä pääsyä — Montefrío Pre-Due Diligence",
    intro:
      "Pääsy koko aineistoon myönnetään tapauskohtaisesti. Kerro kuka olet ja missä roolissa tarkastelet hanketta.",
    name: "Nimi",
    email: "Sähköposti",
    organisation: "Organisaatio",
    roleLabel: "Kiinnostuksesi",
    roles: {
      founderInvestor: "Founder Investor -kiinnostus",
      professional: "Ammattilainen (juridiikka, kaavoitus, tekniikka)",
      partner: "Kehitys- tai rakennuskumppani",
      customer: "Tuleva Taurisol-käyttäjä / jäsen",
      other: "Muu",
    },
    submit: "Jatka aineistoon",
    required: "Lisää nimesi ja sähköpostisi.",
    legal:
      "Lähettämällä pyynnön hyväksyt, että voimme olla sinuun yhteydessä Montefrío-hankkeesta. Pre-Due Diligence -aineisto on alustava, sisältää työoletuksia eikä ole tarjous, kehotus tai sijoitusneuvo.",
    success: "Pääsy aineistoon",
    successIntro: "Täysi 30-osainen Pre-Due Diligence on saatavilla alla olevissa muodoissa.",
    readOnline: "Lue verkossa",
    downloadPdf: "Lataa PDF",
    subject: "Taurisol — Montefrío Pre-Due Diligence -pääsypyyntö",
    bodyHeading: "Montefrío Pre-Due Diligence — pyyntö",
    labels: {
      name: "Nimi",
      email: "Sähköposti",
      org: "Organisaatio",
      role: "Kiinnostus",
    },
  },
} as const;

export function ProjectAccessDialog({
  children,
  lang,
}: {
  children: ReactNode;
  lang: ProjectsLang;
}) {
  const uid = useId();
  const c = copy[lang];
  const roleKeys = Object.keys(c.roles) as (keyof typeof c.roles)[];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [role, setRole] = useState<keyof typeof c.roles>("founderInvestor");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  function reset() {
    setName("");
    setEmail("");
    setOrganisation("");
    setRole("founderInvestor");
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
      `${c.labels.name}: ${name}`,
      `${c.labels.email}: ${email}`,
      `${c.labels.org}: ${organisation}`,
      `${c.labels.role}: ${c.roles[role]}`,
    ].join("\n");

    const subject = c.subject;
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
            {sent ? c.success : c.titleAccess}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{c.intro}</DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="grid gap-5 py-5">
            <p className="text-sm leading-relaxed text-foreground">{c.successIntro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={lang === "fi" ? "/fi/projects/montefrio/due-diligence" : "/projects/montefrio/due-diligence"}
                className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-sun px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-sun-soft"
              >
                {c.readOnline}
              </Link>
              <a
                href="/documents/taurisol-montefrio-pre-due-diligence.pdf"
                download
                className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-sun px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-sun/[0.12]"
              >
                {c.downloadPdf}
              </a>
            </div>
          </div>
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