/* eslint-disable react/no-unstable-nested-components */
import React, { FC, memo } from 'react';
import { View, StyleSheet, Pressable, FlatList, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
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
import { useNavigation } from '@react-navigation/native';
import CustomBackdrop from '@/common/components/CustomBackdrop';
import { usePlacesBottomSheet } from './bottom-sheet';
import SearchIcon from '@/assets/icons/SearchIcon';

export const CreateNewRestaurant: FC = () => {
    const { top } = useSafeAreaInsets();
    const { form, submitForm } = useRestaurantForm();
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
    const navigation = useNavigation();

    return (
        <BottomSheetModalProvider>
            <View style={[styles.container, { paddingTop: top }]}>
                <View style={styles.header}>
                    <Pressable style={styles.goBackContainer} onPress={() => navigation.goBack()} hitSlop={32}>
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
                            <Pressable onPress={openSearchModal}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nombre"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    pointerEvents="none"
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
                            />
                        )}
                    />
                </View>
                <Pressable onPress={submitForm} style={styles.button}>
                    <TextBase weight="bold" size={16}>
                        Guardar
                    </TextBase>
                </Pressable>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                keyboardBehavior="extend"
                enableDynamicSizing={false}
                backgroundStyle={styles.bottomSheetBackground}
                backdropComponent={
                    (props) => <CustomBackdrop {...props} onPress={closeSearchModal} />
                }
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

export default memo(CreateNewRestaurant);

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
    bottomSheetBackground: {
        backgroundColor: '#fff',
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
    },
    searchResult: {
        gap: 4,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.tailorGray,
    },
});
