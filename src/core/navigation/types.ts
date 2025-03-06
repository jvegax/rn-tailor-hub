import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootParamsList { }
    }
}

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type MainTabParamList = {
    Restaurants: undefined;
    RestaurantDetails: { id: string };
    Favourites: undefined;
    Profile: undefined;
};

export type DrawerParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainTabParamList>;
};

export type RootParamsList = DrawerParamList;

export type RestaurantsNavigationProp = NativeStackNavigationProp<MainTabParamList, 'Restaurants'>;
