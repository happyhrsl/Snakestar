import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snakestar — Global Yearly Championship",
  description: "Compete in the ultimate snake battle championship. 195 countries. One champion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
