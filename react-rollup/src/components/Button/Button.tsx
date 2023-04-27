import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './styles.module.css';
import tw from 'twin.macro';

export interface IButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Button: FC<IButtonProps> = ({ onClick, disabled, className, children }) => (
  <button type="button" css={tw`text-red-500`} className={clsx(style.button, className)} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
