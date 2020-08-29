const initialState = {
    loading: true,
    channels: [],
    empty: false,
    fetch: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FETCH_SUCCESS':
            console.log('sdf', payload.pro);
            return {
                ...state,
                loading: false,
                fetch: true,
                empty: false,
                channels: [...state.channels, payload.pro],
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                empty: false,
                loading: false,
            };
        case 'FETCH_EMPTY':
            return {
                ...state,
                channels: [],
                loading: false,
                empty: true,
            };
        default:
            return state;
    }
};
