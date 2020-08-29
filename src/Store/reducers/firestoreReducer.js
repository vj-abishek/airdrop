const initialState = {
    generated: false,
    pending: true,
    error: false,
    slug: 'Loading...',
    invite: false,
    message: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'WRITE_SUCCESS':
            return {
                ...state,
                generated: true,
                pending: false,
                slug: payload.slug,
            };
        case 'WRITE_ERROR':
            return {
                ...state,
                error: { message: 'Cannot Fetch the slug' },
                message: payload.error,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                invite: payload.doc,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                invite: false,
                createdRoom: false,
                error: payload.err,
            };
        case 'CREATED_CHANNEL':
            return {
                ...state,
                createdRoom: payload.slug,
                message: { message: 'Created channel successfully.' },
            };

        case 'CHANNEL_ERROR':
            return {
                ...state,
                createdRoom: false,
                error: payload,
            };

        default:
            return state;
    }
};
