import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { memo } from 'react';
import { colors } from '@/common/theme/colors';
import { IconProps } from './types';

const ArrowLeftIcon = ({ color = colors.tailorWhite, ...props }: IconProps) => (
    <Svg
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        {...props}
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M11.165 21.082 4.083 14l7.082-7.082M23.917 14H4.282"
        />
    </Svg>
);

export default memo(ArrowLeftIcon);
