"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Switch />;

  return (
    <Switch
      isSelected={theme === "light" ? true : true}
      onValueChange={(e) => setTheme(e ? "light" : "light")}
    />
  );
}
