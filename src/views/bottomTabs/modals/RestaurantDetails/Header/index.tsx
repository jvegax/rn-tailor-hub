import { StyleSheet, ImageBackground, View, Pressable } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { Restaurant } from '@/features/restaurants/models';
import TextBase from '@/common/components/TextBase';
import GoBackIcon from '@/assets/icons/GoBackIcon';
import { colors } from '@/common/theme/colors';
import HeartIconFill from '@/assets/icons/HeartIconFill';

type Props = { restaurant: Restaurant, goBack: () => void };

const Header: FC<Props> = ({ restaurant, goBack }) => {
    const handlePressFavorite = useCallback(() => console.log('Favorite'), []);

    return (
        <ImageBackground
            source={{ uri: restaurant.image }}
            style={styles.image}
            imageStyle={styles.imageStyle}
        >
            {/*  icon y heartIcon */}
            <View style={styles.overlay} />
            <View style={styles.actionsContainer}>
                <Pressable onPress={goBack} style={styles.actionWrapper}>
                    <GoBackIcon />
                </Pressable>
                <Pressable style={styles.actionWrapper} onPress={handlePressFavorite}>
                    <HeartIconFill
                        borderColor={colors.tailorWhite}
                        fillColor={colors.tailorWhite}
                    />
                </Pressable>
            </View>
            <TextBase color="tailorWhite" size={24} weight="bold" style={styles.title}>
                {restaurant.name}
            </TextBase>
            <TextBase color="tailorWhite" size={16}>
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
});
