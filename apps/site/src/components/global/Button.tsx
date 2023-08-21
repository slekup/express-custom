'use client';

import { useState } from 'react';

type ButtonStyle = 'primary' | 'default';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'style'
  > {
  children: React.ReactNode;
  className?: string;
  style?: ButtonStyle;
  size?: 'sm' | 'md' | 'lg';
  copy?: string;
}

const styles = {
  primary:
    'bg-primary text-text-button hover:bg-primary-hover active:bg-primary-active',
  default:
    'text-text-secondary hover:bg-default active:bg-default-hover border border-border',
};

export default function Button({
  children,
  size,
  style,
  className,
  copy,
  ...props
}: Props) {
  const [copied, setCopied] = useState<boolean>(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  const newProps = { ...props };

  const baseClass = `inline-block rounded-md no-select text-sm font-medium ${
    copied
      ? 'bg-success text-white hover:bg-sucess-hover active:bg-success-active'
      : styles[style ?? 'primary']
  } ${className ?? ''}`;

  const removeCopy = () => {
    setCopied(false);
  };

  if (copy) {
    newProps.onClick = () => {
      navigator.clipboard.writeText(copy);
      setCopied(true);

      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }

      const timeout = setTimeout(removeCopy, 4000);
      setCopyTimeout(timeout);
    };
  }

  return size === 'lg' ? (
    <button className={`h-12 px-6 py-2 ${baseClass}`} {...newProps}>
      {copied ? 'Copied' : children}
    </button>
  ) : size === 'sm' ? (
    <button className={`h-8 px-2 py-1 ${baseClass}`} {...newProps}>
      {copied ? 'Copied' : children}
    </button>
  ) : (
    <button className={`h-10 px-4 py-1.5 ${baseClass}`} {...newProps}>
      {copied ? 'Copied' : children}
    </button>
  );
}
