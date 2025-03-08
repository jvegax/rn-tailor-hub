import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RestaurantsNavigationProp } from '@/core/navigation/types';
import MapsIcon from '@/assets/icons/MapsIcon';
import DrawerIcon from '@/assets/icons/DrawerIcon';
import { colors } from '@/common/theme/colors';
import RestaurantMap from './RestaurantMap';
import RestaurantList from './RestaurantList';
import TextBase from '@/common/components/TextBase';

export const Restaurants = () => {
    const navigation = useNavigation<RestaurantsNavigationProp>();
    const [isMapMode, setIsMapMode] = useState(false);
    const handleToggleMap = () => setIsMapMode((prev) => !prev);
    const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TextBase size={24} weight="bold">{isMapMode ? 'Mapa' : 'Restaurantes'}</TextBase>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={handleToggleMap} style={styles.iconButton}>
                        <MapsIcon color={isMapMode ? 'black' : colors.tailorGrayIcon} width={24} height={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
                        <DrawerIcon width={24} height={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Contenido */}
            {isMapMode ? (
                <RestaurantMap />
            ) : (
                <RestaurantList navigation={navigation} />
            )}
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
    detailsButton: { marginTop: 16 },
});
