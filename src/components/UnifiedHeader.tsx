"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";


import NavLink from "@/components/NavLink";
import CurvedLoop from './CurvedLoop';
import Image from "next/image";


export default function UnifiedHeader() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Close FAB menu on scroll or resize (optional, for polish)
  useEffect(() => {
    if (!fabOpen) return;
    const close = () => setFabOpen(false);
    window.addEventListener("scroll", close);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [fabOpen]);

  // Helper for scrolling to section
  const handleFabNav = (id: string) => {
    setFabOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scale = Math.max(0.3, 1 - scrollY / 300);
  const yPosition = Math.max(-windowHeight * 0.4, -scrollY * 0.8);
  const opacity = Math.max(0, 1 - scrollY / 200);

  const isScrolled = scrollY > 100;
  const showHero = scrollY < 50;
  const showNav = scrollY > 100;



  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: "tween" as const,
        duration: 0.5,
        ease: "easeInOut" as const
      }
    }
  };

  const leftItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const rightItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.section
        className="fixed inset-0 flex flex-col items-center justify-center text-center select-none z-30 pointer-events-none"
        style={{
          scale,
          y: yPosition + (windowHeight * 0.25 * (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0)), // Only move down on mobile
          opacity: showHero ? opacity : 0,
        }}
      >
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center -mb-50 md:mb-12">
            <span className="text-[#E8E6F3] text-xl md:text-2xl mb-2">Hi I&apos;m</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#7B4AE3] tracking-tight">
              DARRELL OTOO
            </h1>
          </div>
          {showHero && (
            <div className="w-full" style={{ pointerEvents: "auto" }}>
              <CurvedLoop 
                marqueeText="Engineer ✦ Designer ✦ Creator ✦ Problem Solver ✦ Mentor ✦ Speaker ✦"
                speed={1.5}
                curveAmount={300}
                direction="left"
                interactive={true}
                className="curved-loop-text"
              />
            </div>
          )}
        </div>
      </motion.section>

      {/* Sticky Header: Desktop shows nav, mobile shows only domain */}
      <motion.header
        className="fixed top-0 left-0 w-full bg-[#0F0A1F] bg-opacity-90 backdrop-blur-md z-50 h-16 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop: nav links and domain */}
        <div className="hidden md:flex items-center gap-8 max-w-7xl w-full px-6 justify-center">
          {/* Left Nav Items */}
          <motion.div
            className="flex gap-8"
            variants={navVariants}
            initial="hidden"
            animate={showNav ? "visible" : "hidden"}
          >
            {['about', 'portfolio'].map((section) => (
              <motion.div key={section} variants={leftItemVariants}>
                <NavLink href={`#${section}`}>
                  <span className="text-[#E8E6F3] hover:text-[#7B4AE3] transition-colors duration-300">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
          {/* Centered Brand Name */}
          <motion.div
            className="mx-4 cursor-pointer"
            animate={{
              scale: showNav ? 0.9 : 1,
              transition: { type: "tween", duration: 0.5, ease: "easeInOut" }
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="bg-gradient-to-r from-[#7B4AE3] via-[#9B8ECF] to-[#7B4AE3] bg-clip-text text-transparent font-extrabold text-xl hover:from-[#9B8ECF] hover:via-[#7B4AE3] hover:to-[#9B8ECF] transition-all duration-500 tracking-wide">
              Darrell Otoo
            </span>
          </motion.div>
          {/* Right Nav Items */}
          <motion.div
            className="flex gap-8"
            variants={navVariants}
            initial="hidden"
            animate={showNav ? "visible" : "hidden"}
          >
            {['services', 'contact'].map((section) => (
              <motion.div key={section} variants={rightItemVariants}>
                <NavLink href={`#${section}`}>
                  <span className="text-[#E8E6F3] hover:text-[#7B4AE3] transition-colors duration-300">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Mobile: only brand name centered */}
        {/* --- MOBILE HEADER BRAND --- */}
        <div className="md:hidden w-full h-16 flex items-center justify-center relative">
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#7B4AE3] via-[#9B8ECF] to-[#7B4AE3] bg-clip-text text-transparent font-extrabold text-xl bg-transparent border-none outline-none cursor-pointer tracking-wide"
            style={{ width: 'max-content' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Go to top"
          >
            Darrell Otoo
          </button>
        </div>
      </motion.header>

      {/* FAB for mobile only */}
      <div className="md:hidden">
        <motion.div
          className="fixed bottom-6 right-6 z-[100]"
          initial={false}
          animate={{
            scale: fabOpen ? 1.05 : 1,
            boxShadow: fabOpen
              ? "0 8px 32px 0 rgba(123,74,227,0.25)"
              : "0 2px 8px 0 rgba(123,74,227,0.15)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* FAB Button */}
          <button
            aria-label={fabOpen ? "Close menu" : "Open menu"}
            className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#E8E6F3] to-[#9B8ECF] flex items-center justify-center shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B4AE3] ${fabOpen ? "rotate-45" : ""}`}
            onClick={() => setFabOpen((v) => !v)}
            style={{ pointerEvents: "auto" }}
          >
            <Image 
              src="/darrellLogoTransparent.png" 
              alt="Menu" 
              width={48} 
              height={48} 
              priority 
              className="fab-logo-img"
              style={{ 
                display: 'block',
                margin: '0 auto'
              }}
            />
          </button>
          {/* FAB Menu */}
          <AnimatePresence>
            {fabOpen && (
              <motion.div
                key="fab-menu"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute bottom-20 right-0 flex flex-col items-end gap-4"
                style={{ pointerEvents: "auto" }}
              >
                {[
                  { id: "about", label: "About" },
                  { id: "portfolio", label: "Portfolio" },
                  { id: "services", label: "Services" },
                  { id: "contact", label: "Contact" },
                ].map((item, idx) => (
                  // --- FAB MENU ITEM ANIMATION ---
                  <motion.button
                    key={item.id}
                    onClick={() => handleFabNav(item.id)}
                    className="w-40 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#2D1B69] to-[#7B4AE3] text-white font-bold shadow-xl text-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#9B8ECF] hover:from-[#7B4AE3] hover:to-[#2D1B69] transition-all"
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: -((idx + 1) * 60) }}
                    exit={{ opacity: 0, scale: 0, y: 0 }}
                    transition={{ delay: 0.07 * idx, type: "spring", stiffness: 400, damping: 30 }}
                    style={{ pointerEvents: "auto", position: 'absolute', right: 0 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
