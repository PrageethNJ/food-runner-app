import AuthProvider from '@/providers/AuthProvider';
import { Stack } from 'expo-router/stack';

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
    
  );                  
}