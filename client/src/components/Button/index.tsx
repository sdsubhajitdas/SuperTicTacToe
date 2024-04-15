import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="flex-1 py-6 text-2xl font-medium rounded shadow-xl px-7 bg-app-bg-light hover:bg-app-text hover:text-white hover:shadow-app-text/50 lg:text-5xl"
    >
      {children}
    </button>
  );
}

export default Button;
