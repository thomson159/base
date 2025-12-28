import type { ContainerProps } from '~/types/components.types';

export const Container = ({ children }: ContainerProps) => {
  return <section className="p-4 pt-[40px] flex flex-col gap-8">{children}</section>;
};
