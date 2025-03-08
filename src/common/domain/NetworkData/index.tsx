import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { Props } from './types';
import { colors } from '@/common/theme/colors';
import ErrorScreen from '@/common/components/ErrorScreen';

const NetworkData = <T,>({ data, renderData, errorState }: Props<T>) => {
    if (data.type === 'loading') {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.tailorBlue} />
            </View>
        );
    }

    if (data.type === 'error') {
        return errorState ? errorState() : <ErrorScreen />;
    }

    return renderData(data.data);
};

export default NetworkData;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
