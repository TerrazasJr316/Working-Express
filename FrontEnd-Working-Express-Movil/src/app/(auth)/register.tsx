// src/app/(auth)/register.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type Role = 'client' | 'worker';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('client'); // 'client' por defecto
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        if (!name || !email || !password) return;

        setLoading(true);
        // Simulación del registro en el FrontEnd
        setTimeout(() => {
            setLoading(false);
            // Redirigimos al flujo correspondiente según el rol seleccionado
            if (role === 'client') {
                router.replace('/(client)/(tabs)');
            } else {
                router.replace('/(worker)/(tabs)');
            }
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Crea tu Cuenta</Text>
                    <Text style={styles.subtitle}>Únete a la comunidad de WorkingExpress</Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Selector de Rol */}
                    <Text style={styles.label}>¿Cómo usarás la aplicación?</Text>
                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                            style={[styles.roleCard, role === 'client' && styles.roleCardActive]}
                            onPress={() => setRole('client')}
                            activeOpacity={0.9}
                        >
                            <Text style={[styles.roleEmoji, role === 'client' && styles.roleTextActive]}>🛒</Text>
                            <Text style={[styles.roleTitle, role === 'client' && styles.roleTextActive]}>Soy Cliente</Text>
                            <Text style={[styles.roleDesc, role === 'client' && styles.roleDescActive]}>Quiero contratar servicios locales.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.roleCard, role === 'worker' && styles.roleCardActive]}
                            onPress={() => setRole('worker')}
                            activeOpacity={0.9}
                        >
                            <Text style={[styles.roleEmoji, role === 'worker' && styles.roleTextActive]}>🛠️</Text>
                            <Text style={[styles.roleTitle, role === 'worker' && styles.roleTextActive]}>Ofrecer Servicio</Text>
                            <Text style={[styles.roleDesc, role === 'worker' && styles.roleDescActive]}>Quiero ofrecer mis oficios a la comunidad.</Text>
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Nombre Completo"
                        placeholder="Juan Pérez"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                    />

                    <Input
                        label="Correo Electrónico"
                        placeholder="ejemplo@correo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        label="Contraseña"
                        placeholder="Mínimo 6 caracteres"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Button
                        title="Registrarme"
                        loading={loading}
                        onPress={handleRegister}
                        disabled={!name || !email || !password}
                    />

                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.loginLink}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 28,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.light.text,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.textSecondary,
        textAlign: 'center',
        marginTop: 6,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 10,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
        width: '100%',
    },
    roleCard: {
        flex: 1,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        textAlign: 'center',
    },
    roleCardActive: {
        borderColor: Colors.light.primary,
        backgroundColor: '#EBF5FF', // Tono azul muy ligero para indicar selección
    },
    roleEmoji: {
        fontSize: 24,
        marginBottom: 6,
    },
    roleTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    roleDesc: {
        fontSize: 11,
        color: Colors.light.textSecondary,
        textAlign: 'center',
    },
    roleTextActive: {
        color: Colors.light.primary,
    },
    roleDescActive: {
        color: '#3B82F6',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: Colors.light.textSecondary,
        fontSize: 14,
    },
    loginLink: {
        color: Colors.light.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});