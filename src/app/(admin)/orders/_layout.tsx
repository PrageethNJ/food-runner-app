import { Stack } from 'expo-router/stack';

export default function AdminOrdersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Orders' }} />
    </Stack>
  );                  
}