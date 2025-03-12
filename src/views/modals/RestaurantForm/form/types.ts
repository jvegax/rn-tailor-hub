import { UseFormReturn } from 'react-hook-form';
import { CreateRestaurantFormData } from './schema';
import { MainStackParamList } from '@/core/navigation/types';
import { NavigationProp } from '@react-navigation/native';
import { Restaurant } from '@/features/restaurants/models';

export type RestaurantForm = UseFormReturn<CreateRestaurantFormData>;

export type Props = {
    navigation: NavigationProp<MainStackParamList>
    restaurant: Restaurant | null
    type: 'create' | 'edit'
};
