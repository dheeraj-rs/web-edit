import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, MoreVertical, Trash, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const handleEdit = () => {
    router.push(`/editor/${project.id}`);
  };
  
  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // In a real app, we would call an API to delete the project
    setShowDeleteDialog(false);
    // Then possibly refresh the projects list or show a toast notification
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <Image
            src={project.previewUrl}
            alt={project.name}
            className="object-cover"
            fill
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold truncate">{project.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {project.description}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="capitalize">{project.framework}</span>
            </div>
            <div>
              Updated {formatDistanceToNow(new Date(project.lastModified), { addSuffix: true })}
            </div>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your project
              and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}