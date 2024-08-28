import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '@components/Button';
import Colors from '@constants/Colors';
import { Redirect, Stack } from 'expo-router';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [full_name, setFull_name] = useState('');
  
  const { session } = useAuth();

  // Fetch profile information on component mount
  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', session.user.id)
        .single();
        
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFull_name(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    full_name,
  }: {
    username: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session.user.id,
        username,
        full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }

      Alert.alert('Profile updated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle access control after hooks
  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Admin Profile' }} />

      <Text style={styles.label}>User Name</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="my user name"
        style={styles.input}
      />

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        value={full_name}
        onChangeText={setFull_name}
        placeholder="my full name"
        style={styles.input}
      />

      <Button
        onPress={() => updateProfile({ username, full_name })}
        disabled={loading}
        text={loading ? 'Updating profile...' : 'Update profile'}
      />
      
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
