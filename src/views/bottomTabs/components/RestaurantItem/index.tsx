import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import { Restaurant } from '@/features/restaurants/models';
import TextBase from '@/common/components/TextBase';
import HeartIcon from '@/assets/icons/HeartIcon';
import { colors } from '@/common/theme/colors';
import RatingStars from '../RatingStars';

type Props = {
    item: Restaurant;
    onPress: (id: number) => void;
};

const RestaurantItem: FC<Props> = ({ item, onPress }) => {
    const handleAddFavorite = () => {
        console.log(`Añadiendo el restaurante ${item.id} a favoritos`);
    };

    const averageRating =
        item.reviews.length > 0
            ? item.reviews.reduce((sum, review) => sum + review.rating, 0) /
            item.reviews.length
            : 0;

    return (
        <View style={styles.container}>
            {/* Sección izquierda + central: se navega al pulsar sobre esta zona */}
            <Pressable
                onPress={() => onPress(item.id)}
                style={styles.leftAndMiddleContainer}
            >
                {/* Imagen */}
                <Image source={{ uri: item.image }} style={styles.image} />
                {/* Contenedor vertical para la información */}
                <View style={styles.middle}>
                    <TextBase weight="bold" size={16}>
                        {item.name}
                    </TextBase>
                    <TextBase size={14}>{item.address}</TextBase>
                    <View style={styles.reviews}>
                        <RatingStars rating={averageRating} />
                        <TextBase size={12} color="tailorBlue">
                            ({item.reviews.length} comentarios)
                        </TextBase>
                    </View>
                </View>
            </Pressable>
            {/* Sección derecha: icono de corazón para añadir a favoritos */}
            <Pressable onPress={handleAddFavorite} style={styles.iconContainer} hitSlop={32}>
                <HeartIcon color={colors.tailorBlack} width={24} height={24} />
            </Pressable>
        </View>
    );
};

export default memo(RestaurantItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
    },
    leftAndMiddleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    middle: {
        flex: 1,
        marginHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    iconContainer: {
        height: '100%',
    },
    reviews: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
});
