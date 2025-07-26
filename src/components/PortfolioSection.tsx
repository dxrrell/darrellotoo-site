"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltedCard from '@/components/TiltedCard';
import { useIsMobile } from "@/hooks/useIsMobile";

// Safely register GSAP plugins
try {
  gsap.registerPlugin(ScrollTrigger);
} catch (error) {
  console.warn('GSAP ScrollTrigger registration failed:', error);
}

// Gyroscope hook for mobile tilt
function useGyroscope() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleOrientation(event: DeviceOrientationEvent) {
      // gamma: left/right, beta: front/back
      setTilt({
        x: event.beta ? Math.max(-30, Math.min(30, event.beta - 90)) : 0, // clamp to [-30, 30]
        y: event.gamma ? Math.max(-30, Math.min(30, event.gamma)) : 0, // clamp to [-30, 30]
      });
    }

    // Check if device orientation is supported
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      try {
        window.addEventListener('deviceorientation', handleOrientation, true);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
      } catch (error) {
        console.warn('Device orientation not available:', error);
      }
    }
  }, []);
  return tilt;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  icon: React.ReactNode;
}

interface ProjectIconProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onExpand: (index: number) => void;
  isMobile?: boolean;
  tiltX?: number;
  tiltY?: number;
}

const projects = [
  {
    title: "Additive Manufacturing Vision System",
    description: "Developed real-time defect detection using Intel RealSense and ML",
    tech: ["Python", "OpenCV", "TensorFlow", "ROS"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        {/* Outer scanning ring */}
        <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
        {/* Central lens */}
        <circle cx="12" cy="12" r="4" />
        {/* AI/ML elements - scanning lines */}
        <path d="M4 12h2M18 12h2" />
        <path d="M12 4v2M12 18v2" />
        {/* Processing nodes */}
        <circle cx="8" cy="8" r="1" />
        <circle cx="16" cy="8" r="1" />
        <circle cx="8" cy="16" r="1" />
        <circle cx="16" cy="16" r="1" />
      </svg>
    )
  },
  {
    title: "Financial Analytics Dashboard",
    description: "ML-powered budget tracking system with Python/Excel integration",
    tech: ["Python", "Pandas", "Excel", "Machine Learning"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        {/* Main trend line */}
        <path d="M4 16l4-2 4 4 4-6 4 2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Data points */}
        <circle cx="4" cy="16" r="1" />
        <circle cx="8" cy="14" r="1" />
        <circle cx="12" cy="18" r="1" />
        <circle cx="16" cy="12" r="1" />
        <circle cx="20" cy="14" r="1" />
      </svg>
    )
  },
  {
    title: "Custom FPV Drone Build",
    description: "High-performance aerial photography platform with 4K transmission",
    tech: ["FPV", "Drone", "4K Video", "Radio Transmission"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        {/* Main X-frame */}
        <path d="M8 8l8 8M8 16l8-8" strokeLinecap="round" />
        {/* Center plate */}
        <circle cx="12" cy="12" r="1.5" />
        {/* Motor mounts */}
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="16" cy="8" r="1.5" />
        <circle cx="8" cy="16" r="1.5" />
        <circle cx="16" cy="16" r="1.5" />
      </svg>
    )
  },
  {
    title: "Personal Portfolio Website",
    description: "Modern, interactive portfolio built with Next.js and Framer Motion",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" viewBox="0 0 24 24">
        {/* Cursor arrow */}
        <path  d="M3 2L21 12L14 14L12 21L3 2Z" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Coming Soon",
    description: "New project in development",
    tech: ["Coming Soon"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "Coming Soon",
    description: "New project in development",
    tech: ["Coming Soon"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "Coming Soon",
    description: "New project in development",
    tech: ["Coming Soon"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "Coming Soon",
    description: "New project in development",
    tech: ["Coming Soon"],
    link: "#",
    icon: (
      <svg className="w-16 h-16 text-[#9B8ECF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

const ProjectIcon: React.FC<ProjectIconProps> = ({ project, index, isExpanded, onExpand, isMobile = false, tiltX, tiltY }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return; // Skip GSAP on mobile
    
    if (isExpanded) {
      gsap.to(iconRef.current, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  }, [isExpanded, isMobile]);

  // Mobile-friendly project card
  if (isMobile) {
    return (
      <div
        ref={iconRef}
        className={`relative cursor-pointer transition-all duration-300 ${
          isExpanded ? 'z-50' : 'z-10'
        }`}
        onClick={() => onExpand(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onExpand(index);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${project.title} - ${project.description}`}
      >
        <TiltedCard
          imageSrc=""
          altText={project.title}
          captionText={project.title}
          containerHeight="96px"
          containerWidth="96px"
          imageHeight="96px"
          imageWidth="96px"
          rotateAmplitude={30}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={false}
          customContent={
            <div className={`w-24 h-24 aspect-square rounded-2xl bg-[#0F0A1F]/50 backdrop-blur-sm border border-[#9B8ECF]/20 
                          flex items-center justify-center pl-3 transition-all duration-300
                          ${isExpanded ? 'border-[#7B4AE3]/60 shadow-2xl shadow-[#7B4AE3]/20 scale-110' : 'hover:border-[#7B4AE3]/40 hover:scale-105'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:scale-105`}>
              {project.icon}
            </div>
          }
          tiltX={tiltX}
          tiltY={tiltY}
        />
      </div>
    );
  }

  // Desktop version with TiltedCard
  return (
    <div
      ref={iconRef}
      className={`relative cursor-pointer transition-all duration-300 ${
        isExpanded ? 'z-50' : 'z-10'
      }`}
      onClick={() => onExpand(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand(index);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${project.title} - ${project.description}`}
    >
      <TiltedCard
        imageSrc=""
        altText={project.title}
        captionText={project.title}
        containerHeight="96px"
        containerWidth="96px"
        imageHeight="96px"
        imageWidth="96px"
        rotateAmplitude={30}
        scaleOnHover={1.1}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={false}
        customContent={
          <div className={`w-24 h-24 aspect-square rounded-2xl bg-[#0F0A1F]/50 backdrop-blur-sm border border-[#9B8ECF]/20 
                        flex items-center justify-center pl-2 transition-all duration-300
                        ${isExpanded ? 'border-[#7B4AE3]/60 shadow-2xl shadow-[#7B4AE3]/20' : 'hover:border-[#7B4AE3]/40'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3]`}>
            {project.icon}
          </div>
        }
      />
    </div>
  );
};

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const gyroTilt = useGyroscope();

  useEffect(() => {
    if (isMobile) return; // Skip mouse tracking on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  // Handle escape key to close expanded project
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedIndex !== null) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [expandedIndex]);

  // Handle click outside to close expanded project
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (expandedIndex !== null && !(e.target as Element).closest('.project-icon')) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedIndex]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen bg-[#0F0A1F] overflow-hidden"
    >
      {/* Dynamic Grid Background (Desktop only) */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(123, 74, 227, 0.25) 0%, transparent 50%),
              linear-gradient(to right, rgba(155, 142, 207, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(155, 142, 207, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
            transition: 'background-position 0.1s ease-out',
          }}
        />
      )}

      {/* Static Grid Background (Mobile) */}
      {isMobile && (
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(155, 142, 207, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(155, 142, 207, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-12 md:mb-16 text-center">
          Portfolio
        </h2>

        {/* Interactive Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto w-full place-items-center"
          style={{
            paddingLeft: isMobile ? 8 : 0,
            paddingRight: isMobile ? 8 : 0,
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="project-icon">
              <ProjectIcon
                project={project}
                index={index}
                isExpanded={expandedIndex === index}
                onExpand={(idx) => setExpandedIndex(expandedIndex === idx ? null : idx)}
                isMobile={isMobile}
                tiltX={isMobile ? gyroTilt.x : undefined}
                tiltY={isMobile ? gyroTilt.y : undefined}
              />
            </div>
          ))}
        </div>

        {/* Instructions */}
        <p className="text-[#E8E6F3]/80 text-sm mt-8 md:mt-12 text-center max-w-md">
          {isMobile ? "Tap on any project icon to view details." : "Click on any project icon to view details."}
        </p>
      </div>

      {/* Centered Project Detail Modal */}
      {expandedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-md w-full">
            <TiltedCard
              imageSrc=""
              altText={projects[expandedIndex].title}
              captionText=""
              containerHeight="auto"
              containerWidth="100%"
              imageHeight="auto"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.02}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              customContent={
                <div className="w-full bg-[#0F0A1F]/95 backdrop-blur-md border border-[#9B8ECF]/30 rounded-2xl p-6 shadow-2xl shadow-[#7B4AE3]/20 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#7B4AE3]">{projects[expandedIndex].title}</h3>
                    <button
                      onClick={() => setExpandedIndex(null)}
                      className="text-[#E8E6F3]/60 hover:text-[#7B4AE3] transition-colors duration-200 p-1"
                      aria-label="Close project details"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[#E8E6F3] text-sm mb-4 leading-relaxed">{projects[expandedIndex].description}</p>
                  <div className="flex flex-wrap gap-2">
                    {projects[expandedIndex].tech.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-[#2D1B69]/10 text-[#E8E6F3] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}
