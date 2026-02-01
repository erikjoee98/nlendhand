export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif italic mb-4">Contact</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
          We’re here to help with questions about contributions and initiatives.
        </p>
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
          <p>Email: support@lendahand.com</p>
          <p>Response time: 1–2 business days</p>
        </div>
      </div>
    </div>
  );
}
