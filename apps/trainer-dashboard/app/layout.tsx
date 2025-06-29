import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NV Coaching - Trainer Dashboard",
  description: "Professionelle Fitness-Coaching Platform von Nikk Viererbl",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
