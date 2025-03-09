import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRestaurantForm } from './form';
import ImageInput from './ImageInput';
import TextBase from '@/common/components/TextBase';
import TailorIcon from '@/assets/icons/TailorIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/common/theme/colors';

export const CreateNewRestaurant = () => {
    const { top } = useSafeAreaInsets();
    const { form, submitForm } = useRestaurantForm();
    const imageValue = form.watch('image');

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <TailorIcon />
            <ImageInput
                value={imageValue}
                onChange={(uri) => form.setValue('image', uri)}
            />
            <Pressable onPress={submitForm} style={styles.button}>
                <TextBase weight="bold" size={16}>Guardar</TextBase>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        gap: 24,
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

export default CreateNewRestaurant;
