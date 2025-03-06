import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { AuthStackParamList } from '@/core/navigation/types';

export const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pantalla de Login</Text>
            <Text onPress={() => navigation.navigate('Register')}>
                Ir a Registro
            </Text>
        </View>
    );
};
