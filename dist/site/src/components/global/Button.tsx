import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <button className="rounded-lg py-2 px-5 bg-primary no-select text-text-button hover:bg-primary-hover active:bg-primary-active text-sm font-medium">
      Button
    </button>
  );
};

export default Button;
