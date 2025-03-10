import React, { FC } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuth } from '@/core/providers/auth';

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const { logout } = useAuth();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Pressable onPress={logout} style={styles.logoutContainer} hitSlop={16}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </Pressable>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    logoutContainer: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;
