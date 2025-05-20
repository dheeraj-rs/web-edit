 "use client";

import { useState } from "react";
import EditorLayout from "@/components/editor/editor-layout";
import ComponentPanel from "@/components/editor/component-panel";
import StylePanel from "@/components/editor/style-panel";
import Canvas from "@/components/editor/canvas";
import SettingsPanel from "@/components/editor/settings-panel";
import { Project } from "@/lib/types";

interface EditorClientProps {
  project: Project;
}

export default function EditorClient({ project }: EditorClientProps) {
  const [activePanel, setActivePanel] = useState("components");
  const [editorHtml, setEditorHtml] = useState(`
    <header class="site-header">
      <div class="container">
        <h1 class="site-title">${project.name}</h1>
        <nav class="site-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main>
      <section class="hero">
        <div class="container">
          <h2>Welcome to ${project.name}</h2>
          <p>${project.description}</p>
          <button class="cta-button">Learn More</button>
        </div>
      </section>
      <section class="content">
        <div class="container">
          <div class="feature-grid">
            <div class="feature">
              <h3>Feature 1</h3>
              <p>Description of this amazing feature</p>
            </div>
            <div class="feature">
              <h3>Feature 2</h3>
              <p>Description of this amazing feature</p>
            </div>
            <div class="feature">
              <h3>Feature 3</h3>
              <p>Description of this amazing feature</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div class="container">
        <p>&copy; 2025 ${project.name}. All rights reserved.</p>
      </div>
    </footer>
  `);
  const [editorScss, setEditorScss] = useState(`
    // Variables
    $primary-color: #3498db;
    $secondary-color: #2ecc71;
    $text-color: #333;
    $background-color: #f5f5f5;
    
    // Global styles
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Open Sans', sans-serif;
      color: $text-color;
      line-height: 1.6;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    // Header
    .site-header {
      background-color: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      padding: 1rem 0;
      
      .site-title {
        font-size: 1.8rem;
        color: $primary-color;
      }
      
      .site-nav {
        ul {
          display: flex;
          list-style: none;
          
          li {
            margin-left: 1.5rem;
            
            a {
              text-decoration: none;
              color: $text-color;
              font-weight: 500;
              transition: color 0.3s;
              
              &:hover {
                color: $primary-color;
              }
            }
          }
        }
      }
      
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    
    // Hero section
    .hero {
      background-color: $background-color;
      padding: 4rem 0;
      text-align: center;
      
      h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      p {
        font-size: 1.2rem;
        max-width: 600px;
        margin: 0 auto 2rem;
      }
      
      .cta-button {
        background-color: $primary-color;
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        
        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }
    }
    
    // Content section
    .content {
      padding: 4rem 0;
      
      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .feature {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        text-align: center;
        
        h3 {
          color: $primary-color;
          margin-bottom: 1rem;
        }
      }
    }
    
    // Footer
    .site-footer {
      background-color: #333;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }
    
    // Responsive
    @media (max-width: 768px) {
      .site-header {
        .container {
          flex-direction: column;
          text-align: center;
        }
        
        .site-nav {
          margin-top: 1rem;
          
          ul {
            justify-content: center;
            
            li {
              margin: 0 0.75rem;
            }
          }
        }
      }
      
      .hero {
        h2 {
          font-size: 2rem;
        }
      }
    }
  `);

  const updateHtml = (newHtml: string) => {
    setEditorHtml(newHtml);
  };

  const updateScss = (newScss: string) => {
    setEditorScss(newScss);
  };

  return (
    <EditorLayout 
      project={project} 
      activePanel={activePanel}
      setActivePanel={setActivePanel}
    >
      {activePanel === "components" && (
        <ComponentPanel onComponentSelect={(html, scss) => {
          setEditorHtml(prevHtml => prevHtml + html);
          setEditorScss(prevScss => prevScss + scss);
        }} />
      )}
      
      {activePanel === "styles" && (
        <StylePanel 
          scss={editorScss} 
          updateScss={updateScss} 
        />
      )}
      
      {activePanel === "settings" && (
        <SettingsPanel project={project} />
      )}
      
      <Canvas 
        html={editorHtml} 
        scss={editorScss} 
        updateHtml={updateHtml}
      />
    </EditorLayout>
  );
}