import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Send,
  ArrowRight,
  Clock,
  Shield,
  Heart,
  Sparkles,
  Users,
  Globe,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Calculate Anything",
  description:
    "Get in touch with the Calculate Anything team. We'd love to hear from you!",
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Send us an email and we'll respond within 24 hours",
      action: "mailto:hello@calculateanything.com",
      actionText: "hello@calculateanything.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Join our community for discussions and support",
      action: "https://discord.gg/calculateanything",
      actionText: "Join Discord Server",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: Send,
      title: "Feedback",
      description: "Share your suggestions and feature requests",
      action: "mailto:feedback@calculateanything.com",
      actionText: "feedback@calculateanything.com",
      color: "from-green-500 to-green-600",
    },
  ];

  const faqs = [
    {
      q: "How quickly do you respond to inquiries?",
      a: "We typically respond within 24 hours during business days. For urgent matters, please reach out via Discord for faster assistance.",
    },
    {
      q: "Can I contribute to the project?",
      a: "Absolutely! We're open-source and welcome contributions. Check out our GitHub repository for contribution guidelines.",
    },
    {
      q: "How do I report a bug?",
      a: "You can report bugs by opening an issue on GitHub or sending us an email with the details of the problem.",
    },
    {
      q: "Is Calculate Anything really free?",
      a: "Yes! Calculate Anything is completely free to use. We believe in making math accessible to everyone.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F2FD] px-4 py-1.5 mb-4 border border-[#90CAF9]/30">
            <Sparkles className="w-4 h-4 text-[#2196F3]" />
            <span className="text-xs font-semibold text-[#0D47A1] tracking-wider uppercase">
              Get in Touch
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D47A1]">
            Let's{" "}
            <span className="bg-gradient-to-r from-[#2196F3] to-[#0D47A1] bg-clip-text text-transparent">
              Connect
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl mx-auto leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from
            you! Reach out through any of the channels below.
          </p>

          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-[#E3F2FD]">
                <Clock className="w-4 h-4 text-[#2196F3]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#0D47A1]">
                  24h Response
                </div>
                <div className="text-xs text-[#0D47A1]/60">
                  Average reply time
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-[#E3F2FD]">
                <Users className="w-4 h-4 text-[#2196F3]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#0D47A1]">
                  10,000+ Users
                </div>
                <div className="text-xs text-[#0D47A1]/60">
                  Trusted worldwide
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-[#E3F2FD]">
                <Heart className="w-4 h-4 text-[#2196F3]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#0D47A1]">
                  100% Free
                </div>
                <div className="text-xs text-[#0D47A1]/60">No hidden costs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12 sm:mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.action.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group relative overflow-hidden rounded-2xl bg-white border border-[#90CAF9]/30 p-6 hover:shadow-xl hover:shadow-[#2196F3]/10 transition-all hover:-translate-y-1"
              >
                {/* Decorative gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <div className="relative">
                  <div className="p-3 rounded-xl bg-[#E3F2FD] w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#2196F3]" />
                  </div>
                  <h3 className="font-semibold text-[#0D47A1] text-lg mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-[#0D47A1]/70 mb-3">
                    {method.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#2196F3] group-hover:text-[#0D47A1] transition-colors">
                    <span>{method.actionText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E3F2FD] via-[#E3F2FD]/50 to-white border border-[#90CAF9]/30 p-8 sm:p-12">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1]">
                  Frequently Asked Questions
                </h2>
                <p className="text-[#0D47A1]/70 mt-2">
                  Quick answers to common questions
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-white border border-[#90CAF9]/20 hover:border-[#2196F3]/40 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-[#0D47A1] text-sm mb-2 flex items-start gap-2">
                      <span className="text-[#2196F3]">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="text-sm text-[#0D47A1]/70 leading-relaxed">
                      <span className="text-[#2196F3] font-medium">A:</span>{" "}
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-[#90CAF9]/30 p-8 sm:p-12 shadow-xl shadow-[#2196F3]/5">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-[#2196F3]" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1]">
                Join Our Community
              </h2>
              <p className="mt-3 text-[#0D47A1]/70 max-w-lg mx-auto">
                Connect with other users, share tips, and stay updated with the
                latest calculators and features.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="https://discord.gg/calculateanything"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-semibold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-2xl border border-[#90CAF9]/30 hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-[#2196F3]">100%</div>
            <div className="text-xs text-[#0D47A1]/60">Free to Use</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl border border-[#90CAF9]/30 hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-[#2196F3]">24/7</div>
            <div className="text-xs text-[#0D47A1]/60">Availability</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl border border-[#90CAF9]/30 hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-[#2196F3]">4.9★</div>
            <div className="text-xs text-[#0D47A1]/60">User Rating</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl border border-[#90CAF9]/30 hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-[#2196F3]">⚡</div>
            <div className="text-xs text-[#0D47A1]/60">Fast Response</div>
          </div>
        </div>
      </div>
    </div>
  );
}
