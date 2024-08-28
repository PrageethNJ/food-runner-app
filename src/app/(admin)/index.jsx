import { View } from 'react-native'
import React from 'react'
import { Link, Redirect, Stack } from 'expo-router'
import Button from '@components/Button';
import { useAuth } from '@/providers/AuthProvider';

const AdminPage = () => {
  
  //access control part
  const { session } = useAuth();
  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

 return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Stack.Screen options={{ title: 'Admin Page' }} />
      
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>

      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>

      <Link href={'/(admin)/profile'} asChild>
        <Button text="Profile" />
      </Link>

    </View>
  )
}

export default AdminPage