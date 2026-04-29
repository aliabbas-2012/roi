// @ts-nocheck
import Link from "next/link";

const stats = [
  { value: "$40M+", label: "Total Invested" },
  { value: "125K", label: "Active Members" },
  { value: "Up to 8%", label: "Daily Profit" },
  { value: "3 Levels", label: "Team Bonuses" },
];

const steps = [
  {
    title: "1. Choose a Plan",
    text: "Select from Silver, Gold, or Platinum tiers. Invest instantly with secure crypto or fiat deposits.",
  },
  {
    title: "2. Earn Daily",
    text: "Watch your balance grow automatically with guaranteed daily profit returns up to 8%.",
  },
  {
    title: "3. Build a Team",
    text: "Share your referral link. Earn deep multi-level bonuses when your network invests.",
  },
];

export default function HomePage() {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <div className="landing-nav__brand text-uppercase">Return on Investment System</div>
        <div className="landing-nav__actions">
          <Link href="/login" className="landing-link">
            Sign In
          </Link>
          <Link href="/register" className="landing-btn landing-btn--dark">
            Get Started
          </Link>
        </div>
      </header>

      <section className="landing-hero">
        <p className="landing-badge">New: Platinum Returns up to 3x</p>
        <h1>Where your wealth meets network power.</h1>
        <p>
          Return on Investment System is a premium wealth management platform. Earn daily passive profits and multiply your returns
          by building a powerful referral network.
        </p>
        <div className="landing-hero__cta">
          <Link href="/register" className="landing-btn landing-btn--dark">
            Start Investing Now
          </Link>
          <Link href="/login" className="landing-btn landing-btn--light">
            View Demo Dashboard
          </Link>
        </div>
      </section>

      <section className="landing-stats">
        {stats.map((item) => (
          <article key={item.label}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </article>
        ))}
      </section>

      <section className="landing-how">
        <h2>How Return on Investment System Works</h2>
        <p>A simple, powerful wealth-building engine designed for serious investors.</p>
        <div className="landing-cards">
          {steps.map((step) => (
            <article key={step.title} className="landing-card">
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <span>Return on Investment System</span>
        <span>&copy; 2026 Return on Investment System. Premium Wealth Management.</span>
        <span>Secure | Terms | Privacy</span>
      </footer>
    </main>
  );
}
