import React from 'react';

import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';

import {GetCards} from './scr/components/Index';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <GetCards />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
