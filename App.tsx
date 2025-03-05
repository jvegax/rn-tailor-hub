import React from 'react';
import { AppNavigator } from '@/core/navigation';
import { StatusBar } from 'react-native';

const App = (): React.JSX.Element => {
  return (
    <>
      <StatusBar barStyle="default" />
      <AppNavigator />
    </>
  );
};

export default App;
