import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@/common/theme/colors';
import ErrorScreen from '@/common/components/ErrorScreen';
import { Props } from './types';

const NetworkData = <T,>({ data, renderData, renderNetworkError }: Props<T>) => {
    if (data.type === 'loading') {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.tailorBlue} />
            </View>
        );
    }

    if (data.type === 'error') {
        return renderNetworkError ? renderNetworkError() : <ErrorScreen />;
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
