import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '@/core/navigation/types';
import { colors } from '@/common/theme/colors';

const FloatingButton: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<MainTabParamList>>();

    const handlePress = () => {
        navigation.navigate('CreateNewRestaurant');
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
        bottom: 120,
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
        color: '#fff',
        fontSize: 32,
        lineHeight: 32,
    },
});

export default FloatingButton;
