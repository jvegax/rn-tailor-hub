import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { memo } from 'react';
import { IconProps } from './types';

const DrawerIcon = ({ color = '#999999', ...props }: IconProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            fill={color}
            fillRule="evenodd"
            d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
            opacity={0.35}
        />
    </Svg>
);

export default memo(DrawerIcon);
