import { View, StyleSheet } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Props } from './types';
import ReviewItem from './ReviewItem';
import { useAuth } from '@/core/providers/auth';

const ReviewList: FC<Props> = ({ reviews, restaurantId, refetch }) => {
    const { userData } = useAuth();
    const { bottom } = useSafeAreaInsets();

    const renderReviews = useMemo(() => reviews.map((review, index) => (
        <ReviewItem
            key={index}
            index={index}
            review={review}
            refetch={refetch}
            userData={userData}
            restaurantId={restaurantId}
            showSeparator={index !== reviews.length - 1}
        />
    )), [reviews, restaurantId, refetch, userData]);

    return (
        <View style={[styles.container, { marginBottom: bottom + 48 }]}>
            {renderReviews}
        </View>
    );
};

export default memo(ReviewList);

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        gap: 16,
    },
});
