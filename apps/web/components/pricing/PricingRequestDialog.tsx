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
import { content, t, type Lang } from "@/lib/i18n";

const inputCls =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function PricingRequestDialog({
  children,
  variant,
  lang,
}: {
  children: ReactNode;
  variant: "priority" | "details";
  lang: Lang;
}) {
  const uid = useId();
  const d = content.pricingDialog;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [country, setCountry] = useState("");
  const [pkg, setPkg] = useState<keyof typeof d.packageOptions>("notSure");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

  const title = variant === "priority" ? t(d.titlePriority, lang) : t(d.titleDetails, lang);

  const packageOptions = (Object.keys(d.packageOptions) as (keyof typeof d.packageOptions)[]).map(
    (id) => ({ id, label: t(d.packageOptions[id], lang) }),
  );

  function reset() {
    setName("");
    setEmail("");
    setOrganisation("");
    setCountry("");
    setPkg("notSure");
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

    const intent = variant === "priority" ? t(d.intentPriority, lang) : t(d.intentDetails, lang);
    const packageLabel = packageOptions.find((p) => p.id === pkg)?.label ?? "";

    const body = [
      t(d.emailBodyHeading, lang),
      "",
      `${t(d.emailIntentLabel, lang)}: ${intent}`,
      `${t(d.emailNameLabel, lang)}: ${name}`,
      `${t(d.emailEmailLabel, lang)}: ${email}`,
      `${t(d.emailOrgLabel, lang)}: ${organisation}`,
      `${t(d.emailCountryLabel, lang)}: ${country}`,
      `${t(d.emailPackageLabel, lang)}: ${packageLabel}`,
      `${t(d.emailMessageLabel, lang)}: ${message}`,
      "",
      `${t(d.emailLegalHeading, lang)}:`,
      t(d.emailLegalText, lang),
    ].join("\n");

    const subject = t(d.emailSubject, lang);
    const mailto = `mailto:info@heliosdigitech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl leading-snug">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t(d.intro, lang)}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-6">
            <p className="text-sm leading-relaxed text-foreground">{t(d.successNote, lang)}</p>

            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(d.linkedinInvite, lang)}
              </p>
              <a
                href="https://www.linkedin.com/groups/32790095/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full max-w-full items-center justify-center rounded-[10px] border border-foreground/25 bg-transparent px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:border-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:w-auto sm:tracking-[0.25em]"
              >
                {t(d.linkedinCta, lang)}
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 pt-2" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label={t(d.name, lang)} required>
                <input
                  id={`${uid}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-email`} label={t(d.email, lang)} required>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputCls}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-org`} label={t(d.organisation, lang)}>
                <input
                  id={`${uid}-org`}
                  name="organisation"
                  autoComplete="organization"
                  className={inputCls}
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-country`} label={t(d.country, lang)}>
                <input
                  id={`${uid}-country`}
                  name="country"
                  autoComplete="country-name"
                  className={inputCls}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Field>
            </div>

            <Field id={`${uid}-package`} label={t(d.packageLabel, lang)}>
              <select
                id={`${uid}-package`}
                name="package"
                className={inputCls}
                value={pkg}
                onChange={(e) => setPkg(e.target.value as keyof typeof d.packageOptions)}
              >
                {packageOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={`${uid}-msg`} label={t(d.message, lang)}>
              <textarea
                id={`${uid}-msg`}
                name="message"
                rows={4}
                className={`${inputCls} resize-y`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>

            {error && (
              <p className="text-xs text-destructive">{t(d.requiredError, lang)}</p>
            )}

            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(d.legalNote, lang)}
            </p>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="inline-flex w-full max-w-full items-center justify-center rounded-[10px] border border-sun bg-sun px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-sun-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun sm:w-auto sm:tracking-[0.25em]"
              >
                {t(d.submit, lang)}
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
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}
