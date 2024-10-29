import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { useColorScheme,View } from 'react-native'

import { useIsFirstTime } from '@/core/hooks'
import { Button, SafeAreaView,Text } from '@/ui'

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime()
  const router = useRouter()
  const colorScheme = useColorScheme()

  const handleGetStarted = () => {
    setIsFirstTime(false)
    router.replace('/login')
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center p-6">
        <View className="mb-8 size-20 items-center justify-center rounded-full bg-primary-500 dark:bg-primary-400">
          <AntDesign name="medicinebox" size={40} color={colorScheme === 'dark' ? '#E6F7FF' : '#FFFFFF'} />
        </View>
        <Text className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-50">Spandana</Text>
        <Text className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">
          Your health, our priority
        </Text>

        <View className="flex w-full gap-4 space-y-8">
          <Feature icon="calendar" text="Easy appointment scheduling" />
          <Feature icon="team" text="Access to top healthcare professionals" />
          <Feature icon="heart" text="Personalized health tracking" />
          <Feature icon="Safety" text="Secure and confidential" />
        </View>
      </View>

      <View className="p-6">
        <Button
          label="Get Started"
          onPress={handleGetStarted}
          className="bg-primary-500 dark:bg-primary-400"
          textClassName="text-white dark:text-gray-900"
        />
        <Text className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  )
}

function Feature({ icon, text }: { icon: string; text: string }) {
  const colorScheme = useColorScheme()
  const iconColor = colorScheme === 'dark' ? '#40A9FF' : '#1890FF'

  return (
    <View className="flex-row items-center">
      <View className="size-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-800">
        <AntDesign name={icon as any} size={24} color={iconColor} />
      </View>
      <Text className="ml-4 text-base text-gray-800 dark:text-gray-200">{text}</Text>
    </View>
  )
}