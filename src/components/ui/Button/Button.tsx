import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-500 text-white rounded-md mb-4"
    >
      {text}
    </button>
  );
};

export default Button;
