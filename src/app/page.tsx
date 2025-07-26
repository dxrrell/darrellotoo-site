import UnifiedHeader from "@/components/UnifiedHeader";
import AboutSectionWrapper from "@/components/AboutSectionWrapper";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen" role="main" aria-label="Darrell Otoo - Mechanical Engineer and Technical Consultant">
      <UnifiedHeader />
      
      {/* Spacer to push AboutSection below the header */}
      <div style={{ height: "100vh" }} aria-hidden="true"></div>
      
      {/* About Section */}
      <section id="about" aria-labelledby="about-heading">
        <AboutSectionWrapper />
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
  );
}
