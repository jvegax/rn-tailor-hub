import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

interface IconProps extends SvgProps {
    color?: string;
}

const HeartIcon = ({ color = '#999999', ...props }: IconProps) => (
    <Svg width={24} height={24} fill="none" viewBox="0 0 32 32" {...props}>
        <Path
            fill={color}
            fillRule="evenodd"
            d="m19.2 9.367-1.757 1.757a1.333 1.333 0 0 1-1.886 0L13.8 9.367a4.667 4.667 0 1 0-6.6 6.6l9.3 9.3 9.3-9.3.943.942-.943-.942a4.667 4.667 0 1 0-6.6-6.6ZM17.315 7.48a7.333 7.333 0 1 1 10.37 10.371L17.444 28.095a1.333 1.333 0 0 1-1.886 0L5.315 17.852a7.333 7.333 0 0 1 10.37-10.37l.815.814.815-.815Z"
            clipRule="evenodd"
        />
    </Svg>
);

export default memo(HeartIcon);
