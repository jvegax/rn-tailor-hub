import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import TailorLogo from '@/assets/icons/TailorLogo';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import { DrawerParamList } from '@/core/navigation/types';

export const RegisterScreen = () => {
    const progress = useSharedValue(0);
    const [showPassword, setShowPassword] = useState(false);
    const OFFSET = 150;

    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const initialGroupStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -progress.value * OFFSET }],
        opacity: 1 - progress.value,
    }));

    const finalGroupStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: (1 - progress.value) * OFFSET }],
        opacity: progress.value,
    }));

    const handleSubmit = () => {
        if (!showPassword) {
            progress.value = withTiming(1, { duration: 300 });
            setShowPassword(true);
        } else {
            // Lógica de finalizar registro
        }
    };

    const handleArrowPress = () => {
        if (showPassword) {
            progress.value = withTiming(0, { duration: 300 });
            setShowPassword(false);
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TailorLogo color={colors.tailorBlue} />

            {/* Contenedor principal del formulario */}
            <View style={styles.form}>
                {/* Flecha arriba a la izquierda, fuera del flujo normal */}
                <Pressable style={styles.arrowContainer} onPress={handleArrowPress}>
                    <ArrowLeftIcon />
                </Pressable>

                {/* Contenedor relativo donde se “pegan” los inputs abajo */}
                <View style={styles.groupsContainer}>
                    {/* Grupo inicial (Email y Nombre) */}
                    <Animated.View style={[initialGroupStyle, styles.groupInitial]}>
                        <TextBase weight="bold" color="tailorWhite">
                            Email
                        </TextBase>
                        <TextInput
                            style={styles.input}
                            placeholder="Añade tu email"
                            placeholderTextColor={colors.tailorGrayIcon}
                        />
                        <TextBase weight="bold" color="tailorWhite">
                            Nombre de usuario
                        </TextBase>
                        <TextInput
                            style={styles.input}
                            placeholder="Añade tu nombre"
                            placeholderTextColor={colors.tailorGrayIcon}
                        />
                    </Animated.View>
                    {/* Grupo final (Crear contraseña) */}
                    <Animated.View style={[finalGroupStyle, styles.groupFinal]}>
                        <TextBase weight="bold" color="tailorWhite">
                            Crear una nueva contraseña
                        </TextBase>
                        <TextInput
                            style={styles.input}
                            placeholder="Añade una contraseña"
                            placeholderTextColor={colors.tailorGrayIcon}
                        />
                    </Animated.View>
                </View>
                {/* Botón “Siguiente/Finalizar” en la parte más inferior */}
                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                    <TextBase size={16} weight="bold" color="tailorBlack">
                        {showPassword ? 'Finalizar' : 'Siguiente'}
                    </TextBase>
                </Pressable>
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
        padding: 16,
        paddingTop: 24,
        backgroundColor: colors.tailorBlue,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    arrowContainer: {
        position: 'absolute',
        width: 94,
        alignItems: 'center',
        justifyContent: 'center',
        top: 16,
        left: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.tailorWhite,
        padding: 8,
        zIndex: 2,
    },
    groupsContainer: {
        position: 'relative',
        minHeight: 300,
        marginTop: 48,
        marginBottom: 16,
    },
    groupInitial: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    groupFinal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
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
        marginBottom: 14,
    },
    submitButton: {
        backgroundColor: colors.tailorWhite,
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
        marginVertical: 8,
        zIndex: 1,
    },
});

export default RegisterScreen;
