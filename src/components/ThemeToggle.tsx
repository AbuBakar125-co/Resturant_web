import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'pill';
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'compact',
  id = 'theme-toggle-btn',
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (variant === 'pill') {
    return (
      <button
        id={id}
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] ${
          isDark
            ? 'border-[#2D3139] bg-[#16181C] text-[#EDE6D8] hover:border-[#C5A059] hover:bg-[#1E2127]'
            : 'border-[#D9D2C5] bg-[#FFFFFF] text-[#171717] hover:border-[#A67C00] hover:bg-[#F5EFE6] shadow-sm'
        } ${className}`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isDark ? (
            <Moon className="w-4 h-4 text-[#C5A059] transition-transform duration-300 hover:rotate-12" />
          ) : (
            <Sun className="w-4 h-4 text-[#A67C00] transition-transform duration-300 hover:rotate-45" />
          )}
        </div>
        <span className="text-xs uppercase tracking-wider font-medium">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative p-2.5 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] group flex items-center justify-center ${
        isDark
          ? 'border-[#2D313A] bg-[#14161A]/80 text-[#C5A059] hover:border-[#C5A059] hover:bg-[#1E2128] shadow-[0_0_12px_rgba(197,160,89,0.15)]'
          : 'border-[#D9D2C5] bg-[#FFFFFF] text-[#A67C00] hover:border-[#A67C00] hover:bg-[#F3EFE6] shadow-md shadow-black/5'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#C5A059] transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-[#A67C00] transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:scale-110" />
        )}
      </div>
      {/* Subtle indicator dot */}
      <span
        className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full transition-colors ${
          isDark ? 'bg-[#C5A059]' : 'bg-[#A67C00]'
        }`}
      />
    </button>
  );
};
