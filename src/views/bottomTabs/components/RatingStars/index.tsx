import StarReviewIcon from '@/assets/icons/StarReviewIcon';
import React, { memo } from 'react';
import { View } from 'react-native';

const RatingStars = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }).map((_, index) => {
        const starFill = Math.min(1, Math.max(0, rating - index));
        return (
            <StarReviewIcon
                key={index}
                fillPercentage={starFill}
            />
        );
    });
    return <View style={{ flexDirection: 'row', gap: 8 }}>{stars}</View>;
};

export default memo(RatingStars);
