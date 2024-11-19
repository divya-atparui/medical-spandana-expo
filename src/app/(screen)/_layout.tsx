import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="doctors/index" 
        options={{ 
          headerShadowVisible:false,
          contentStyle:{
            backgroundColor: 'white',
          }
        }} 
      />
       <Stack.Screen 
        name="doctors/[id]" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="departments/index" 
        options={{ 
          title: 'Departments',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="departments/[id]" 
        options={{ 
          headerShown: false // We're using a custom back button
        }} 
      />
       <Stack.Screen 
        name="doctors/appointments/index" 
        options={{ 
          headerShown: false // We're using a custom back button
        }} 
      />
    </Stack>
  );
};
export default Layout;