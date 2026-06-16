import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/theme';

export default function ResetPasswordScreen({ recoveryData, onNavigateToLogin }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleConfirm = async () => {
        setErrorMessage('');

        if (!password || password !== confirmPassword) return setErrorMessage("Las contraseñas no coinciden");

        try {
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: recoveryData.email,
                    code: recoveryData.code,
                    newPassword: password,
                    validationMethod: recoveryData.method // <-- Twilio necesita saber que fue por SMS
                })
            });
            const data = await response.json();

            if (response.ok && data.success) {
                onNavigateToLogin();
            } else {
                setErrorMessage(data.message || "Error al restablecer la contraseña");
            }
        } catch (error) {
            setErrorMessage("Error de conexión al servidor");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={{ width: 24 }} />
                    <Text style={styles.logoText}>Nueva Contraseña</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.centerContent}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Ingresa tu nueva contraseña</Text>
                        <Text style={styles.cardSubtitle}>Asegúrate de que sea segura y fácil de recordar.</Text>

                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Nueva contraseña</Text>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#94A3B8" value={password} onChangeText={setPassword} secureTextEntry={secureText1} autoCapitalize="none" />
                                <TouchableOpacity onPress={() => setSecureText1(!secureText1)}>
                                    <Ionicons name={secureText1 ? "eye-outline" : "eye-off-outline"} size={18} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Confirmar contraseña</Text>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#94A3B8" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={secureText2} autoCapitalize="none" />
                                <TouchableOpacity onPress={() => setSecureText2(!secureText2)}>
                                    <Ionicons name={secureText2 ? "eye-outline" : "eye-off-outline"} size={18} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleConfirm}>
                            <Text style={styles.submitButtonText}>Confirmar</Text>
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