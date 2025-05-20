import { Project, Template, Component, StyleVariable } from "./types";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "E-commerce Website",
    description: "A fully featured online store with product listings and checkout",
    lastModified: "2025-04-01T10:00:00.000Z",
    framework: "next",
    previewUrl: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "project-2",
    name: "Portfolio Site",
    description: "Showcase of creative work with project details",
    lastModified: "2025-03-28T14:30:00.000Z",
    framework: "react",
    previewUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "project-3",
    name: "Blog Platform",
    description: "Content management system with article editing",
    lastModified: "2025-03-25T09:15:00.000Z",
    framework: "next",
    previewUrl: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const SAMPLE_TEMPLATES: Template[] = [
  {
    id: "template-1",
    name: "Business Website",
    description: "Professional site for companies with about, services, and contact sections",
    framework: "next",
    category: "business",
    previewUrl: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "template-2",
    name: "Creative Portfolio",
    description: "Showcase your projects with this minimalist design",
    framework: "react",
    category: "portfolio",
    previewUrl: "https://images.pexels.com/photos/5696555/pexels-photo-5696555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "template-3",
    name: "E-commerce Store",
    description: "Full-featured online store with product listings and cart",
    framework: "next",
    category: "ecommerce",
    previewUrl: "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "template-4",
    name: "Blog Platform",
    description: "Content-focused design for writers and publishers",
    framework: "astro",
    category: "blog",
    previewUrl: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "template-5",
    name: "Landing Page",
    description: "High-conversion single page design with call-to-action sections",
    framework: "vite",
    category: "marketing",
    previewUrl: "https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "template-6",
    name: "Documentation Site",
    description: "Technical documentation template with search and navigation",
    framework: "next",
    category: "documentation",
    previewUrl: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const SAMPLE_COMPONENTS: Component[] = [
  {
    id: "component-1",
    name: "Hero Section",
    description: "Full-width banner with heading, text and call-to-action",
    category: "sections",
    html: `<section class="hero">
  <div class="hero-content">
    <h1>Welcome to Our Site</h1>
    <p>The best solution for your needs</p>
    <button class="cta-button">Get Started</button>
  </div>
</section>`,
    scss: `.hero {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  
  &-content {
    text-align: center;
    padding: 2rem;
    
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
  }
  
  .cta-button {
    padding: 0.8rem 2rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #2980b9;
    }
  }
}`,
    preview: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "component-2",
    name: "Feature Card",
    description: "Card component for highlighting features or services",
    category: "cards",
    html: `<div class="feature-card">
  <div class="icon">
    <i class="fa fa-star"></i>
  </div>
  <h3>Feature Title</h3>
  <p>Description of this amazing feature and why users will love it.</p>
</div>`,
    scss: `.feature-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
}`,
    preview: "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const SAMPLE_STYLE_VARIABLES: StyleVariable[] = [
  {
    id: "var-1",
    name: "--primary-color",
    value: "#3498db",
    category: "colors",
  },
  {
    id: "var-2",
    name: "--secondary-color",
    value: "#2ecc71",
    category: "colors",
  },
  {
    id: "var-3",
    name: "--text-color",
    value: "#333333",
    category: "colors",
  },
  {
    id: "var-4",
    name: "--heading-font",
    value: "'Montserrat', sans-serif",
    category: "typography",
  },
  {
    id: "var-5",
    name: "--body-font",
    value: "'Open Sans', sans-serif",
    category: "typography",
  },
  {
    id: "var-6",
    name: "--border-radius",
    value: "8px",
    category: "layout",
  },
  {
    id: "var-7",
    name: "--spacing-unit",
    value: "8px",
    category: "layout",
  },
];