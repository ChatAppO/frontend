import React, { createContext, ReactNode } from "react";

interface UserContextInterface {
  userName: string;
}

interface Props {
  children?: ReactNode;
}

export const UserContext = createContext<UserContextInterface>({
  userName: "",
});

export const UserProvider = ({ children }: Props) => {
  const userName = (Math.random() + 1).toString(36).substring(2, 9);

  return (
    <UserContext.Provider value={{ userName }}>{children}</UserContext.Provider>
  );
};
