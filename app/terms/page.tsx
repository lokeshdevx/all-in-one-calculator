import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FileText,
  Scale,
  Lock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Calculate Anything",
  description:
    "Read our terms of service to understand the terms and conditions for using Calculate Anything calculators and tools.",
};

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        'By using Calculate Anything ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.',
        "We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the service constitutes acceptance of any changes.",
      ],
    },
    {
      icon: Scale,
      title: "Use of Service",
      content: [
        "The calculators and tools provided on Calculate Anything are for informational and educational purposes only.",
        "You agree to use the service responsibly and not to misuse or abuse the tools provided.",
        'The service is provided "as is" and we make no warranties about the accuracy or completeness of the results.',
      ],
    },
    {
      icon: Shield,
      title: "Disclaimer",
      content: [
        "All calculations and results are provided for general informational purposes only and should not be relied upon as professional advice.",
        "We do not guarantee the accuracy, completeness, or usefulness of any information provided through the service.",
        "Use of the service is at your own risk. We are not liable for any damages or losses resulting from your use of the calculators.",
      ],
    },
    {
      icon: Lock,
      title: "Privacy",
      content: [
        "We respect your privacy and are committed to protecting your personal information.",
        "We do not store any calculator inputs or results on our servers. All calculations are performed client-side.",
        "We do not share, sell, or distribute your personal information to third parties.",
        "For more details, please refer to our Privacy Policy.",
      ],
    },
    {
      icon: Users,
      title: "User Conduct",
      content: [
        "You agree not to use the service for any unlawful purpose or in any way that could damage the service.",
        "You agree not to attempt to gain unauthorized access to any part of the service.",
        "You agree not to interfere with or disrupt the service or servers connected to the service.",
      ],
    },
    {
      icon: Heart,
      title: "Intellectual Property",
      content: [
        "All content on Calculate Anything, including but not limited to text, graphics, logos, and software, is the property of Calculate Anything.",
        "You may not reproduce, distribute, or create derivative works from our content without explicit permission.",
        "Our calculators and tools are provided for personal and educational use only.",
      ],
    },
    {
      icon: Globe,
      title: "Third-Party Links",
      content: [
        "Our service may contain links to third-party websites that are not owned or controlled by us.",
        "We are not responsible for the content, privacy policies, or practices of any third-party websites.",
        "We recommend reviewing the terms and policies of any third-party sites you visit.",
      ],
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: [
        "To the maximum extent permitted by law, Calculate Anything shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "We do not warrant that the service will be uninterrupted, secure, or error-free.",
        "Our total liability to you for any claims arising from your use of the service shall not exceed the amount you paid to use the service (which is free).",
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
              Legal
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D47A1]">
            Terms of{" "}
            <span className="bg-gradient-to-r from-[#2196F3] to-[#0D47A1] bg-clip-text text-transparent">
              Service
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using Calculate Anything.
            By using our service, you agree to be bound by these terms.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1]/70">
              <ClockIcon className="w-4 h-4" />
              Last Updated: December 2024
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1]/70">
              <BookOpen className="w-4 h-4" />
              Version 2.0
            </span>
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

        {/* Terms Sections */}
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

        {/* Contact Section */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-[#E3F2FD]/30 rounded-2xl border border-[#90CAF9]/30 text-center">
          <h3 className="font-semibold text-[#0D47A1] text-lg mb-2">
            Have Questions About Our Terms?
          </h3>
          <p className="text-sm text-[#0D47A1]/70 max-w-lg mx-auto">
            If you have any questions or concerns about our terms of service,
            please don't hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-medium shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105 text-sm"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-[#90CAF9]/20 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/privacy"
            className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
          >
            Privacy Policy
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

// Clock icon component
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
