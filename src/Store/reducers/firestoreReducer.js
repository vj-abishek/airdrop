const initialState = {
    generated: false,
    pending: true,
    error: false,
    slug: 'Generating...',
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
        case 'UPDATE_SLUG':
            return {
                ...state,
                generated: false,
                pending: true,
                slug: payload.slug,
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

        case 'GENERAL_ERROR':
            return {
                ...state,
                error: payload,
            };
        case 'GENERAL_SUCCESS':
            return {
                ...state,
                message: payload,
            };

        default:
            return state;
    }
};
