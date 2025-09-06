import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ERP Saboo Plan - Complete Cosmetic Manufacturing Platform",
  description: "B2C + B2B, GMP 22716, ISO 9001, R&D, Supplier Management, Reverse Logistics - Complete ERP system for integrated management of all business processes",
  keywords: "ERP, Cosmetic, Manufacturing, GMP, ISO 9001, R&D, Supplier Management, Reverse Logistics",
  authors: [{ name: "ERP Saboo Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
