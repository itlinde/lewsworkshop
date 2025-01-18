import "./globals.css";

export const metadata = {
  title: "Lewswork.shop",
  description: "Lewswork.shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
