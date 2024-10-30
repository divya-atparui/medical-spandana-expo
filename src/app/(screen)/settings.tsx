import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Settings from '@/components/settings';

const SettingScreen = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerBackTitle: 'Settings',
        }}
      />
      <Settings />
    </View>
  );
};

export default SettingScreen;
