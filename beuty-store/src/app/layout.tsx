import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider"; // Убедитесь, что используете ClientProvider
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Aki Cosmetics",
  description: "Cosmetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
              <img src="/img/loading.gif" alt="Loading" className="w-20 h-20" />
            </div>
          }
        >
          <ClientProvider>{children}</ClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
