import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React, { FC, memo } from 'react';
import { colors } from '@/common/theme/colors';
import TextBase from '@/common/components/TextBase';
import RatingStars from '@/views/bottomTabs/components/RatingStars';
import { useDeleteComment } from '@/features/comments/hooks/useDeleteComment';
import { Props } from './types';

const ReviewItem: FC<Props> = ({
    userData,
    index,
    review,
    showSeparator,
    restaurantId,
    refetch,
}) => {
    const { mutate: deleteComment, isPending } = useDeleteComment({
        restaurantId,
        commentId: review.id,
        onDeleteSuccess: refetch,
    });

    const handleDeleteReview = () => {
        deleteComment();
    };

    return (
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

            {userData && userData.name === review.owner && (
                <View style={styles.actionsContainer}>
                    <Pressable onPress={handleDeleteReview} style={styles.deleteButton}>
                        {isPending ? (
                            <ActivityIndicator size="small" color={colors.tailorBlack} />
                        ) : (
                            <TextBase size={16} weight="bold" color="tailorBlack">
                                Eliminar
                            </TextBase>
                        )}
                    </Pressable>
                </View>
            )}
            {showSeparator && <View style={styles.separator} />}
        </View>
    );
};

export default memo(ReviewItem);

const styles = StyleSheet.create({
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
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    deleteButton: {
        width: 130,
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
