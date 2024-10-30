/* eslint-disable max-lines-per-function */
import { AntDesign } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, useColorScheme } from 'react-native';
import * as z from 'zod';

import { Button, colors, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(1, 'Username is required'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(2, 'Password must be at least 2 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  onGoogleSignIn?: () => void;
  onPhoneSignIn?: () => void;
  isLoading: boolean
  error?: string | null;
};

export const LoginForm = ({
  onSubmit = () => {},
  onGoogleSignIn = () => {},
  onPhoneSignIn = () => {},
  isLoading = false,
  error = null,
}: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View
        className={`flex-1 justify-center p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      >
        <View className="mb-6 items-center">
          <AntDesign
            name="heart"
            size={64}
            color={isDark ? colors.primary[400] : colors.primary[600]}
          />
          <Text
            testID="form-title"
            className={`mt-2 text-center text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Spandana Login
          </Text>
        </View>

        {error && (
          <View className="mb-4 rounded-md bg-red-100 p-3">
            <Text className="text-sm text-red-800">{error}</Text>
          </View>
        )}

        <ControlledInput
          testID="email-input"
          control={control}
          name="username"
          label="Username"
          error={errors.username?.message}
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="******"
          secureTextEntry={!showPassword}
          error={errors.password?.message}
          rightIcon={
            <AntDesign
              name={showPassword ? 'eye' : 'eyeo'}
              size={24}
              color={isDark ? colors.gray[400] : colors.gray[600]}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Button
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
          className="mt-4"
          variant={isDark ? 'secondary' : 'default'}
          textClassName="dark:text-white"
          disabled={isLoading}
          icon={
            isLoading &&
            <AntDesign
              name="loading1"
              className='animate-spin'
              size={24}
              color={isDark ? colors.primary[400] : colors.primary[600]}
            />
          }
        />
        <Text
          className={`my-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Or continue with
        </Text>
        <Button
          testID="google-signin-button"
          label="Sign in with Google"
          onPress={onGoogleSignIn}
          variant="outline"
          className="mb-2"
          icon={
            <AntDesign
              name="google"
              size={24}
              color={isDark ? colors.primary[400] : colors.primary[600]}
            />
          }
        />
        <Button
          testID="phone-signin-button"
          label="Login by Phone Number"
          onPress={onPhoneSignIn}
          variant="outline"
          icon={
            <AntDesign
              name="phone"
              size={24}
              color={isDark ? colors.primary[400] : colors.primary[600]}
              style={{ transform: [{ rotate: '100deg' }] }}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};