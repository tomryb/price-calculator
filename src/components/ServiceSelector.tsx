import React from 'react';
import { ServiceSelectorProps } from '../utils/interfaces';
import { INTERNET_TV_PACKAGE, INTERNET_SERVICE, INTERNET_PHONE_PACKAGE, PHONE_SERVICE, TV_SERVICE } from '../utils/consts';

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServices,
  onServiceSelect,
  getServicePrice,
  selectedYear,
  selectedPackages,
}) => {
  const isInternetTvPackageSelected = selectedPackages.includes(INTERNET_TV_PACKAGE);
  const isInternetPhonePackageSelected = selectedPackages.includes(INTERNET_PHONE_PACKAGE);

  return (
    <div className="select">
      <label className="label">Select Services:</label>
      <ul className="checkbox-group">
        {services.map((service) => (
          <li key={service} className="checkbox">
            <input
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => onServiceSelect(service)}
              disabled={
                (isInternetTvPackageSelected && (service === INTERNET_SERVICE || service === TV_SERVICE)) ||
                (isInternetPhonePackageSelected && (service === INTERNET_SERVICE || service === PHONE_SERVICE))
              }
            />
            {service} - {getServicePrice(service, selectedYear)} zł
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSelector;
