import { NetworkData } from '@/common/domain/NetworkData/types';
import { JSX } from 'react';

export type Props<T> = {
    data: NetworkData<T>;
    renderData: (data: T) => JSX.Element;
    renderNetworkError?: () => JSX.Element;
};
