import React, { FC, memo } from 'react';
import { View, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Controller } from 'react-hook-form';
import TextBase from '@/common/components/TextBase';
import StarReviewIcon from '@/assets/icons/StarReviewIcon';
import { colors } from '@/common/theme/colors';
import { useReviewForm } from './form';
import { Props } from './types';

const ReviewForm: FC<Props> = ({ restaurantId, refetch }) => {
    const { form, onSubmit } = useReviewForm({ restaurantId, refetch });
    const {
        control,
        formState: { errors, isSubmitting },
    } = form;

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="rating"
                render={({ field: { value, onChange } }) => (
                    <View>
                        <View style={styles.starsContainer}>
                            {Array.from({ length: 5 }).map((_, index) => {
                                const starIndex = index + 1;
                                return (
                                    <Pressable key={starIndex} onPress={() => onChange(starIndex)}>
                                        <StarReviewIcon
                                            fillPercentage={starIndex <= value ? 1 : 0}
                                            width={24}
                                            height={24}
                                        />
                                    </Pressable>
                                );
                            })}
                        </View>
                        {errors.rating && (
                            <TextBase style={styles.errorText} color="tailorBlue" size={12}>
                                {errors.rating.message}
                            </TextBase>
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                name="comment"
                render={({ field: { value, onChange } }) => (
                    <View>
                        <TextInput
                            style={[styles.input, errors.comment && styles.inputError]}
                            placeholder="Escribe tu comentario sobre el restaurante..."
                            placeholderTextColor={colors.tailorGrayIcon}
                            multiline
                            maxLength={500}
                            value={value}
                            onChangeText={onChange}
                        />
                        {errors.comment && (
                            <TextBase style={styles.errorText} color="tailorBlue" size={12}>
                                {errors.comment.message}
                            </TextBase>
                        )}
                    </View>
                )}
            />

            <Pressable
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={onSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color={colors.tailorBlack} />
                ) : (
                    <TextBase weight="bold" size={16} color="tailorBlack">
                        Enviar
                    </TextBase>
                )}
            </Pressable>
        </View>
    );
};

export default memo(ReviewForm);

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
        marginBottom: 8,
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
        marginBottom: 8,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
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
    submitButtonDisabled: {
        opacity: 0.6,
    },
    errorText: {
        marginLeft: 8,
        marginBottom: 8,
    },
});
