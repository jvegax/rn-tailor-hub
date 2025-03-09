import { View, StyleSheet, Pressable } from 'react-native';
import React, { FC, memo } from 'react';
import TextBase from '../TextBase';
import TailorIcon from '@/assets/icons/TailorIcon';
import { colors } from '@/common/theme/colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
    btnText?: string,
    onPress?: () => void
};

const ErrorScreen: FC<Props> = ({
    onPress,
    btnText = 'Volver',
}) => {
    const { goBack } = useNavigation();
    return (
        <View style={styles.container}>
            <TailorIcon />
            <TextBase size={24} weight="bold" color="tailorBlue" >
                Ups, algo salió mal
            </TextBase>
            <Pressable style={styles.button} onPress={onPress ?? goBack}>
                <TextBase size={16} weight="bold" color="tailorBlack">
                    {btnText}
                </TextBase>
            </Pressable>
            <TailorIcon />
        </View>
    );
};

export default memo(ErrorScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 64,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        borderRadius: 18,
    },
});
