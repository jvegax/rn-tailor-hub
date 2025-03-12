import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/common/theme/colors';
import { IconProps } from './types';

const GoBackIcon = ({ color = colors.tailorWhite, ...props }: IconProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            stroke={color}
            strokeWidth={0.5}
            fillRule="evenodd"
            d="M10.707 4.293a1 1 0 0 1 0 1.414L5.414 11H21a1 1 0 1 1 0 2H5.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
            clipRule="evenodd"
        />
    </Svg>
);

export default GoBackIcon;
