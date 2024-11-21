import { createContext } from "react";

type ContextData = {
  isAuthenticated: boolean;
};

export const GlobalContext = createContext<ContextData>({
  isAuthenticated: false,
});
