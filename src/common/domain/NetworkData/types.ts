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
