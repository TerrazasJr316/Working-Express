// src/app/(client)/_layout.tsx
import { Stack } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function ClientLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.light.background },
            }}
        >
            {/* Las pestañas principales */}
            <Stack.Screen name="(tabs)" />

            {/* Pantalla completa para ver a un prestador individual */}
            <Stack.Screen
                name="provider-[id]"
                options={{
                    headerShown: true,
                    headerTitle: 'Detalle del Servicio',
                    headerTintColor: Colors.light.primary,
                    headerStyle: { backgroundColor: Colors.light.surface }
                }}
            />
        </Stack>
    );
}