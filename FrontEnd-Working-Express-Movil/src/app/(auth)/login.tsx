// src/app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);

        // Simulación de validación exitosa de credenciales de la API
        setTimeout(() => {
            setLoading(false);

            // REDIRECCIÓN A LA PANTALLA DE SELECCIÓN DE ROL
            router.push('/(auth)/select-profile');
        }, 1000);
    };

    return (
        <View style={styles.container}>
            {/* NAVBAR SUPERIOR */}
            <View style={styles.navbar}>
                <View style={styles.logoRow}>
                    <Ionicons name="flash" size={18} color={Colors.light.primary} />
                    <Text style={styles.logoText}>Working Express</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.navHelpText}>Ayuda</Text>
                </TouchableOpacity>
            </View>

            {/* CONTENIDO CENTRAL */}
            <View style={styles.centerContent}>
                {/* Logo superior del formulario */}
                <View style={styles.formLogoPlaceholder}>
                    <Ionicons name="flash-style" size={32} color={Colors.light.primary} />
                </View>

                {/* TARJETA DEL FORMULARIO */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Bienvenido de nuevo</Text>
                    <Text style={styles.cardSubtitle}>Accede a tu plataforma de trabajo</Text>

                    {/* Campo: Correo Electrónico */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Correo Electrónico</Text>
                        <View style={styles.inputFieldContainer}>
                            <Ionicons name="mail-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="nombre@empresa.com"
                                placeholderTextColor="#94A3B8"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    {/* Campo: Contraseña */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.labelRow}>
                            <Text style={styles.inputLabel}>Contraseña</Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputFieldContainer}>
                            <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#94A3B8"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureText}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Botón Principal "Entrar ➔" */}
                    <TouchableOpacity
                        style={[styles.submitButton, (!email || !password) && styles.submitButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading || !email || !password}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>Entrar  ➔</Text>
                        )}
                    </TouchableOpacity>

                    {/* Enlace de Registro */}
                    <View style={styles.registerRow}>
                        <Text style={styles.noAccountText}>No tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text style={styles.registerLink}>Regístrate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* FOOTER CORPORATIVO */}
            <View style={styles.footer}>
                <Text style={styles.footerCopyright}>© 2024 Working Express. All rights reserved.</Text>
                <View style={styles.footerLinks}>
                    <Text style={styles.footerLinkText}>Privacidad</Text>
                    <Text style={styles.footerLinkText}>Términos</Text>
                    <Text style={styles.footerLinkText}>Centro de Ayuda</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC', // Fondo gris claro idéntico
    },
    // Navbar
    navbar: {
        backgroundColor: Colors.light.secondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    navHelpText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'Courier', // Simula toque monospace si está disponible, o limpio estándar
    },
    // Contenido Central
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: -40, // Centra visualmente compensando la barra superior
    },
    formLogoPlaceholder: {
        width: 65,
        height: 45,
        backgroundColor: '#0B132B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    // Tarjeta (Card)
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 420, // Previene que se estire demasiado en Web
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...Shadows.sm,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0B132B',
        textAlign: 'center',
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 28,
    },
    // Inputs estilo imagen_03a808
    inputWrapper: {
        marginBottom: 20,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#334155',
        fontFamily: 'monospace', // Toque técnico del diseño original
    },
    forgotPasswordText: {
        fontSize: 11,
        color: '#DC2626', // Rojo de la captura
        fontFamily: 'monospace',
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9', // Fondo grisáceo claro interno
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 6,
        paddingHorizontal: 12,
        height: 44,
    },
    fieldIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#0B132B',
        fontSize: 14,
        fontFamily: 'monospace',
    },
    // Botón "Entrar ➔"
    submitButton: {
        backgroundColor: Colors.light.primary, // Verde esmeralda
        borderRadius: 6,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 24,
    },
    submitButtonDisabled: {
        opacity: 0.8, // Mantiene presencia visual pero reduce ligeramente
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    // Enlace inferior de registro
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noAccountText: {
        fontSize: 13,
        color: '#475569',
        fontFamily: 'monospace',
    },
    registerLink: {
        fontSize: 13,
        color: '#0052CC', // Azul del enlace "Regístrate"
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    // Footer
    footer: {
        paddingVertical: 24,
        alignItems: 'center',
        gap: 6,
    },
    footerCopyright: {
        color: '#64748B',
        fontSize: 11,
        fontFamily: 'monospace',
    },
    footerLinks: {
        flexDirection: 'row',
        gap: 12,
    },
    footerLinkText: {
        color: '#475569',
        fontSize: 11,
        fontFamily: 'monospace',
    },
});