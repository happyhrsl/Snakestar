"use client";

import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function NotSignedIn({ featureName }: { featureName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
        {APP_NAME}
      </p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Sign in to access <span className="text-foreground font-medium">{featureName}</span>
      </p>
      <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
        <LogIn className="h-4 w-4" /> Sign In
      </Button>
    </div>
  );
}
