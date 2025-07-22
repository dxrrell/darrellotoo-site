import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://darrellotoo.com'), // Replace with your actual domain
  // Basic SEO
  title: {
    default: "Darrell Otoo",
    template: "%s | Darrell Otoo"
  },
  description: "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo (also known as Darrell Otoo) offering custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching. Expert in mechanical design, 3D modeling, and engineering solutions.",
  keywords: [
    "Emmanuel Darrell Otoo",
    "Emmanuel Otoo",
    "Emmanuel D Otoo",
    "Darrell Otoo",
    "E. Darrell Otoo",
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
    google: "your-google-verification-code", // Replace with actual verification code
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darrellotoo.com", // Replace with your actual domain
    siteName: "Darrell Otoo",
    title: "Darrell Otoo",
    description: "Expert mechanical engineer and technical consultant Emmanuel Darrell Otoo (Darrell Otoo) offering custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching services.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Darrell Otoo",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Darrell Otoo",
    description: "Expert mechanical engineer and technical consultant Emmanuel Darrell Otoo (Darrell Otoo) offering custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching services.",
    images: ["/twitter-image.jpg"], // You'll need to create this image
    // creator: "@darrellotoo", // Removed, no Twitter account
  },

  // Additional meta tags
  alternates: {
    canonical: "https://darrellotoo.com", // Replace with your actual domain
  },
  category: "Engineering Services",
  classification: "Professional Services",
  other: {
    "geo.region": "US",
    "geo.placename": "Northern Virginia, US",
    // "geo.position": "37.7749;-122.4194", // Removed, no specific location
    // "ICBM": "37.7749, -122.4194", // Removed, no specific coordinates
    "DC.title": "Darrell Otoo",
    "DC.creator": "Emmanuel Darrell Otoo",
    "DC.subject": "Engineering, Technical Services, Consulting",
    "DC.description": "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo offering comprehensive engineering and technical services.",
    "DC.publisher": "Emmanuel Darrell Otoo",
    "DC.contributor": "Emmanuel Darrell Otoo",
    "DC.date": "2024",
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://darrellotoo.com",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.rights": "Copyright 2024 Emmanuel Darrell Otoo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/src/app/darrellLogo.ico" type="image/x-icon" />
        {/* Additional meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F0A1F" />
        <meta name="msapplication-TileColor" content="#0F0A1F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Darrell Otoo" />
        
        {/* Name variations for better searchability */}
        <meta name="author:full-name" content="Emmanuel Darrell Otoo" />
        <meta name="author:first-name" content="Emmanuel" />
        <meta name="author:middle-name" content="Darrell" />
        <meta name="author:last-name" content="Otoo" />
        <meta name="author:preferred-name" content="Darrell" />
        <meta name="author:alternate-names" content="Emmanuel Otoo, Emmanuel D Otoo, Darrell Otoo, E. Darrell Otoo" />
        
        {/* Service-specific meta tags */}
        <meta name="service:custom-pc-building" content="High-performance custom PC builds tailored to gaming, content creation, and professional work" />
        <meta name="service:drone-building" content="Custom drone builds for photography, racing, and specialized applications" />
        <meta name="service:hardware-repairs" content="Expert diagnosis and repair of computers, drones, and technical equipment" />
        <meta name="service:ui-ux-design" content="User-centered design solutions for web and mobile applications" />
        <meta name="service:mechanical-design" content="Expert mechanical design and analysis for various applications" />
        <meta name="service:public-speaking" content="Engaging technical presentations and keynote speeches for conferences and events" />
        <meta name="service:consulting" content="Technical consulting services for businesses and individuals" />
        <meta name="service:tutoring" content="One-on-one tutoring in technical subjects and engineering concepts" />
        <meta name="service:career-coaching" content="Guidance for students navigating technical career paths" />
        <meta name="service:training-workshops" content="Interactive workshops on technical skills and best practices" />
        <meta name="service:technical-writing" content="Clear and comprehensive technical documentation and guides" />
        
        {/* Expertise-specific meta tags */}
        <meta name="expertise:mechanical-engineering" content="Northrop Grumman engineer specializing in tactical space systems and robotics automation" />
        <meta name="expertise:innovation-research" content="Systems thinking approach with $785K in identified cost savings and breakthrough solutions" />
        <meta name="expertise:leadership-mentorship" content="NSBE President, graduate commencement speaker, and STEM diversity advocate" />
        <meta name="expertise:machine-learning" content="Advanced ML research with 90% accuracy improvements and automation expertise" />
        <meta name="expertise:public-speaking" content="Conference panelist, graduate speaker, and engineering thought leader" />
        
        {/* Location and contact info */}
        <meta name="contact:email" content="contact@darrellotoo.com" />
        {/* <meta name="contact:phone" content="+1-XXX-XXX-XXXX" /> Removed, no public phone */}
        <meta name="contact:website" content="https://darrellotoo.com" />
        
        {/* Business hours and availability */}
        <meta name="business:hours" content="Monday-Friday: 9AM-6PM EST" />
        <meta name="business:availability" content="Available for remote and in-person consultations" />
        
        {/* Structured Data for Rich Snippets */}
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
              "url": "https://darrellotoo.com",
              "image": "https://darrellotoo.com/profile-image.jpg",
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
              // "telephone": "+1-XXX-XXX-XXXX", // Removed, no public phone
              "email": "contact@darrellotoo.com"
            })
          }}
        />
        
        {/* Additional structured data for services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Darrell Otoo Engineering Services",
              "description": "Comprehensive technical solutions by Emmanuel Darrell Otoo (Darrell Otoo) including custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching",
              "provider": {
                "@type": "Person",
                "name": "Emmanuel Darrell Otoo",
                "alternateName": ["Darrell Otoo", "Emmanuel Otoo", "Emmanuel D Otoo"]
              },
              "areaServed": "Worldwide",
              "serviceType": [
                "Custom PC Building",
                "Drone Construction",
                "Hardware Repairs",
                "UI/UX Design",
                "Mechanical Design",
                "Public Speaking",
                "Technical Consulting",
                "Tutoring",
                "Career Coaching",
                "Training Workshops",
                "Technical Writing"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Technical Services Catalog"
              }
            })
          }}
        />
      </head>
      <body className="bg-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
