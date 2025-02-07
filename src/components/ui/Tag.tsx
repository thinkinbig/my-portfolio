'use client';

type TagProps = {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
  style?: React.CSSProperties;
};

export function Tag({ children, variant = 'default', className = '', style }: TagProps) {
  const baseStyles = "px-3 py-1 rounded-full text-sm";
  const variantStyles = {
    default: "bg-foreground/5",
    primary: "bg-primary/10 text-primary"
  };

  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
} 