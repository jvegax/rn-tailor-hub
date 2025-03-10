/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tailorTheme from '@/common/theme';
import { colors } from '@/common/theme/colors';

// Importa tus pantallas
import { LoginScreen } from '@/views/auth/LoginScreen';
import { RegisterScreen } from '@/views/auth/RegisterScreen';
import { Restaurants } from '@/views/bottomTabs/Restaurants';
import { RestaurantDetails } from '@/views/bottomTabs/modals/RestaurantDetails';
import { CreateNewRestaurant } from '@/views/bottomTabs/modals/CreateNewRestaurant';
import { Favourites } from '@/views/bottomTabs/Favourites';
import { Profile } from '@/views/bottomTabs/Profile';
import LocationIcon from '@/assets/icons/LocationIcon';
import HeartIcon from '@/assets/icons/HeartIcon';
import UserIcon from '@/assets/icons/UserIcon';
import FloatingButton from '@/views/bottomTabs/components/FloatingButton';
import { useAuth } from '../providers/auth';

// Creación de navigators
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();
const RestaurantsStack = createNativeStackNavigator();

// ---------- AUTH STACK (independiente) ----------
const AuthStackNavigator: FC = () => {
    return (
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
};

// ---------- RESTAURANTS STACK (lista y detalles) ----------
const RestaurantsStackNavigator: FC = () => {
    return (
        <RestaurantsStack.Navigator initialRouteName="Restaurants">
            <RestaurantsStack.Screen
                name="Restaurants"
                component={Restaurants}
                options={{ headerShown: false }}
            />
            <RestaurantsStack.Screen
                name="RestaurantDetails"
                component={RestaurantDetails}
                options={{ headerShown: false }}
            />
        </RestaurantsStack.Navigator>
    );
};

// ---------- BOTTOM TABS (para el MainStack) ----------
const MainTabNavigator: FC = () => {
    return (
        <>
            <BottomTabs.Navigator
                initialRouteName="RestaurantsTab"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: colors.tailorBlack,
                    tabBarInactiveTintColor: colors.tailorGray,
                }}
            >
                <BottomTabs.Screen
                    name="RestaurantsTab"
                    component={RestaurantsStackNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <LocationIcon color={color} width={size} height={size} />
                        ),
                    }}
                />
                <BottomTabs.Screen
                    name="Favourites"
                    component={Favourites}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <HeartIcon color={color} width={size} height={size} />
                        ),
                    }}
                />
                <BottomTabs.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <UserIcon color={color} width={size} height={size} />
                        ),
                    }}
                />
            </BottomTabs.Navigator>
            <FloatingButton />
        </>
    );
};

// ---------- MAIN STACK (envuelve BottomTabs y modales) ----------
const MainStackNavigator: FC = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="MainTabs"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />
            <MainStack.Screen
                name="CreateNewRestaurant"
                component={CreateNewRestaurant}
                options={{ headerShown: false }}
            />
        </MainStack.Navigator>
    );
};

// ---------- APP NAVIGATOR ----------
export const AppNavigator: FC = () => {
    const { authData } = useAuth();

    return (
        <NavigationContainer theme={tailorTheme}>
            {authData ? (
                <Drawer.Navigator screenOptions={{ headerShown: false }}>
                    <Drawer.Screen name="Main" component={MainStackNavigator} />
                </Drawer.Navigator>
            ) : (
                <AuthStackNavigator />
            )}
        </NavigationContainer>
    );
};
