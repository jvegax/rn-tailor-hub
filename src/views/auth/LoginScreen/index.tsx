import React from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import { AuthStackParamList } from '@/core/navigation/types';
import TailorLogo from '@/assets/icons/TailorLogo';

export const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
        <View style={styles.container}>
            <TailorLogo color={colors.tailorBlue} />
            {/* Formulario */}
            <View style={styles.form}>
                <TextBase weight="bold" color="tailorWhite">
                    Email
                </TextBase>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.tailorWhite}
                />

                <TextBase weight="bold" color="tailorWhite">
                    Contraseña
                </TextBase>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={colors.tailorWhite}
                    secureTextEntry
                />

                <Pressable style={styles.submitButton} onPress={() => { }}>
                    <TextBase size={16} weight="bold" color="tailorBlack">
                        Entrar
                    </TextBase>
                </Pressable>

                <View style={styles.registerContainer}>
                    <TextBase size={16} weight="bold" color="tailorWhite">
                        ¿No tienes cuenta?
                    </TextBase>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <TextBase size={16} weight="bold" color="tailorWhite" style={{ textDecorationLine: 'underline' }}>
                            Regístrate
                        </TextBase>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 24,
        gap: 8,
    },
});
