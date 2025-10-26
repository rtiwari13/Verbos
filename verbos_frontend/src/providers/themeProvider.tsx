"use client";
import Navbar from "@/components/nav/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { useAppSelector } from "@/redux/storeHooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useAppSelector((state) => state.theme.ColorTheme);
  const formattedTheme =
    theme === "System" ? "dark" : theme === "Dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable}  antialiased ${formattedTheme}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
