import type { Metadata } from "next";
import "./globals.css";
  import { cn } from "@/lib/utils"
  import { Zilla_Slab } from "next/font/google";
 const pixel = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-sans",
  weight:['300','400','500']
})
export const metadata: Metadata = {
  title: "Random Letters",
  description: "Minigame de tempo e velocidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  antialiased",
          pixel.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
