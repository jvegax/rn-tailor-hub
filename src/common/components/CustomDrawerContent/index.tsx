import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuth } from '@/core/providers/auth';
import TextBase from '../TextBase';

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const { logout } = useAuth();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Pressable onPress={logout} style={styles.logoutContainer} hitSlop={16}>
                <TextBase style={styles.logoutText}>Cerrar sesión</TextBase>
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
    },
});

export default CustomDrawerContent;
