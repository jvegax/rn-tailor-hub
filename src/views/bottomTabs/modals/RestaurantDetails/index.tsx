import TextBase from '@/common/components/TextBase';
import NetworkData from '@/common/domain/NetworkData';
import { MainTabParamList } from '@/core/navigation/types';
import { useGetRestaurantById } from '@/features/restaurants/hooks/useGetRestaurantById';
import { Restaurant } from '@/features/restaurants/models';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

type RestaurantDetailsRouteProp = RouteProp<MainTabParamList, 'RestaurantDetails'>;

export const RestaurantDetails: FC = () => {
    const { params } = useRoute<RestaurantDetailsRouteProp>();
    const { id } = params;
    const networkData = useGetRestaurantById(id);

    const renderRestaurantDetails = useCallback((data: Restaurant) => (
        <View style={styles.container}>
            <TextBase>{data.name}</TextBase>
        </View>
    ), []);

    return (
        <NetworkData
            data={networkData}
            renderData={renderRestaurantDetails}
        />
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
