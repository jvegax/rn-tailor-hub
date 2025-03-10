import React, { FC, memo } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type Props = {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
};

const CustomBackdrop: FC<Props> = ({ onPress, style }) => {
    return (
        <Pressable style={[styles.backdrop, style]} onPress={onPress} />
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
});

export default memo(CustomBackdrop);
