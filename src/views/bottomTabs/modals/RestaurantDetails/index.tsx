import NetworkData from '@/common/domain/NetworkData';
import { MainTabParamList } from '@/core/navigation/types';
import { useGetRestaurantById } from '@/features/restaurants/hooks/useGetRestaurantById';
import { Restaurant } from '@/features/restaurants/models';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';

type RestaurantDetailsRouteProp = RouteProp<MainTabParamList, 'RestaurantDetails'>;

export const RestaurantDetails: FC = () => {
    const navigation = useNavigation();
    const { params } = useRoute<RestaurantDetailsRouteProp>();
    const networkData = useGetRestaurantById(params.id);

    const renderRestaurantDetails = useCallback((data: Restaurant) => (
        <SafeAreaView style={styles.container}>
            <Header restaurant={data} goBack={navigation.goBack} />
        </SafeAreaView>
    ), [navigation]);

    return (
        <NetworkData
            data={networkData}
            renderData={renderRestaurantDetails}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
