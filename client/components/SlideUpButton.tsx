import { ReactNode } from "react";

interface SlideUpButtonProps {
  children: ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const SlideUpButton = ({
  children,
  id,
  className = "",
  onClick,
  leftIcon,
  rightIcon,
}: SlideUpButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${className}`}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {children}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {children}
        </div>
      </span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
