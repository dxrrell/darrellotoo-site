"use client";
import React from 'react';
import { useIsMobile } from "@/hooks/useIsMobile";
import AboutSection from './AboutSection';
import AboutSectionDesktop from './AboutSectionDesktop';

export default function AboutSectionWrapper() {
  const isMobile = useIsMobile();

  // Automatically switch between mobile and desktop versions
  if (isMobile) {
    return <AboutSection />;
  } else {
    return <AboutSectionDesktop />;
  }
} 