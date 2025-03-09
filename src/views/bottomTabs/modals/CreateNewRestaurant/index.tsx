import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useRestaurantForm } from './form';
import ImageInput from './ImageInput';
import TextBase from '@/common/components/TextBase';

export const CreateNewRestaurant = () => {
    const { form, submitForm } = useRestaurantForm();
    const imageValue = form.watch('image');

    return (
        <View style={styles.container}>
            <TextBase weight="bold" size={20}>Crear Restaurante</TextBase>
            <ImageInput
                value={imageValue}
                onChange={(uri) => form.setValue('image', uri)}
            />
            {/* Aquí irían los demás campos del formulario */}
            <Button title="Enviar" onPress={submitForm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default CreateNewRestaurant;
