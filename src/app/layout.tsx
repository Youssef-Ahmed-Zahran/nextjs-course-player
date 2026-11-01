import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/client/components/header/Navbar";

export const metadata: Metadata = {
  title: "EduFlow - Online Courses Platform & Player",
  description: "Modern e-learning courses player platform with interactive assessments and real-time notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#f8fafc]">
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
