export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-serif italic mb-4">Thank you.</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Your donation was successful.
        </p>
      </div>
    </div>
  );
}
