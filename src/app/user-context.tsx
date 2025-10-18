"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

const UserContext = createContext<{ role: string; isLogged: boolean; fullName: string }>({
  role: "",
  isLogged: false,
  fullName: "",
});
export const useUser = () => useContext(UserContext);

export const UserProvider: FC<
  PropsWithChildren<{ role?: string; isLogged?: boolean; fullName?: string }>
> = ({ role = "", children, isLogged = false, fullName = "" }) => {
  const props = useMemo(
    () => ({
      role,
      isLogged,
      fullName,
    }),
    [role, isLogged, fullName]
  );
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
