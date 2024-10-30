/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Ionicons } from '@expo/vector-icons';
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { signOut, useAuth, useDarkModeColor, useIsFirstTime } from '@/core';
import { ThemeToggle } from '@/core/hooks/theme-toggle';
import { Text } from '@/ui';

export default function TabLayout() {

  const {isDark, modeColor:darkModeColor} = useDarkModeColor()

  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10, color: darkModeColor },
        tabBarStyle: {
          borderTopColor: `${isDark ? 'white' : 'black'}`,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={darkModeColor}
            />
          ),
          headerRight: () => (
            <View className="mr-2 flex-row items-center">
              <Link href="/(screen)/settings" asChild>
                <TouchableOpacity
                  className="px-3 py-2"
                >
                  <Ionicons
                    name="settings-outline"
                    size={24}
                    color={darkModeColor}
                  />
                </TouchableOpacity>
              </Link>
              <TouchableOpacity className="px-3 py-2" onPress={() => signOut()}>
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={darkModeColor}
                />
              </TouchableOpacity>

              <ThemeToggle />
            </View>
          ),
          headerTitle: () => (
            <Text className="text-xl font-semibold">Medical App</Text>
          ),
          headerTitleAlign: 'left',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          headerShown: false,
          tabBarIcon: ({  size, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={darkModeColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          headerShown: false,
          tabBarIcon: ({  size, focused }) => (
            <Ionicons
              name={focused ? 'albums' : 'albums-outline'}
              size={size}
              color={darkModeColor}
            />
          ),
          tabBarTestID: 'profile-tab',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({  size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={darkModeColor}
            />
          ),
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}
