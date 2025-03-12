import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '@/core/navigation/types';
import { colors } from '@/common/theme/colors';

const FloatingButton: FC = () => {
    const navigation = useNavigation<MainStackNavigationProp>();

    const handlePress = () => {
        navigation.navigate('RestaurantForm', { type: 'create', restaurant: null });
    };

    return (
        <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
            <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.tailorBlue,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    plusIcon: {
        color: colors.tailorWhite,
        fontSize: 32,
        lineHeight: 32,
    },
});

export default FloatingButton;
