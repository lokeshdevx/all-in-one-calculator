import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  Users,
  Sparkles,
  Shield,
  Zap,
  Heart,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Calculate Anything",
  description:
    "Learn about Calculate Anything — your trusted source for accurate calculators, conversions, and formulas with step-by-step solutions.",
};

export default function AboutPage() {
  const stats = [
    {
      icon: Calculator,
      label: "Calculators",
      value: "360+",
      description: "And growing every week",
    },
    {
      icon: Users,
      label: "Users",
      value: "10,000+",
      description: "Trusted worldwide",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "< 300ms",
      description: "Instant calculations",
    },
    {
      icon: Globe,
      label: "Availability",
      value: "100%",
      description: "Always free and accessible",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Step-by-Step Solutions",
      description:
        "Every calculation shows its work with clear, transparent steps so you can understand how the result was derived.",
    },
    {
      icon: Shield,
      title: "Accurate & Reliable",
      description:
        "All calculators are thoroughly tested and verified to ensure precision and accuracy in every result.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Real-time calculations with debounced input — see results as you type without any delays.",
    },
    {
      icon: Heart,
      title: "Completely Free",
      description:
        "No paywalls, no subscriptions, no hidden fees. All calculators are free for everyone to use.",
    },
  ];

  const values = [
    {
      title: "Transparency",
      description:
        "We believe in showing our work. Every result includes the formula and steps used to calculate it.",
    },
    {
      title: "Accuracy",
      description:
        "Precision matters. All calculators are rigorously tested and maintained to ensure correct results.",
    },
    {
      title: "Accessibility",
      description:
        "Knowledge should be free. All our tools are available to everyone, anywhere, at no cost.",
    },
    {
      title: "Simplicity",
      description:
        "Complex calculations shouldn't be complicated. We make math easy to understand and use.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F2FD] px-4 py-1.5 mb-4 border border-[#90CAF9]/30">
              <span className="text-[#2196F3]">✨</span>
              <span className="text-xs font-semibold text-[#0D47A1] tracking-wider uppercase">
                About Us
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D47A1]">
              Making Math Simple &amp; <br />
              <span className="bg-gradient-to-r from-[#2196F3] to-[#0D47A1] bg-clip-text text-transparent">
                Accessible for Everyone
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl mx-auto leading-relaxed">
              Calculate Anything is a comprehensive collection of calculators,
              converters, and formulas designed to help you solve everyday
              problems with confidence and clarity.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 sm:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 sm:p-6 text-center hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all hover:-translate-y-1"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-xl bg-[#E3F2FD]">
                    <Icon className="w-5 h-5 text-[#2196F3]" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#2196F3]">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#0D47A1] mt-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-[#0D47A1]/60 mt-1">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* What We Do Section */}
        <div className="mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E3F2FD] via-[#E3F2FD]/50 to-white border border-[#90CAF9]/30 p-8 sm:p-12">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1] text-center mb-4">
                What We Do
              </h2>
              <p className="text-[#0D47A1]/70 max-w-3xl mx-auto text-center leading-relaxed">
                We build tools that make complex calculations simple. From basic
                arithmetic to specialized conversions, every calculator on our
                platform is designed to be accurate, transparent, and easy to
                use.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-8">
                {[
                  "Accurate calculations with step-by-step solutions",
                  "Conversion tools for units, currency, and measurements",
                  "Formulas and explanations for every result",
                  "Interactive calculators with real-time updates",
                  "Mobile-friendly responsive design",
                  "Completely free with no hidden costs",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#2196F3] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0D47A1]/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1] text-center mb-4">
            Why Choose Calculate Anything?
          </h2>
          <p className="text-[#0D47A1]/70 text-center max-w-2xl mx-auto mb-8">
            We've built a platform that puts accuracy and transparency first
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#90CAF9]/30 p-6 hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all hover:-translate-y-1"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] w-fit mb-4 shadow-lg shadow-[#2196F3]/30">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#0D47A1] text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#0D47A1]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-[#90CAF9]/30 p-8 sm:p-12 shadow-xl shadow-[#2196F3]/5">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1] text-center mb-4">
                Our Values
              </h2>
              <p className="text-[#0D47A1]/70 text-center max-w-2xl mx-auto mb-8">
                These principles guide everything we do
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-[#E3F2FD]/30 border border-[#90CAF9]/20"
                  >
                    <h3 className="font-semibold text-[#0D47A1] text-lg mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#2196F3]" />
                      {value.title}
                    </h3>
                    <p className="text-sm text-[#0D47A1]/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E3F2FD] via-[#E3F2FD]/50 to-white border border-[#90CAF9]/30 p-8 sm:p-12 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1]">
              Ready to Calculate?
            </h2>
            <p className="mt-3 text-[#0D47A1]/70 max-w-lg mx-auto">
              Join thousands of users who trust our calculators for accurate
              results with transparent steps.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-semibold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105"
              >
                <span>Explore Calculators</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#90CAF9]/50 bg-white/80 hover:bg-white text-[#0D47A1] font-semibold transition-all hover:border-[#2196F3] hover:shadow-lg hover:shadow-[#2196F3]/10"
              >
                <span>Contact Us</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
