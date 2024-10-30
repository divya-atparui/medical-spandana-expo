import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { useGetAuthToken } from '@/api/auth';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const [error, setError] = useState<string | null>(null);

  const { mutate: signInUserNameAndEmail, isPending: signInLoading } =
    useGetAuthToken();
  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log('Regular login:', data);
    setError(null); // Clear any previous errors
    signInUserNameAndEmail(
      {
        username: data.username,
        password: data.password,
        userCategoryId: 1,
        tenantId: 'spandana',
      },
      {
        onSuccess: (data) => {
          signIn({
            access: data.data[0].token,
            refreshInterval: data.data[0]?.expiresIn,
          });
          router.push('/');
        },
        onError: (error) => {
          console.error('Login error:', error);
          setError('Invalid username or password. Please try again.'); // Set a user-friendly error message
        },
      },
    );
  };

  const onGoogleSignIn = () => {
    console.log('Google Sign-In pressed');
    signIn({ access: 'google-access-token', refreshInterval: 0 });
    router.push('/');
  };

  const onPhoneSignIn = () => {
    console.log('Phone Sign-In pressed');
    // Implement phone sign-in logic here
    // For now, we'll just log and use the same signIn function
    signIn({ access: 'phone-access-token', refreshInterval: 0 });
    router.push('/');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm
        isLoading={signInLoading}
        onSubmit={onSubmit}
        onGoogleSignIn={onGoogleSignIn}
        onPhoneSignIn={onPhoneSignIn}
        error={error}
      />
    </>
  );
}
