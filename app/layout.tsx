import { Metadata } from "next";
import "@/css/global.css";

export const metadata: Metadata = {
  title: "Home",
  description: "E-comerce website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
