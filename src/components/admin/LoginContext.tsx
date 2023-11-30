"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface LoginContextType {
  isLogin: boolean | null;
  setIsLogin: Dispatch<SetStateAction<boolean | null>>;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext<LoginContextType>({
  isLogin: null,
  setIsLogin: () => {},
});

export const LoginProvider = ({ children }: LoginProviderProps) => {
  // Specify the type of state explicitly as `boolean | null`
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
