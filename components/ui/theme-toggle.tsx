"use client";

import { Moon, Sun } from "lucide-react"; // or use your own icons
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or return a skeleton/placeholder
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-tertiary hover:text-primary transition-colors duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-tertiary hover:text-primary transition-colors duration-300" />
      )}
    </button>
  );
}
