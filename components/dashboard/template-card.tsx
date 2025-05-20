import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Template } from "@/lib/types";

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <Image
          src={template.previewUrl}
          alt={template.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm" onClick={onSelect}>
            Use Template
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{template.name}</h3>
            <Badge variant="outline" className="capitalize">
              {template.framework}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {template.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onSelect}>
            Select
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}