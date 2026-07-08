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
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";

const inputCls =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function IntraRequestDialog({
  children,
  defaultPath,
  variant = "access",
}: {
  children: ReactNode;
  defaultPath?: string;
  variant?: "access" | "founding";
}) {
  const uid = useId();
  const { lang } = useLang();
  const [selected, setSelected] = useState<string | null>(defaultPath ?? null);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const d = content.intra.dialog;
  const paths = d.paths.map((p) => ({ id: p.id, label: t(p.label, lang) }));

  const title = variant === "founding" ? t(d.titleFounding, lang) : t(d.titleAccess, lang);

  function reset() {
    setSelected(defaultPath ?? null);
    setName("");
    setEmail("");
    setOrganisation("");
    setRole("");
    setCountry("");
    setMessage("");
    setError(false);
    setSubmitted(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const pathLabel = paths.find((p) => p.id === selected)?.label ?? "";

    const body = [
      `${t(d.name, lang)}: ${name}`,
      `${t(d.email, lang)}: ${email}`,
      `${t(d.org, lang)}: ${organisation}`,
      `${t(d.country, lang)}: ${country}`,
      `${t(d.role, lang)}: ${role}`,
      `${t(d.emailPathLabel, lang)}: ${pathLabel}`,
      `${t(d.msg, lang)}: ${message}`,
      "",
      t(d.nda, lang),
    ].join("\n");

    const subject = t(d.emailSubject, lang);
    const mailto = `mailto:info@heliosdigitech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
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
            {t(d.desc, lang)}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6">
            <p className="eyebrow mb-3">{t(d.doneEyebrow, lang)}</p>
            <p className="font-serif text-xl text-foreground">{t(d.doneTitle, lang)}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {t(d.doneBody, lang)}
            </p>
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
              <Field id={`${uid}-org`} label={t(d.org, lang)}>
                <input
                  id={`${uid}-org`}
                  name="organisation"
                  autoComplete="organization"
                  className={inputCls}
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-role`} label={t(d.role, lang)}>
                <input
                  id={`${uid}-role`}
                  name="role"
                  className={inputCls}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Field>
              <Field id={`${uid}-country`} label={t(d.country, lang)} required>
                <input
                  id={`${uid}-country`}
                  name="country"
                  required
                  autoComplete="country-name"
                  className={inputCls}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Field>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
                {t(d.pathQuestion, lang)} <span className="text-destructive">*</span>
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {paths.map((p) => {
                  const active = selected === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelected(p.id)}
                      aria-pressed={active}
                      className={`rounded-sm border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="path" value={selected ?? ""} />
            </div>

            <Field id={`${uid}-msg`} label={t(d.msg, lang)}>
              <textarea
                id={`${uid}-msg`}
                name="message"
                rows={4}
                placeholder={t(d.msgPlaceholder, lang)}
                className={`${inputCls} resize-y`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>

            {error && <p className="text-xs text-destructive">{t(d.requiredError, lang)}</p>}

            <div className="flex items-start gap-3 rounded-sm border border-border bg-secondary p-3">
              <input
                id={`${uid}-nda`}
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-[oklch(0.36_0.045_130)]"
              />
              <label htmlFor={`${uid}-nda`} className="text-xs leading-relaxed text-muted-foreground">
                {t(d.nda, lang)}
              </label>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center rounded-[10px] border border-sun bg-sun px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-sun-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun"
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

export function PrimaryCTA({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-[10px] border border-sun bg-sun px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-sun-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun"
    >
      {children}
    </button>
  );
}

export function SecondaryCTA({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-[10px] border border-foreground/25 bg-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors hover:border-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
    >
      {children}
    </button>
  );
}
