"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Palette,
  Layers,
  Settings,
  ChevronLeft,
  Code,
  Download,
  Eye,
  Save,
  Smartphone,
  Tablet,
  Monitor,
  MoreVertical,
} from "lucide-react";
import { Project } from "@/lib/types";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

interface EditorLayoutProps {
  children: React.ReactNode;
  project: Project;
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export default function EditorLayout({
  children,
  project,
  activePanel,
  setActivePanel,
}: EditorLayoutProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState("desktop");
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const handleSave = () => {
    toast({
      title: "Project saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Project exported",
      description: "Your project has been exported and is ready for download.",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Preview mode",
      description: "You are now viewing your site in preview mode",
    });
    // In a real app, we would show the preview in a new tab or overlay
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Editor header */}
      <header className="bg-card border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mr-2"
          >
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">{project.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="border rounded-md flex mr-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none h-8 w-8",
                viewMode === "mobile" && "bg-accent text-accent-foreground"
              )}
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none h-8 w-8",
                viewMode === "tablet" && "bg-accent text-accent-foreground"
              )}
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none h-8 w-8",
                viewMode === "desktop" && "bg-accent text-accent-foreground"
              )}
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" variant="ghost" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Code className="h-4 w-4 mr-2" />
                View Code
              </DropdownMenuItem>
              <DropdownMenuItem>Publish Site</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main editor area */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={40}
            collapsible
            onCollapse={() => setIsPanelCollapsed(true)}
            onExpand={() => setIsPanelCollapsed(false)}
            className="bg-card"
          >
            <div className="h-full flex flex-col">
              <div className="border-b">
                <nav className="flex">
                  <button
                    className={cn(
                      "flex-1 px-4 py-3 text-sm font-medium text-center transition-colors border-b-2 border-transparent",
                      activePanel === "components" &&
                        "border-primary text-primary"
                    )}
                    onClick={() => setActivePanel("components")}
                  >
                    <Layers className="h-4 w-4 mx-auto mb-1" />
                    Components
                  </button>
                  <button
                    className={cn(
                      "flex-1 px-4 py-3 text-sm font-medium text-center transition-colors border-b-2 border-transparent",
                      activePanel === "styles" && "border-primary text-primary"
                    )}
                    onClick={() => setActivePanel("styles")}
                  >
                    <Palette className="h-4 w-4 mx-auto mb-1" />
                    Styles
                  </button>
                  <button
                    className={cn(
                      "flex-1 px-4 py-3 text-sm font-medium text-center transition-colors border-b-2 border-transparent",
                      activePanel === "settings" &&
                        "border-primary text-primary"
                    )}
                    onClick={() => setActivePanel("settings")}
                  >
                    <Settings className="h-4 w-4 mx-auto mb-1" />
                    Settings
                  </button>
                </nav>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {isPanelCollapsed ? (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    Panel collapsed
                  </div>
                ) : (
                  <div className="h-full">
                    {/* Panel content will be injected here from child components */}
                    {activePanel === "components" && children[0]}
                    {activePanel === "styles" && children[1]}
                    {activePanel === "settings" && children[2]}
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80} minSize={30}>
            <div className="h-full flex items-center justify-center bg-muted/20 relative overflow-auto">
              <div
                className={cn(
                  "bg-background transition-all duration-200 h-full",
                  viewMode === "mobile" && "w-[375px] h-[667px] shadow-lg m-auto",
                  viewMode === "tablet" && "w-[768px] h-[1024px] shadow-lg m-auto",
                  viewMode === "desktop" && "w-full h-full"
                )}
              >
                {/* Canvas content will be injected here */}
                {children[3]}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}