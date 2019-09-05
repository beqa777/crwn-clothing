
import ShopActionTypes from './shop.types';

const DEFAULT_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                isFetching: true
            }

        case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload,
                errorMessage: undefined
            }

        case ShopActionTypes.FETCH_COLLECTION_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }

        default:
            return state;
    }
}

export default shopReducer;