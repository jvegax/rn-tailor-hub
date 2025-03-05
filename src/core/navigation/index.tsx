import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from '@/views/auth/LoginScreen';
import { RegisterScreen } from '@/views/auth/RegisterScreen';
import { Restaurants } from '@/views/bottomTabs/Restaurants';


// Creación de stacks
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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

// Stack principal para el resto de pantallas
const MainStackNavigator: FC = () => {
    return (
        <MainStack.Navigator
            initialRouteName="Restaurants"
            screenOptions={{ headerShown: true }}>
            <MainStack.Screen name="Restaurants" component={Restaurants} />
            {/* Se pueden agregar más pantallas aquí */}
        </MainStack.Navigator>
    );
};

// Drawer que contiene ambos stacks
export const AppNavigator: FC = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Main"
                screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Auth" component={AuthStackNavigator} />
                <Drawer.Screen name="Main" component={MainStackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
