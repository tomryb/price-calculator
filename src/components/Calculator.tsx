import React from 'react';
import YearSelector from './YearSelector';
import ServiceSelector from './ServiceSelector';
import PackageSelector from './PackageSelector';
import FinalPriceDisplay from './FinalPriceDisplay';
import { useAppContext } from '../store/AppContext';
import serviceData from '../data/data.json';
import {
  INTERNET_SERVICE,
  TV_SERVICE,
  PHONE_SERVICE,
  DECODER_SERVICE,
  INTERNET_TV_PACKAGE,
  INTERNET_PHONE_PACKAGE,
} from '../utils/consts';
import { Package, Service } from '../utils/interfaces';

if (!serviceData || !Array.isArray(serviceData.services) || !Array.isArray(serviceData.packages)) {
  throw new Error("Invalid data format in serviceData file.");
}

const Calculator: React.FC = () => {
  const appContext = useAppContext();

  if (!appContext) {
    alert('App context not available.');
    return null;
  }

  const {
    selectedYear,
    setSelectedYear,
    selectedServices,
    setSelectedServices,
    selectedPackages,
    setSelectedPackages,
  } = appContext;

  const isInternetTvPackageSelected = selectedPackages.includes(INTERNET_TV_PACKAGE);

  const handleServiceSelect = (serviceName: string) => {
    if (serviceName === DECODER_SERVICE) {
      if (selectedServices.includes(DECODER_SERVICE)) {
        setSelectedServices(selectedServices.filter((service: string) => service !== DECODER_SERVICE));
      } else {
        setSelectedServices([...selectedServices, DECODER_SERVICE]);
      }
    } else {
      if (serviceName === TV_SERVICE && selectedServices.includes(DECODER_SERVICE)) {
        setSelectedServices(selectedServices.filter((service: string) => service !== DECODER_SERVICE));
      }
      if (selectedServices.includes(serviceName)) {
        setSelectedServices(selectedServices.filter((service: string) => service !== serviceName));
      } else {
        setSelectedServices([...selectedServices, serviceName]);
      }
    }
  };

  const handlePackageSelect = (packageName: string) => {
    if (selectedPackages.includes(packageName)) {
      setSelectedPackages(selectedPackages.filter((pack: string) => pack !== packageName));
    } else {
      setSelectedPackages([...selectedPackages, packageName]);
    }
  };

  const getServicePrice = (serviceName: string, selectedYear: number): number | undefined => {
    const service = serviceData.services.find((svc: Service) => svc.name === serviceName);
    if (service) {
      return (serviceName === DECODER_SERVICE && isInternetTvPackageSelected) ? 0 : service.basePrice[selectedYear - 2023];
    }
    return 0;
  };

  const getPackagePrice = (packageName: string, selectedYear: number): number | undefined => {
    const packageData = serviceData.packages.find((pack: Package) => pack.name === packageName);
    if (packageData) {
      return packageData.basePrice[selectedYear - 2023];
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const selectedYearData = serviceData as {
      services: Service[];
      packages: Package[];
    };
    let total = 0;

    selectedServices.forEach((serviceName: string) => {
      const service = selectedYearData.services.find((svc: Service) => svc.name === serviceName);
      if (service) {
        const servicePrice = getServicePrice(serviceName, selectedYear);
        if (servicePrice !== undefined) {
          total += servicePrice;
        }
      }
    });

    selectedPackages.forEach((packageName: string) => {
      const packageData = selectedYearData.packages.find((pack: Package) => pack.name === packageName);
      if (packageData) {
        const packagePrice = getPackagePrice(packageName, selectedYear);
        if (packagePrice !== undefined) {
          total += packagePrice;
        }
      }
    });

    return total;
  };

  const finalPrice = calculateTotalPrice();

  return (
    <div className='container'>
      <h1>Price Calculator</h1>
      <YearSelector
        years={[2023, 2024, 2025]}
        selectedYear={selectedYear}
        onYearSelect={setSelectedYear}
      />
      <ServiceSelector
        services={[INTERNET_SERVICE, TV_SERVICE, PHONE_SERVICE, DECODER_SERVICE]}
        selectedServices={selectedServices}
        onServiceSelect={handleServiceSelect}
        getServicePrice={getServicePrice}
        selectedYear={selectedYear}
        selectedPackages={selectedPackages}
      />
      <PackageSelector
        packages={[INTERNET_TV_PACKAGE, INTERNET_PHONE_PACKAGE]}
        selectedPackages={selectedPackages}
        onPackageSelect={handlePackageSelect}
        getPackagePrice={getPackagePrice}
        selectedYear={selectedYear}
      />
      <FinalPriceDisplay finalPrice={finalPrice} />
    </div>
  );
};

export default Calculator;
