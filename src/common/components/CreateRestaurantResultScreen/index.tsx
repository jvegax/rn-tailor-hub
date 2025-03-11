import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TailorIcon from '@/assets/icons/TailorIcon';
import { colors } from '@/common/theme/colors';
import TextBase from '../TextBase';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackParamList, MainTabNavigationProp } from '@/core/navigation/types';

type CreateRestaurantResultScreenRouteProp = RouteProp<
    MainStackParamList,
    'CreateRestaurantResultScreen'
>;

export const CreateRestaurantResultScreen = () => {
    const navigation = useNavigation<MainTabNavigationProp>();
    const route = useRoute<CreateRestaurantResultScreenRouteProp>();
    const { status } = route.params;

    const { message, btnText, onPressBtn } = useMemo(() => {
        if (status === 'success') {
            return {
                message: 'Restaurante guardado',
                btnText: 'Ver restaurantes',
                onPressBtn: () => navigation.navigate('Restaurants'),
            };
        }
        return {
            message: 'Ups, algo salió mal',
            btnText: 'Volver',
            onPressBtn: () => navigation.goBack(),
        };
    }, [status, navigation]);

    return (
        <View style={styles.container}>
            <TailorIcon color={colors.tailorBlue} />
            <TextBase weight="bold" color="tailorBlue">
                {message}
            </TextBase>
            <Pressable onPress={onPressBtn} style={styles.btn}>
                <TextBase size={16} weight="bold" color="tailorBlack">
                    {btnText}
                </TextBase>
            </Pressable>
            <TailorIcon color={colors.tailorBlue} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 18,
    },
});
