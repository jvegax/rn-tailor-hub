import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RestaurantDetails: FC = () => {
    return (
        <View style={styles.container}>
            <Text>Detalles del Restaurante</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
