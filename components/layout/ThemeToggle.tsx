"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && systemDark);
  root.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  function cycle() {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  if (!mounted) return <div className="h-9 w-9" aria-hidden />;

  const label = theme === "light" ? "Light mode" : theme === "dark" ? "Dark mode" : "System theme";
  const icon = theme === "light" ? "☀" : theme === "dark" ? "●" : "◐";

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-card-border text-sm hover:bg-teal/10 transition-colors"
    >
      <span aria-hidden>{icon}</span>
    </button>
  );
}
