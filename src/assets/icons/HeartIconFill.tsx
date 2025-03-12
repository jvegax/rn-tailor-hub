import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { colors } from '@/common/theme/colors';

interface HeartIconFilledProps extends SvgProps {
    size?: number;
    fillColor?: string;
}

const HeartIconFilled: React.FC<HeartIconFilledProps> = ({
    size = 24,
    fillColor = colors.tailorBlack,
    ...props
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill={fillColor}
            fillRule="evenodd"
            d="M3.806 6.206a4.8 4.8 0 0 1 6.788 0L12 7.612l1.406-1.406a4.8 4.8 0 1 1 6.788 6.788L12 21.188l-8.194-8.194a4.8 4.8 0 0 1 0-6.788Z"
            clipRule="evenodd"
        />
    </Svg>
);

export default HeartIconFilled;
