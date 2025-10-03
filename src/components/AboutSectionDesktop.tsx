"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from 'next/image';
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSectionDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const isMobile = useIsMobile();

  // Mouse position tracking for grid background effect (used in CSS custom properties)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      grid.style.setProperty("--mouse-x", `${x}%`);
      grid.style.setProperty("--mouse-y", `${y}%`);
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("mousemove", handleMouseMove);
      return () => grid.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Horizontal scroll animation with progress bar update (desktop only) - No autoscroll
  useGSAP(() => {
    if (isMobile) return; // Skip GSAP on mobile
    
    const cards = cardsRef.current;
    if (cards && sectionRef.current && progressRef.current) {
      gsap.to(cards, {
        x: () => `-${cards.scrollWidth - window.innerWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${cards.scrollWidth}`,
          onUpdate: self => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
              setActiveCard(Math.round(self.progress * (cards.children.length - 1)));
            }
          }          
        },
      });
    }
  }, { scope: sectionRef, dependencies: [isMobile] });

  const aboutCards = [
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Engineering",
      description: "• Extensive hands-on experience across mechanical, electrical, and mission-assurance engineering in aerospace & space systems\n• Successfully delivered 15+ real-world projects spanning automation, robotics, prototyping, and space-system integration\n• Specialized focus on quality, compliance, and reliability for mission-critical space operations\n• Proficient in advanced CAD & modeling tools: SolidWorks, Fusion 360, MATLAB\n• Deep expertise in hardware design, comprehensive testing, and complex system-level problem solving",
      highlight: "15+ Projects",
      stats: ["SolidWorks", "Fusion 360", "MATLAB"],
      image: "/images/about/mechanical-engineering.jpg",
      imageAlt: "Darrell working on mechanical engineering project"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovation & Research",
      description: "• Strategic approach to challenges with systems thinking and curiosity-driven research methodology\n• Successfully led technical research initiatives from academic laboratories to federal partnerships\n• DOE project delivered $785K in verified cost savings for energy operations\n• Currently preparing research publications while advancing R&D initiatives in the defense sector\n• 4+ years of proven experience bridging cutting-edge research with real-world practical applications",
      highlight: "$785K Savings",
      stats: ["4+ Years", "1 Publication", "DOE Project"],
      image: "/images/about/innovation-research.JPG",
      imageAlt: "Darrell working on innovative research project"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Leadership & Mentorship",
      description: "• 3+ years of transformative leadership in NSBE—serving as President, Alumni Advisor, and dedicated mentor to emerging engineers\n• Leadership philosophy grounded in equity, visibility, and actionable support for the next generation of Black technologists\n• Committed to creating meaningful pathways and opportunities for underrepresented groups in STEM\n• Personally mentored 50+ students and early-career professionals, fostering their professional growth\n• Honored with 6 prestigious leadership awards recognizing exceptional impact and service",
      highlight: "50+ Mentees",
      stats: ["3+ Years", "6 Awards", "VCU Speaker"],
      image: "/images/about/leadership-mentorship.JPG",
      imageAlt: "Darrell speaking at leadership event"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Public Speaking",
      description: "• Delivered 15+ impactful presentations to 4,000+ audience members across panels, conferences, and ceremonies\n• Featured keynote speaker at VCU Commencement and prominent industry forums\n• Specialized focus on topics at the intersection of engineering, identity, innovation, and life design\n• Recognized speaking style emphasizing clarity, humility, and genuine motivation\n• Deeply passionate about inspiring and empowering the next generation of engineers and innovators",
      highlight: "4,000+ Audience",
      stats: ["15+ Talks", "VCU Commencement", "Industry Forums"],
      image: "/images/about/public-speaking.JPG",
      imageAlt: "Darrell giving a presentation"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Machine Learning & AI",
      description: "• Developed 2 sophisticated ML models for image prediction and detection using TensorFlow, scikit-learn, and Python\n• Achieved exceptional 90%+ accuracy rates in academic capstone projects\n• Passionate about leveraging AI to solve complex engineering challenges and advance wellness applications\n• Skilled in comprehensive data preprocessing, advanced model tuning, and rigorous evaluation methodologies\n• Enthusiastic about the transformative potential of AI across engineering and wellness domains",
      highlight: "90%+ Accuracy",
      stats: ["2 Models", "TensorFlow", "Python"],
      image: "/images/about/machine-learning.JPG",
      imageAlt: "Darrell analyzing machine learning models"
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#0F0A1F]"
    >
      {/* Enhanced Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(123, 74, 227, 0.25) 0%, transparent 50%),
            linear-gradient(to right, rgba(155, 142, 207, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(155, 142, 207, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          transition: "background-position 0.1s ease-out",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="flex h-screen">
            {/* Sidebar */}
            <div className="flex-shrink-0 w-1/3 flex items-center justify-center p-12">
              <div className="max-w-md">
                <h2 className="text-7xl md:text-8xl font-extrabold text-gradient leading-tight">
                  About Me
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#7B4AE3] to-[#9B8ECF] mt-6"></div>
                <p className="text-[#E8E6F3] text-lg mt-8 max-w-sm leading-relaxed">
                  Keep scrolling to explore my expertise and experience across engineering, leadership, and innovation.
                </p>
                {/* Scroll Indicator */}
                <div className="mt-8 flex items-center gap-3 text-[#9B8ECF] animate-pulse">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v18" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V0" />
                  </svg>
                  <span className="text-sm">Scroll to explore</span>
                </div>
                <div className="mt-12 flex items-center gap-4">
                  <div className="flex gap-2">
                    {aboutCards.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeCard ? "bg-[#7B4AE3] w-4" : "bg-[#7B4AE3]/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#9B8ECF] text-sm">
                    {activeCard + 1}/{aboutCards.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal Scroll Cards */}
            <div className="flex-grow overflow-hidden">
              <div
                ref={cardsRef}
                className="flex h-full gap-4"
                style={{ width: "max-content" }}
              >
                {aboutCards.map((card, index) => (
                  <div
                    key={index}
                    className="w-screen h-full flex items-center justify-center p-4"
                  >
                    <div 
                      className="group bg-white border border-gray-200 rounded-none max-w-6xl w-full h-[600px] flex hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:scale-[1.02]"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          // Optional: Add any card interaction here
                        }
                      }}
                      role="button"
                      aria-label={`${card.title} - ${card.description}`}
                    >
                      {/* Card Background Effect */}
                      <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Content Section */}
                      <div className="relative z-10 w-1/2 p-12 flex flex-col justify-between">
                        <div>
                          <h3 className="text-4xl font-bold text-black mb-6 group-hover:text-gray-800 transition-all">
                            {card.title}
                          </h3>
                          <div className="text-gray-800 text-lg leading-relaxed mb-8">
                            {card.description.split('\n').map((line, index) => (
                              <p key={index} className="mb-2">{line}</p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-4 mb-6">
                            {card.stats.map((stat, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-none text-sm font-medium border border-gray-200 group-hover:border-gray-300 transition-all"
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="bg-gray-100 text-gray-800 px-6 py-3 rounded-none text-sm font-semibold border border-gray-200 group-hover:bg-gray-200 transition-all">
                              {card.highlight}
                            </span>
                            <div className="w-12 h-12 border border-gray-200 rounded-none flex items-center justify-center group-hover:border-gray-300 transition-all">
                              <div className="w-3 h-3 bg-gray-800 rounded-none group-hover:scale-150 transition-transform"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="relative w-1/2 h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          priority={index === 0}
                        />
                        {/* Image overlay with icon */}
                        <div className="absolute top-6 right-6 transform group-hover:scale-110 transition-transform duration-500">
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                            {card.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="py-20 px-6">
            {/* Mobile Header */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-extrabold text-gradient leading-tight mb-6">
                About Me
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#7B4AE3] to-[#9B8ECF] mx-auto mb-6"></div>
              <p className="text-[#E8E6F3] text-lg leading-relaxed">
                Explore my expertise and experience across engineering, leadership, and innovation.
              </p>
            </div>

            {/* Vertical Cards Stack */}
            <div className="space-y-8 max-w-sm mx-auto">
              {aboutCards.map((card, index) => (
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:shadow-xl"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      // Optional: Add any card interaction here
                    }
                  }}
                  role="button"
                  aria-label={`${card.title} - ${card.description}`}
                >
                  {/* Mobile Card Layout */}
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        priority={index < 2}
                      />
                      {/* Image overlay with icon */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                          {card.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                          {card.title}
                        </h3>
                        <div className="text-gray-800 text-base leading-relaxed mb-6">
                          {card.description.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">{line}</p>
                          ))}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex flex-wrap gap-2 mb-4 justify-center items-center">
                          {card.stats.map((stat, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-medium border border-gray-200 text-center"
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded text-sm font-semibold border border-gray-200 text-center">
                            {card.highlight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Progress Bar (Desktop only) */}
      {!isMobile && (
        <div className="fixed left-0 bottom-0 w-full h-6 bg-[#2D1B69]/30 z-50 backdrop-blur-sm">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#7B4AE3] to-[#9B8ECF] transition-all duration-300 relative"
            style={{ width: "0%" }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
          </div>
        </div>
      )}
    </section>
  );
} 