import React, { FC, memo, useCallback, useRef } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { Restaurant } from '@/features/restaurants/models';
import RestaurantItem from './RestaurantItem';
import { useGetRestaurants } from '@/features/restaurants/hooks/useGetRestaurants';
import NetworkData from '@/common/domain/NetworkData';
import MapMarkerIcon from '@/assets/icons/MapMarkerIcon';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import { MainStackNavigationProp } from '@/core/navigation/types';
import { useNavigation } from '@react-navigation/native';

const RestaurantMap: FC = () => {
    const navigation = useNavigation<MainStackNavigationProp>();
    const mapRef = useRef<MapView>(null);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetRestaurants();

    const handleCardPress = useCallback((restaurant: Restaurant) => {
        const region: Region = {
            latitude: restaurant.latlng.lat,
            longitude: restaurant.latlng.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1500);
        }
    }, []);

    const handlePressTooltip = useCallback((id: string) => {
        navigation.navigate('RestaurantDetails', { id });
    }, [navigation]);

    const renderCard = useCallback(({ item }: { item: Restaurant }) => (
        <RestaurantItem item={item} onPress={() => handleCardPress(item)} />
    ), [handleCardPress]);

    const renderFooter = useCallback(() => {
        return isFetchingNextPage ? <ActivityIndicator size="small" style={styles.loadingIndicator} /> : null;
    }, [isFetchingNextPage]);

    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const renderData = useCallback(
        (data: Restaurant[]) => (
            <FlatList
                data={data}
                renderItem={renderCard}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        ),
        [renderCard, renderFooter, onEndReached]
    );

    const renderMapMarkers = useCallback(() => {
        if (data?.type === 'data') {
            return data.data.map((restaurant: Restaurant) => (
                <Marker
                    key={restaurant.id}
                    coordinate={{
                        latitude: restaurant.latlng.lat,
                        longitude: restaurant.latlng.lng,
                    }}
                >
                    <MapMarkerIcon size={48} />
                    <Callout tooltip onPress={() => handlePressTooltip(restaurant.id)}>
                        <View style={styles.badgeContainer}>
                            <TextBase weight="bold" size={14} color="tailorWhite">
                                {restaurant.name}
                            </TextBase>
                        </View>
                    </Callout>
                </Marker>
            ));
        }
        return null;
    }, [data, handlePressTooltip]);
    return (
        <View style={styles.container}>
            <View style={styles.mapWrapper}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {renderMapMarkers()}
                </MapView>
                <View style={styles.cardsContainer}>
                    <NetworkData
                        data={data}
                        renderData={renderData}
                    />
                </View>
            </View>
        </View>
    );
};

export default memo(RestaurantMap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
    },
    mapWrapper: {
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    cardsContainer: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
    },
    listContent: {
        paddingLeft: 16,
        gap: 8,
    },
    loadingIndicator: {
        marginVertical: 16,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.tailorBlue,
        minWidth: 100,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 12,
    },
});
