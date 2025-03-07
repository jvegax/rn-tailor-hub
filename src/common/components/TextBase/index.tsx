import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import React, { memo } from 'react';
import { colors, TailorColor } from '@/common/theme/colors';

interface TextBaseProps extends TextProps {
    size?: number;
    color?: TailorColor;
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

const TextBase: React.FC<TextBaseProps> = ({
    size = 24,
    color = 'tailorBlack',
    weight = 'normal',
    children,
    style,
    ...rest
}) => {
    return (
        <Text
            style={[
                {
                    fontSize: size,
                    color: colors[color],
                    fontWeight: weight,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default memo(TextBase);
