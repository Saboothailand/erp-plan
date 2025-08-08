import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ERP Saboo Plan - 화장품 제조업 통합 플랫폼",
  description: "B2C + B2B, GMP 22716, ISO 9001, R&D, 공급업체 관리, 역물류까지 모든 비즈니스 프로세스를 통합 관리하는 완전한 ERP 시스템",
  keywords: "ERP, 화장품, 제조업, GMP, ISO 9001, R&D, 공급업체 관리, 역물류",
  authors: [{ name: "ERP Saboo Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
