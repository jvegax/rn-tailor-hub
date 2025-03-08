import React from 'react';
import { AppNavigator } from '@/core/navigation';
import { StatusBar } from 'react-native';
import { AppProviders } from '@/core/providers';

const App = (): React.JSX.Element => {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <AppNavigator />
    </AppProviders>
  );
};

export default App;
