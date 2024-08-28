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

  return <Redirect href={'/(admin)/menu/'} />;
}

export default AdminPage