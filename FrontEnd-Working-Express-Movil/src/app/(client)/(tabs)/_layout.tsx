// src/app/(client)/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Colors } from '../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ClientTabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.light.primary,
                tabBarInactiveTintColor: Colors.light.icon,
                tabBarStyle: {
                    backgroundColor: Colors.light.surface,
                    borderTopWidth: 1,
                    borderTopColor: Colors.light.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                headerShown: false, // Diseñaremos nuestros propios headers en las pantallas
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explorar',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Mis Servicios',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'briefcase' : 'briefcase-outline'} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}