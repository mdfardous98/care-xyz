import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Primary Bengali Font
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Care.xyz | Professional Home Care Services",
    template: "%s | Care.xyz",
  },
  description:
    "Vetted, compassionate, and professional caregiving services for elderly, infants, and post-operative recovery in Dhaka.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${hindSiliguri.variable} 
          antialiased 
          bg-[#fdfcfb] 
          selection:bg-rose-100 selection:text-rose-900
        `}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
