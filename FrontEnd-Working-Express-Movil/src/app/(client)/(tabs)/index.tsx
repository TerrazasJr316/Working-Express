// src/app/(client)/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/theme';
import Input from '../../../components/ui/Input';
import ProviderCard from '../../../components/ProviderCard';
import { Ionicons } from '@expo/vector-icons';

// Datos estáticos para simular las categorías solicitadas
const CATEGORIES = [
    { id: '1', name: 'Todos', icon: 'grid-outline' },
    { id: '2', name: 'Panadero', icon: 'restaurant-outline' },
    { id: '3', name: 'Soldador', icon: 'hammer-outline' },
    { id: '4', name: 'Taxista', icon: 'car-outline' },
];

// Datos de prueba para los prestadores de servicios
const PROVIDERS = [
    { id: '101', name: 'Carlos Mendoza', serviceType: 'Panadero', rating: 4.9, completedJobs: 124 },
    { id: '102', name: 'Jorge Herrera', serviceType: 'Soldador', rating: 4.7, completedJobs: 89 },
    { id: '103', name: 'Arturo Gómez', serviceType: 'Taxista', rating: 4.8, completedJobs: 210 },
    { id: '104', name: 'Mariana Silva', serviceType: 'Panadero', rating: 4.6, completedJobs: 45 },
];

export default function ClientHomeScreen() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    // Filtrado lógico en tiempo real en el FrontEnd
    const filteredProviders = PROVIDERS.filter(provider => {
        const matchesSearch = provider.name.toLowerCase().includes(search.toLowerCase()) ||
            provider.serviceType.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || provider.serviceType === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <View style={styles.container}>
            {/* Header Superior */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hola, Bienvenido 👋</Text>
                    <Text style={styles.title}>Encuentra un servicio</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-circle-outline" size={36} color={Colors.light.primary} />
                </TouchableOpacity>
            </View>

            {/* Barra de Búsqueda */}
            <View style={styles.searchContainer}>
                <Input
                    placeholder="¿Qué servicio necesitas hoy? (ej. Soldador)"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>

            {/* Selector de Categorías Horizontal */}
            <View style={styles.categoriesWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
                    {CATEGORIES.map((category) => {
                        const isSelected = selectedCategory === category.name;
                        return (
                            <TouchableOpacity
                                key={category.id}
                                style={[styles.categoryCard, isSelected && styles.categoryCardActive]}
                                onPress={() => setSelectedCategory(category.name)}
                            >
                                <Ionicons name={category.icon as any} size={20} color={isSelected ? '#FFF' : Colors.light.primary} />
                                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Lista de Prestadores de Servicio */}
            <View style={styles.listContainer}>
                <Text style={styles.sectionTitle}>
                    {selectedCategory === 'Todos' ? 'Prestadores Destacados' : `${selectedCategory}es Disponibles`}
                </Text>

                <FlatList
                    data={filteredProviders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProviderCard
                            name={item.name}
                            serviceType={item.serviceType}
                            rating={item.rating}
                            completedJobs={item.completedJobs}
                            onPress={() => router.push(`/(client)/provider-${item.id}`)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="alert-circle-outline" size={48} color={Colors.light.icon} />
                            <Text style={styles.emptyText}>No se encontraron prestadores de servicios.</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingTop: 60, // Espacio para no chocar con el notch del celular
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 14,
        color: Colors.light.textSecondary,
        fontWeight: '500',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.light.text,
    },
    profileButton: {
        padding: 4,
    },
    searchContainer: {
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    searchInput: {
        backgroundColor: Colors.light.surface,
    },
    categoriesWrapper: {
        marginBottom: 20,
    },
    categoriesContainer: {
        paddingHorizontal: 24,
        gap: 10,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.border,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    categoryCardActive: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    categoryTextActive: {
        color: '#FFF',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        gap: 8,
    },
    emptyText: {
        color: Colors.light.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
});