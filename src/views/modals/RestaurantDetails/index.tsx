import NetworkData from '@/common/domain/NetworkData';
import { MainStackParamList } from '@/core/navigation/types';
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
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();
    const { params } = useRoute<RestaurantDetailsRouteProp>();
    const networkData = useGetRestaurantById(params.id);

    const renderRestaurantDetails = useCallback((data: Restaurant) => (
        <ScrollView
            style={[styles.container, { paddingTop: top }]}
            showsVerticalScrollIndicator={false}
        >
            <Header restaurant={data} goBack={navigation.goBack} />
            <View style={styles.descriptionContainer}>
                <TextBase size={16} style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, perspiciatis possimus? Sunt dolorum fuga ab optio dolores nobis adipisci beatae laborum, earum, facilis eius quos, id ullam aliquam qui molestias?
                </TextBase>
            </View>
            <ReviewForm />
            <ReviewList reviews={data.reviews} />
        </ScrollView>
    ), [navigation, top]);

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
    descriptionContainer: {
        marginTop: 16,
    },
    descriptionText: {
        lineHeight: 24,
    },
});
