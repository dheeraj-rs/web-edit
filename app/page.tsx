"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  // Redirect to dashboard
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="animate-pulse">Loading WebCraft Pro...</div>
    </div>
  );
}