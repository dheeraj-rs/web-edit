import { SAMPLE_PROJECTS } from "@/lib/sample-data";
import EditorClient from "./editor-client";

export async function generateStaticParams() {
  return SAMPLE_PROJECTS.map((project) => ({
    projectId: project.id
  }));
}

export default function EditorPage({ params }: { params: { projectId: string } }) {
  const project = SAMPLE_PROJECTS.find(p => p.id === params.projectId);
  
  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-red-500">Project not found</div>
      </div>
    );
  }

  return <EditorClient project={project} />;
}