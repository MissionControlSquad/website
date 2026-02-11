import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  title: "Thank You for Your Payment",
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
