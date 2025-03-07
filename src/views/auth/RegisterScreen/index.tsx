import TailorLogo from '@/assets/icons/TailorLogo';
import { DrawerParamList } from '@/core/navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

export const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<DrawerParamList>>();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TailorLogo size={154} />
            <Text>Pantalla de Registro</Text>
            <Text onPress={() => navigation.navigate('Main', { screen: 'Restaurants' })}>
                Ir a Restaurantes
            </Text>
        </View>
    );
};
