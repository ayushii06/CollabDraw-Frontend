'use client'
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import AppProviders from "./context/AppProvider";
import ToasterDemo from "./components/alerts/Toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AppProviders>
            <ToasterDemo/>
          {children}
          </AppProviders>
      </body>
    </html>
  );
}
