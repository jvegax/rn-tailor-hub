import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import { AuthStackParamList } from '@/core/navigation/types';
import TailorIcon from '@/assets/icons/TailorIcon';
import { useAuth } from '@/core/providers/auth';

export const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        const success = await login(email, password);
        setIsLoading(false);
        if (!success) {
            Alert.alert('Hubo un problema al iniciar sesión');
        }
    };

    return (
        <View style={styles.container}>
            <TailorIcon color={colors.tailorBlue} />
            <View style={styles.form}>
                <TextBase weight="bold" color="tailorWhite">
                    Email
                </TextBase>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.tailorWhite}
                    value={email}
                    onChangeText={setEmail}
                />

                <TextBase weight="bold" color="tailorWhite">
                    Contraseña
                </TextBase>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={colors.tailorWhite}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable
                    style={[styles.submitButton, isLoading && styles.disabledButton]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color={colors.tailorBlue} />
                    ) : (
                        <TextBase size={16} weight="bold" color="tailorBlack">
                            Entrar
                        </TextBase>
                    )}
                </Pressable>

                <View style={styles.registerContainer}>
                    <TextBase size={16} weight="bold" color="tailorWhite">
                        ¿No tienes cuenta?
                    </TextBase>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <TextBase
                            size={16}
                            weight="bold"
                            color="tailorWhite"
                            style={styles.registerButton}
                        >
                            Regístrate
                        </TextBase>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
        borderRadius: 16,
    },
    form: {
        width: '100%',
        minHeight: 380,
        padding: 16,
        paddingTop: 24,
        backgroundColor: colors.tailorBlue,
        borderRadius: 24,
    },
    input: {
        borderColor: colors.tailorWhite,
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingVertical: 8,
        fontSize: 24,
        color: colors.tailorWhite,
        marginVertical: 8,
        marginBottom: 24,
    },
    submitButton: {
        backgroundColor: colors.tailorWhite,
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
        marginVertical: 8,
    },
    disabledButton: {
        opacity: 0.6,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 24,
        gap: 8,
    },
    registerButton: {
        textDecorationLine: 'underline',
    },
});
