import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from 'react-native-paper';

//! Features Context Providers
import {Provider as WeatherProvider} from 'features/weather/state/WeatherContext';
//! Navigation
import RootNavigator from 'navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <WeatherProvider>
        <PaperProvider
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, primary: '#1ba1f2'},
          }}>
          <RootNavigator />
        </PaperProvider>
      </WeatherProvider>
    </SafeAreaProvider>
  );
};

export default App;
