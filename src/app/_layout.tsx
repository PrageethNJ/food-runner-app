import AuthProvider from '@/providers/AuthProvider';
import { Stack } from 'expo-router/stack';
import CartProvider from '@/providers/CartProvider';

export default function AppLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ title: 'Cart' }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
    
  );                  
}