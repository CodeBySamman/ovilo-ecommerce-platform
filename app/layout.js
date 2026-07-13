import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Sessionwrapper from "@/Components/Sessionwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ovilo – Everything You Need, All in One Online Store",
  description: "Welcome to Ovilo, your all-in-one online shopping destination. Discover the latest men's and women's fashion, footwear, and stylish accessories. Enjoy premium quality products, exclusive offers, secure checkout, and fast delivery—all in one place.",
       icons: {
    icon: "/favicn.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     
      <body className="min-h-full flex flex-col bg-[#F8F9FA]">
         <Sessionwrapper>
      <Navbar/>
      <main className="flex-1 ">
        {children}

      </main>
      </Sessionwrapper>
        </body>
    </html>
  );
}
