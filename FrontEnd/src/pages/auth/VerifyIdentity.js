import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/theme';

export default function VerifyIdentityScreen({ email, flow, method, onNavigateToReset, onNavigateToLogin, onNavigateToForgot }) {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleVerify = async () => {
        setErrorMessage('');

        if (!code || code.length < 6) return setErrorMessage("Ingresa el código completo (6 dígitos)");

        if (flow === 'forgot') {
            onNavigateToReset(code);
        } else {
            try {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/auth/verify-account`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier: email, code })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    onNavigateToLogin();
                } else {
                    setErrorMessage(data.message || "Código inválido o expirado");
                }
            } catch (error) {
                setErrorMessage("Error de conexión al servidor");
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={onNavigateToForgot} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.logoText}>Validación</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.centerContent}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Valida tu identidad</Text>

                        {/* EL TEXTO CAMBIA SEGÚN LA ELECCIÓN */}
                        <Text style={styles.cardSubtitle}>
                            Ingresa el código de 6 dígitos que enviamos por {method === 'sms' ? 'SMS a tu celular' : 'correo electrónico'}.
                        </Text>

                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Código de verificación</Text>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="keypad-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="123456" placeholderTextColor="#94A3B8" value={code} onChangeText={setCode} keyboardType="numeric" maxLength={6} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleVerify}>
                            <Text style={styles.submitButtonText}>Verificar</Text>
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
    cardSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 20 },
    errorText: { color: Colors.light.danger, fontSize: 13, textAlign: 'center', marginBottom: 15, fontWeight: 'bold' },
    inputWrapper: { marginBottom: 20 },
    inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#334155', marginBottom: 6 },
    inputFieldContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 12, height: 44 },
    fieldIcon: { marginRight: 8 },
    input: { flex: 1, color: '#0B132B', fontSize: 14, letterSpacing: 4, textAlign: 'center' },
    submitButton: { backgroundColor: Colors.light.primary, borderRadius: 6, height: 46, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }
});