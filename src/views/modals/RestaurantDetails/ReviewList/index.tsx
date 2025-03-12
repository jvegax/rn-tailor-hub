import { View, StyleSheet } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { Restaurant } from '@/features/restaurants/models';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextBase from '@/common/components/TextBase';
import { colors } from '@/common/theme/colors';
import RatingStars from '@/views/bottomTabs/components/RatingStars';

type Props = { reviews: Restaurant['reviews'] }

const ReviewList: FC<Props> = ({ reviews }) => {
    const { bottom } = useSafeAreaInsets();

    const renderReviews = useMemo(() => reviews.map((review, index) => (
        <View key={index}>
            <View style={styles.titleRow}>
                <TextBase weight="bold" size={16}>
                    {review.owner}
                </TextBase>
                <RatingStars rating={review.rating} />
            </View>
            <TextBase size={16}>
                {review.comment}
            </TextBase>
            {index !== reviews.length - 1 && <View style={styles.separator} />}
        </View>
    )), [reviews]);

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
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    separator: {
        height: 1,
        backgroundColor: colors.tailorBlue,
        marginVertical: 16,
    },
});
