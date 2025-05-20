"use client";

import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface CanvasProps {
  html: string;
  scss: string;
  updateHtml: (html: string) => void;
}

export default function Canvas({ html, scss, updateHtml }: CanvasProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [compiledCss, setCompiledCss] = useState("");
  
  // In a real app, we would compile SCSS server-side or use a WASM-based compiler
  // For this demo, we'll just use the SCSS directly as CSS
  useEffect(() => {
    // Convert SCSS variables to CSS variables as a simple demonstration
    // This is not a real SCSS compiler
    let css = scss
      .replace(/\$([a-zA-Z0-9_-]+):\s*([^;]+);/g, '--$1: $2;')
      .replace(/\$([a-zA-Z0-9_-]+)/g, 'var(--$1)');
      
    setCompiledCss(css);
  }, [scss]);
  
  // Update iframe content when HTML or CSS changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;
    
    // Write the HTML content
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${compiledCss}
          </style>
        </head>
        <body>
          ${html}
          <script>
            document.addEventListener('click', function(e) {
              e.preventDefault();
              window.parent.postMessage({
                type: 'element-selected',
                tagName: e.target.tagName,
                innerHTML: e.target.innerHTML,
                outerHTML: e.target.outerHTML,
                path: getElementPath(e.target)
              }, '*');
            });
            
            function getElementPath(el) {
              if (!el) return '';
              if (el.id) return '#' + el.id;
              let path = el.tagName.toLowerCase();
              if (el.className) {
                const classes = el.className.split(' ').filter(c => c);
                if (classes.length > 0) {
                  path += '.' + classes.join('.');
                }
              }
              return getElementPath(el.parentElement) + ' > ' + path;
            }
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
    
    // Add message listener to receive element selection events from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'element-selected') {
        console.log('Element selected:', event.data);
        // In a real app, we would set the selected element and show its properties
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [html, compiledCss]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full border-0"
            title="Website preview"
          />
        </div>
      </div>
    </DndProvider>
  );
}