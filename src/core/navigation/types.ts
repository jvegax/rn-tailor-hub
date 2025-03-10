import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        // Extendemos el RootParamList globalmente para que React Navigation lo reconozca
        interface RootParamList extends RootStackParamList { }
    }
}

// Flujo de autenticación (sin Drawer)
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

// Stack para la pestaña Restaurants (lista y detalles)
export type RestaurantsStackParamList = {
    Restaurants: undefined;
    RestaurantDetails: { id: number };
};

// Bottom tabs dentro del MainStack
export type MainTabParamList = {
    RestaurantsTab: NavigatorScreenParams<RestaurantsStackParamList>;
    Favourites: undefined;
    Profile: undefined;
};

// Main stack que envuelve el BottomTabNavigator y la pantalla modal de CreateNewRestaurant
export type MainStackParamList = {
    MainTabs: NavigatorScreenParams<MainTabParamList>;
    CreateNewRestaurant: undefined;
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

// Para facilitar el tipado de la navegación dentro del RestaurantsStack
export type RestaurantsNavigationProp = NativeStackNavigationProp<RestaurantsStackParamList, 'Restaurants'>;
