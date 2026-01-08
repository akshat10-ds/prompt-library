'use client';

import { useState, useEffect } from 'react';
import { Settings, Sun, Moon, Type, Check } from 'lucide-react';

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
    name: 'Default',
    description: 'Instrument Serif + DM Sans',
    serif: "'Instrument Serif', Georgia, serif",
    sans: "'DM Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    import: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  {
    id: 'dsindigo',
    name: 'DS Indigo',
    description: 'Docusign Brand',
    serif: "'DS Indigo', system-ui, sans-serif",
    sans: "'DS Indigo', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    import: "",
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

export function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeFont, setActiveFont] = useState('current');

  useEffect(() => {
    // Check theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Check font preference
    const savedFont = localStorage.getItem('font-pairing');
    if (savedFont && fontPairings.find(p => p.id === savedFont)) {
      setActiveFont(savedFont);
      applyFontPairing(savedFont);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const applyFontPairing = (pairingId: string) => {
    const pairing = fontPairings.find(p => p.id === pairingId);
    if (!pairing) return;

    const existingLink = document.getElementById('dynamic-fonts');
    if (existingLink) existingLink.remove();

    if (pairing.import) {
      const link = document.createElement('link');
      link.id = 'dynamic-fonts';
      link.rel = 'stylesheet';
      link.href = pairing.import;
      document.head.appendChild(link);
    }

    document.documentElement.style.setProperty('--font-serif', pairing.serif);
    document.documentElement.style.setProperty('--font-sans', pairing.sans);
    document.documentElement.style.setProperty('--font-mono', pairing.mono);
    document.documentElement.setAttribute('data-font', pairingId);
    localStorage.setItem('font-pairing', pairingId);
  };

  const handleFontSelect = (pairingId: string) => {
    setActiveFont(pairingId);
    applyFontPairing(pairingId);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-black/5 transition-colors"
        title="Settings"
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-surface-elevated border border-border rounded-xl shadow-xl z-50 overflow-hidden">
            {/* Theme Section */}
            <div className="p-3 border-b border-border-subtle">
              <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                Theme
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => { if (isDark) toggleTheme(); }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !isDark
                      ? 'bg-text-primary text-background'
                      : 'bg-surface text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Sun size={16} />
                  Light
                </button>
                <button
                  onClick={() => { if (!isDark) toggleTheme(); }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-text-primary text-background'
                      : 'bg-surface text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Moon size={16} />
                  Dark
                </button>
              </div>
            </div>

            {/* Font Section */}
            <div className="p-3">
              <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                Font
              </p>
              <div className="space-y-1">
                {fontPairings.map((pairing) => (
                  <button
                    key={pairing.id}
                    onClick={() => handleFontSelect(pairing.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      activeFont === pairing.id
                        ? 'bg-text-primary/5'
                        : 'hover:bg-black/5'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-medium text-text-primary">
                        {pairing.name}
                      </span>
                      <p className="text-xs text-text-secondary">
                        {pairing.description}
                      </p>
                    </div>
                    {activeFont === pairing.id && (
                      <Check size={16} className="text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
