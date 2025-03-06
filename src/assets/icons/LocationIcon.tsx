import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

interface IconProps extends SvgProps {
    color?: string;
}

const LocationIcon = ({ color = '#999999', ...props }: IconProps) => (
    <Svg width={24} height={24} fill="none" viewBox="0 0 32 32" {...props}>
        <Path
            fill={color}
            fillRule="evenodd"
            d="M22.6 8.067a9.333 9.333 0 0 0-13.2 13.2l5.658 5.657c.52.52 1.363.52 1.884 0l5.658-5.658a9.333 9.333 0 0 0 0-13.199ZM7.515 6.181c4.686-4.686 12.284-4.686 16.97 0 4.687 4.687 4.687 12.285 0 16.971l-4.67 4.67-.023.023-.964.964a3.998 3.998 0 0 1-5.655 0l-5.658-5.657c-4.687-4.686-4.687-12.284 0-16.97ZM16 12a2.667 2.667 0 1 0 0 5.333A2.667 2.667 0 0 0 16 12Zm-5.333 2.667a5.333 5.333 0 1 1 10.666 0 5.333 5.333 0 0 1-10.666 0Z"
            clipRule="evenodd"
        />
    </Svg>
);

export default memo(LocationIcon);
