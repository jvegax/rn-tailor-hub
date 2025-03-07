import TailorLogo from '@/assets/icons/TailorLogo';
import { colors } from '@/common/theme/colors';
import { DrawerParamList } from '@/core/navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<DrawerParamList>>();
    return (
        <View style={styles.container}>
            <TailorLogo />
            <Text>Pantalla de Registro</Text>
            <Text onPress={() => navigation.navigate('Main', { screen: 'Restaurants' })}>
                Entrar
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '59%',
        height: '59%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        backgroundColor: colors.tailorGray,
        borderRadius: 16,
    },
});
