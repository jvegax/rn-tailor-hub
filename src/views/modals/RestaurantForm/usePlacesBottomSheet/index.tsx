import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { SearchRestaurantResult } from '@/features/places/models';
import { searchPlaces } from '@/features/places/data/searchPlaces';
import { Keyboard } from 'react-native';
import { RestaurantForm } from '../form/types';
import { debounce } from 'lodash';

type Props = { form: RestaurantForm };

export const usePlacesBottomSheet = ({ form }: Props) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['60%', '90%'], []);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchRestaurantResult[]>([]);

    const openSearchModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const closeSearchModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleDebouncedSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                if (query.trim().length > 2) {
                    try {
                        const results = await searchPlaces(query);
                        setSearchResults(results.slice(0, 10));
                    } catch (error) {
                        console.error('Error en la búsqueda:', error);
                    }
                }
            }, 250),
        []
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        handleDebouncedSearch(query);
    };

    const handleSelectResult = useCallback((result: SearchRestaurantResult) => {
        form.setValue('name', result.name);
        form.setValue('address', result.address);
        form.setValue('latlng', { lat: result.latlng.lat, lng: result.latlng.lng });
        closeSearchModal();
        Keyboard.dismiss();
    }, [closeSearchModal, form]);

    return {
        bottomSheetModalRef,
        snapPoints,
        searchQuery,
        searchResults,
        openSearchModal,
        closeSearchModal,
        handleSearch,
        handleSelectResult,
    };
};
