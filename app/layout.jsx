import "@/app/globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "8coolguy | Arnav Choudhury",
    template: "%s | 8coolguy",
  },
  description:
    "Arnav Choudhury's projects in full-stack development, graphics, machine learning, embedded systems, and games.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "8coolguy",
    title: "8coolguy | Arnav Choudhury",
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
