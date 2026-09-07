import "@/app/globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arnav C.",
    template: "%s | Arnav C.",
  },
  description:
    "Arnav C.'s projects in full-stack development, graphics, machine learning, embedded systems, and games.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Arnav C.",
    title: "Arnav C.",
    description:
      "Projects in full-stack development, graphics, machine learning, embedded systems, and games.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
