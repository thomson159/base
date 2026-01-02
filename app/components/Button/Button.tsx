import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={`px-6 py-2 rounded-lg ${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}
