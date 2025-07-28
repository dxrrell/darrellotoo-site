"use client";
import React from 'react';
import { useIsMobile } from "@/hooks/useIsMobile";
import PortfolioSection from '@/components/PortfolioSection';
import PortfolioSectionDesktop from '@/components/PortfolioSectionDesktop';

export default function PortfolioSectionWrapper() {
  const isMobile = useIsMobile();

  // Automatically switch between mobile and desktop versions
  if (isMobile) {
    return <PortfolioSection />;
  } else {
    return <PortfolioSectionDesktop />;
  }
} 