// src/app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Oculta la barra superior nativa para un diseño limpio
                contentStyle: { backgroundColor: Colors.light.background },
                animation: 'slide_from_right', // Transición suave y nativa entre pantallas
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}