import React, { createContext, useState, useContext } from "react";

interface TabBarContextType {
  isTabBarVisible: boolean;
  toggleTabBar: () => void;
}

export const TabBarContext = createContext<TabBarContextType>({
  isTabBarVisible: true,
  toggleTabBar: () => {},
});

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const toggleTabBar = () => {
    setIsTabBarVisible((prev) => !prev);
  };

  return (
    <TabBarContext.Provider value={{ isTabBarVisible, toggleTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => useContext(TabBarContext);
