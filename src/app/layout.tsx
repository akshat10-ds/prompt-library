import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prompt Library',
  description: 'A curated collection of AI prompts for coding, writing, analysis, and more.',
};

// Script to apply font pairing before hydration to prevent flash
const fontPairingScript = `
(function() {
  try {
    var fontPairings = {
      'current': {
        serif: "'Instrument Serif', Georgia, serif",
        sans: "'DM Sans', system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
        import: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&display=swap"
      },
      'dsindigo': {
        serif: "'DS Indigo', system-ui, sans-serif",
        sans: "'DS Indigo', system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
        import: ""
      },
      'literary': {
        serif: "'Cormorant Garamond', Georgia, serif",
        sans: "'Libre Franklin', system-ui, sans-serif",
        mono: "'IBM Plex Mono', monospace",
        import: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Libre+Franklin:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
      },
      'contemporary': {
        serif: "'Fraunces', Georgia, serif",
        sans: "'Outfit', system-ui, sans-serif",
        mono: "'Fira Code', monospace",
        import: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap"
      },
      'fashion': {
        serif: "'Bodoni Moda', Georgia, serif",
        sans: "'Figtree', system-ui, sans-serif",
        mono: "'Source Code Pro', monospace",
        import: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500&family=Figtree:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Source+Code+Pro:wght@400;500&display=swap"
      },
      'classic': {
        serif: "'EB Garamond', Georgia, serif",
        sans: "'IBM Plex Sans', system-ui, sans-serif",
        mono: "'IBM Plex Mono', monospace",
        import: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
      }
    };
    var saved = localStorage.getItem('font-pairing');
    var pairingId = (saved && fontPairings[saved]) ? saved : 'current';
    var pairing = fontPairings[pairingId];
    document.documentElement.style.setProperty('--font-serif', pairing.serif);
    document.documentElement.style.setProperty('--font-sans', pairing.sans);
    document.documentElement.style.setProperty('--font-mono', pairing.mono);
    document.documentElement.setAttribute('data-font', pairingId);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload default fonts to prevent FOUT (Flash of Unstyled Text) */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: fontPairingScript }} />
      </head>
      <body className="antialiased">
        <Providers>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="gradient-mesh" />
          <main id="main-content">
            {children}
          </main>
          <div className="noise-overlay" />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
