import React from 'react';
import { PackageSelectorProps } from '../utils/interfaces';

const PackageSelector: React.FC<PackageSelectorProps> = ({
  packages,
  selectedPackages,
  onPackageSelect,
  getPackagePrice,
  selectedYear,
}) => {
  return (
    <div className="select">
      <label className="label">Select Packages:</label>
      <ul className="checkbox-group">
        {packages.map((packageName) => (
          <li key={packageName} className="checkbox">
            <input
              type="checkbox"
              checked={selectedPackages.includes(packageName)}
              onChange={() => onPackageSelect(packageName)}
            />
            {packageName} - {getPackagePrice(packageName, selectedYear)} zł
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageSelector;






