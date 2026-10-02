// app/terms/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service & Refund Policy | RoastMyInterview.me',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-300 py-16 px-6 max-w-3xl mx-auto space-y-8 leading-relaxed">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white transition">
        ← Back to Roast
      </Link>
      
      <h1 className="text-3xl font-bold text-white tracking-tight">Terms of Service & Refund Policy</h1>
      <p className="text-xs text-neutral-500">Last updated: September 2026</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">1. Nature of the Service</h2>
        <p>
          RoastMyInterview.me and the persona &quot;Dick Headerson&quot; are AI-driven entertainment and parody simulations. 
          The feedback, scorecards, and autopsies provided are satirical tough-love simulations and do not constitute professional 
          career counseling, legal hiring advice, or certified HR evaluations.
        </p>
      </section>

      <section id="refunds" className="space-y-4 border-l-2 border-red-500/50 pl-4 py-1">
        <h2 className="text-xl font-semibold text-white">2. Refund & Cancellation Policy</h2>
        <p>
          Due to the immediate digital delivery and real-time consumption of AI compute resources, all sales of the VIP Gauntlet ($10 USD) are final and non-refundable once unlocked.
        </p>
        <p>
          <strong>Technical Failure Exceptions:</strong> If you experience a verified server-side failure where payment was processed but your access code or friend passes were not generated, email us at <a href="mailto:support@roastmyinterview.me" className="text-red-400 underline">support@roastmyinterview.me</a> within 14 days of purchase with your checkout receipt, and we will issue a full 100% refund.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">3. Acceptable Use</h2>
        <p>
          You agree not to submit unlawful, abusive, harassing, or malicious prompts through the interface. We reserve the right to revoke access to any user attempting to abuse rate limits or bypass platform security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">4. Contact Information</h2>
        <p>
          For billing inquiries, pass recovery, or technical support, contact us directly at <a href="mailto:support@roastmyinterview.me" className="text-red-400 underline">support@roastmyinterview.me</a>.
        </p>
      </section>
    </main>
  );
}
