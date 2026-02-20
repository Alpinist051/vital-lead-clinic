import { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Zap,
  Settings,
  Menu,
  X,
  Phone,
  Home,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "לוח בקרה" },
  { to: "/leads", icon: Users, label: "לידים" },
  { to: "/automations", icon: Zap, label: "אוטומציות" },
  { to: "/settings", icon: Settings, label: "הגדרות" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background" dir="rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 bg-card border-l border-border transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold text-foreground truncate">מערכת ניהול לידים</h1>
              <p className="text-[11px] text-muted-foreground">ניהול לקוחות חכם</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 p-3">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-muted transition-all mb-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Home className="h-4 w-4" />
              דף הבית
            </Link>
            <div className="h-px bg-border my-2" />
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className={cn("h-[18px] w-[18px]", isActive && "text-primary")} />
                  {item.label}
                  {item.to === "/leads" && (
                    <span className="mr-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
                      6
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* WhatsApp status */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-3 rounded-xl bg-muted/80 p-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-whatsapp/10">
                <MessageSquare className="h-4 w-4 text-whatsapp" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">וואטסאפ</p>
                <p className="text-[11px] text-muted-foreground">ממתין לחיבור</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-warning animate-pulse-soft" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-border bg-card/80 backdrop-blur-md px-4 py-3 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground lg:hidden">מערכת ניהול לידים</h2>
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:bg-muted transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-destructive border-2 border-card" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-primary-foreground">מ</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">מנהל</p>
              <p className="text-[11px] text-muted-foreground leading-tight">מרפאת שיניים</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
