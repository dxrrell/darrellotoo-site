"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


import NavLink from "@/components/NavLink";
import RotatingText from './RotatingText';



export default function UnifiedHeader() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
        type: "tween",
        duration: 0.5,
        ease: "easeInOut"
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
          y: yPosition,
          opacity: showHero ? opacity : 0,
        }}
      >
        <span className="text-[#E8E6F3] text-xl md:text-2xl mb-2">Hi I&apos;m</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-[#7B4AE3] tracking-tight">
          DARRELL OTOO
        </h1>
        {showHero && (
          <span className="text-[#E8E6F3] text-xl md:text-2xl flex items-center justify-center gap-2">
            I am{" "}
            <RotatingText
              texts={['a Developer', 'a Designer', 'a Creator', 'a Problem Solver']}
              mainClassName="text-[#7B4AE3] font-bold inline-block"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        )}
      </motion.section>

      {/* Sticky Header */}
      <motion.header
        className="fixed top-0 left-0 w-full bg-[#0F0A1F] bg-opacity-90 backdrop-blur-md z-50 h-16 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="flex items-center gap-8 max-w-7xl w-full px-6 justify-center">
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
          {/* Centered Domain */}
          <motion.div
            className="mx-4 cursor-pointer"
            animate={{
              scale: showNav ? 0.9 : 1,
              transition: { type: "tween", duration: 0.5, ease: "easeInOut" }
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-[#7B4AE3] font-extrabold text-xl hover:text-[#9B8ECF] transition-colors duration-300">
              darrellotoo.com
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
        </motion.div>
      </motion.header>
    </>
  );
}
