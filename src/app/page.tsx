import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUp } from "@clerk/nextjs";
import {
  ArrowRight,
  BarChart2,
  DollarSign,
  PieChart,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-b from-background to-muted">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Take Control of Your{" "}
          <span className="text-primary">Personal Finances</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Track expenses, manage budgets, and achieve your financial goals with
          our comprehensive personal finance management tool.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </SignedIn>
          <Link href="#features">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Wallet className="h-10 w-10" />}
              title="Expense Tracking"
              description="Easily track your daily expenses and income with detailed categorization"
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10" />}
              title="Budget Management"
              description="Set and manage budgets for different categories to control spending"
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10" />}
              title="Financial Reports"
              description="Get detailed insights with comprehensive financial reports and analytics"
            />
            <FeatureCard
              icon={<PieChart className="h-10 w-10" />}
              title="Spending Analysis"
              description="Visualize your spending patterns with interactive charts and graphs"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Managing Your Finances Today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who are already taking control of their
            financial future.
          </p>
          <SignedOut>
            <Link href="/sign-in">
              <Button size="lg" variant="secondary" className="gap-2">
                Create Your Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Personal Finance Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
