import { View, Text } from 'react-native'
import React from 'react'
import { Link, Redirect, Stack } from 'expo-router'
import Button from '@components/Button';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';


const UserPage = () => {
  //access control part
   const { session } = useAuth();
   if (!session) {
     return <Redirect href={'/sign-in'} />;
   }

  return (
    <View>
      <Stack.Screen options={{ title: 'User Page' }} />
      <Text>This is the User Page</Text>
      
      <Link href={'/(user)/profile'} asChild>
        <Button text="Profile" />
      </Link>
      
    </View>
  )
}

export default UserPage