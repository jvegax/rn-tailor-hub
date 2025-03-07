import TailorLogo from '@/assets/icons/TailorLogo';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import { DrawerParamList } from '@/core/navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<DrawerParamList>>();
    return (
        <View style={styles.container}>
            <TailorLogo color={colors.tailorBlue} />
            {/* form */}
            <View style={styles.form}>
                <TextBase weight="bold" color="tailorWhite">
                    Email
                </TextBase>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.tailorGrayIcon}
                />

                <TextBase weight="bold" color="tailorWhite">
                    Contraseña
                </TextBase>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={colors.tailorGrayIcon}
                />
                <Pressable
                    style={styles.submitButton}
                    onPress={() => navigation.navigate('Main', { screen: 'Restaurants' })}
                >
                    <TextBase
                        size={16}
                        weight="bold"
                        color="tailorBlack"
                    >
                        Entrar
                    </TextBase>
                </Pressable>
                <View style={styles.registerContainer}>
                    <TextBase
                        size={16}
                        weight="bold"
                        color="tailorWhite"
                    >
                        ¿No tienes cuenta?
                    </TextBase>
                    <Pressable
                        onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
                    >
                        <TextBase
                            size={16}
                            weight="bold"
                            color="tailorWhite"
                            style={{ textDecorationLine: 'underline' }}
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 24,
        gap: 8,
    },
});
