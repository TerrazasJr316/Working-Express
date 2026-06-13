// src/app/(auth)/select-profile.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SelectProfileScreen() {
    const router = useRouter();

    const handleSelectRole = (role: 'client' | 'professional') => {
        if (role === 'client') {
            router.replace('/');
        } else {
            // Apuntamos a la ubicación correcta dentro de tu árbol de carpetas
            router.replace('/(worker)/onboarding');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* LOGO SUPERIOR */}
            <View style={styles.logoContainer}>
                <Ionicons name="flash" size={24} color={Colors.light.primary} />
            </View>

            {/* ENCABEZADO */}
            <Text style={styles.mainTitle}>¿Cómo quieres usar Working Express?</Text>
            <Text style={styles.mainSubtitle}>
                Selecciona tu perfil para comenzar. Puedes cambiar o añadir otro perfil más tarde desde tu configuración.
            </Text>

            {/* TARJETA 1: BUSCO UN PROFESIONAL (CLIENTE) */}
            <View style={styles.profileCard}>
                <View style={styles.iconBadge}>
                    <Ionicons name="person-search-outline" size={28} color="#0B132B" />
                </View>
                <Text style={styles.cardTitle}>Busco un profesional</Text>
                <Text style={styles.cardDescription}>
                    Encuentra expertos para tus proyectos o tareas del hogar.
                </Text>
                <TouchableOpacity
                    style={styles.darkButton}
                    onPress={() => handleSelectRole('client')}
                >
                    <Text style={styles.darkButtonText}>ENTRAR COMO CLIENTE</Text>
                </TouchableOpacity>
            </View>

            {/* TARJETA 2: QUIERO OFRECER MIS SERVICIOS (PROFESIONAL) */}
            <View style={styles.profileCard}>
                <View style={styles.iconBadge}>
                    <MaterialCommunityIcons name="account-wrench-outline" size={28} color="#0B132B" />
                </View>
                <Text style={styles.cardTitle}>Quiero ofrecer mis servicios</Text>
                <Text style={styles.cardDescription}>
                    Únete a nuestra red de profesionales y haz crecer tu negocio.
                </Text>
                <TouchableOpacity
                    style={styles.greenButton}
                    onPress={() => handleSelectRole('professional')}
                >
                    <Text style={styles.greenButtonText}>ENTRAR COMO PROFESIONAL</Text>
                </TouchableOpacity>
            </View>

            {/* BANNER 1: IMPULSA TU CARRERA */}
            <View style={styles.darkBanner}>
                <View style={styles.bannerTextContainer}>
                    <Text style={styles.darkBannerTitle}>Impulsa tu carrera</Text>
                    <Text style={styles.darkBannerSubtitle}>
                        Accede a miles de oportunidades laborales verificadas cada día.
                    </Text>
                </View>
                <View style={styles.bannerImagePlaceholder}>
                    <Ionicons name="image-outline" size={24} color="#475569" />
                </View>
            </View>

            {/* BANNER 2: SEGURIDAD TOTAL */}
            <View style={styles.lightBanner}>
                <View style={styles.shieldIconContainer}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#34D399" />
                </View>
                <View style={styles.bannerTextContainer}>
                    <Text style={styles.lightBannerTitle}>SEGURIDAD TOTAL</Text>
                    <Text style={styles.lightBannerSubtitle}>
                        Pagos protegidos y perfiles validados para tu tranquilidad.
                    </Text>
                </View>
            </View>

            {/* FOOTER CORPORATIVO */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Working Express. All rights reserved.</Text>
                <View style={styles.footerLinksRow}>
                    <Text style={styles.footerLink}>Terms of Service</Text>
                    <Text style={styles.footerLink}>Privacy Policy</Text>
                </View>
                <View style={styles.footerLinksRow}>
                    <Text style={styles.footerLink}>Contact Support</Text>
                    <Text style={styles.footerLink}>About Us</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    logoContainer: {
        width: 65,
        height: 40,
        backgroundColor: '#0B132B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0B132B',
        textAlign: 'center',
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    mainSubtitle: {
        fontSize: 14,
        color: '#475569',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
        maxWidth: 400,
    },
    // Estilo de las tarjetas de perfil
    profileCard: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: 400,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 24,
        ...Shadows.sm,
    },
    iconBadge: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0B132B',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    // Botón Oscuro (Cliente)
    darkButton: {
        backgroundColor: '#0B132B',
        width: '100%',
        height: 46,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    darkButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
    },
    // Botón Verde (Profesional)
    greenButton: {
        backgroundColor: '#34D399',
        width: '100%',
        height: 46,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greenButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
    },
    // Banner Oscuro (Impulsa tu carrera)
    darkBanner: {
        flexDirection: 'row',
        backgroundColor: '#0B132B',
        width: '100%',
        maxWidth: 400,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    bannerTextContainer: {
        flex: 1,
        paddingRight: 8,
    },
    darkBannerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    darkBannerSubtitle: {
        color: '#94A3B8',
        fontSize: 12,
        lineHeight: 16,
    },
    bannerImagePlaceholder: {
        width: 60,
        height: 50,
        backgroundColor: '#1E293B',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Banner Claro (Seguridad Total)
    lightBanner: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        width: '100%',
        maxWidth: 400,
        borderRadius: 12,
        padding: 16,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 40,
    },
    shieldIconContainer: {
        marginTop: 2,
        marginRight: 12,
    },
    lightBannerTitle: {
        color: '#334155',
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'monospace',
        marginBottom: 4,
    },
    lightBannerSubtitle: {
        color: '#475569',
        fontSize: 13,
        lineHeight: 18,
    },
    // Footer Estilo Corporativo
    footer: {
        alignItems: 'center',
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#E2E8F0',
        paddingTop: 24,
        gap: 8,
    },
    footerText: {
        color: '#64748B',
        fontSize: 12,
        marginBottom: 8,
    },
    footerLinksRow: {
        flexDirection: 'row',
        gap: 24,
    },
    footerLink: {
        color: '#64748B',
        fontSize: 12,
        textDecorationLine: 'none',
    },
});