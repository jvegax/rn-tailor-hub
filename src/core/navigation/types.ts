import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

// Flujo de autenticación (sin Drawer)
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

// Bottom tabs dentro del MainStack
export type MainTabParamList = {
    Restaurants: undefined;
    Favourites: undefined;
    Profile: undefined;
};

// Main stack que envuelve el BottomTabNavigator y la pantalla modal de CreateNewRestaurant
export type MainStackParamList = {
    MainTabs: NavigatorScreenParams<MainTabParamList>;
    CreateNewRestaurant: undefined;
    RestaurantDetails: { id: string };
    CreateRestaurantResultScreen: { status: 'success' | 'error' };
};

// Drawer que contiene el MainStack (solo para el flujo principal)
export type DrawerParamList = {
    Main: NavigatorScreenParams<MainStackParamList>;
};

// Este es el RootStack, que agrupa ambos flujos (Auth y Main)
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainStackParamList>;
};

export type MainTabNavigationProp = NavigationProp<MainTabParamList>;
