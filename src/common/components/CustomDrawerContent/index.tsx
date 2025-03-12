import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuth } from '@/core/providers/auth';
import TextBase from '../TextBase';
import TailorLogo from '@/assets/icons/TailorLogo';
import { colors } from '@/common/theme/colors';

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const { logout } = useAuth();

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <View style={styles.container}>
                <TailorLogo color={colors.tailorBlue} />
                <Pressable onPress={logout} style={styles.logoutContainer} hitSlop={16}>
                    <TextBase style={styles.logoutText}>Cerrar sesión</TextBase>
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
