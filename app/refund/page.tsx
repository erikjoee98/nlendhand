export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif italic mb-4">Refund Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
          Contributions are generally final. Refunds are limited to specific cases.
        </p>
        <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          <p>
            Refunds may be issued only in cases of duplicate transactions,
            technical errors, or unauthorized payments.
          </p>
          <p>
            Requests must be submitted within 7 days of the transaction and will
            be reviewed by the platform operator.
          </p>
          <p>Contact support@lendahand.com for assistance.</p>
        </div>
      </div>
    </div>
  );
}
