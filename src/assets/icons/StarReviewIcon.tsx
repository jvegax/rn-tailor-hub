import * as React from 'react';
import Svg, { Defs, ClipPath, Rect, Path, SvgProps } from 'react-native-svg';
import { colors } from '@/common/theme/colors';

interface StarReviewIconProps extends SvgProps {
    fillPercentage?: number;
    width?: number;
    height?: number;
}

const StarReviewIcon: React.FC<StarReviewIconProps> = ({
    fillPercentage = 1,
    width = 16,
    height = 16,
    ...props
}) => {
    const viewBoxWidth = 18;
    const viewBoxHeight = 18;
    const starPath =
        'm8 .5 1.17 5.177 4.487-2.834-2.834 4.488L16 8.5l-5.177 1.17 2.834 4.487-4.488-2.834L8 16.5l-1.17-5.177-4.487 2.834 2.834-4.488L0 8.5l5.177-1.17-2.834-4.487 4.488 2.834L8 .5Z';

    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            fill="none"
            {...props}
        >
            <Defs>
                <ClipPath id="starClip">
                    <Rect
                        x="0"
                        y="0"
                        width={viewBoxWidth * fillPercentage}
                        height={viewBoxHeight}
                    />
                </ClipPath>
            </Defs>
            <Path
                d={starPath}
                fill={colors.tailorWhite}
                stroke={colors.tailorBlue}
                strokeWidth={1}
            />
            <Path d={starPath} fill={colors.tailorBlue} clipPath="url(#starClip)" />
        </Svg>
    );
};

export default StarReviewIcon;
