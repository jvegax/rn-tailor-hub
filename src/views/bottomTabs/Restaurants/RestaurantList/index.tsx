import { StyleSheet, FlatList } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RestaurantsNavigationProp } from '@/core/navigation/types';
import RestaurantItem from '../../components/RestaurantItem';
import { MOCK_RESTAURANTS } from '@/features/restaurants/mock';
import { Restaurant } from '@/features/restaurants/models';

type Props = {
    navigation: RestaurantsNavigationProp;
};

const RestaurantList: FC<Props> = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const navigateRestaurantDetails = useCallback(
        (id: number) => navigation.navigate('RestaurantDetails', { id }),
        [navigation]
    );

    const renderRestaurantItem = useCallback(
        ({ item }: { item: Restaurant }) => (
            <RestaurantItem item={item} onPress={() => navigateRestaurantDetails(item.id)} />
        ),
        [navigateRestaurantDetails]
    );

    return (
        <FlatList
            data={MOCK_RESTAURANTS}
            renderItem={renderRestaurantItem}
            contentContainerStyle={[
                styles.container,
                { paddingBottom: insets.bottom + 16 },
            ]}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default memo(RestaurantList);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});
