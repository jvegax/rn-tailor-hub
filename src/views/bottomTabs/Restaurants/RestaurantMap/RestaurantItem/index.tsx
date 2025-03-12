import React, { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import TextBase from '@/common/components/TextBase';
import HeartIcon from '@/assets/icons/HeartIcon';
import HeartIconFill from '@/assets/icons/HeartIconFill';
import { colors } from '@/common/theme/colors';
import { useFavorites } from '@/core/providers/favourites';
import RatingStars from '@/views/bottomTabs/components/RatingStars';
import { Props } from './types';

const RestaurantItem: FC<Props> = ({ item, onPress }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some(r => r.id === item.id);

    const handleToggleFavorite = () => {
        toggleFavorite(item);
    };

    const averageRating =
        item.reviews.length > 0
            ? item.reviews.reduce((sum, review) => sum + review.rating, 0) / item.reviews.length
            : 0;

    return (
        <View style={styles.card}>
            <Pressable onPress={() => onPress(item.id)} style={styles.leftAndMiddleContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                    <TextBase weight="bold" size={14}>
                        {item.name}
                    </TextBase>
                    <TextBase size={12}>{item.address}</TextBase>
                    <View style={styles.cardRating}>
                        <RatingStars rating={averageRating} />
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={handleToggleFavorite} style={styles.iconContainer} hitSlop={32}>
                {isFavorite ? (
                    <HeartIconFill fillColor={colors.tailorBlack} width={24} height={24} />
                ) : (
                    <HeartIcon color={colors.tailorBlack} width={24} height={24} />
                )}
            </Pressable>
        </View>
    );
};

export default memo(RestaurantItem);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.tailorWhite,
        borderRadius: 20,
        paddingLeft: 6,
        paddingRight: 12,
        marginVertical: 48,
        width: 300,
        elevation: 3,
        shadowColor: colors.tailorBlack,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    leftAndMiddleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    cardImage: {
        width: 68,
        height: 68,
        borderRadius: 16,
        marginLeft: 4,
    },
    cardInfo: {
        flex: 1,
        marginHorizontal: 12,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cardRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    iconContainer: {
        height: '100%',
        marginTop: 14,
    },
});
