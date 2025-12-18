'use client';

import { useState, useEffect } from 'react';
import { Type, Check } from 'lucide-react';

interface FontPairing {
  id: string;
  name: string;
  description: string;
  serif: string;
  sans: string;
  mono: string;
  import: string;
}

const fontPairings: FontPairing[] = [
  {
    id: 'current',
    name: 'Current',
    description: 'Instrument Serif + DM Sans',
    serif: "'Instrument Serif', Georgia, serif",
    sans: "'DM Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    import: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  {
    id: 'dsindigo',
    name: 'DS Indigo',
    description: 'DS Indigo (Docusign Brand)',
    serif: "'DS Indigo', system-ui, sans-serif",
    sans: "'DS Indigo', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    import: "", // Local font, already loaded via @font-face
  },
  {
    id: 'literary',
    name: 'Literary',
    description: 'Cormorant Garamond + Libre Franklin',
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Libre Franklin', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    import: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Libre+Franklin:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap",
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Fraunces + Outfit',
    serif: "'Fraunces', Georgia, serif",
    sans: "'Outfit', system-ui, sans-serif",
    mono: "'Fira Code', monospace",
    import: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap",
  },
  {
    id: 'fashion',
    name: 'High Fashion',
    description: 'Bodoni Moda + Figtree',
    serif: "'Bodoni Moda', Georgia, serif",
    sans: "'Figtree', system-ui, sans-serif",
    mono: "'Source Code Pro', monospace",
    import: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500&family=Figtree:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Source+Code+Pro:wght@400;500&display=swap",
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'EB Garamond + IBM Plex Sans',
    serif: "'EB Garamond', Georgia, serif",
    sans: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    import: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap",
  },
];

interface FontSwitcherProps {
  openUp?: boolean;
}

export function FontSwitcher({ openUp = false }: FontSwitcherProps) {
  const [activePairing, setActivePairing] = useState<string>('current');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('font-pairing');
    if (saved && fontPairings.find(p => p.id === saved)) {
      setActivePairing(saved);
      applyFontPairing(saved);
    }
  }, []);

  const applyFontPairing = (pairingId: string) => {
    const pairing = fontPairings.find(p => p.id === pairingId);
    if (!pairing) return;

    // Remove existing font link if any
    const existingLink = document.getElementById('dynamic-fonts');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new font link (only if import URL exists - local fonts don't need this)
    if (pairing.import) {
      const link = document.createElement('link');
      link.id = 'dynamic-fonts';
      link.rel = 'stylesheet';
      link.href = pairing.import;
      document.head.appendChild(link);
    }

    // Update CSS variables
    document.documentElement.style.setProperty('--font-serif', pairing.serif);
    document.documentElement.style.setProperty('--font-sans', pairing.sans);
    document.documentElement.style.setProperty('--font-mono', pairing.mono);

    // Set data attribute for font-specific styling
    document.documentElement.setAttribute('data-font', pairingId);

    // Save preference
    localStorage.setItem('font-pairing', pairingId);
  };

  const handleSelect = (pairingId: string) => {
    setActivePairing(pairingId);
    applyFontPairing(pairingId);
    setIsOpen(false);
  };

  const currentPairing = fontPairings.find(p => p.id === activePairing);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary bg-surface border border-border-subtle rounded-lg transition-colors"
        title="Switch font pairing"
      >
        <Type size={16} />
        <span className="hidden sm:inline">{currentPairing?.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 w-72 bg-surface-elevated border border-border rounded-xl shadow-xl z-50 overflow-hidden ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
            <div className="p-3 border-b border-border-subtle">
              <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                Font Pairings
              </p>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {fontPairings.map((pairing) => (
                <button
                  key={pairing.id}
                  type="button"
                  onClick={() => handleSelect(pairing.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${
                    activePairing === pairing.id
                      ? 'bg-text-primary/5'
                      : 'hover:bg-surface'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">
                        {pairing.name}
                      </span>
                      {activePairing === pairing.id && (
                        <Check size={14} className="text-success" />
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-0.5">
                      {pairing.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-border-subtle bg-surface">
              <p className="text-xs text-text-tertiary text-center">
                Changes apply instantly. Pick your favorite!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
