import { JSX } from 'react';

export type NetworkData<T> =
    | {
        type: 'data';
        data: T;
    }
    | {
        type: 'loading';
    }
    | {
        type: 'error';
        message: string;
    };

export type Props<T> = {
    data: NetworkData<T>;
    renderData: (data: T) => JSX.Element;
    renderNetworkError?: () => JSX.Element;
};
