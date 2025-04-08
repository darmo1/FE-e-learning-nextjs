"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

const UserContext = createContext<{ role: string }>({
  role: "student",
});
export const useUser = () => useContext(UserContext);

export const UserProvider: FC<PropsWithChildren<{ role: string }>> = ({
  role,
  children,
}) => {
  const props = useMemo(
    () => ({
      role,
    }),
    [role]
  );
  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
