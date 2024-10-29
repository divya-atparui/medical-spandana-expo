import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log('Regular login:', data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };

  const onGoogleSignIn = () => {
    console.log('Google Sign-In pressed');
    signIn({ access: 'google-access-token', refresh: 'google-refresh-token' });
    router.push('/');
  };

  const onPhoneSignIn = () => {
    console.log('Phone Sign-In pressed');
    // Implement phone sign-in logic here
    // For now, we'll just log and use the same signIn function
    signIn({ access: 'phone-access-token', refresh: 'phone-refresh-token' });
    router.push('/');
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm 
        onSubmit={onSubmit} 
        onGoogleSignIn={onGoogleSignIn} 
        onPhoneSignIn={onPhoneSignIn}
      />
    </>
  );
}