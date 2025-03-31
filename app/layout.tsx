import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import {ThemeProvider} from "@/components/ui/theme-provider";

const workSans = localFont({
    src: [
        {
            path: "./fonts/WorkSans-Black.ttf",
            weight: "900",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-Thin.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "./fonts/WorkSans-ExtraLight.ttf",
            weight: "100",
            style: "normal",
        },
    ],
    variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Job Board",
  description: "An Job Application Tracker",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
      >
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
