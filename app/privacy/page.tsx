import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Heart,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Calculate Anything",
  description:
    "Read our privacy policy to understand how Calculate Anything protects your data and privacy.",
};

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Calculate Anything is designed with privacy as a core principle. We collect minimal information to provide and improve our service.",
        "Information you provide: When you use our calculators, the inputs and results are processed locally in your browser. We do not store any calculator inputs or results on our servers.",
        "Usage data: We may collect anonymous usage statistics to help us understand how our calculators are used and improve the service.",
      ],
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: [
        "The information we collect is used solely to operate and improve Calculate Anything.",
        "To provide and maintain the service",
        "To improve user experience and develop new features",
        "To analyze usage patterns and optimize performance",
      ],
    },
    {
      icon: Lock,
      title: "Data Storage & Security",
      content: [
        "We take data security seriously and implement appropriate measures to protect your information.",
        "Client-side processing: All calculations are performed in your browser. Your data never leaves your device.",
        "No data storage: We do not store any personal information or calculation data on our servers.",
        "Secure connections: All data transmitted between your browser and our servers is encrypted using SSL/TLS.",
      ],
    },
    {
      icon: Eye,
      title: "Third-Party Services",
      content: [
        "We use minimal third-party services to enhance the functionality of Calculate Anything.",
        "Analytics: We may use privacy-focused analytics tools to understand how users interact with our site.",
        "These services are configured to collect anonymous data and do not track individual users.",
        "We do not share, sell, or distribute your personal information to third parties.",
      ],
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      content: [
        "Calculate Anything uses minimal cookies to enhance your experience.",
        "Essential cookies: Required for basic functionality of the site.",
        "Preference cookies: Remember your preferences (e.g., dark mode settings).",
        "Analytics cookies: Help us understand how users interact with our calculators.",
        "You can disable cookies in your browser settings, though this may affect some functionality.",
      ],
    },
    {
      icon: Users,
      title: "Data Rights",
      content: [
        "We respect your privacy rights and are committed to transparency.",
        "Right to access: You can request information about what data we hold about you.",
        "Right to deletion: You can request that we delete any personal data we hold.",
        "Right to opt-out: You can opt-out of any data collection at any time.",
        "To exercise these rights, please contact us through our contact page.",
      ],
    },
    {
      icon: Mail,
      title: "Contact Information",
      content: [
        "If you have any questions about our privacy policy or practices, please contact us.",
        "Email: privacy@calculateanything.com",
        "We typically respond within 24 hours during business days.",
      ],
    },
    {
      icon: Heart,
      title: "Commitment to Privacy",
      content: [
        "We believe that privacy is a fundamental right. Our commitment to privacy is reflected in every aspect of Calculate Anything.",
        "Privacy by design: We build privacy into our features from the ground up.",
        "Transparency: We are open about our data practices and policies.",
        "User control: You have control over your data and how it's used.",
        "Continuous improvement: We regularly review and improve our privacy practices.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F2FD] px-4 py-1.5 mb-4 border border-[#90CAF9]/30">
            <Shield className="w-4 h-4 text-[#2196F3]" />
            <span className="text-xs font-semibold text-[#0D47A1] tracking-wider uppercase">
              Privacy
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D47A1]">
            Privacy{" "}
            <span className="bg-gradient-to-r from-[#2196F3] to-[#0D47A1] bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your privacy. This policy explains
            how we collect, use, and safeguard your information.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1]/70">
              <Clock className="w-4 h-4" />
              Last Updated: December 2024
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1]/70">
              <BookOpen className="w-4 h-4" />
              Version 2.0
            </span>
          </div>
        </div>

        {/* Key Privacy Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-md transition-all">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-sm font-semibold text-[#0D47A1]">
              No Data Storage
            </div>
            <div className="text-xs text-[#0D47A1]/60 mt-0.5">
              All calculations stay local
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-md transition-all">
            <div className="text-2xl mb-1">🛡️</div>
            <div className="text-sm font-semibold text-[#0D47A1]">
              End-to-End Encrypted
            </div>
            <div className="text-xs text-[#0D47A1]/60 mt-0.5">
              Secure connections
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-md transition-all">
            <div className="text-2xl mb-1">👤</div>
            <div className="text-sm font-semibold text-[#0D47A1]">
              Your Data, Your Control
            </div>
            <div className="text-xs text-[#0D47A1]/60 mt-0.5">
              Full rights over your data
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-md transition-all">
            <div className="text-2xl mb-1">🤝</div>
            <div className="text-sm font-semibold text-[#0D47A1]">
              Transparent
            </div>
            <div className="text-xs text-[#0D47A1]/60 mt-0.5">
              Clear data practices
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 p-4 sm:p-6 bg-white rounded-2xl border border-[#90CAF9]/30 shadow-sm">
          <h2 className="font-semibold text-[#0D47A1] text-sm mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2196F3]" />
            Quick Navigation
          </h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="text-xs px-3 py-1.5 rounded-full bg-[#E3F2FD]/50 hover:bg-[#E3F2FD] text-[#0D47A1]/70 hover:text-[#0D47A1] transition-colors border border-[#90CAF9]/20"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                id={`section-${index}`}
                className="relative overflow-hidden rounded-2xl bg-white border border-[#90CAF9]/30 p-6 sm:p-8 hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E3F2FD]/20 rounded-full blur-2xl -mr-16 -mt-16" />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-[#E3F2FD] shrink-0">
                      <Icon className="w-5 h-5 text-[#2196F3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-xl font-bold text-[#0D47A1] mb-3">
                        {section.title}
                      </h2>
                      <div className="space-y-3">
                        {section.content.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-sm text-[#0D47A1]/70 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GDPR/CCPA Compliance Section */}
        <div className="mt-8 p-6 sm:p-8 bg-[#E3F2FD]/30 rounded-2xl border border-[#90CAF9]/30">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-white shrink-0">
              <CheckCircle className="w-5 h-5 text-[#2196F3]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0D47A1] text-lg mb-2">
                GDPR & CCPA Compliance
              </h3>
              <p className="text-sm text-[#0D47A1]/70 leading-relaxed">
                Calculate Anything is committed to complying with the General
                Data Protection Regulation (GDPR) and the California Consumer
                Privacy Act (CCPA). We believe in giving users control over
                their data and maintaining transparent privacy practices.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-white border border-[#90CAF9]/30 text-[#0D47A1]/70">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2196F3]" />
                  GDPR Compliant
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-white border border-[#90CAF9]/30 text-[#0D47A1]/70">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2196F3]" />
                  CCPA Compliant
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-white border border-[#90CAF9]/30 text-[#0D47A1]/70">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2196F3]" />
                  Privacy by Design
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-white rounded-2xl border border-[#90CAF9]/30 text-center">
          <h3 className="font-semibold text-[#0D47A1] text-lg mb-2">
            Have Questions About Our Privacy Policy?
          </h3>
          <p className="text-sm text-[#0D47A1]/70 max-w-lg mx-auto">
            If you have any questions or concerns about our privacy practices,
            please don't hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-medium shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105 text-sm"
          >
            <span>Contact Our Privacy Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-[#90CAF9]/20 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/terms"
            className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/about"
            className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/"
            className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/calculators"
            className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
          >
            Calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
