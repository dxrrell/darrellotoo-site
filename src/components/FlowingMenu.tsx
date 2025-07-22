"use client";
import React from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  type: string;
}

interface FlowingMenuProps {
  items: MenuItemProps[];
  onItemClick?: (type: string) => void;
}

function FlowingMenu({ items = [], onItemClick }: FlowingMenuProps) {
  const isMobile = useIsMobile();

  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} onItemClick={onItemClick} isMobile={isMobile} />
        ))}
      </nav>
    </div>
  );
}

interface MenuItemComponentProps extends MenuItemProps {
  onItemClick?: (type: string) => void;
  isMobile?: boolean;
}

function MenuItem({ link, text, image, type, onItemClick, isMobile = false }: MenuItemComponentProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const rippleRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev: React.MouseEvent) => {
    if (isMobile) return; // Skip desktop effects on mobile
    
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (isMobile) return; // Skip desktop effects on mobile
    
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    if (type === 'form') {
      e.preventDefault();
      onItemClick?.(type);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || !rippleRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Create ripple effect
    gsap.set(rippleRef.current, {
      x: x - 25,
      y: y - 25,
      scale: 0,
      opacity: 1
    });
    
    gsap.to(rippleRef.current, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const repeatedMarqueeContent = Array.from({ length: 12 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div
        className="marquee__img"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  // Mobile-friendly menu item
  if (isMobile) {
    return (
      <div className="menu__item" ref={itemRef}>
        <a
          className="menu__item-link"
          href={link}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
          target={type === 'social' || type === 'calendar' ? '_blank' : undefined}
          rel={type === 'social' || type === 'calendar' ? 'noopener noreferrer' : undefined}
          style={{ fontSize: '2.5vh' }} // Smaller font for mobile
          tabIndex={0}
          role="link"
          aria-label={`${text} - ${type}`}
        >
          {text}
          {/* Ripple effect for mobile */}
          <div
            ref={rippleRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(123, 74, 227, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              opacity: 0
            }}
          />
        </a>
        {/* Mobile-friendly background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1443]/0 to-[#7B4AE3]/10 opacity-0 transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  }

  // Desktop version with marquee effect
  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        target={type === 'social' || type === 'calendar' ? '_blank' : undefined}
        rel={type === 'social' || type === 'calendar' ? 'noopener noreferrer' : undefined}
        tabIndex={0}
        role="link"
        aria-label={`${text} - ${type}`}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu; 