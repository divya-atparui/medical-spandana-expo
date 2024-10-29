import { AntDesign } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, useColorScheme } from 'react-native';
import * as z from 'zod';

import { Button, colors, ControlledInput, Text, View } from '@/ui';


const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  onGoogleSignIn?: () => void;
  onPhoneSignIn?: () => void;
};

export const LoginForm = ({ 
  onSubmit = () => {}, 
  onGoogleSignIn = () => {},
  onPhoneSignIn = () => {}
}: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className={`flex-1 justify-center p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <View className="mb-6 items-center">
          <AntDesign name="heart" size={64} color={isDark ? colors.primary[400] : colors.primary[600]} />
          <Text testID="form-title" className={`mt-2 text-center text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Spandana Login
          </Text>
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
          className={isDark ? 'text-white' : 'text-gray-900'}
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="******"
          secureTextEntry={true}
          className={isDark ? 'text-white' : 'text-gray-900'}
        />
        <Button
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
          className="mt-4"
          variant={isDark ? 'secondary' : 'default'}
        />
        <Text className={`my-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Or continue with
        </Text>
        <Button
          testID="google-signin-button"
          label="Sign in with Google"
          onPress={onGoogleSignIn}
          variant="outline"
          className="mb-2"
          icon={<AntDesign name="google" size={24} color={isDark ? colors.primary[400] : colors.primary[600]} />}
        />
        <Button
          testID="phone-signin-button"
          label="Login by Phone Number"
          onPress={onPhoneSignIn}
          variant="outline"
          icon={<AntDesign name="phone" size={24} color={isDark ? colors.primary[400] : colors.primary[600]} style={{ transform: [{ rotate: '100deg' }] }} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
};