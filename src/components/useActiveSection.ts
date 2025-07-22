import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = ["about", "portfolio", "services", "news"];

    function onScroll() {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let current = "about";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollPos >= offsetTop) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return activeSection;
}

