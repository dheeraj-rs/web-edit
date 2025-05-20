export interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  framework: string;
  previewUrl: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  framework: string;
  previewUrl: string;
  category: string;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  html: string;
  scss: string;
  preview: string;
}

export interface StyleVariable {
  id: string;
  name: string;
  value: string;
  category: string;
}