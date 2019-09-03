import ShopActionTypes from './shop.types';

const DEFAULT_STATE = {
    collections: {}
};

const shopReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_SHOP_DATA:
            return {
                ...state,
                collections: action.payload
            }

        default:
            return state;
    }
}

export default shopReducer;