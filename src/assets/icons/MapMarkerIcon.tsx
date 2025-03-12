import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { FC } from 'react';
import { colors } from '@/common/theme/colors';
import { IconProps } from './types';

const MapMarkerIcon: FC<IconProps> = ({
    size = 24,
    color = colors.tailorBlue,
    ...props
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 30 40"
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            fillRule="evenodd"
            d="M15 40s15-16.48 15-24.849C30 6.784 23.284 0 15 0 6.716 0 0 6.784 0 15.152 0 23.52 15 40 15 40Zm0-25.454c2.154 0 3.9-1.764 3.9-3.94s-1.746-3.94-3.9-3.94-3.9 1.764-3.9 3.94 1.746 3.94 3.9 3.94Z"
            clipRule="evenodd"
        />
    </Svg>
);

export default MapMarkerIcon;
