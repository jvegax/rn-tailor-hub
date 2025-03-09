import React, { FC, memo, useRef } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { MOCK_RESTAURANTS } from '@/features/restaurants/mock';
import { Restaurant } from '@/features/restaurants/models';
import RestaurantItem from './RestaurantItem';

const RestaurantMap: FC = () => {
    const mapRef = useRef<MapView>(null);

    const handleCardPress = (restaurant: Restaurant) => {
        const region: Region = {
            latitude: restaurant.latlng.lat,
            longitude: restaurant.latlng.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
    };

    const renderCard = ({ item }: { item: Restaurant }) => (
        <RestaurantItem item={item} onPress={() => handleCardPress(item)} />
    );

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
                    {/* Opcional: Puedes agregar un marcador para la región actual si lo deseas */}
                </MapView>
                <View style={styles.cardsContainer}>
                    <FlatList
                        data={MOCK_RESTAURANTS}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCard}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
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
});
