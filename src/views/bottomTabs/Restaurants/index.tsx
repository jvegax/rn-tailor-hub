import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainStackParamList } from '@/core/navigation/types';
import RestaurantMap from './RestaurantMap';
import RestaurantList from './RestaurantList';
import Header from './Header';

export const Restaurants = () => {
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<MainStackParamList>>();
    const [isMapMode, setIsMapMode] = useState(false);
    const handleToggleMap = () => setIsMapMode((prev) => !prev);
    const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <Header
                isMapMode={isMapMode}
                handleToggleMap={handleToggleMap}
                openDrawer={openDrawer}
            />
            {isMapMode ? (
                <RestaurantMap />
            ) : (
                <RestaurantList navigation={navigation} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});
