import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marées La Rochelle - Horaires et Coefficients",
  description: "Consultez les horaires des marées et coefficients pour La Rochelle, France. Interface moderne pour visualiser les marées hautes et basses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
