import { StyleSheet, FlatList } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RestaurantItem from '../../components/RestaurantItem';
import { Restaurant } from '@/features/restaurants/models';
import { Props } from './types';
import { useGetRestaurants } from '@/features/restaurants/hooks/useGetRestaurants';
import NetworkData from '@/common/domain/NetworkData';
import ErrorScreen from '@/common/components/ErrorScreen';

const RestaurantList: FC<Props> = ({ navigation }) => {
    const { data, refetch } = useGetRestaurants({ page: 2, limit: 10 });
    const insets = useSafeAreaInsets();

    const navigateRestaurantDetails = useCallback(
        (id: string) => navigation.navigate('RestaurantDetails', { id }),
        [navigation]
    );

    const renderRestaurantItem = useCallback(
        ({ item }: { item: Restaurant }) => (
            <RestaurantItem item={item} onPress={() => navigateRestaurantDetails(item.id)} />
        ),
        [navigateRestaurantDetails]
    );

    const renderData = useCallback((data: Restaurant[]) => (
        <FlatList
            data={data}
            renderItem={renderRestaurantItem}
            contentContainerStyle={[
                styles.container,
                { paddingBottom: insets.bottom + 16 },
            ]}
            showsVerticalScrollIndicator={false}
        />
    ), [renderRestaurantItem, insets]);

    const errorState = useCallback(() => (
        <ErrorScreen btnText="Reintentar" onPress={refetch} />
    ), [refetch]);


    return (
        <NetworkData
            data={data}
            errorState={errorState}
            renderData={renderData}
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
