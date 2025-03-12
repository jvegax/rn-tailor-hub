import { StyleSheet, ImageBackground, View, Pressable } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import TextBase from '@/common/components/TextBase';
import GoBackIcon from '@/assets/icons/GoBackIcon';
import { colors } from '@/common/theme/colors';
import HeartIcon from '@/assets/icons/HeartIcon';
import HeartIconFill from '@/assets/icons/HeartIconFill';
import { useFavorites } from '@/core/providers/favourites';
import { Props } from './types';

const Header: FC<Props> = ({ restaurant, goBack }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some(r => r.id === restaurant.id);

    const handlePressFavorite = useCallback(() => {
        toggleFavorite(restaurant);
    }, [toggleFavorite, restaurant]);

    return (
        <ImageBackground
            source={{ uri: restaurant.image }}
            style={styles.image}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.overlay} />
            <View style={styles.actionsContainer}>
                <Pressable onPress={goBack} style={styles.actionWrapper}>
                    <GoBackIcon />
                </Pressable>
                <Pressable onPress={handlePressFavorite} style={styles.actionWrapper}>
                    {isFavorite ? (
                        <HeartIconFill fillColor={colors.tailorWhite} width={24} height={24} />
                    ) : (
                        <HeartIcon color={colors.tailorWhite} width={24} height={24} />
                    )}
                </Pressable>
            </View>
            <TextBase color="tailorWhite" size={24} weight="bold" style={styles.title}>
                {restaurant.name}
            </TextBase>
            <TextBase color="tailorWhite" size={16} style={styles.address}>
                {restaurant.address}
            </TextBase>
        </ImageBackground>
    );
};

export default memo(Header);

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 220,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 16,
    },
    title: {
        marginBottom: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 16,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        marginBottom: 20,
    },
    actionWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F1F1F04D',
    },
    address: {
        textAlign: 'center',
    },
});
