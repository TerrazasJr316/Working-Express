// src/app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. NAVBAR SUPERIOR (Oscuro) */}
      <View style={styles.navbar}>
        <View style={styles.logoRow}>
          <Ionicons name="flash" size={20} color={Colors.light.primary} />
          <Text style={styles.logoText}>Working Express</Text>
        </View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.navButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 2. HERO SECTION */}
        <View style={styles.heroSection}>
          {/* Marcador de posición para la ilustración superior */}
          <View style={styles.heroImagePlaceholder}>
            <Ionicons name="flash-style" size={50} color={Colors.light.primary} style={{ transform: [{ rotate: '15deg' }] }} />
          </View>

          <Text style={styles.heroTitle}>Impulsa tu Trabajo con Rapidez y Solidez</Text>
          <Text style={styles.heroSubtitle}>
            La plataforma líder para gestionar tus servicios con eficiencia express. Diseñada para profesionales que valoran cada segundo.
          </Text>

          <TouchableOpacity
            style={styles.ctaButtonPrimary}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.ctaPrimaryText}>Empezar ahora  ➔</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ctaButtonSecondary}>
            <Text style={styles.ctaSecondaryText}>Ver demostración</Text>
          </TouchableOpacity>
        </View>

        {/* 3. SECCIÓN PILARES */}
        <View style={styles.pilarsSection}>
          <Text style={styles.pilarsLabel}>NUESTROS PILARES</Text>
          <Text style={styles.pilarsTitle}>Excelencia en cada conexión</Text>

          {/* Tarjeta: Rapidez */}
          <View style={styles.pilarCard}>
            <View style={[styles.pilarIconBox, { backgroundColor: '#E6F6F0' }]}>
              <Ionicons name="flash-outline" size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.pilarCardTitle}>Rapidez</Text>
            <Text style={styles.pilarCardDesc}>
              Optimización de flujos de trabajo que reducen el tiempo de respuesta en un 40%. La agilidad es nuestro motor principal.
            </Text>
          </View>

          {/* Tarjeta: Confianza */}
          <View style={styles.pilarCard}>
            <View style={[styles.pilarIconBox, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#4F46E5" />
            </View>
            <Text style={styles.pilarCardTitle}>Confianza</Text>
            <Text style={styles.pilarCardDesc}>
              Seguridad de nivel corporativo para todas tus transacciones y datos. Trabajamos bajo los estándares más exigentes.
            </Text>
          </View>

          {/* Tarjeta: Simplicidad */}
          <View style={styles.pilarCard}>
            <View style={[styles.pilarIconBox, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="shapes-outline" size={20} color="#475569" />
            </View>
            <Text style={styles.pilarCardTitle}>Simplicidad</Text>
            <Text style={styles.pilarCardDesc}>
              Interfaz intuitiva que no requiere curva de aprendizaje. Enfócate en lo que importa: tu trabajo y tus clientes.
            </Text>
          </View>
        </View>

        {/* 4. SECCIÓN INTERMEDIA (Banner Imagen Opcional) */}
        <View style={styles.bannerImageContainer}>
          <View style={styles.bannerGradientMock}>
            <Ionicons name="image-outline" size={32} color="#FFF" style={{ opacity: 0.5, marginBottom: 8 }} />
            <Text style={styles.bannerImageText}>Potenciando a equipos de alto rendimiento.</Text>
          </View>
        </View>

        {/* 5. SECCIÓN FINAL ACCIÓN */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>¿Listo para evolucionar?</Text>
          <Text style={styles.promoSubtitle}>
            Únete a los más de 10,000 profesionales que ya están transformando su productividad diaria.
          </Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Solicitar una demo</Text>
          </TouchableOpacity>
        </View>

        {/* 6. FOOTER CORPORATIVO */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Working Express</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLinkText}>Privacy Policy</Text>
            <Text style={styles.footerLinkText}>Terms of Service</Text>
            <Text style={styles.footerLinkText}>Help Center</Text>
          </View>
          <Text style={styles.footerCopyright}>© 2024 Working Express. All rights reserved.</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Navbar
  navbar: {
    backgroundColor: Colors.light.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  navButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  // Hero
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  heroImagePlaceholder: {
    width: '85%',
    height: 140,
    backgroundColor: '#0B132B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.light.secondary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  ctaButtonPrimary: {
    backgroundColor: Colors.light.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  ctaButtonSecondary: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.light.border,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaSecondaryText: {
    color: Colors.light.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  // Pilares
  pilarsSection: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  pilarsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4F46E5',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  pilarsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
    marginBottom: 24,
  },
  pilarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Shadows.sm,
  },
  pilarIconBox: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  pilarCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.secondary,
    marginBottom: 8,
  },
  pilarCardDesc: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  // Banner Intermedio
  bannerImageContainer: {
    paddingHorizontal: 24,
    backgroundColor: Colors.light.background,
    paddingBottom: 40,
  },
  bannerGradientMock: {
    height: 150,
    borderRadius: 12,
    backgroundColor: '#334155',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bannerImageText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  // Promo final
  promoSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.secondary,
    marginBottom: 12,
  },
  promoSubtitle: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  promoButton: {
    backgroundColor: Colors.light.accent,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  // Footer
  footer: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignItems: 'center',
  },
  footerLogo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  footerLinkText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  footerCopyright: {
    color: '#64748B',
    fontSize: 11,
  },
});