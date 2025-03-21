import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Restaurant } from '@/features/restaurants/models';
import { Props } from './types';
import { useGetRestaurants } from '@/features/restaurants/hooks/useGetRestaurants';
import NetworkData from '@/common/components/NetworkData';
import ErrorScreen from '@/common/components/ErrorScreen';
import { colors } from '@/common/theme/colors';
import RestaurantItem from '../../components/RestaurantItem';

const RestaurantList: FC<Props> = ({ navigation }) => {
    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        fetchNextPage,
    } = useGetRestaurants();
    const insets = useSafeAreaInsets();

    const navigateRestaurantDetails = useCallback((id: string) => {
        navigation.navigate('RestaurantDetails', { id });
    }, [navigation]);

    const renderRestaurantItem = useCallback(
        ({ item, index }: { item: Restaurant, index: number }) => (
            <RestaurantItem index={index} item={item} onPress={() => navigateRestaurantDetails(item.id)} />
        ),
        [navigateRestaurantDetails]
    );

    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const renderFooter = useCallback(() => {
        if (!isFetchingNextPage) { return null; }
        return (
            <ActivityIndicator
                size={'small'}
                color={colors.tailorBlue}
                style={styles.footerIndicator}
            />
        );
    }, [isFetchingNextPage]);

    const renderData = useCallback(
        (data: Restaurant[]) => (
            <FlatList
                data={data}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={[
                    styles.container,
                    { paddingBottom: insets.bottom + 16 },
                ]}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        ),
        [renderRestaurantItem, insets, onEndReached, renderFooter]
    );

    const renderNetworkError = useCallback(
        () => <ErrorScreen btnText="Reintentar" onPress={refetch} />,
        [refetch]
    );

    return (
        <NetworkData
            data={data}
            renderData={renderData}
            renderNetworkError={renderNetworkError}
        />
    );
};

export default memo(RestaurantList);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    footerIndicator: {
        marginVertical: 16,
    },
});
