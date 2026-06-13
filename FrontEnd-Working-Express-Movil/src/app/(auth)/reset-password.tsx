// src/app/(auth)/reset-password.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureNew, setSecureNew] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleReset = () => {
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('¡Contraseña restablecida con éxito!');
            router.replace('/(auth)/login');
        }, 1500);
    };

    return (
        <View style={styles.container}>
            {/* CONTENIDO CENTRAL */}
            <View style={styles.centerContent}>
                {/* Logo superior de la app */}
                <View style={styles.logoContainer}>
                    <Ionicons name="flash" size={24} color={Colors.light.primary} />
                </View>

                {/* TARJETA OSCURA PERSONALIZADA */}
                <View style={styles.darkCard}>
                    <Text style={styles.cardTitle}>Crea tu nueva contraseña</Text>
                    <Text style={styles.cardSubtitle}>
                        Ingresa una contraseña segura para proteger tu cuenta.
                    </Text>

                    {/* Campo: Nueva Contraseña */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Nueva Contraseña</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#475569"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={secureNew}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
                                <Ionicons name={secureNew ? "eye-outline" : "eye-off-outline"} size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Campo: Confirmar Contraseña */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Confirmar Contraseña</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor="#475569"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={secureConfirm}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                                <Ionicons name={secureConfirm ? "eye-outline" : "eye-off-outline"} size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Botón Confirmar */}
                    <TouchableOpacity
                        style={[styles.submitButton, (!newPassword || !confirmPassword) && styles.submitButtonDisabled]}
                        onPress={handleReset}
                        disabled={loading || !newPassword || !confirmPassword}
                    >
                        {loading ? (
                            <ActivityIndicator color="#0B132B" />
                        ) : (
                            <Text style={styles.submitButtonText}>Confirmar</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Retorno al inicio */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(auth)/login')}>
                    <Text style={styles.backButtonText}>← Volver al inicio de sesión</Text>
                </TouchableOpacity>
            </View>

            {/* FOOTER CORPORATIVO DE NIVEL EMPRESARIAL */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    © 2024 Working Express. Seguridad de nivel empresarial.
                </Text>
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
    logoContainer: {
        width: 65,
        height: 40,
        backgroundColor: '#0B132B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    // Contenedor Oscuro de la captura image_02cac8
    darkCard: {
        backgroundColor: '#111827', // Gris muy oscuro / Azul noche profundo
        width: '100%',
        maxWidth: 420,
        borderRadius: 16,
        paddingHorizontal: 28,
        paddingVertical: 36,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    inputWrapper: {
        marginBottom: 22,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#34D399', // Color verde menta suave de la captura original
        fontFamily: 'monospace',
        marginBottom: 8,
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937', // Fondo del input ligeramente más claro que la tarjeta
        borderWidth: 1,
        borderColor: '#374151',
        borderRadius: 8,
        paddingHorizontal: 14,
        height: 48,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'monospace',
    },
    // Botón esmeralda plano sin flecha
    submitButton: {
        backgroundColor: '#34D399', // Menta/Esmeralda brillante
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
    },
    submitButtonDisabled: {
        opacity: 0.65,
    },
    submitButtonText: {
        color: '#0B132B', // Texto oscuro para contrastar con el fondo brillante
        fontSize: 18,
        fontWeight: '700',
    },
    // Botón de Retorno
    backButton: {
        marginTop: 28,
        paddingVertical: 8,
    },
    backButtonText: {
        fontSize: 14,
        color: '#1E293B',
        fontFamily: 'monospace',
        fontWeight: '500',
    },
    // Footer
    footer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 12,
        fontFamily: 'monospace',
    },
});