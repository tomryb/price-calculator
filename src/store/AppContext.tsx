import React, { createContext, useContext, useState } from 'react';
import { AppContextType, AppContextProps } from '../utils/interfaces';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppContextProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        selectedYear,
        setSelectedYear,
        selectedServices,
        setSelectedServices,
        selectedPackages,
        setSelectedPackages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
