"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

const UserContext = createContext<{ role: string; isLogged: boolean }>({
  role: "",
  isLogged: false,
});
export const useUser = () => useContext(UserContext);

export const UserProvider: FC<
  PropsWithChildren<{ role?: string; isLogged?: boolean }>
> = ({ role = '', children, isLogged = false }) => {
  const props = useMemo(
    () => ({
      role,
      isLogged,
    }),
    [role, isLogged]
  );
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
