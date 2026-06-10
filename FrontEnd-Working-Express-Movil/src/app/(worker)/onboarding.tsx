// src/app/(professional)/onboarding.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfessionalOnboardingScreen() {
    const router = useRouter();
    const [oficio, setOficio] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleNext = () => {
        // Redirige a las pestañas del trabajador una vez completado
        router.replace('/(worker)/(tabs)');
    };

    const handleSkip = () => {
        router.replace('/(worker)/(tabs)');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* HEADER SUPERIOR */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <Ionicons name="arrow-back" size={22} color="#1E40AF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Working Express</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="notifications-outline" size={22} color="#0B132B" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* TARJETA BLANCA PRINCIPAL */}
                <View style={styles.formCard}>
                    <Text style={styles.cardTitle}>Especialidad y Experiencia del usuario/trabajador</Text>
                    <Text style={styles.cardSubtitle}>
                        Cuéntanos sobre tus habilidades para que los clientes puedan encontrarte fácilmente.
                    </Text>

                    {/* Selector de Oficio */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Selector de Oficio</Text>
                        <TouchableOpacity style={styles.dropdownField} activeOpacity={0.7}>
                            <Text style={styles.dropdownText}>
                                {oficio || 'Selecciona tu oficio o profesión'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    {/* Años de Experiencia */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Años de Experiencia</Text>
                        <View style={styles.experienceFieldContainer}>
                            <TextInput
                                style={styles.experienceInput}
                                keyboardType="numeric"
                                placeholder="0"
                                value={experiencia}
                                onChangeText={setExperiencia}
                            />
                            <Text style={styles.suffixText}>Años</Text>
                        </View>
                    </View>

                    {/* Descripción */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={styles.textArea}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                            placeholder="Describe detalladamente los servicios que ofreces, tus certificaciones y cualquier otra información relevante..."
                            placeholderTextColor="#94A3B8"
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />
                        <Text style={styles.helperText}>Mínimo 50 caracteres</Text>
                    </View>

                    {/* Botón Siguiente (Azul según diseño autorizado) */}
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>Siguiente →</Text>
                    </TouchableOpacity>

                    {/* Botón Omitir por ahora */}
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>Omitir por ahora</Text>
                    </TouchableOpacity>
                </View>

                {/* FOOTER DE PRIVACIDAD */}
                <View style={styles.privacyFooter}>
                    <Ionicons name="lock-closed-outline" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
                    <Text style={styles.privacyText}>
                        Tus datos están protegidos por el estándar de seguridad de Working Express.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#E2E8F0',
    },
    headerButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563EB', // Azul característico de la captura
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        alignItems: 'center',
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 440,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 32,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 12,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        fontFamily: 'monospace',
        marginBottom: 8,
    },
    dropdownField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#CBD5E1',
        paddingVertical: 10,
        paddingHorizontal: 4,
        minHeight: 44,
    },
    dropdownText: {
        fontSize: 14,
        color: '#94A3B8',
    },
    experienceFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#CBD5E1',
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    experienceInput: {
        flex: 1,
        fontSize: 15,
        color: '#000000',
        padding: 0,
    },
    suffixText: {
        fontSize: 13,
        color: '#64748B',
        fontFamily: 'monospace',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#F8FAFC', // Bordes casi invisibles o muy claros según diseño
        backgroundColor: '#FAFAFA',
        borderRadius: 6,
        padding: 12,
        fontSize: 14,
        color: '#000000',
        minHeight: 120,
    },
    helperText: {
        fontSize: 11,
        color: '#64748B',
        fontFamily: 'monospace',
        textAlign: 'right',
        marginTop: 6,
    },
    // Botón Siguiente Azul Rey de image_dfe25b
    nextButton: {
        backgroundColor: '#0252D9',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 12,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 8,
    },
    skipButtonText: {
        fontSize: 14,
        color: '#334155',
        fontFamily: 'monospace',
    },
    privacyFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        paddingHorizontal: 20,
        maxWidth: 400,
    },
    privacyText: {
        fontSize: 11,
        color: '#94A3B8',
        fontFamily: 'monospace',
        textAlign: 'center',
        lineHeight: 16,
    },
});