import UnifiedHeader from "@/components/UnifiedHeader";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      {/* Additional SEO Schema for the main page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Darrell Otoo",
            "description": "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo (also known as Darrell Otoo) offering comprehensive engineering and technical services including custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching.",
            "url": "https://darrellotoo.com",
            "mainEntity": {
              "@type": "Person",
              "name": "Emmanuel Darrell Otoo",
              "alternateName": ["Darrell Otoo", "Emmanuel Otoo", "Emmanuel D Otoo", "E. Darrell Otoo"],
              "givenName": "Emmanuel",
              "additionalName": "Darrell",
              "familyName": "Otoo",
              "jobTitle": "Mechanical Engineer & Technical Consultant",
              "description": "Professional mechanical engineer and technical consultant Emmanuel Darrell Otoo (also known as Darrell Otoo) with expertise in custom PC building, drone construction, hardware repairs, UI/UX design, public speaking, consulting, tutoring, and career coaching.",
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
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://darrellotoo.com"
                }
              ]
            },
            "potentialAction": {
              "@type": "ContactPage",
              "name": "Contact Darrell Otoo",
              "url": "https://darrellotoo.com/#contact"
            }
          })
        }}
      />

      <main className="bg-black min-h-screen" role="main" aria-label="Darrell Otoo - Mechanical Engineer and Technical Consultant">
        <UnifiedHeader />
        
        {/* Spacer to push AboutSection below the header */}
        <div style={{ height: "100vh" }} aria-hidden="true"></div>
        
        {/* About Section */}
        <section id="about" aria-labelledby="about-heading">
          <AboutSection />
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" aria-labelledby="portfolio-heading">
          <PortfolioSection />
        </section>
        
        {/* Services Section */}
        <section id="services" aria-labelledby="services-heading">
          <ServicesSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact" aria-labelledby="contact-heading">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
