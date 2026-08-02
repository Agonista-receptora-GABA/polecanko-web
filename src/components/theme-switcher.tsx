import {
  type Icon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/features/preferences/preferences-context";
import type { Theme } from "@/features/preferences/types";

const options: { value: Theme; label: string; icon: Icon }[] = [
  { value: "light", label: "Jasny", icon: SunIcon },
  { value: "dark", label: "Ciemny", icon: MoonIcon },
  { value: "system", label: "Systemowy", icon: MonitorIcon },
];

export function ThemeSwitcher() {
  const { preferences, setPreference } = usePreferences();

  return (
    <div className="flex gap-2">
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          type="button"
          variant={preferences.theme === value ? "default" : "outline"}
          size="sm"
          onClick={() => setPreference("theme", value)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
