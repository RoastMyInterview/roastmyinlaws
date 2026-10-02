import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Hot Seat
        </Link>

        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
          <ShieldCheck className="h-6 w-6 text-emerald-500" />
          <h1 className="text-2xl font-black text-white tracking-tight">Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. What Data We Collect</h2>
            <p>
              We collect the information you voluntarily provide during the mock interview process, including the candidate name/nickname, target job title, company name, LinkedIn bio, and the text of the answers you submit. We also collect your email address if you purchase a VIP pass.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. How We Use Your Data</h2>
            <p>
              Your interview inputs are temporarily sent to secure third-party Large Language Models (LLMs) solely for the purpose of generating your real-time interview feedback, scorecard, and "roast". We use your email address exclusively to deliver your VIP passcode and receipt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Data Sharing & Security</h2>
            <p>
              <strong>We do not sell your personal data.</strong> We do not use your interview answers for marketing purposes. Your payment information is securely processed by Stripe; we never see or store your credit card details. 
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Analytics & Cookies</h2>
            <p>
              We use standard, privacy-respecting analytics (like Vercel Web Analytics) to understand general traffic trends (e.g., how many people visit the site and which buttons are clicked most). These tools do not track you individually across the internet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request data deletion, please contact us at: <strong>support@roastmyinterview.me</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
