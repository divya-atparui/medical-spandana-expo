import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable } from 'react-native'

import { useDarkModeColor, useSelectedTheme } from '@/core/hooks/use-selected-theme'
import { Text } from '@/ui'

export const ThemeToggle = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme()
  const { modeColor:darkModeColor} = useDarkModeColor()

  const toggleTheme = React.useCallback(() => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light')
  }, [selectedTheme, setSelectedTheme])

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${selectedTheme === 'light' ? 'dark' : 'light'} mode`}
      className="bg-primary size-10 flex-row items-center justify-center rounded-full"
    >
      <Ionicons
        name={selectedTheme === 'light' ? 'sunny' : 'moon'}
        size={24}
        color={darkModeColor}
        className="text-primary-foreground"
      />
      <Text className="sr-only">Toggle theme</Text>
    </Pressable>
  )
}