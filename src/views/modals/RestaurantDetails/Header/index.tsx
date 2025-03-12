import {
    StyleSheet,
    ImageBackground,
    View,
    Pressable,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { FC, memo, useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextBase from '@/common/components/TextBase';
import GoBackIcon from '@/assets/icons/GoBackIcon';
import { colors } from '@/common/theme/colors';
import HeartIcon from '@/assets/icons/HeartIcon';
import HeartIconFill from '@/assets/icons/HeartIconFill';
import { useFavorites } from '@/core/providers/favourites';
import { Props } from './types';
import VerticalDotsIcon from '@/assets/icons/VerticalDotsIcon';
import { Portal } from '@gorhom/portal';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '@/core/navigation/types';
import { useDeleteRestaurant } from '@/features/restaurants/hooks/useDeleteRestaurant';

const Header: FC<Props> = ({ restaurant, goBack, onDeleteSuccess }) => {
    const navigation = useNavigation<MainStackNavigationProp>();
    const { favorites, toggleFavorite } = useFavorites();
    const { mutate: deleteRestaurant } = useDeleteRestaurant({
        id: restaurant.id,
        onDeleteSuccess,
    });
    const isFavorite = favorites.some(r => r.id === restaurant.id);
    const insets = useSafeAreaInsets();
    const [portalVisible, setPortalVisible] = useState(false);

    const handlePressFavorite = useCallback(() => {
        toggleFavorite(restaurant);
    }, [toggleFavorite, restaurant]);

    const togglePortalActions = useCallback(() => {
        setPortalVisible(prev => !prev);
    }, []);

    const handleEdit = useCallback(() => {
        setPortalVisible(false);
        navigation.navigate('RestaurantForm', { type: 'edit', restaurant });
    }, [navigation, restaurant]);

    const handleDelete = useCallback(() => {
        deleteRestaurant();
        setPortalVisible(false);
    }, [deleteRestaurant]);

    return (
        <>
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
                    <View style={styles.leftHeaderActions}>
                        <Pressable onPress={handlePressFavorite} style={styles.actionWrapper}>
                            {isFavorite ? (
                                <HeartIconFill fillColor={colors.tailorWhite} width={24} height={24} />
                            ) : (
                                <HeartIcon color={colors.tailorWhite} width={24} height={24} />
                            )}
                        </Pressable>
                        <Pressable style={styles.actionWrapper} onPress={togglePortalActions}>
                            <VerticalDotsIcon />
                        </Pressable>
                    </View>
                </View>
                <TextBase color="tailorWhite" size={24} weight="bold" style={styles.title}>
                    {restaurant.name}
                </TextBase>
                <TextBase color="tailorWhite" size={16} style={styles.address}>
                    {restaurant.address}
                </TextBase>
            </ImageBackground>
            {portalVisible && (
                <Portal>
                    <Pressable style={styles.backdrop} onPress={() => setPortalVisible(false)}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.portalContainer, { marginTop: insets.top + 58 }]}>
                                <View style={styles.portalCard}>
                                    <Pressable style={styles.portalAction} onPress={handleEdit}>
                                        <TextBase color="tailorBlack" size={16}>
                                            Editar
                                        </TextBase>
                                    </Pressable>
                                    <View style={styles.divider} />
                                    <Pressable style={styles.portalAction} onPress={handleDelete}>
                                        <TextBase color="tailorRed" size={16}>
                                            Eliminar
                                        </TextBase>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Pressable>
                </Portal>
            )}
        </>
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
    leftHeaderActions: {
        flexDirection: 'row',
        gap: 16,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    portalContainer: {
        position: 'absolute',
        top: 0,
        right: 32,
    },
    portalCard: {
        backgroundColor: colors.tailorWhite,
        borderRadius: 8,
        overflow: 'hidden',
        width: 120,
        shadowColor: colors.tailorBlack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    portalAction: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: colors.tailorGray,
    },
});
