export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif italic mb-4">About the Initiative</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gray-900/40 rounded-2xl px-4 py-3 mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-500">lock</span>
            Secure payments via Stripe
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-500">verified</span>
            Independently operated
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-500">fact_check</span>
            Transparent allocation model
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-500">health_and_safety</span>
            Medical initiative focus
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-10">
          Clear capital allocation, responsible platform operations, and secure payment infrastructure.
        </p>

        <div className="space-y-10 text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          <section className="space-y-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-gray-900/40 p-5 shadow-sm shadow-slate-900/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Mission</h2>
            <p>
              Lumira is an independently operated medical initiative platform focused on funding high-impact
              healthcare programs through structured capital deployment.
            </p>
            <p>
              Our mission is to expand access to essential medical technologies, rehabilitation programs, and critical
              care resources through transparent financial models.
            </p>
          </section>

          <section className="space-y-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-gray-900/40 p-5 shadow-sm shadow-slate-900/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">How Funds Are Managed</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Capital is directed toward structured medical initiatives.</li>
              <li>Programs are selected based on long-term impact potential.</li>
              <li>Allocation decisions are managed by the platform operator.</li>
              <li>Funding supports both program deployment and operational sustainability.</li>
            </ul>
          </section>

          <section className="space-y-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-gray-900/40 p-5 shadow-sm shadow-slate-900/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Trust & Transparency</h2>
            <p>
              Allocation methodology, program progress, and operational practices are communicated with clarity to
              ensure confident participation.
            </p>
          </section>

          <section className="space-y-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-gray-900/40 p-5 shadow-sm shadow-slate-900/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Operator Commitment</h2>
            <p>
              This initiative is built on a long-term commitment to expanding access to critical medical resources
              while maintaining a sustainably operated and responsibly managed platform. Strategic decisions are guided
              by durability, transparency, and measurable impact.
            </p>
          </section>

          <section className="space-y-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-gray-900/40 p-5 shadow-sm shadow-slate-900/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Secure Payments</h2>
            <p>
              All payments are securely processed via Stripe, a globally trusted payment infrastructure provider. We do
              not store card details, and transactions are encrypted end-to-end.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-500">verified_user</span>
                Payments processed by Stripe
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-500">credit_card_off</span>
                Card details never stored
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-500">lock</span>
                End-to-end encryption
              </span>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-gray-900/40 p-5 shadow-sm shadow-slate-900/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Contact & Operator Disclosure</h2>
            <p>
              This platform is independently operated and is not a registered nonprofit organization. Capital
              contributions support medical initiatives as well as platform operations and growth.
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-semibold">
              For operational inquiries: support@lendahand.com
            </p>
          </section>
        </div>

        <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
          Built for long-term medical impact with responsible capital stewardship.
        </p>
      </div>
    </div>
  );
}
