import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Font Configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

// Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://calculateanything.com"),

  title: {
    default: "Calculate Anything — 360+ Free Calculators & Converters",
    template: "%s | Calculate Anything",
  },

  description:
    "Access 360+ accurate calculators for math, finance, unit conversion, science, and everyday life. Every result shows its formula and step-by-step working. Free and easy to use.",

  keywords: [
    "calculators",
    "free calculators",
    "math calculators",
    "finance calculators",
    "unit converters",
    "scientific calculators",
    "BMI calculator",
    "percentage calculator",
    "loan calculator",
    "conversion tools",
    "step by step solutions",
    "calculation tools",
    "online calculators",
    "math tools",
    "finance tools",
  ],

  authors: [
    { name: "Calculate Anything Team" },
    { url: "https://calculateanything.com" },
  ],

  creator: "Calculate Anything",
  publisher: "Calculate Anything",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calculateanything.com",
    siteName: "Calculate Anything",
    title: "Calculate Anything — 360+ Free Calculators & Converters",
    description:
      "Access 360+ accurate calculators for math, finance, unit conversion, science, and everyday life with step-by-step working.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calculate Anything - Free Online Calculators",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@calculateany",
    creator: "@calculateany",
    title: "Calculate Anything — 360+ Free Calculators & Converters",
    description:
      "Access 360+ accurate calculators for math, finance, unit conversion, science, and everyday life.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-GB": "/",
    },
  },

  category: "education",
  classification: "Educational Tools",

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2196F3",
      },
    ],
  },

  verification: {
    // Replace these placeholder values with your actual verification codes.
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },

  other: {
    "msapplication-TileColor": "#2196F3",
    "theme-color": "#2196F3",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

// Viewport Configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#2196F3",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0D47A1",
    },
  ],

  colorScheme: "light dark",
};

// Theme Initialization Script
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme") || "system";

    var systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    var isDark =
      stored === "dark" ||
      (stored === "system" && systemDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    var mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    mediaQuery.addEventListener("change", function (e) {
      var currentTheme =
        localStorage.getItem("theme") || "system";

      if (currentTheme === "system") {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    });
  } catch (e) {}
})();
`;

// Organization / Web Application Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculate Anything",
  description:
    "360+ accurate calculators for math, finance, unit conversion, science, and everyday life with step-by-step solutions.",
  url: "https://calculateanything.com",
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },

  author: {
    "@type": "Organization",
    name: "Calculate Anything Team",
  },
};

// WebSite Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Calculate Anything",
  url: "https://calculateanything.com",

  potentialAction: {
    "@type": "SearchAction",
    target: "https://calculateanything.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://calculateanything.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H9DB5V72VD"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag("js", new Date());
            gtag("config", "G-H9DB5V72VD");
          `}
        </Script>

        {/* Theme Initialization */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preload */}
        <link rel="preload" href="/favicon.ico" as="image" />
      </head>

      <body className="min-h-full flex flex-col bg-white dark:bg-[#0a1628] transition-colors duration-300">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
