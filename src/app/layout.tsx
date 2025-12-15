import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prompt Library',
  description: 'A curated collection of AI prompts for coding, writing, analysis, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="gradient-mesh" />
        {children}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
