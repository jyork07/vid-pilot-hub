import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/training", label: "Training" },
  { to: "/sessions", label: "Sessions" },
  { to: "/dashboard", label: "Tracker" },
  { to: "/settings", label: "Settings" },
] as const;

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur print-hide">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Smarter Appliances" width={180} height={40} className="h-9 w-auto" />
        </Link>
        <span className="hidden text-sm text-muted-foreground sm:inline">Training &amp; Safety School</span>
        <nav className="ml-auto flex flex-wrap items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
