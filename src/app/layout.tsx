import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./(core)/_components/header";
import { Footer } from "./(core)/_components/footer";
import { Container } from "@/components/common/containter";
import { BodyWrapper } from "@/components/common/body-wrapper";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <BodyWrapper
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          <Suspense fallback={<div>Cargando...</div>}>
            <Header />
          </Suspense>

          <Container className="grow">{children}</Container>
          <Footer />
          <Toaster />
        </>
      </BodyWrapper>
    </html>
  );
}
