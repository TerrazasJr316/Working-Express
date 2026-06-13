// src/app/(worker)/_layout.tsx
import { Stack } from 'expo-router';

export default function WorkerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Declaramos el formulario de onboarding */}
            <Stack.Screen name="onboarding" />
            {/* Declaramos el contenedor de las pestañas */}
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}