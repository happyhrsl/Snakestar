import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snakestar — Global Snake Battle Championship",
  description: "Hunt. Harvest. Extract. Don't get caught.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
