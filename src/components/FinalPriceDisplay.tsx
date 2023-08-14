import React from 'react';
import { FinalPriceDisplayProps } from '../utils/interfaces';

const FinalPriceDisplay: React.FC<FinalPriceDisplayProps> = ({ finalPrice }) => {
  return (
    <div>
      <h2 className='price'>Final Price: {finalPrice} zł</h2>
    </div>
  );
};

export default FinalPriceDisplay;
