import { SAMPLE_PROJECTS } from "@/lib/sample-data";

export async function generateStaticParams() {
  return SAMPLE_PROJECTS.map((project) => ({
    projectId: project.id
  }));
} 