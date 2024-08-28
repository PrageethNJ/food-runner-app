import { Stack } from 'expo-router/stack';

export default function UserOrdersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Orders' }} />
    </Stack>
  );                  
}