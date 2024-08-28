import { Stack } from 'expo-router/stack';

export default function UserMenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{  title: 'Menu'  }} />
    </Stack>
  );                  
}