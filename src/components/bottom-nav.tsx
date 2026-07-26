import { Link } from "@tanstack/react-router";
import { Home, MapPinSearch, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/discover", label: "Odkrywaj", icon: MapPinSearch },
  { to: "/profile", label: "Profil", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="text-muted-foreground flex flex-1 flex-col items-center gap-1 px-4 py-1 text-xs"
            activeProps={{
              className: "text-primary",
            }}
            activeOptions={{ exact: to === "/" }}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
