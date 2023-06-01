'use client';

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
  style?: ButtonStyle;
  size?: 'sm' | 'md' | 'lg';
}

const styles = {
  primary:
    'bg-primary text-text-button hover:bg-primary-hover active:bg-primary-active',
  default:
    'text-text-secondary hover:bg-default active:bg-default-hover border border-border',
};

export default function Button({ children, size, style, ...props }: Props) {
  const baseClass = `inline-block rounded-md no-select text-sm font-medium ${
    styles[style ?? 'primary']
  }`;

  return size === 'lg' ? (
    <button className={`h-12 py-2 px-6 ${baseClass}`} {...props}>
      {children}
    </button>
  ) : size === 'sm' ? (
    <button className={`h-8 py-1 px-2 ${baseClass}`} {...props}>
      {children}
    </button>
  ) : (
    <button className={`h-10 py-1.5 px-4 ${baseClass}`} {...props}>
      {children}
    </button>
  );
}
