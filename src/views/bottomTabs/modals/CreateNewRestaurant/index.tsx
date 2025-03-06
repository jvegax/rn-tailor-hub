import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CreateNewRestaurant = () => {
    return (
        <View style={styles.container}>
            <Text>Create New Restaurant</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
