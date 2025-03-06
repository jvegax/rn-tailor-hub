import React from 'react';
import { AppNavigator } from '@/core/navigation';
import { StatusBar } from 'react-native';

const App = (): React.JSX.Element => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <AppNavigator />
    </>
  );
};

export default App;
