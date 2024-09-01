import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function App() {
  
  //access control part
  const { session, loading, isAdmin, profile } = useAuth();
   
  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }else{
    if(profile){
      console.log(profile);
      if (isAdmin) {
        return <Redirect href={'/(admin)'} />;
        }
      else{
        return <Redirect href={'/(user)'} />;
        }
       
    }
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
    </View>
  )
}
