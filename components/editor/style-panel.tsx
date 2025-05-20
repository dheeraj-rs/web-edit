"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SAMPLE_STYLE_VARIABLES } from "@/lib/sample-data";
import { Paintbrush, Code, Sliders } from "lucide-react";

interface StylePanelProps {
  scss: string;
  updateScss: (scss: string) => void;
}

export default function StylePanel({ scss, updateScss }: StylePanelProps) {
  const [variables, setVariables] = useState(SAMPLE_STYLE_VARIABLES);
  const [scssCode, setScssCode] = useState(scss);
  
  const updateVariable = (id: string, value: string) => {
    const updatedVariables = variables.map(variable => 
      variable.id === id ? { ...variable, value } : variable
    );
    setVariables(updatedVariables);
    
    // In a real app, we would update the SCSS with the new variable values
    // This is a simplified version
  };
  
  const handleScssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScssCode(e.target.value);
  };
  
  const applyScssChanges = () => {
    updateScss(scssCode);
  };
  
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="variables" className="flex-1">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="variables" className="flex-1">
            <Paintbrush className="h-4 w-4 mr-2" />
            Variables
          </TabsTrigger>
          <TabsTrigger value="code" className="flex-1">
            <Code className="h-4 w-4 mr-2" />
            SCSS
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Sliders className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="variables" className="h-full">
          <ScrollArea className="h-[calc(100vh-260px)]">
            <div className="space-y-6">
              {['colors', 'typography', 'layout'].map((category) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-semibold capitalize">{category}</h3>
                  {variables
                    .filter((variable) => variable.category === category)
                    .map((variable) => (
                      <div key={variable.id} className="grid grid-cols-3 gap-4 items-center">
                        <Label htmlFor={variable.id} className="text-xs truncate">
                          {variable.name}
                        </Label>
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            {category === 'colors' && (
                              <div 
                                className="w-5 h-5 rounded-full border"
                                style={{ backgroundColor: variable.value }}
                              />
                            )}
                            <Input
                              id={variable.id}
                              value={variable.value}
                              onChange={(e) => updateVariable(variable.id, e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="code" className="h-full">
          <div className="flex flex-col h-full">
            <div className="flex-1 relative">
              <textarea
                value={scssCode}
                onChange={handleScssChange}
                className="w-full h-full p-3 font-mono text-sm bg-muted/50 rounded-md border resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={applyScssChanges}>
                Apply Changes
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="h-full">
          <ScrollArea className="h-[calc(100vh-260px)]">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Compiler Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="output-style">Output Style</Label>
                    <select 
                      id="output-style" 
                      className="h-8 rounded-md border border-input px-3 py-1 text-sm"
                    >
                      <option value="expanded">Expanded</option>
                      <option value="compressed">Compressed</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="source-map">Source Maps</Label>
                    <input 
                      type="checkbox" 
                      id="source-map"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="precision">Precision</Label>
                    <Input 
                      id="precision" 
                      type="number" 
                      defaultValue={5}
                      className="h-8 w-20 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Import Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="import-paths">Import Paths</Label>
                  <Input 
                    id="import-paths" 
                    placeholder="e.g., ./styles, ./components" 
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}