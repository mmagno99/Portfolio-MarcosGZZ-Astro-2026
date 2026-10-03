import { useState, useRef, useEffect, type SyntheticEvent } from 'react';
import {
  calculateQuote,
  normalizeFeatures,
  pricing,
  money,
} from './pricing.mjs';
import { quoteCopy, type FeatureKey } from './copy';
import { site } from '../../config/site';
import { localized, type Lang } from '../../lib/i18n';
import { uiCopy } from '../../components/ui/copy';
import type { Client } from './pdf';
const dependencies: Partial<Record<FeatureKey, FeatureKey>> = {
  contactForm: 'contact',
  wishlist: 'ecommerce',
  coupons: 'ecommerce',
  reviews: 'ecommerce',
  aiPremium: 'ai',
};
const inputClass =
  'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';
export default function QuoteCalculator({ lang }: { lang: Lang }) {
  const c = quoteCopy[lang];
  const ui = uiCopy[lang];
  const [mode, setMode] = useState<'choose' | 'automatic' | 'custom'>('choose');
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [mode, success]);
  const q = calculateQuote(selection);
  function changeMode(next: typeof mode) {
    setMode(next);
    setError('');
    setSuccess(false);
  }
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true);
    setError('');
    try {
      if (mode === 'automatic') {
        const { downloadQuote } = await import('./pdf');
        await downloadQuote(data as unknown as Client, selection, lang);
      } else {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, lang }),
          signal: AbortSignal.timeout(20000),
        });
        if (!response.ok) {
          setError(
            response.status === 503
              ? c.unavailable
              : response.status === 429
                ? c.rate
                : c.error,
          );
          return;
        }
        const result = await response.json();
        if (!result.success) throw new Error('Submission failed');
      }
      setSuccess(true);
    } catch {
      setError(c.error);
    } finally {
      setBusy(false);
    }
  }
  function field(
    name: string,
    label: string,
    type = 'text',
    required = true,
    limit = 150,
    autoComplete?: string,
  ) {
    return (
      <label className="block text-sm font-semibold" htmlFor={`quote-${name}`}>
        {label}
        {required ? ' *' : ''}
        <input
          id={`quote-${name}`}
          name={name}
          type={type}
          required={required}
          maxLength={limit}
          autoComplete={autoComplete}
          className={inputClass}
        />
      </label>
    );
  }
  if (success)
    return (
      <section
        className="glass mx-auto max-w-2xl p-8 text-center sm:p-14"
        aria-live="polite"
      >
        <span
          className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-indigo-100 text-3xl text-indigo-600"
          aria-hidden="true"
        >
          ✓
        </span>
        <h2 tabIndex={-1} ref={heading} className="text-3xl font-extrabold">
          {mode === 'automatic' ? c.done : c.sent}
        </h2>
        <p className="my-6 leading-8 text-slate-600">
          {mode === 'automatic' ? c.doneDesc : c.sentDesc}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className="pill primary"
            onClick={() => {
              setSelection({});
              changeMode('choose');
            }}
          >
            {c.again}
          </button>
          <a className="pill secondary" href={`mailto:${site.email}`}>
            {c.contact}
          </a>
        </div>
      </section>
    );
  return (
    <div>
      {mode === 'choose' ? (
        <section>
          <h2
            ref={heading}
            tabIndex={-1}
            className="mb-8 text-2xl font-extrabold"
          >
            {c.choose}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {(['automatic', 'custom'] as const).map((key, index) => (
              <button
                key={key}
                onClick={() => changeMode(key)}
                className="group glass cursor-pointer p-8 text-left transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl sm:p-12"
              >
                <span className="mb-10 inline-flex rounded-2xl bg-indigo-100 p-4 text-xl font-bold text-indigo-600">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-extrabold">{c[key]}</h3>
                <p className="mt-4 max-w-sm leading-7 text-slate-500">
                  {key === 'automatic' ? c.automaticDesc : c.customDesc}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-8 block text-2xl text-indigo-600"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    focusable="false"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          <button
            type="button"
            disabled={busy}
            onClick={() => changeMode('choose')}
            className="mb-8 text-sm font-bold text-indigo-600 disabled:opacity-50"
          >
            ← {c.choose}
          </button>
          {mode === 'automatic' && (
            <div className="sticky top-20 z-20 mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-indigo-100 bg-white/95 p-4 shadow-lg shadow-indigo-950/5 backdrop-blur lg:hidden">
              <div>
                <span className="block text-[10px] text-slate-500">
                  {c.project}
                </span>
                <strong className="text-sm text-indigo-700">
                  {money(q.project.total, lang)}
                </strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500">
                  {c.monthly}
                </span>
                <strong className="text-sm text-indigo-700">
                  {money(q.monthly.total, lang)}
                </strong>
              </div>
              <span className="col-span-2 text-[10px] text-slate-500">
                {c.total}
              </span>
            </div>
          )}
          <form
            onSubmit={submit}
            className={
              mode === 'automatic'
                ? 'grid items-start gap-8 lg:grid-cols-[1fr_350px]'
                : 'mx-auto max-w-3xl'
            }
          >
            <fieldset disabled={busy} className="min-w-0 space-y-8">
              <legend className="sr-only">{c[mode]}</legend>
              <h2
                ref={heading}
                tabIndex={-1}
                className="text-3xl font-extrabold"
              >
                {c[mode]}
              </h2>
              {mode === 'automatic' && (
                <section className="glass p-6 sm:p-8">
                  <h3 className="text-xl font-extrabold">{c.features}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {c.featuresDesc}
                  </p>
                  <div className="my-6 flex justify-between gap-4 rounded-2xl bg-indigo-600 p-5 text-white">
                    <div className="font-bold">
                      {c.labels.landing}
                      <span className="mt-1 block text-xs font-normal text-indigo-100">
                        {c.included}
                      </span>
                    </div>
                    <strong className="text-sm">
                      {money(pricing.base, lang)}
                    </strong>
                  </div>
                  <div className="space-y-3">
                    {(Object.keys(pricing.features) as FeatureKey[]).map(
                      (key) => {
                        const dependency = dependencies[key];
                        const unavailable =
                          !!dependency && !q.features[dependency];
                        const bundled =
                          key === 'catalog' && q.features.ecommerce;
                        return (
                          <label
                            key={key}
                            className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${q.features[key] ? 'border-indigo-300 bg-indigo-50/70' : 'border-slate-200 bg-white/70'} ${unavailable ? 'opacity-55' : ''}`}
                          >
                            <input
                              type="checkbox"
                              name={key}
                              checked={q.features[key]}
                              disabled={unavailable || bundled}
                              onChange={(e) =>
                                setSelection(
                                  normalizeFeatures({
                                    ...q.features,
                                    [key]: e.target.checked,
                                  }),
                                )
                              }
                              className="mt-1 size-5 shrink-0 accent-indigo-600"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm font-bold">
                                <span>{c.labels[key]}</span>
                                <span className="text-indigo-600">
                                  {bundled
                                    ? c.included
                                    : '+ ' + money(pricing.features[key], lang)}
                                </span>
                              </span>
                              <span className="mt-2 block text-xs leading-6 text-slate-500">
                                {c.descriptions[key]}
                                {dependency && (
                                  <span className="block font-semibold">
                                    {c.requires}: {c.labels[dependency]}
                                  </span>
                                )}
                              </span>
                            </span>
                          </label>
                        );
                      },
                    )}
                  </div>
                </section>
              )}
              <section className="glass p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-extrabold">{c.client}</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {field('fullName', c.fullName, 'text', true, 120, 'name')}
                  {field(
                    mode === 'custom' ? 'whatsapp' : 'phone',
                    c.phone,
                    'tel',
                    true,
                    40,
                    'tel',
                  )}
                  {field(
                    'email',
                    c.email,
                    'email',
                    mode === 'automatic',
                    254,
                    'email',
                  )}
                  {field(
                    'companyName',
                    c.companyName,
                    'text',
                    mode === 'automatic',
                    150,
                    'organization',
                  )}
                  {mode === 'automatic' &&
                    field(
                      'location',
                      c.location,
                      'text',
                      true,
                      150,
                      'address-level2',
                    )}
                </div>
                <label
                  htmlFor="quote-description"
                  className="mt-5 block text-sm font-semibold"
                >
                  {mode === 'automatic' ? c.comments : c.description + ' *'}
                  <textarea
                    id="quote-description"
                    name={mode === 'automatic' ? 'comments' : 'description'}
                    required={mode === 'custom'}
                    minLength={mode === 'custom' ? 20 : undefined}
                    maxLength={3000}
                    rows={5}
                    className={inputClass}
                  />
                </label>
                {mode === 'custom' && (
                  <>
                    <label
                      htmlFor="quote-budget"
                      className="mt-5 block text-sm font-semibold"
                    >
                      {c.budget} *
                      <select
                        id="quote-budget"
                        name="budget"
                        required
                        className={inputClass}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {c.select}
                        </option>
                        {[
                          '5000-10000',
                          '10000-15000',
                          '15000-20000',
                          '20000-25000',
                          '25000+',
                        ].map((range) => (
                          <option key={range} value={range}>
                            {range.replace('-', ' – ')} MXN
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="quote-website">Website</label>
                      <input
                        id="quote-website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600">
                      <input
                        type="checkbox"
                        name="consent"
                        value="yes"
                        required
                        className="mt-1 size-4 shrink-0 accent-indigo-600"
                      />
                      {c.consent}
                    </label>
                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {ui.privacyNotice}{' '}
                      <a
                        href={localized(lang, 'privacy-policy')}
                        className="font-semibold text-indigo-600 underline underline-offset-4"
                      >
                        {ui.privacy}
                      </a>
                      .
                    </p>
                  </>
                )}
                <p className="mt-6 text-xs leading-6 text-slate-500">
                  {mode === 'automatic' ? c.local : c.note}
                </p>
                <button
                  type="submit"
                  className="pill primary mt-6 w-full disabled:opacity-60"
                >
                  {busy
                    ? mode === 'automatic'
                      ? c.generating
                      : c.sending
                    : mode === 'automatic'
                      ? c.download
                      : c.send}
                </button>
                {error && (
                  <div
                    role="alert"
                    className="mt-5 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-800"
                  >
                    {error}{' '}
                    <a className="underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </div>
                )}
              </section>
            </fieldset>
            {mode === 'automatic' && (
              <aside
                className="rounded-3xl bg-[#121225] p-7 text-white lg:sticky lg:top-28"
                aria-label={c.summary}
              >
                <h2 className="mb-7 text-xl font-extrabold">{c.summary}</h2>
                <div aria-live="polite" aria-atomic="true">
                  {(['project', 'monthly'] as const).map((key, index) => (
                    <section
                      key={key}
                      className={
                        index ? 'mt-7 border-t border-white/15 pt-6' : ''
                      }
                    >
                      <h3 className="mb-4 text-sm font-bold text-indigo-200">
                        {c[key]}
                      </h3>
                      <dl className="space-y-3 text-sm">
                        {(['subtotal', 'tax', 'total'] as const).map((part) => (
                          <div
                            key={part}
                            className={`flex justify-between gap-4 ${part === 'total' ? 'pt-2 font-extrabold text-white' : 'text-slate-300'}`}
                          >
                            <dt>{c[part]}</dt>
                            <dd>{money(q[key][part], lang)}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
                <p className="mt-7 text-xs leading-6 text-slate-400">
                  {c.note}
                </p>
              </aside>
            )}
          </form>
        </>
      )}
    </div>
  );
}
