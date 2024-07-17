import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Amplify } from 'aws-amplify';


import awsExports from '../amplify_outputs.json';
Amplify.configure(awsExports);


const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
