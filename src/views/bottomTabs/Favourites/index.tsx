import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TextBase from '@/common/components/TextBase';
import { Restaurant } from '@/features/restaurants/models';
import { colors } from '@/common/theme/colors';
import RestaurantItem from '../components/RestaurantItem';
import { useFavorites } from '@/core/providers/favourites';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export const Favourites = () => {
    const navigation = useNavigation();
    const { bottom, top } = useSafeAreaInsets();
    const { favorites } = useFavorites();

    const navigateRestaurantDetails = useCallback(
        (id: number) => navigation.navigate('Main', { screen: 'RestaurantDetails', params: { id } }),
        [navigation]
    );

    const renderRestaurantItem = useCallback(
        ({ item }: { item: Restaurant }) => (
            <RestaurantItem item={item} onPress={() => navigateRestaurantDetails(item.id)} />
        ),
        [navigateRestaurantDetails]
    );

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <TextBase weight="bold" size={24} color="tailorBlack" style={styles.title}>
                Favoritos
            </TextBase>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRestaurantItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.list,
                    { paddingBottom: bottom + 16 },
                ]}
            />
        </View>
    );
};

export default Favourites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.tailorWhite,
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    list: {
        flexGrow: 1,
    },
});
