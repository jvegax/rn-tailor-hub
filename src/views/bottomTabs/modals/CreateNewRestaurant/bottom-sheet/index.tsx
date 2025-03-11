import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RestaurantForm } from '../form';
import { useCallback, useMemo, useRef, useState } from 'react';
import { SearchRestaurantResult } from '@/features/places/models';
import { searchPlaces } from '@/features/places/data/searchPlaces';
import { Keyboard } from 'react-native';

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
