import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../../constants/theme';

export default function RegisterScreen({ onNavigateToLogin, onNavigateToVerify }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CLIENTE');
    const [validationMethod, setValidationMethod] = useState('email'); // <-- NUEVO ESTADO
    const [secureText, setSecureText] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        setErrorMessage('');
        if (!name || !email || !phone || !password) {
            setErrorMessage("Todos los campos son obligatorios");
            return;
        }

        try {
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email: email.trim(),
                    phone: phone.trim(),
                    password,
                    role,
                    validationMethod // <-- Mandamos la elección real al backend
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                onNavigateToVerify(email.trim(), validationMethod); // Mandamos la elección al App.js
            } else {
                setErrorMessage(data.message || "Error al registrar la cuenta");
            }
        } catch (error) {
            setErrorMessage("Error de conexión con el servidor");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={styles.logoRow}>
                        <Ionicons name="flash" size={18} color={Colors.light.primary} />
                        <Text style={styles.logoText}>Working Express</Text>
                    </View>
                </View>

                <View style={styles.centerContent}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Crea tu cuenta</Text>
                        <Text style={styles.cardSubtitle}>Únete a la plataforma líder de oficios</Text>

                        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                        {/* SELECTOR DE ROL */}
                        <Text style={styles.inputLabel}>¿Qué buscas en la app?</Text>
                        <View style={styles.selectorContainer}>
                            <TouchableOpacity style={[styles.selectorButton, role === 'CLIENTE' && styles.clientActive]} onPress={() => setRole('CLIENTE')}>
                                <Ionicons name="search" size={18} color={role === 'CLIENTE' ? '#DC2626' : '#64748B'} />
                                <Text style={[styles.selectorText, role === 'CLIENTE' && { color: '#DC2626' }]}>Contratar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.selectorButton, role === 'TRABAJADOR' && styles.workerActive]} onPress={() => setRole('TRABAJADOR')}>
                                <Ionicons name="briefcase" size={18} color={role === 'TRABAJADOR' ? Colors.light.primary : '#64748B'} />
                                <Text style={[styles.selectorText, role === 'TRABAJADOR' && { color: Colors.light.primary }]}>Trabajar</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="person-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="Nombre Completo" placeholderTextColor="#94A3B8" value={name} onChangeText={setName} />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="mail-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="Correo Electrónico" placeholderTextColor="#94A3B8" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="call-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="Teléfono (10 dígitos)" placeholderTextColor="#94A3B8" value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#94A3B8" value={password} onChangeText={setPassword} secureTextEntry={secureText} autoCapitalize="none" />
                                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                    <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={18} color="#94A3B8" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* NUEVO: SELECTOR DE MÉTODO DE VALIDACIÓN TWILIO/CORREO */}
                        <Text style={styles.inputLabel}>¿Cómo quieres verificar tu cuenta?</Text>
                        <View style={styles.selectorContainer}>
                            <TouchableOpacity style={[styles.selectorButton, validationMethod === 'email' && styles.methodActive]} onPress={() => setValidationMethod('email')}>
                                <Ionicons name="mail" size={18} color={validationMethod === 'email' ? '#0052CC' : '#64748B'} />
                                <Text style={[styles.selectorText, validationMethod === 'email' && { color: '#0052CC' }]}>Por Correo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.selectorButton, validationMethod === 'sms' && styles.methodActive]} onPress={() => setValidationMethod('sms')}>
                                <Ionicons name="chatbubble" size={18} color={validationMethod === 'sms' ? '#0052CC' : '#64748B'} />
                                <Text style={[styles.selectorText, validationMethod === 'sms' && { color: '#0052CC' }]}>Por SMS</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
                            <Text style={styles.submitButtonText}>Registrarme</Text>
                        </TouchableOpacity>

                        <View style={styles.registerRow}>
                            <Text style={styles.noAccountText}>¿Ya tienes cuenta? </Text>
                            <TouchableOpacity onPress={onNavigateToLogin}>
                                <Text style={styles.registerLink}>Inicia Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({ scrollContainer: { flexGrow: 1 }, container: { flex: 1, backgroundColor: '#F8FAFC' }, navbar: { backgroundColor: Colors.light.secondary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }, logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, logoText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }, centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 }, card: { backgroundColor: '#FFFFFF', width: '100%', maxWidth: 420, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 32, borderWidth: 1, borderColor: '#E2E8F0', ...Shadows.sm }, cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#0B132B', textAlign: 'center', marginBottom: 6 }, cardSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 24 }, errorText: { color: Colors.light.danger, fontSize: 13, textAlign: 'center', marginBottom: 15, fontWeight: 'bold' }, selectorContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 20, marginTop: 6 }, selectorButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, backgroundColor: '#F1F5F9' }, clientActive: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' }, workerActive: { borderColor: Colors.light.primary, backgroundColor: '#ECFDF5' }, methodActive: { borderColor: '#0052CC', backgroundColor: '#EFF6FF' }, selectorText: { fontWeight: 'bold', color: '#64748B' }, inputWrapper: { marginBottom: 16 }, inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#334155', marginBottom: 6 }, inputFieldContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 12, height: 44 }, fieldIcon: { marginRight: 8 }, input: { flex: 1, color: '#0B132B', fontSize: 14 }, submitButton: { backgroundColor: Colors.light.primary, borderRadius: 6, height: 46, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 24 }, submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }, registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, noAccountText: { fontSize: 13, color: '#475569' }, registerLink: { fontSize: 13, color: '#0052CC', fontWeight: 'bold' } });