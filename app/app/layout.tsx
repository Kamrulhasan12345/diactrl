import "./globals.css";
import AuthWrapper from "./AuthWrapper";
import { Plus_Jakarta_Sans } from "@next/font/google";

const pjaksans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-pjaksans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${pjaksans.variable} font-sans`}>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
