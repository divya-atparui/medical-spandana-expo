import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import colors from '@/ui/colors';



const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary[400], // Slightly lighter shade for better visibility in dark mode
    background: colors.gray[900], // Dark background, but not pure black
    text: colors.gray[100], // Light text for readability
    border: colors.gray[700], // Subtle borders
    card: colors.gray[800], // Slightly lighter than the background for contrast
    notification: colors.primary[400], // Using primary color for notifications
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    background: colors.white,
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
