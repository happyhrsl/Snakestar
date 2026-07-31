"use client";

import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-900/60 bg-slate-950/40 py-4 mt-auto text-center">
      <p className="text-xs text-muted-foreground">
        © 2025 {APP_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
