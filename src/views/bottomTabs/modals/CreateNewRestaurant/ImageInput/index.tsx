import React, { FC } from 'react';
import { Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '@/common/theme/colors';

type Props = {
    value: string;
    onChange: (uri: string) => void;
};

const ImageInput: FC<Props> = ({ value, onChange }) => {
    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('El usuario canceló la selección de imagen');
                } else if (response.errorCode) {
                    console.log('Error al seleccionar imagen:', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    onChange(response.assets[0].uri ?? '');
                }
            }
        );
    };

    const handleRemoveImage = () => onChange('');

    if (!value) {
        return (
            <Pressable onPress={pickImage} style={styles.container}>
                <Text style={styles.plus}>+</Text>
                <Text style={styles.text}>Añadir imagen</Text>
            </Pressable>
        );
    }

    return (
        <ImageBackground source={{ uri: value }} style={styles.container} imageStyle={styles.imageStyle}>
            <Pressable onPress={handleRemoveImage} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Eliminar</Text>
            </Pressable>
        </ImageBackground>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        backgroundColor: colors.tailorGray,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageStyle: {
        borderRadius: 8,
    },
    plus: {
        fontSize: 48,
        color: '#fff',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginTop: 8,
    },
    removeButton: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
