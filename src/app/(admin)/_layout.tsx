import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

export default function AdminTabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
    }}>
      


     {/* hide index.jsx showing in tab menu */}
     <Tabs.Screen
        // Name of the route to hide.
        name="index"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
          headerShown: false
        }}
      />



      {/* to show Menu tab */}
      <Tabs.Screen
        name="menu" //file or folder name
        options={{
          title: 'Menu', //display name on tab and header
          headerShown: false, //display name only on tab (bottom), header is hidden
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="cutlery" color={color} />,
        }}
      />
      


      {/* to show Orders tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="list" color={color} />,
        }}
      />


      {/* to show Profile tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="user" color={color} />,
        }}
      />


 
    </Tabs>
  );
}



/*import { Stack } from 'expo-router/stack';

export default function AppLayout() {
 
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />      
    </Stack>
  );                  
}*/