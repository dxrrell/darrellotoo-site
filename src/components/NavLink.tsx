import React, { useState } from "react";
import ShinyText from "./ShinyText";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  };

  return (
    <a 
      href={href} 
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B4AE3]"
    >
      <ShinyText 
        text={children as string} 
        disabled={!isHovered}
        speed={2}
        className="transition-all duration-300"
      />
    </a>
  );
}
