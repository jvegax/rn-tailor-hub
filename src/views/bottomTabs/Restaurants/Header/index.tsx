import { View, StyleSheet, Pressable } from 'react-native';
import React, { FC, memo } from 'react';
import { colors } from '@/common/theme/colors';
import TextBase from '@/common/components/TextBase';
import MapsIcon from '@/assets/icons/MapsIcon';
import DrawerIcon from '@/assets/icons/DrawerIcon';

type Props = {
    isMapMode: boolean;
    handleToggleMap: () => void;
    openDrawer: () => void;
}

const Header: FC<Props> = ({ isMapMode, handleToggleMap, openDrawer }) => {
    return (
        <View style={styles.header}>
            <TextBase size={24} weight="bold">{isMapMode ? 'Mapa' : 'Restaurantes'}</TextBase>
            <View style={styles.headerIcons}>
                <Pressable onPress={handleToggleMap} style={styles.iconButton}>
                    <MapsIcon color={isMapMode ? 'black' : colors.tailorGrayIcon} width={24} height={24} />
                </Pressable>
                <Pressable onPress={openDrawer} style={styles.iconButton}>
                    <DrawerIcon width={24} height={24} />
                </Pressable>
            </View>
        </View>
    );
};

export default memo(Header);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.tailorWhite },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: colors.tailorWhite,
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row' },
    iconButton: { marginLeft: 16 },
    detailsButton: { marginTop: 16 },
});
