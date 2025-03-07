import { DefaultTheme, Theme } from '@react-navigation/native';
import { colors } from './colors';

const tailorTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.tailorWhite,
        card: colors.tailorWhite,
        text: colors.tailorBlack,
        primary: colors.tailorBlue,
        border: colors.tailorLightBlue,
        notification: colors.tailorBlue,
    },
};

export default tailorTheme;
