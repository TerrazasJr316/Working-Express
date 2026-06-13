// src/app/_layout.tsx
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

// Importación opcional de tus estilos globales si usas NativeWind
import '../global.css'; 

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      {/* Configura la barra de estado superior del celular (batería, hora, etc.) */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Stack principal que maneja los flujos globales de la app */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Monitorea la ruta index (nuestro enrutador inteligente) */}
        <Stack.Screen name="index" />
        
        {/* Bloque de autenticación */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* Bloques de flujos principales (se usarán al iniciar sesión) */}
        <Stack.Screen name="(client)" options={{ headerShown: false }} />
        <Stack.Screen name="(worker)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}