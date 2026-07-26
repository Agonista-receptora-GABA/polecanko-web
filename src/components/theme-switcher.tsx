import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/features/preferences/preferences-context";
import type { Theme } from "@/features/preferences/types";

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Jasny", icon: Sun },
  { value: "dark", label: "Ciemny", icon: Moon },
  { value: "system", label: "Systemowy", icon: Monitor },
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
