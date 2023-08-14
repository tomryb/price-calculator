import React from 'react';
import Calculator from './Calculator';
import { AppProvider } from '../store/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Calculator />
    </AppProvider>
  );
};

export default App;
