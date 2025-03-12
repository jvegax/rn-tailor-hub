import { Restaurant } from '@/features/restaurants/models';
import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type MainTabParamList = {
    Restaurants: undefined;
    Favourites: undefined;
    Profile: undefined;
};

export type RestaurantFormScreenParams = { type: 'create', restaurant: null } | { type: 'edit', restaurant: Restaurant };
export type MainStackParamList = {
    MainTabs: NavigatorScreenParams<MainTabParamList>;
    RestaurantForm: RestaurantFormScreenParams;
    RestaurantDetails: { id: string };
    CreateRestaurantResultScreen: { status: 'success' | 'error' };
};

export type DrawerParamList = {
    Main: NavigatorScreenParams<MainStackParamList>;
};

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainStackParamList>;
};

export type MainTabNavigationProp = NavigationProp<MainTabParamList>;
export type MainStackNavigationProp = NativeStackNavigationProp<MainStackParamList>
