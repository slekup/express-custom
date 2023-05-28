import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className="inline-block h-10 rounded-lg py-2 px-5 bg-primary no-select text-text-button hover:bg-primary-hover active:bg-primary-active text-sm font-medium"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
