export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif italic mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
          We respect your privacy and handle data responsibly.
        </p>
        <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          <p>
            We collect only the information necessary to operate the platform,
            process contributions, and improve the user experience.
          </p>
          <p>
            Payment information is securely processed by Stripe. We do not store
            full payment details on our servers.
          </p>
          <p>
            We may use anonymized, aggregated data to understand platform
            performance and improve allocation decisions.
          </p>
          <p>
            For privacy questions, contact support@lendahand.com.
          </p>
        </div>
      </div>
    </div>
  );
}
