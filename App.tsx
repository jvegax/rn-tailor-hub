import React, { JSX } from 'react';
import { AppNavigator } from '@/core/navigation';
import { StatusBar } from 'react-native';
import { AppProviders } from '@/core/providers';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
        <AppNavigator />
      </AppProviders>
    </GestureHandlerRootView>
  );
};

export default App;
