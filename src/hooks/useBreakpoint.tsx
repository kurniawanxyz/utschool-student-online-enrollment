import { useEffect, useState } from "react";

// Define your Tailwind CSS breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<"sm" | "md" | "lg" | "xl">("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < breakpoints.sm) {
        setBreakpoint("sm");
      } else if (width < breakpoints.md) {
        setBreakpoint("md");
      } else if (width < breakpoints.lg) {
        setBreakpoint("lg");
      } else {
        setBreakpoint("xl"); // For extra large screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial value
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
