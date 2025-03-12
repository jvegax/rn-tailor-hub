import React, { FC, memo } from 'react';
import { StyleSheet, Pressable, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '@/common/theme/colors';
import TextBase from '@/common/components/TextBase';

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
                <TextBase weight="400" size={32}>+</TextBase>
                <TextBase weight="bold" size={16}>Añadir imagen</TextBase>
            </Pressable>
        );
    }

    return (
        <ImageBackground
            source={{ uri: value }}
            style={styles.container}
            imageStyle={styles.imageStyle}
        >
            <Pressable onPress={handleRemoveImage} style={styles.removeButton}>
                <TextBase weight="bold" size={24} color="tailorWhite">
                    Eliminar
                </TextBase>
            </Pressable>
        </ImageBackground>
    );
};

export default memo(ImageInput);

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        backgroundColor: colors.tailorGray,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageStyle: {
        borderRadius: 8,
    },
    removeButton: {
        position: 'absolute',
        alignSelf: 'center',
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: colors.tailorWhite,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    removeButtonText: {
        color: colors.tailorWhite,
        fontSize: 16,
    },
});
