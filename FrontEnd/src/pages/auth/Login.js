import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Shadows } from '../../constants/theme';

export default function LoginScreen({ onNavigateToRegister, onNavigateToForgot }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage("Por favor, llena todos los campos");
            return console.warn("Intento fallido: Campos vacíos");
        }

        try {
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: email.trim(), password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // GUARDADO PERSISTENTE DEL TOKEN Y DATOS DEL USUARIO
                await AsyncStorage.setItem('userToken', data.data.token);
                await AsyncStorage.setItem('userData', JSON.stringify(data.data));

                console.log("¡Login Exitoso! Usuario:", data.data.id);
                // Aquí en el futuro lo enviaremos al Dashboard principal
            } else {
                setErrorMessage(data.message || "Credenciales inválidas");
                console.error("Error del backend:", data.message);
            }
        } catch (error) {
            setErrorMessage("Error de conexión con el servidor");
            console.error("Error de red:", error);
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
                    <View style={styles.formLogoPlaceholder}>
                        <Ionicons name="flash-outline" size={32} color={Colors.light.primary} />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Bienvenido a Working Express</Text>
                        <Text style={styles.cardSubtitle}>Accede a tu plataforma de trabajo</Text>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Correo o Teléfono</Text>
                            <View style={styles.inputFieldContainer}>
                                <Ionicons name="person-outline" size={18} color="#94A3B8" style={styles.fieldIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="correo o télefono"
                                    placeholderTextColor="#94A3B8"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.labelRow}>
                                <Text style={styles.inputLabel}>Contraseña</Text>
                                <TouchableOpacity onPress={onNavigateToForgot}>
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

                        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                            <Text style={styles.submitButtonText}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.registerRow}>
                            <Text style={styles.noAccountText}>¿No tienes cuenta? </Text>
                            <TouchableOpacity onPress={onNavigateToRegister}>
                                <Text style={styles.registerLink}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },
    navbar: {
        backgroundColor: Colors.light.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    formLogoPlaceholder: {
        width: 65,
        height: 45,
        backgroundColor: '#0B132B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 420,
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...Shadows.sm
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0B132B',
        textAlign: 'center',
        marginBottom: 6
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 28
    },
    inputWrapper: {
        marginBottom: 20
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#334155'
    },
    forgotPasswordText: {
        fontSize: 11,
        color: '#DC2626'
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 6,
        paddingHorizontal: 12,
        height: 44
    },
    fieldIcon: {
        marginRight: 8
    },
    input: {
        flex: 1,
        color: '#0B132B',
        fontSize: 14
    },
    submitButton: {
        backgroundColor: Colors.light.primary,
        borderRadius: 6,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 24
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noAccountText: {
        fontSize: 13,
        color: '#475569'
    },
    registerLink: {
        fontSize: 13,
        color: '#0052CC',
        fontWeight: 'bold'
    }
});