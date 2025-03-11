import { UseFormReturn } from 'react-hook-form';
import { CreateRestaurantFormData } from './schema';
import { MainStackParamList } from '@/core/navigation/types';
import { NavigationProp } from '@react-navigation/native';

export type RestaurantForm = UseFormReturn<CreateRestaurantFormData>;

export type Props = { navigation: NavigationProp<MainStackParamList> };
