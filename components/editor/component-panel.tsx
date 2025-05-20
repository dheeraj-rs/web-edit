"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SAMPLE_COMPONENTS } from "@/lib/sample-data";

interface ComponentPanelProps {
  onComponentSelect: (html: string, scss: string) => void;
}

export default function ComponentPanel({ onComponentSelect }: ComponentPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredComponents = SAMPLE_COMPONENTS.filter(component => 
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const categories = [...new Set(SAMPLE_COMPONENTS.map(component => component.category))];
  
  return (
    <div className="h-full flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="flex-1">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex-1 capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="h-full">
          <ScrollArea className="h-[calc(100vh-260px)]">
            <div className="grid grid-cols-1 gap-4">
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onSelect={() => onComponentSelect(component.html, component.scss)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="h-full">
            <ScrollArea className="h-[calc(100vh-260px)]">
              <div className="grid grid-cols-1 gap-4">
                {filteredComponents
                  .filter((component) => component.category === category)
                  .map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onSelect={() => onComponentSelect(component.html, component.scss)}
                    />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface ComponentCardProps {
  component: {
    id: string;
    name: string;
    description: string;
    preview: string;
  };
  onSelect: () => void;
}

function ComponentCard({ component, onSelect }: ComponentCardProps) {
  return (
    <div 
      className="border rounded-md overflow-hidden cursor-pointer transition-all hover:border-primary"
      onClick={onSelect}
    >
      <div className="aspect-video bg-muted relative">
        <img
          src={component.preview}
          alt={component.name}
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-medium">Click to add</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium">{component.name}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {component.description}
        </p>
      </div>
    </div>
  );
}