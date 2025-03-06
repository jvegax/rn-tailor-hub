import { NavigatorScreenParams } from '@react-navigation/native';

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
    Favourites: undefined;
    Profile: undefined;
};

export type DrawerParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainTabParamList>;
};

export type RootParamsList = DrawerParamList;
