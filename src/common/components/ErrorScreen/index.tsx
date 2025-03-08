import { View, StyleSheet } from 'react-native';
import React from 'react';
import TextBase from '../TextBase';
import TailorLogo from '@/assets/icons/TailorLogo';

const ErrorScreen = () => {
    return (
        <View style={styles.container}>
            <TailorLogo />
            <TextBase color="tailorBlue" >
                Ups, algo salió mal
            </TextBase>
        </View>
    );
};

export default ErrorScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
