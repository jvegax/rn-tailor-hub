import NetworkData from '@/common/components/NetworkData';
import { MainStackNavigationProp, MainStackParamList } from '@/core/navigation/types';
import { useGetRestaurantById } from '@/features/restaurants/hooks/useGetRestaurantById';
import { Restaurant } from '@/features/restaurants/models';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './Header';
import TextBase from '@/common/components/TextBase';
import ReviewForm from './ReviewForm';
import { ScrollView } from 'react-native-gesture-handler';
import ReviewList from './ReviewList';

type RestaurantDetailsRouteProp = RouteProp<MainStackParamList, 'RestaurantDetails'>;

export const RestaurantDetails: FC = () => {
    const navigation = useNavigation<MainStackNavigationProp>();
    const { top } = useSafeAreaInsets();
    const { params } = useRoute<RestaurantDetailsRouteProp>();
    const { data, refetch } = useGetRestaurantById({ id: params.id });

    const onDeleteSuccess = useCallback(() => {
        navigation.navigate('MainTabs', { screen: 'Restaurants' });
    }, [navigation]);

    const renderData = useCallback((data: Restaurant) => (
        <ScrollView
            style={[styles.container, { paddingTop: top }]}
            showsVerticalScrollIndicator={false}
        >
            <Header restaurant={data} goBack={navigation.goBack} onDeleteSuccess={onDeleteSuccess} />
            <View style={styles.descriptionContainer}>
                <TextBase size={16} style={styles.descriptionText}>
                    {data.description}
                </TextBase>
            </View>
            <ReviewForm restaurantId={data.id} refetch={refetch} />
            <ReviewList reviews={data.reviews} refetch={refetch} restaurantId={data.id} />
        </ScrollView>
    ), [navigation, top, refetch, onDeleteSuccess]);

    return (
        <NetworkData
            data={data}
            renderData={renderData}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    descriptionContainer: {
        marginTop: 16,
    },
    descriptionText: {
        lineHeight: 24,
    },
});
