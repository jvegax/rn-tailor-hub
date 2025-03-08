import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import { Restaurant } from '@/features/restaurants/models';
import TextBase from '@/common/components/TextBase';
import HeartIcon from '@/assets/icons/HeartIcon';
import { colors } from '@/common/theme/colors';

type Props = {
    item: Restaurant;
    onPress: (id: number) => void;
};

const RestaurantItem: FC<Props> = ({ item, onPress }) => {
    return (
        <Pressable onPress={() => onPress(item.id)} style={styles.container}>
            {/* Sección izquierda: imagen */}
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* Sección central: información (nombre, dirección y reviews) */}
            <View style={styles.middle}>
                <TextBase weight="bold" size={16}>
                    {item.name}
                </TextBase>
                <TextBase size={14}>{item.address}</TextBase>
                <TextBase size={12} color="tailorBlue">
                    {item.reviews.length} reviews
                </TextBase>
            </View>
            {/* Sección derecha: icono de corazón */}
            <View style={styles.iconContainer}>
                <HeartIcon color={colors.tailorBlack} width={24} height={24} />
            </View>
        </Pressable>
    );
};

export default memo(RestaurantItem);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
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
    },
    iconContainer: {
        height: '100%',
        marginTop: 16,
    },
});
