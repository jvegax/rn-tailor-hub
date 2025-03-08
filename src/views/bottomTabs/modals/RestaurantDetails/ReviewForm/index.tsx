import React, { FC, useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import TextBase from '@/common/components/TextBase';
import StarReviewIcon from '@/assets/icons/StarReviewIcon';
import { colors } from '@/common/theme/colors';

const ReviewForm: FC = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleStarPress = (star: number) => setRating(star);
    const handleSubmit = () => console.log('Review submitted:', { rating, reviewText });

    return (
        <View style={styles.container}>
            {/* Sección de estrellas */}
            <View style={styles.starsContainer}>
                {Array.from({ length: 5 }).map((_, index) => {
                    const starIndex = index + 1;
                    return (
                        <Pressable key={starIndex} onPress={() => handleStarPress(starIndex)}>
                            <StarReviewIcon
                                fillPercentage={starIndex <= rating ? 1 : 0}
                                width={24}
                                height={24}
                            />
                        </Pressable>
                    );
                })}
            </View>
            {/* Input de review */}
            <TextInput
                style={styles.input}
                placeholder="Escribe tu review..."
                placeholderTextColor={colors.tailorGrayIcon}
                multiline
                maxLength={500}
                value={reviewText}
                onChangeText={setReviewText}
            />
            {/* Botón de submit */}
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <TextBase weight="bold" size={16} color="tailorBlack">
                    Enviar
                </TextBase>
            </Pressable>
        </View>
    );
};

export default ReviewForm;

const styles = StyleSheet.create({
    container: {
        borderColor: colors.tailorBlack,
        borderWidth: 1,
        borderRadius: 26,
        padding: 16,
        marginVertical: 24,
        backgroundColor: colors.tailorWhite,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        marginLeft: 8,
        gap: 8,
        justifyContent: 'flex-start',
    },
    input: {
        borderColor: colors.tailorGray,
        borderWidth: 0,
        borderRadius: 8,
        padding: 8,
        minHeight: 50,
        textAlignVertical: 'top',
        marginBottom: 16,
    },
    submitButton: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        maxWidth: 120,
        backgroundColor: colors.tailorWhite,
        borderColor: colors.tailorBlack,
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
    },
});
