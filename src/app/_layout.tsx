import AuthProvider from '@/providers/AuthProvider';
import { Stack } from 'expo-router/stack';
import CartProvider from '@/providers/CartProvider';
import QueryProvider from '@/providers/QueryProvider';

export default function AppLayout() {
  return (
    <AuthProvider>
      <QueryProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ title: 'Cart' }} />
          </Stack>
        </CartProvider>
      </QueryProvider>
    </AuthProvider>
    
  );                  
}