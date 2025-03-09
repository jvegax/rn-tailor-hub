/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
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
import tailorTheme from '@/common/theme';
import { colors } from '@/common/theme/colors';

// Creación de navigators
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();
const RestaurantsStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

// Stack de autenticación
const AuthStackNavigator: FC = () => {
    return (
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
};

// Stack para la pestaña Restaurants (lista y detalles)
const RestaurantsStackNavigator: FC = () => {
    return (
        <RestaurantsStack.Navigator initialRouteName="Restaurants">
            <RestaurantsStack.Screen
                name="Restaurants"
                component={Restaurants}
                options={{ headerShown: false }}
            />
        </RestaurantsStack.Navigator>
    );
};

// Navigator de Bottom Tabs (solo tres pestañas)
const MainTabNavigator: FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <BottomTabs.Navigator
                initialRouteName="RestaurantsTab"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: colors.tailorBlack,
                    tabBarInactiveTintColor: colors.tailorGrayIcon,
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
        </View>
    );
};

// Main Stack que envuelve los BottomTabs y la pantalla modal de CreateNewRestaurant
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
                options={{ title: 'Crear Restaurante', headerShown: false }}
            />
            <RestaurantsStack.Screen
                name="RestaurantDetails"
                component={RestaurantDetails}
                options={{ title: 'Detalles del Restaurante', headerShown: false }}
            />
        </MainStack.Navigator>
    );
};

// Drawer que contiene ambos navigators (Auth y Main)
export const AppNavigator: FC = () => {
    return (
        <NavigationContainer theme={tailorTheme}>
            <Drawer.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Auth" component={AuthStackNavigator} />
                <Drawer.Screen name="Main" component={MainStackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
