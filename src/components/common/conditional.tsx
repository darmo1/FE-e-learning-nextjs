import { FC, PropsWithChildren, ReactNode } from "react";

export const Conditional: FC<
  PropsWithChildren<{ fallback?: ReactNode; test: boolean }>
> = ({ children, test, fallback }) => {
  return <>{test ? <>{children}</> : <>{fallback}</>}</>;
};
