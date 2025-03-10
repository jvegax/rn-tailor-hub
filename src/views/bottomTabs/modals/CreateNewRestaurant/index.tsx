import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, FlatList, Keyboard } from 'react-native';
import { Controller } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import TextBase from '@/common/components/TextBase';
import TailorIcon from '@/assets/icons/TailorIcon';
import GoBackIcon from '@/assets/icons/GoBackIcon';
import ImageInput from './ImageInput';
import { useRestaurantForm } from './form';
import { colors } from '@/common/theme/colors';
import { useNavigation } from '@react-navigation/native';
import { SearchRestaurantResult } from '@/features/places/models';
import { searchPlaces } from '@/features/places/data/searchPlaces';
import CustomBackdrop from '@/common/components/CustomBackdrop';

export const CreateNewRestaurant: FC = () => {
    const { top } = useSafeAreaInsets();
    const { form, submitForm } = useRestaurantForm();
    const imageValue = form.watch('image');
    const navigation = useNavigation();

    // Bottom Sheet para búsqueda
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%'], []);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchRestaurantResult[]>([]);

    const openSearchModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const closeSearchModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.trim().length > 0) {
            try {
                const results = await searchPlaces(query);
                setSearchResults(results.slice(0, 10));
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectResult = useCallback((result: SearchRestaurantResult) => {
        form.setValue('name', result.name);
        form.setValue('address', result.address);
        form.setValue('latlng', { lat: result.latlng.lat, lng: result.latlng.lng });
        closeSearchModal();
        Keyboard.dismiss();
    }, [closeSearchModal, form]);

    return (
        <BottomSheetModalProvider>
            <View style={[styles.container, { paddingTop: top }]}>
                {/* Header */}
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
                {/* Campo Nombre: pulsar abre el bottom sheet */}
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
                                    editable={false} // Deshabilitamos la edición directa
                                />
                            </Pressable>
                        )}
                    />
                </View>
                {/* Campo Dirección */}
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
                {/* Campo Descripción */}
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
            {/* Bottom Sheet Modal para búsqueda */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                backgroundStyle={styles.bottomSheetBackground}
                backdropComponent={(props) => <CustomBackdrop {...props} onPress={closeSearchModal} />}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar restaurante..."
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => handleSelectResult(item)} style={styles.searchResult}>
                                <TextBase weight="bold" size={16} color="tailorBlack">
                                    {item.name}
                                </TextBase>
                                <TextBase size={14} color="tailorGray">
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
    searchInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.tailorBlack,
        borderRadius: 24,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    searchResult: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.tailorGray,
    },
});
