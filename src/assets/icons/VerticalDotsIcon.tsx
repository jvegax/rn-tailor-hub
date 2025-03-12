import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FC } from 'react';
import { IconProps } from './types';
import { colors } from '@/common/theme/colors';

const VerticalDotsIcon: FC<IconProps> = ({
    size = 24,
    color = colors.tailorWhite,
    ...props
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        {...props}
    >
        <Path stroke="none" d="M0 0h24v24H0z" />
        <Path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 19a1 1 0 1 0 2 0 1 1 0 1 0-2 0M11 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0" />
    </Svg>
);

export default VerticalDotsIcon;
