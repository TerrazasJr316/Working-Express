// src/components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Colors } from '../../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
}

export default function Button({ title, loading, style, disabled, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled || loading ? styles.disabled : null, style]}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.light.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});