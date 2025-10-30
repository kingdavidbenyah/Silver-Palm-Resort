import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MenuProvider } from "@/contexts/menu-context";
import { ToastProvider } from "@/components/ui/toast";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import Overlay from "@/components/ui/overlay";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Silver Palm Resort | Luxury Stay & Unforgettable Experience",
    template: "%s | Silver Palm Resort",
  },
  description:
    "Experience tropical luxury at Silver Palm Resort — where comfort, style, and nature blend seamlessly. Explore our suites, dining, spa, and exclusive offers.",
  keywords: [
    "Silver Palm Resort",
    "Luxury Resort",
    "Beach Resort",
    "Tropical Getaway",
    "Hotel Booking",
    "Vacation in Ghana",
    "Resort Accommodation",
  ],
  authors: [{ name: "Silver Palm Resort" }],
  metadataBase: new URL("https://www.silverpalmresort.com"), // your domain
  openGraph: {
    title: "Silver Palm Resort | Luxury Stay & Unforgettable Experience",
    description:
      "Discover Silver Palm Resort — a destination of serenity, fine dining, and coastal charm.",
    url: "https://www.silverpalmresort.com",
    siteName: "Silver Palm Resort",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Place your resort banner image in /public
        width: 1200,
        height: 630,
        alt: "Silver Palm Resort poolside view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Palm Resort | Luxury Stay & Unforgettable Experience",
    description:
      "Discover Silver Palm Resort — a serene tropical escape with luxury suites and world-class hospitality.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased relative min-w-[320px]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <MenuProvider>
              <Navbar />
              {children}
              <Footer />
              <Overlay />
            </MenuProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
