"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/lib/types";

interface SettingsPanelProps {
  project: Project;
}

export default function SettingsPanel({ project }: SettingsPanelProps) {
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const [selectedFramework, setSelectedFramework] = useState(project.framework);
  
  const handleSaveSettings = () => {
    // In a real app, we would save the settings to an API
    console.log("Saving settings:", {
      projectName,
      projectDescription,
      selectedFramework,
    });
  };
  
  return (
    <div className="h-full">
      <ScrollArea className="h-[calc(100vh-260px)]">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Project Settings</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select 
                  value={selectedFramework} 
                  onValueChange={setSelectedFramework}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="vite">Vite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Export Settings</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="export-format">Export Format</Label>
                <Select defaultValue="zip">
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zip">ZIP Archive</SelectItem>
                    <SelectItem value="github">GitHub Repository</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="include-assets">Include Assets</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="include-assets">
                    <SelectValue placeholder="Select assets to include" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="optimized">Optimized Only</SelectItem>
                    <SelectItem value="none">None (References Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Advanced Settings</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="custom-domains">Custom Domains</Label>
                <Input
                  id="custom-domains"
                  placeholder="e.g., example.com, site.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="performance">Performance Mode</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger id="performance">
                    <SelectValue placeholder="Select performance mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max">Maximum Performance</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="quality">Maximum Quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <div className="mt-6">
        <Button className="w-full" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}