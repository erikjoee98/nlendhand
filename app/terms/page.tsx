const sections = [
  {
    title: "1. Overview",
    body:
      "By accessing or using this platform, you agree to be bound by these Terms of Service.",
  },
  {
    title: "2. Nature of Contributions",
    body:
      "All payments made through the platform are voluntary contributions and are not classified as charitable contributions unless explicitly stated. Contributions are generally non-refundable except where required by applicable law.",
  },
  {
    title: "3. Fund Allocation",
    body:
      "All contributions are received and administered by the platform operator. By contributing, you acknowledge and agree that funds may be allocated at the operator’s discretion to support medical initiatives, equipment and rehabilitation support, research and innovation, operational infrastructure, platform maintenance and security, organizational sustainability, and program expansion. This includes costs necessary to responsibly operate, manage, and grow the platform. The operator is committed to acting in good faith to support meaningful long-term impact.",
  },
  {
    title: "4. No Guarantee of Specific Outcomes",
    body:
      "While the platform aims to support impactful medical efforts, we do not guarantee specific outcomes, timelines, or beneficiary selection. Any examples, stories, or initiatives presented on the platform are intended to illustrate the mission and type of impact the platform seeks to support.",
  },
  {
    title: "5. Transparency Commitment",
    body:
      "We strive to communicate our mission and activities clearly and responsibly. Strategic decisions regarding allocation, operations, and program direction remain solely at the discretion of the platform operator.",
  },
  {
    title: "6. Payments & Processing",
    body:
      "Payments are securely processed through trusted third-party providers such as Stripe. We do not store full payment details on our servers. By making a contribution, you also agree to the terms and policies of the respective payment provider.",
  },
  {
    title: "7. Refund Policy",
    body:
      "All contributions are considered final. Refunds may be issued only in cases of duplicate transactions, technical errors, or unauthorized payments. Requests must be submitted within 7 days of the transaction.",
  },
  {
    title: "8. Platform Sustainability",
    body:
      "To ensure long-term viability, security, and continued growth, a portion of funds may be used to support platform operations and development. This enables the platform to expand its reach and increase its overall impact over time.",
  },
  {
    title: "9. Acceptable Use",
    body:
      "Users agree not to misuse the platform, attempt fraudulent activity, interfere with services, or engage in behavior that could harm the platform or its users.",
  },
  {
    title: "10. Limitation of Liability",
    body:
      "The platform is provided “as is” without warranties of any kind. To the fullest extent permitted by law, the operator shall not be liable for indirect, incidental, or consequential damages arising from the use of the platform.",
  },
  {
    title: "11. Modifications",
    body:
      "We reserve the right to update these Terms at any time. Continued use of the platform constitutes acceptance of any revisions.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif italic mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-10">
          Please read these terms carefully before using the platform.
        </p>
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-black text-slate-900 dark:text-white mb-2">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
