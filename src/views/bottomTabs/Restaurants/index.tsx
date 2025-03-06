import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import MapsIcon from '@/assets/icons/MapsIcon';
import DrawerIcon from '@/assets/icons/DrawerIcon';
import { DrawerParamList } from '@/core/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Restaurants = () => {
    const [isMapMode, setIsMapMode] = useState(false);
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const handleToggleMap = () => setIsMapMode((prev) => !prev);
    const handleOpenDrawer = () => navigation.openDrawer();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {isMapMode ? 'Mapa' : 'Restaurantes'}
                </Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={handleToggleMap} style={styles.iconButton}>
                        <MapsIcon color={isMapMode ? 'black' : '#999999'} width={24} height={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOpenDrawer} style={styles.iconButton}>
                        <DrawerIcon color="#111827" width={24} height={24} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Contenido */}
            <View style={styles.content}>
                {isMapMode ? (
                    <Text>mapa de restaurantes aqui</Text>
                ) : (
                    <Text>Restaurantes</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row' },
    iconButton: { marginLeft: 16 },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
