"use client";

import { createContext, useContext, useState } from "react";

interface MenuContextType {
  isMenuOpened: boolean;
  setIsMenuOpened: (value: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpened, setIsMenuOpened }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
