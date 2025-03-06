import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '@/views/auth/LoginScreen';
import { RegisterScreen } from '@/views/auth/RegisterScreen';
import { Restaurants } from '@/views/bottomTabs/Restaurants';
import { Favourites } from '@/views/bottomTabs/Favourites';
import { Profile } from '@/views/bottomTabs/Profile';

// Creación de navigators
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

// Stack de autenticación
const AuthStackNavigator: FC = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
};

// Navegador de Bottom Tabs para el Main Stack
const MainTabNavigator: FC = () => {
    return (
        <BottomTabs.Navigator
            initialRouteName="Restaurants"
            screenOptions={{ headerShown: false }}>
            <BottomTabs.Screen name="Restaurants" component={Restaurants} />
            <BottomTabs.Screen name="Favourites" component={Favourites} />
            <BottomTabs.Screen name="Profile" component={Profile} />
        </BottomTabs.Navigator>
    );
};

// Drawer que contiene ambos navigators
export const AppNavigator: FC = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Auth" component={AuthStackNavigator} />
                <Drawer.Screen name="Main" component={MainTabNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
