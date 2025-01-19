import "./globals.css";
import { Inclusive_Sans, Darumadrop_One } from "next/font/google";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
  weight: ['400'],
});

const darumadropOne = Darumadrop_One({
  variable: "--font-darumadrop-one",
  subsets: ["latin"],
  weight: ['400'],
})

export const metadata = {
  title: "Lewswork.shop",
  description: "Lewswork.shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inclusiveSans.variable} ${darumadropOne.variable} antialiased`}>{children}</body>
    </html>
  );
}
