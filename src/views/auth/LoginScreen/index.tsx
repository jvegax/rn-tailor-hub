import React, { FC, useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    TextInput,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import { AuthStackParamList } from '@/core/navigation/types';
import { useAuth } from '@/core/providers/auth';
import TailorLogo from '@/assets/icons/TailorLogo';

export const LoginScreen: FC = () => {
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
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <TailorLogo color={colors.tailorBlue} />
                    <View style={styles.form}>
                        <TextBase weight="bold" color="tailorWhite">
                            Email
                        </TextBase>
                        <TextInput
                            style={styles.input}
                            testID="login-email-input"
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
                            testID="login-password-input"
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
                                <TextBase testID="login-submit" size={16} weight="bold" color="tailorBlack">
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
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
