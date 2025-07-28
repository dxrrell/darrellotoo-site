import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next";
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  metadataBase: new URL('https://darrellotoo.vercel.app'),
  title: {
    default: "Darrell Otoo",
    template: "%s | Darrell Otoo"
  },
  description: "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo (also known as Darrell Otoo) offering custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching. Expert in mechanical design, 3D modeling, and engineering solutions.",
  keywords: [
    "Emmanuel Darrell Otoo",
    "Darrell Otoo",
    "mechanical engineer",
    "technical consultant",
    "custom PC building",
    "drone building",
    "hardware repairs",
    "UI/UX design",
    "mechanical design",
    "public speaking",
    "engineering consulting",
    "technical tutoring",
    "career coaching",
    "3D modeling",
    "CAD design",
    "robotics automation",
    "machine learning",
    "innovation research",
    "leadership mentoring",
    "Northrop Grumman engineer",
    "tactical space systems",
    "engineering services",
    "technical writing",
    "workshop training",
    "student career guidance",
    "engineering solutions",
    "custom engineering",
    "technical expertise",
    "engineering innovation",
    "professional development",
    "STEM education",
    "engineering mentorship"
  ],
  authors: [{ name: "Emmanuel Darrell Otoo" }],
  creator: "Emmanuel Darrell Otoo",
  publisher: "Emmanuel Darrell Otoo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darrellotoo.vercel.app",
    siteName: "Darrell Otoo",
    title: "Darrell Otoo",
    description: "Expert mechanical engineer and technical consultant Emmanuel Darrell Otoo (Darrell Otoo) offering custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Darrell Otoo - Professional Mechanical Engineer & Technical Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darrell Otoo",
    description: "Expert mechanical engineer and technical consultant Emmanuel Darrell Otoo (Darrell Otoo) offering custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching services.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://darrellotoo.vercel.app",
  },
  category: "Engineering Services",
  classification: "Professional Services",
  other: {
    "geo.region": "US",
    "geo.placename": "Northern Virginia, US",
    "DC.title": "Darrell Otoo",
    "DC.creator": "Emmanuel Darrell Otoo",
    "DC.subject": "Engineering, Technical Services, Consulting",
    "DC.description": "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo offering comprehensive engineering and technical services.",
    "DC.publisher": "Emmanuel Darrell Otoo",
    "DC.contributor": "Emmanuel Darrell Otoo",
    "DC.date": "2024",
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://darrellotoo.vercel.app",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright 2024 Emmanuel Darrell Otoo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/darrellLogo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Additional Open Graph meta tags for better social media sharing */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image:alt" content="Darrell Otoo - Professional Mechanical Engineer & Technical Consultant" />
        <meta name="theme-color" content="#0F0A1F" />
        <meta name="msapplication-TileColor" content="#0F0A1F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Darrell Otoo" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Emmanuel Darrell Otoo",
              "alternateName": ["Darrell Otoo", "Emmanuel Otoo", "Emmanuel D Otoo", "E. Darrell Otoo"],
              "givenName": "Emmanuel",
              "additionalName": "Darrell",
              "familyName": "Otoo",
              "jobTitle": "Mechanical Engineer & Technical Consultant",
              "description": "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo (also known as Darrell Otoo) offering comprehensive engineering and technical services",
              "url": "https://darrellotoo.vercel.app",
              "image": "https://darrellotoo.vercel.app/darrellLogo.png",
              "sameAs": [
                "https://linkedin.com/in/darrellotoo",
                "https://github.com/darrellotoo"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Northrop Grumman"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Virginia Commonwealth University"
              },
              "knowsAbout": [
                "Mechanical Engineering",
                "Custom PC Building",
                "Drone Construction",
                "Hardware Repairs",
                "UI/UX Design",
                "Public Speaking",
                "Technical Consulting",
                "Machine Learning",
                "Robotics Automation",
                "CAD Design",
                "3D Modeling",
                "Innovation Research",
                "Leadership Mentorship",
                "Career Coaching",
                "Technical Tutoring"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Technical Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom PC Building",
                      "description": "High-performance custom PC builds tailored to your specific needs"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Drone Building",
                      "description": "Custom drone builds for photography, racing, and specialized applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Hardware Repairs",
                      "description": "Expert diagnosis and repair of computers, drones, and technical equipment"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "UI/UX Design",
                      "description": "User-centered design solutions for web and mobile applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mechanical Design",
                      "description": "Expert mechanical design and analysis for various applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Public Speaking",
                      "description": "Engaging technical presentations and keynote speeches"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Technical Consulting",
                      "description": "Technical consulting services for businesses and individuals"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Tutoring",
                      "description": "One-on-one tutoring in technical subjects and engineering concepts"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Career Coaching",
                      "description": "Guidance for students navigating technical career paths"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Training Workshops",
                      "description": "Interactive workshops on technical skills and best practices"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Technical Writing",
                      "description": "Clear and comprehensive technical documentation and guides"
                    }
                  }
                ]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "Northern Virginia"
              },
              "email": "contact@darrellotoo.com"
            })
          }}
        />
      </head>
      <body className="bg-black min-h-screen">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
