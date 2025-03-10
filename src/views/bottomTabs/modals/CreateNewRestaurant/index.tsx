import React, { memo } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { useRestaurantForm } from './form';
import ImageInput from './ImageInput';
import TextBase from '@/common/components/TextBase';
import TailorIcon from '@/assets/icons/TailorIcon';
import GoBackIcon from '@/assets/icons/GoBackIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/common/theme/colors';
import { useNavigation } from '@react-navigation/native';

export const CreateNewRestaurant = () => {
    const { goBack } = useNavigation();
    const { top } = useSafeAreaInsets();
    const { form, submitForm } = useRestaurantForm();
    const imageValue = form.watch('image');

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.header}>
                <Pressable style={styles.goBackContainer} onPress={goBack} hitSlop={32}>
                    <GoBackIcon color={colors.tailorBlack} size={34} />
                </Pressable>
                <TailorIcon />
            </View>
            <ImageInput
                value={imageValue}
                onChange={(uri) => form.setValue('image', uri)}
            />
            <View style={styles.fieldContainer}>
                <TextBase weight="bold" size={24}>
                    Nombre
                </TextBase>
                <Controller
                    control={form.control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>
            <View style={styles.fieldContainer}>
                <TextBase weight="bold" size={24}>
                    Dirección
                </TextBase>
                <Controller
                    control={form.control}
                    name="address"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Dirección"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>
            <View style={styles.fieldContainer}>
                <TextBase weight="bold" size={24}>
                    Descripción
                </TextBase>
                <Controller
                    control={form.control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Escribe información del restaurante"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            multiline
                            numberOfLines={4}
                            maxLength={500}
                            textAlignVertical="top"
                        />
                    )}
                />
            </View>
            <Pressable onPress={submitForm} style={styles.button}>
                <TextBase weight="bold" size={16}>
                    Guardar
                </TextBase>
            </Pressable>
        </View>
    );
};

export default memo(CreateNewRestaurant);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        gap: 24,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    goBackContainer: {
        position: 'absolute',
        left: 0,
    },
    fieldContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 24,
        fontSize: 24,
        marginTop: 4,
    },
    textArea: {
        height: 100,
    },
    button: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
