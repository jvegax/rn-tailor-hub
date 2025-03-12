import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/common/theme/colors';
import { IconProps } from './types';

const SearchIcon: React.FC<IconProps> = ({
    size = 18,
    color = colors.tailorGrayIcon,
    ...props
}) => (
    <Svg
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        {...props}
    >
        <Path stroke="none" d="M0 0h24v24H0z" />
        <Path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" />
    </Svg>
);

export default SearchIcon;
