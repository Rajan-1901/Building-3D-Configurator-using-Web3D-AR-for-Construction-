import React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | number;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  valueDisplay,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs">
        {label && <span className="font-semibold text-slate-300 uppercase tracking-wider">{label}</span>}
        {valueDisplay !== undefined && (
          <span className="font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800/40">
            {valueDisplay}
          </span>
        )}
      </div>
      <input
        type="range"
        className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${className}`}
        {...props}
      />
    </div>
  );
};
