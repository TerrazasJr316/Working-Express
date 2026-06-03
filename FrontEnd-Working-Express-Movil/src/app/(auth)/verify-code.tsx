// src/app/(auth)/verify-code.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyCodeScreen() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(59);

    // Simulación del contador regresivo para el reenvío de SMS
    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer as NodeJS.Timeout);
    }, [countdown]);

    const handleVerify = () => {
        setLoading(true);

        // Simulación de respuesta correcta de la API de autenticación
        setTimeout(() => {
            setLoading(false);

            // REDIRECCIÓN A LA PANTALLA DE CREACIÓN DE NUEVA CONTRASEÑA
            router.push('/(auth)/reset-password');
        }, 1200);
    };

    return (
        <View style={styles.container}>
            {/* CONTENIDO CENTRAL */}
            <View style={styles.centerContent}>
                {/* Logo superior flotante */}
                <View style={styles.formLogoPlaceholder}>
                    <Ionicons name="flash" size={24} color={Colors.light.primary} />
                </View>

                {/* TARJETA BLANCA DE VALIDACIÓN */}
                <View style={styles.card}>
                    {/* Icono de Escudo de Seguridad */}
                    <View style={styles.securityIconContainer}>
                        <Ionicons name="shield-checkmark-outline" size={32} color="#0B132B" />
                    </View>

                    {/* Textos del Encabezado Interno */}
                    <Text style={styles.cardTitle}>Valida tu identidad</Text>
                    <Text style={styles.cardSubtitle}>
                        Introduce el código de verificación que enviamos por SMS o WhatsApp
                    </Text>

                    {/* Campo: Código de Verificación */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Código de verificación</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="000-000"
                                placeholderTextColor="#CBD5E1"
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                maxLength={7}
                                textAlign="center" // Centrado exacto como en el diseño
                            />
                        </View>
                    </View>

                    {/* Botón "Verificar" */}
                    <TouchableOpacity
                        style={[styles.submitButton, !code && styles.submitButtonDisabled]}
                        onPress={handleVerify}
                        disabled={loading || !code}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <View style={styles.buttonContentRow}>
                                <Text style={styles.submitButtonText}>Verificar </Text>
                                <Ionicons name="checkmark-done-circle-outline" size={18} color="#FFFFFF" />
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Sección de Reenvío */}
                    <View style={styles.retryContainer}>
                        <TouchableOpacity disabled={countdown > 0}>
                            <Text style={[styles.retryTitle, countdown > 0 && styles.retryTitleDisabled]}>
                                Reenviar código
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.retrySubtitle}>
                            {countdown > 0 ? `¿No recibiste nada? Reintenta en ${countdown}s` : 'Ya puedes solicitar un nuevo código'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* FOOTER CORPORATIVO DE SEGURIDAD */}
            <View style={styles.footer}>
                <Text style={styles.footerCopyright}>© 2024 Working Express. Seguridad Garantizada.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    formLogoPlaceholder: {
        width: 65,
        height: 40,
        backgroundColor: '#0B132B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    // Tarjeta de Validación Alargada
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 420,
        borderRadius: 16,
        paddingHorizontal: 24,
        paddingVertical: 36,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...Shadows.sm,
        alignItems: 'center', // Alinea los componentes internos
    },
    securityIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0B132B',
        textAlign: 'center',
        marginBottom: 12,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
        paddingHorizontal: 10,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#334155',
        fontFamily: 'monospace',
        marginBottom: 8,
        textAlign: 'left',
    },
    inputFieldContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
    },
    input: {
        color: '#0B132B',
        fontSize: 16,
        fontFamily: 'monospace',
        letterSpacing: 2, // Espaciado de los dígitos del código
    },
    submitButton: {
        backgroundColor: Colors.light.primary,
        width: '100%',
        borderRadius: 8,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
    },
    submitButtonDisabled: {
        opacity: 0.85,
    },
    buttonContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    // Sección Reenvío
    retryContainer: {
        alignItems: 'center',
        gap: 6,
    },
    retryTitle: {
        fontSize: 14,
        color: '#0B132B',
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    retryTitleDisabled: {
        color: '#334155',
    },
    retrySubtitle: {
        fontSize: 12,
        color: '#64748B',
        fontFamily: 'monospace',
    },
    // Footer Dedicado
    footer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    footerCopyright: {
        color: '#94A3B8',
        fontSize: 12,
        fontFamily: 'monospace',
    },
});