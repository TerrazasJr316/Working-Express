import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/theme';

export default function ForgotPasswordScreen({ onNavigateToVerify, onNavigateToLogin }) {
    const [email, setEmail] = useState('');
    const [validationMethod, setValidationMethod] = useState('email');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendCode = async () => {
        setErrorMessage('');
        if (!email) {
            setErrorMessage("Ingresa tu correo electrónico");
            return console.warn("Intento fallido: Correo vacío");
        }

        try {
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: email.trim(), // <-- Tu backend espera "identifier"
                    validationMethod
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log("Código enviado con éxito");
                onNavigateToVerify(email.trim(), validationMethod);
            } else {
                setErrorMessage(data.message || "Error al enviar el código");
                console.error("Error del backend:", data.message);
            }
        } catch (error) {
            setErrorMessage("Error de conexión al servidor");
            console.error("Error de red:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={onNavigateToLogin} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.logoText}>Recuperar Cuenta</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.centerContent}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>¿Olvidaste tu contraseña?</Text>
                        <Text style={styles.cardSubtitle}>Ingresa tu correo para enviarte un código de recuperación.</Text>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Correo Electrónico</Text>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="mail-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="nombre@ejemplo.com"
                                    placeholderTextColor="#94A3B8"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSendCode}>
                            <Text style={styles.submitButtonText}>Enviar código</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1 },
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    navbar: { backgroundColor: Colors.light.secondary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20 },
    backButton: { padding: 4 },
    logoText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
    card: { backgroundColor: '#FFFFFF', width: '100%', maxWidth: 420, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 32, borderWidth: 1, borderColor: '#E2E8F0', ...Shadows.sm },
    cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#0B132B', textAlign: 'center', marginBottom: 6 },
    cardSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 24 },
    inputWrapper: { marginBottom: 20 },
    inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#334155', marginBottom: 6 },
    inputFieldContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 12, height: 44 },
    fieldIcon: { marginRight: 8 },
    input: { flex: 1, color: '#0B132B', fontSize: 14 },
    submitButton: { backgroundColor: Colors.light.primary, borderRadius: 6, height: 46, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }
});