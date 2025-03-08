import { View, StyleSheet } from 'react-native';
import React, { FC, memo } from 'react';
import TextBase from '@/common/components/TextBase';

const RestaurantMap: FC = () => {
    return (
        <View style={styles.container}>
            <TextBase>RestaurantMap</TextBase>
        </View>
    );
};

export default memo(RestaurantMap);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    detailsButton: { marginTop: 16 },
});
