import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '../../utils/cn';

type ButtonBaseProps = {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps & 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: undefined;
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps & 
  Omit<LinkProps, keyof ButtonBaseProps> & {
    as?: undefined;
    to: string;
    href?: undefined;
  };

type ButtonAsAnchorProps = ButtonBaseProps & 
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as?: 'a';
    to?: undefined;
    href?: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsAnchorProps;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const baseClassName = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    {
      'bg-accent text-white hover:bg-accent/90': variant === 'default',
      'border border-white/20 hover:border-accent hover:text-accent': variant === 'outline',
      'hover:bg-accent/10 hover:text-accent': variant === 'ghost',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2': size === 'md',
      'px-6 py-3': size === 'lg',
    },
    className
  );

  // If it's a Link from react-router-dom
  if ('to' in props && props.to) {
    return (
      <Link 
        className={baseClassName} 
        {...(props as ButtonAsLinkProps)}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  // If it's an anchor tag
  if (('href' in props && props.href) || (props as any).as === 'a') {
    return (
      <a 
        className={baseClassName} 
        {...(props as ButtonAsAnchorProps)}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  // Default button
  return (
    <button
      className={baseClassName}
      {...(props as ButtonAsButtonProps)}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;