// src/components/ui/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, Text, View, TextInputProps } from 'react-native';
import { Colors } from '../../constants/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null, style]}
                placeholderTextColor={Colors.light.icon}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.light.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.light.text,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    errorText: {
        fontSize: 12,
        color: Colors.danger,
        marginTop: 4,
    },
});