import ClientProvider from "../components/ClientProvider";
import { Nanum_Gothic } from "@next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "3D Assets",
  description: "3D Assets Trading Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nanumGothic.className} antialiased`}
        style={{
          "--background-color-primary":
            process.env.NEXT_PUBLIC_BACKGROUND_COLOR_PRIMARY,
          "--background-color-secondary":
            process.env.NEXT_PUBLIC_BACKGROUND_COLOR_SECONDARY,
          "--background-color-tertiary":
            process.env.NEXT_PUBLIC_BACKGROUND_COLOR_TERTIARY,
          "--text-color-primary": process.env.NEXT_PUBLIC_TEXT_COLOR_PRIMARY,
          "--text-color-secondary":
            process.env.NEXT_PUBLIC_TEXT_COLOR_SECONDARY,
          "--accent-color-primary":
            process.env.NEXT_PUBLIC_ACCENT_COLOR_PRIMARY,
        }}
      >
        <ClientProvider>
          <Header />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
