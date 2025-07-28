"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltedCard from '@/components/TiltedCard';

gsap.registerPlugin(ScrollTrigger);

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
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

const ProjectIcon: React.FC<ProjectIconProps> = ({ project, index, isExpanded, onExpand, isMobile = false }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return; // Skip GSAP on mobile
    
    if (isExpanded) {
      gsap.to(iconRef.current, {
        scale: 1.1,
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
        <div className={`w-24 h-24 rounded-2xl bg-[#0F0A1F]/50 backdrop-blur-sm border border-[#9B8ECF]/20 
                      flex items-center justify-center transition-all duration-300
                      ${isExpanded ? 'border-[#7B4AE3]/60 shadow-2xl shadow-[#7B4AE3]/20 scale-110' : 'hover:border-[#7B4AE3]/40 hover:scale-105'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3] focus-visible:scale-105`}>
          {project.icon}
        </div>
        
        {isExpanded && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50">
            <div className="w-80 bg-[#0F0A1F]/95 backdrop-blur-md border border-[#9B8ECF]/30 rounded-2xl p-6 shadow-2xl shadow-[#7B4AE3]/20">
              <h3 className="text-xl font-bold text-[#7B4AE3] mb-3">{project.title}</h3>
              <p className="text-[#E8E6F3] text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-[#2D1B69]/10 text-[#E8E6F3] rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop version with compact info popup
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
          <div className={`w-24 h-24 rounded-2xl bg-[#0F0A1F]/50 backdrop-blur-sm border border-[#9B8ECF]/20 
                        flex items-center justify-center transition-all duration-300
                        ${isExpanded ? 'border-[#7B4AE3]/60 shadow-2xl shadow-[#7B4AE3]/20' : 'hover:border-[#7B4AE3]/40'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3]`}>
            {project.icon}
          </div>
        }
      />
      
      {/* Compact info popup under the icon */}
      {isExpanded && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50">
          <TiltedCard
            imageSrc=""
            altText={project.title}
            captionText=""
            containerHeight="200px"
            containerWidth="256px"
            imageHeight="200px"
            imageWidth="256px"
            rotateAmplitude={12}
            scaleOnHover={1.02}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
            customContent={
              <div className="w-64 bg-[#0F0A1F]/95 backdrop-blur-md border border-[#9B8ECF]/30 rounded-xl p-4 shadow-2xl shadow-[#7B4AE3]/20 animate-fadeIn">
                <h3 className="text-lg font-bold text-[#7B4AE3] mb-2">{project.title}</h3>
                <p className="text-[#E8E6F3] text-xs mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-[#2D1B69]/10 text-[#E8E6F3] rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default function PortfolioSectionDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-12 md:mb-16">
          Portfolio
        </h2>

        {/* Compact Grid - Centered */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
          {projects.map((project, index) => (
            <ProjectIcon
              key={index}
              project={project}
              index={index}
              isExpanded={expandedIndex === index}
              onExpand={(idx) => setExpandedIndex(expandedIndex === idx ? null : idx)}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Instructions */}
        <p className="text-[#E8E6F3]/80 text-sm mt-8 md:mt-12 text-center max-w-md">
          {isMobile ? "Tap on any project icon to view details." : "Click on any project icon to view details."}
        </p>
      </div>
    </section>
  );
}
