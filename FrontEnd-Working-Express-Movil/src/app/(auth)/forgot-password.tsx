// src/app/(auth)/forgot-password.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCode = () => {
        setLoading(true);

        // Simulación de envío exitoso de la petición SMS
        setTimeout(() => {
            setLoading(false);

            // REDIRECCIÓN AUTOMÁTICA AL FLUJO DE VALIDACIÓN
            router.push('/(auth)/verify-code');
        }, 1200);
    };

    return (
        <View style={styles.container}>
            {/* CONTENIDO CENTRAL */}
            <View style={styles.centerContent}>
                {/* Logo superior de marca */}
                <View style={styles.formLogoPlaceholder}>
                    <Ionicons name="flash" size={24} color={Colors.light.primary} />
                </View>

                {/* Textos Informativos Fuera de la Tarjeta */}
                <Text style={styles.mainTitle}>¿Olvidaste tu contraseña?</Text>
                <Text style={styles.mainSubtitle}>
                    Introduce tu número de teléfono para recibir un código de restablecimiento
                </Text>

                {/* TARJETA BLANCA */}
                <View style={styles.card}>
                    {/* Campo: Número de teléfono */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Número de teléfono</Text>
                        <View style={styles.inputFieldContainer}>
                            <Ionicons name="smartphone-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="+34 600 000 000"
                                placeholderTextColor="#94A3B8"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Botón Principal */}
                    <TouchableOpacity
                        style={[styles.submitButton, !phone && styles.submitButtonDisabled]}
                        onPress={handleSendCode}
                        disabled={loading || !phone}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>Enviar código  ➔</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Enlace de retorno inferior */}
                <TouchableOpacity
                    style={styles.backToLoginRow}
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Text style={styles.backToLoginText}>← Volver a iniciar sesión</Text>
                </TouchableOpacity>
            </View>

            {/* FOOTER CORPORATIVO SIMPLE */}
            <View style={styles.footer}>
                <Text style={styles.footerCopyright}>© 2024 Working Express. All rights reserved.</Text>
                <View style={styles.footerLinks}>
                    <Text style={styles.footerLinkText}>Privacy Policy</Text>
                    <Text style={styles.footerLinkText}>Terms of Service</Text>
                </View>
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
        marginTop: 20,
    },
    formLogoPlaceholder: {
        width: 65,
        height: 40,
        backgroundColor: '#0B132B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#0B132B',
        textAlign: 'center',
        marginBottom: 12,
    },
    mainSubtitle: {
        fontSize: 15,
        color: '#334155',
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 340,
        marginBottom: 36,
    },
    // Estilo Tarjeta Corta
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 420,
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 28,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...Shadows.sm,
        marginBottom: 32,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#334155',
        fontFamily: 'monospace',
        marginBottom: 8,
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
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
    submitButton: {
        backgroundColor: Colors.light.primary,
        borderRadius: 6,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    submitButtonDisabled: {
        opacity: 0.8,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'monospace',
    },
    // Retorno
    backToLoginRow: {
        paddingVertical: 8,
    },
    backToLoginText: {
        fontSize: 14,
        color: '#0B132B',
        fontWeight: '500',
        fontFamily: 'monospace',
    },
    // Footer
    footer: {
        paddingVertical: 24,
        alignItems: 'center',
        gap: 8,
    },
    footerCopyright: {
        color: '#94A3B8',
        fontSize: 12,
        fontFamily: 'monospace',
    },
    footerLinks: {
        flexDirection: 'row',
        gap: 16,
    },
    footerLinkText: {
        color: '#64748B',
        fontSize: 12,
        fontFamily: 'monospace',
    },
});