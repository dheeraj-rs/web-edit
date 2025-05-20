"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard,
  Settings,
  FolderKanban,
  PieChart,
  LogOut,
  Menu,
  X,
  Palette,
  Box
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      title: "Components",
      href: "/components",
      icon: <Box className="h-5 w-5" />,
    },
    {
      title: "Templates",
      href: "/templates",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-50">
        <div className="flex flex-col h-full px-3 py-4 bg-card border-r">
          <div className="px-3 py-2">
            <h2 className="text-2xl font-bold">WebCraft Pro</h2>
            <p className="text-xs text-muted-foreground">Website Builder</p>
          </div>
          <div className="mt-8 flex-1">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="px-3 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">U</span>
                </div>
                <div>
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <Button variant="outline" className="w-full mt-4">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">WebCraft Pro</h2>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-card shadow-lg p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileNavOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-4 border-t">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">U</span>
                </div>
                <div>
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:pl-64 pt-0 md:pt-0 pb-10 overflow-auto">
        <div className="h-14 md:h-0" /> {/* Spacer for mobile header */}
        {children}
      </main>
    </div>
  );
}