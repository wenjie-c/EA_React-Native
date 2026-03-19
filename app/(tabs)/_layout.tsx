import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs style={{ borderTopWidth: 1, borderTopColor: '#007AFF' }} screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="organization"
        options={{
          title: 'Organización',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="business" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuarios',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
