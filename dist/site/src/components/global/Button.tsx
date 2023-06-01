'use client';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ children, size, ...props }: Props) {
  const baseClass =
    'inline-block rounded-lg bg-primary no-select text-text-button hover:bg-primary-hover active:bg-primary-active text-sm font-medium';

  return size === 'lg' ? (
    <button className={`h-10 py-2 px-5 ${baseClass}`} {...props}>
      {children}
    </button>
  ) : size === 'sm' ? (
    <button className={`h-6 py-1 px-2 ${baseClass}`} {...props}>
      {children}
    </button>
  ) : (
    <button className={`h-8 py-1.5 px-3 ${baseClass}`} {...props}>
      {children}
    </button>
  );
}
