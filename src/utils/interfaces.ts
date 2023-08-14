import { Dispatch, SetStateAction } from "react";

export interface AppContextType {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedServices: string[];
  setSelectedServices: Dispatch<SetStateAction<string[]>>;
  selectedPackages: string[];
  setSelectedPackages: Dispatch<SetStateAction<string[]>>;
}

export interface AppContextProps {
  children: React.ReactNode;
}

export interface Service {
  name: string;
  basePrice: number[];
}

export interface Package {
  name: string;
  basePrice: number[];
}

export interface FinalPriceDisplayProps {
  finalPrice: number;
}

export interface PackageSelectorProps {
  packages: string[];
  selectedPackages: string[];
  onPackageSelect: (packageName: string) => void;
  getPackagePrice: (packageName: string, selectedYear: number) => number | undefined;
  selectedYear: number;
}

export interface ServiceSelectorProps {
  services: string[];
  selectedServices: string[];
  selectedPackages: string[];
  onServiceSelect: (serviceName: string) => void;
  getServicePrice: (serviceName: string, selectedYear: number) => number | undefined;
  selectedYear: number;
}

export interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onYearSelect: (year: number) => void;
}
