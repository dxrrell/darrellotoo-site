"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [hasTapped, setHasTapped] = useState(false);
  const [showTapCue, setShowTapCue] = useState(true);
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
  // To further optimize the grid background effect, consider debouncing or using requestAnimationFrame for handleMouseMove.

  const aboutCards = [
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Mechanical Engineering",
      description: "Mechanical Engineer with hands-on experience across robotics, CAD, and hardware design. Delivered 15+ real-world projects spanning automation, prototyping, and space system integration—now building next-gen technologies at Northrop Grumman Tactical Space Systems.",
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
      description: "With a systems mindset and curiosity-driven approach, led technical research from academic labs to federal partnerships. Notably, a DOE project identified $785K in potential cost savings. Currently preparing research for publication and continuing to support R&D in the defense space.",
      highlight: "$785K Savings",
      stats: ["4+ Years", "1 Publication", "U.S. Department of Energy Project"],
      image: "/images/about/innovation-research.JPG",
      imageAlt: "Darrell working on innovative research project",
      imagePosition: "object-[center_25%]"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Leadership & Mentorship",
      description: "Over the past 3+ years, led and scaled impact in NSBE—serving as President, Alumni Advisor, and mentor to rising engineers. Leadership rooted in equity, visibility, and actionable support for the next generation of Black technologists.",
      highlight: "50+ Mentees",
      stats: ["3+ Years", "6 Awards", "VCU Commencement Speaker"],
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
      description: "Spoken to over 4,000 audience members across panels, conferences, and ceremonies. Talks explore the intersections of engineering, identity, innovation, and life design—always aiming to bring clarity, humility, and motivation.",
      highlight: "4,000+ Audience",
      stats: ["15+ Talks", "VCU Commencement", "Conferences & Panels"],
      image: "/images/about/public-speaking.JPG",
      imageAlt: "Darrell giving a presentation",
      imagePosition: "object-[center_25%]"
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Machine Learning & AI",
      description: "While early in the ML journey, applied tools like TensorFlow and scikit-learn to build models for image prediction and detection—including in capstone projects. Excited by the potential of AI in both engineering and wellness applications.",
      highlight: "90%+ Accuracy",
      stats: ["2 Models", "TensorFlow", "Python"],
      image: "/images/about/machine-learning.JPG",
      imageAlt: "Darrell analyzing machine learning models"
    },
  ];

  // Show tap cue for 5 seconds after load or card change, but never again after first tap
  useEffect(() => {
    if (hasTapped) return;
    setShowTapCue(true);
    const timer = setTimeout(() => setShowTapCue(false), 10000);
    return () => clearTimeout(timer);
  }, [activeCard, hasTapped]);

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
                  Scroll horizontally to explore my expertise and experience across engineering, leadership, and innovation.
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
                          <p className="text-gray-800 text-lg leading-relaxed mb-8">
                            {card.description}
                          </p>
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
          <div className="py-8 px-0">
            {/* Mobile Header */}
            <div className="text-center mb-4 px-6">
              <h2 className="text-5xl font-extrabold text-gradient leading-tight mb-6">
                About Me
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#7B4AE3] to-[#9B8ECF] mx-auto mb-6"></div>
              {/* To adjust the font size of the description below, edit the 'text-base' class */}
              <p className="text-[#E8E6F3] text-base leading-relaxed">
                Tap each card to explore my expertise and experience across engineering, leadership, and innovation.
              </p>
              {/* Progress Dots below the description */}
              <div className="flex justify-center items-center mt-2 -mb-15 w-full">
                <div className="flex gap-1 transform rotate-90">
                  {aboutCards.slice().reverse().map((_, idx) => {
                    const reversedIdx = aboutCards.length - 1 - idx;
                    return (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${reversedIdx === activeCard ? "bg-[#7B4AE3] scale-125" : "bg-[#7B4AE3]/30"}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* --- MOBILE TAP-TO-ADVANCE CARD CAROUSEL --- */}
            <div className="flex flex-col items-center justify-center w-full">
              {/* Tap cue: text + animated arrow, fades out after first tap, now above the card */}
              {showTapCue && !hasTapped && (
                <div className="flex flex-col items-center mb-2 animate-fade-in text-center w-full">
                  <span className="text-xs text-[#7B4AE3] font-medium mb-1 mx-auto">Tap card to see next</span>
                  <span className="animate-pulse-arrow text-2xl text-[#7B4AE3] mx-auto">&#8594;</span>
                </div>
              )}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, boxShadow: "0 4px 32px 0 rgba(123,74,227,0.10)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] w-[95vw] max-w-[350px] cursor-pointer select-none mx-auto"
                    tabIndex={0}
                    role="button"
                    aria-label={`${aboutCards[activeCard].title} - ${aboutCards[activeCard].description}`}
                    onClick={() => {
                      setActiveCard((prev) => (prev + 1) % aboutCards.length);
                      setHasTapped(true);
                      setShowTapCue(false);
                    }}
                    onPointerDown={e => e.currentTarget.classList.add('scale-95', 'bg-[#F3F0FA]')}
                    onPointerUp={e => e.currentTarget.classList.remove('scale-95', 'bg-[#F3F0FA]')}
                    onPointerLeave={e => e.currentTarget.classList.remove('scale-95', 'bg-[#F3F0FA]')}
                  >
                    {/* Image Section */}
                    <div className="relative w-full h-[120px]">
                      <Image
                        src={aboutCards[activeCard].image}
                        alt={aboutCards[activeCard].imageAlt}
                        width={350}
                        height={120}
                        className={`w-full h-full object-cover rounded-t-lg ${aboutCards[activeCard].imagePosition || ''}`}
                        priority={true}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-black mb-2 leading-tight">
                          {aboutCards[activeCard].title}
                        </h3>
                        <p className="text-gray-800 text-xs leading-snug mb-2">
                          {aboutCards[activeCard].description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {aboutCards[activeCard].stats.map((stat, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[11px] font-medium border border-gray-200 flex-1 min-w-[45%] max-w-[48%] text-center"
                              style={{ flexBasis: '48%' }}
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                        {/* Single Highlight */}
                        <div className="flex items-center justify-center">
                          <span className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[11px] font-semibold border border-gray-200 flex-1 min-w-[45%] max-w-[48%] text-center" style={{ flexBasis: '48%' }}>
                            {aboutCards[activeCard].highlight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
