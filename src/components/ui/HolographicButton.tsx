'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function HolographicButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
}: HolographicButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);

  const gradientX = useTransform(smoothX, [0, 1], [0, 100]);
  const gradientY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const baseStyles = 'relative overflow-hidden font-medium transition-colors';

  const variantStyles = {
    primary: 'bg-text-primary text-background hover:bg-text-secondary',
    secondary: 'bg-surface-elevated border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-6 py-3 rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const holographicContent = (
    <>
      {/* Holographic foil layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [gradientX, gradientY],
            ([x, y]) => `
              radial-gradient(
                circle at ${x}% ${y}%,
                rgba(120, 180, 255, 0.3) 0%,
                rgba(200, 150, 255, 0.2) 25%,
                rgba(255, 180, 200, 0.15) 50%,
                transparent 70%
              )
            `
          ),
        }}
      />

      {/* Prismatic highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [gradientX, gradientY],
            ([x, y]) => `
              radial-gradient(
                ellipse 60% 40% at ${x}% ${y}%,
                rgba(255, 255, 255, 0.4) 0%,
                transparent 50%
              )
            `
          ),
        }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <div style={{ perspective: 800, display: 'inline-block' }}>
        <motion.a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {holographicContent}
        </motion.a>
      </div>
    );
  }

  return (
    <div style={{ perspective: 800, display: 'inline-block' }}>
      <motion.button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedClassName}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.97 }}
      >
        {holographicContent}
      </motion.button>
    </div>
  );
}
