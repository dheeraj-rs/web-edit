"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import ProjectCard from "@/components/dashboard/project-card";
import TemplateCard from "@/components/dashboard/template-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Layout, Code } from "lucide-react";
import { SAMPLE_PROJECTS, SAMPLE_TEMPLATES } from "@/lib/sample-data";

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);

  const createNewProject = () => {
    const newProject = {
      id: `project-${projects.length + 1}`,
      name: `New Project ${projects.length + 1}`,
      description: "A brand new website project",
      lastModified: new Date().toISOString(),
      framework: "next",
      previewUrl: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };
    
    setProjects([...projects, newProject]);
    router.push(`/editor/${newProject.id}`);
  };

  const startFromTemplate = (templateId: string) => {
    const template = SAMPLE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    const newProject = {
      id: `project-${projects.length + 1}`,
      name: `${template.name} Project`,
      description: `Project based on ${template.name} template`,
      lastModified: new Date().toISOString(),
      framework: template.framework,
      previewUrl: template.previewUrl,
    };
    
    setProjects([...projects, newProject]);
    router.push(`/editor/${newProject.id}`);
  };

  return (
    <DashboardLayout>
      <div className="px-6 py-6 md:px-10 md:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and create your website projects
            </p>
          </div>
          <Button onClick={createNewProject} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">
              <Layout className="h-4 w-4 mr-2" />
              My Projects
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Code className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No projects found</p>
                <Button onClick={createNewProject}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create your first project
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => startFromTemplate(template.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}