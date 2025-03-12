import React, { FC, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    TextInput,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetTextInput,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import TextBase from '@/common/components/TextBase';
import TailorIcon from '@/assets/icons/TailorIcon';
import GoBackIcon from '@/assets/icons/GoBackIcon';
import ImageInput from './ImageInput';
import { useRestaurantForm } from './form';
import { colors } from '@/common/theme/colors';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CustomBackdrop from '@/common/components/CustomBackdrop';
import { usePlacesBottomSheet } from './usePlacesBottomSheet';
import SearchIcon from '@/assets/icons/SearchIcon';
import { MainStackParamList } from '@/core/navigation/types';

type RestaurantFormScreenRouteProp = RouteProp<
    MainStackParamList,
    'RestaurantForm'
>;

export const RestaurantForm: FC = () => {
    const navigation = useNavigation<NavigationProp<MainStackParamList>>();
    const { params } = useRoute<RestaurantFormScreenRouteProp>();
    const { type, restaurant } = params;
    const { top } = useSafeAreaInsets();

    const { form, submitForm } = useRestaurantForm({ navigation, restaurant, type });
    const { isSubmitting } = form.formState;
    const bottomSheetModal = usePlacesBottomSheet({ form });
    const {
        bottomSheetModalRef,
        snapPoints,
        searchQuery,
        searchResults,
        openSearchModal,
        closeSearchModal,
        handleSearch,
        handleSelectResult,
    } = bottomSheetModal;
    const imageValue = form.watch('image');

    const backdropComponent = useCallback(
        (props: BottomSheetBackdropProps) => (
            <CustomBackdrop {...props} onPress={closeSearchModal} />
        ),
        [closeSearchModal]
    );

    return (
        <BottomSheetModalProvider>
            <View style={[styles.container, { paddingTop: top }]}>
                <View style={styles.header}>
                    <Pressable
                        style={styles.goBackContainer}
                        onPress={() => navigation.goBack()}
                        hitSlop={32}
                    >
                        <GoBackIcon color={colors.tailorBlack} size={34} />
                    </Pressable>
                    <TailorIcon />
                </View>
                <ImageInput
                    value={imageValue}
                    onChange={(uri) => form.setValue('image', uri)}
                />
                <View style={styles.fieldContainer}>
                    <TextBase weight="bold" size={24}>
                        Nombre
                    </TextBase>
                    <Controller
                        control={form.control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Pressable
                                onPress={() => {
                                    if (!isSubmitting) {
                                        openSearchModal();
                                    }
                                }}
                            >
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nombre"
                                    pointerEvents="none"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    editable={false}
                                />
                            </Pressable>
                        )}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <TextBase weight="bold" size={24}>
                        Dirección
                    </TextBase>
                    <Controller
                        control={form.control}
                        name="address"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Dirección"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                editable={!isSubmitting}
                            />
                        )}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <TextBase weight="bold" size={24}>
                        Descripción
                    </TextBase>
                    <Controller
                        control={form.control}
                        name="description"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Escribe información del restaurante"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                multiline
                                numberOfLines={4}
                                maxLength={500}
                                textAlignVertical="top"
                                editable={!isSubmitting}
                            />
                        )}
                    />
                </View>
                <Pressable
                    onPress={submitForm}
                    style={[styles.button, isSubmitting && styles.disabledButton]}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color={colors.tailorBlack} />
                    ) : (
                        <TextBase weight="bold" size={16}>
                            {type === 'edit' ? 'Guardar cambios' : 'Guardar'}
                        </TextBase>
                    )}
                </Pressable>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                keyboardBehavior="extend"
                enableDynamicSizing={false}
                backgroundStyle={styles.bottomSheetBackground}
                backdropComponent={backdropComponent}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <TextBase weight="bold" size={24} color="tailorBlack">
                        Buscar restaurante
                    </TextBase>
                    <View style={styles.searchBarContainer}>
                        <SearchIcon />
                        <BottomSheetTextInput
                            style={styles.searchInput}
                            placeholder="Buscar restaurante..."
                            onChangeText={handleSearch}
                            value={searchQuery}
                            autoFocus
                        />
                    </View>
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleSelectResult(item)} style={styles.searchResult}>
                                <TextBase weight="bold" size={16} color="tailorBlack">
                                    {item.name}
                                </TextBase>
                                <TextBase size={14} color="tailorGrayIcon">
                                    {item.address}
                                </TextBase>
                            </Pressable>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        gap: 24,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    goBackContainer: {
        position: 'absolute',
        left: 0,
    },
    fieldContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 24,
        fontSize: 24,
        marginTop: 4,
    },
    textArea: {
        height: 100,
    },
    button: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.6,
    },
    bottomSheetBackground: {
        backgroundColor: colors.tailorWhite,
    },
    sheetContent: {
        flex: 1,
        padding: 16,
    },
    searchBarContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.tailorGray,
        borderRadius: 8,
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
    },
    searchInput: {
        fontSize: 16,
        flex: 1,
    },
    searchResult: {
        gap: 4,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.tailorGray,
    },
});
