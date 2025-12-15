'use client';

interface TagProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ tag, active, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tag cursor-pointer ${
        active
          ? 'bg-accent/20 border-accent text-accent'
          : ''
      }`}
    >
      {tag}
    </button>
  );
}
