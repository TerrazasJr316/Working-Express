// src/components/ProviderCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Shadows } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface ProviderCardProps {
    name: string;
    serviceType: string;
    rating: number;
    completedJobs: number;
    onPress: () => void;
}

export default function ProviderCard({ name, serviceType, rating, completedJobs, onPress }: ProviderCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            {/* Avatar/Imagen simulada basada en el oficio */}
            <View style={styles.avatarContainer}>
                <Ionicons name="person" size={32} color={Colors.light.icon} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.serviceType}>{serviceType}</Text>
                <Text style={styles.name}>{name}</Text>

                <View style={styles.statsRow}>
                    <View style={styles.ratingBox}>
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.jobsText}>• {completedJobs} trabajos</Text>
                </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        ...Shadows.sm,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 16,
    },
    serviceType: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.primary,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 4,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.light.text,
    },
    jobsText: {
        fontSize: 13,
        color: Colors.light.textSecondary,
        marginLeft: 6,
    },
});