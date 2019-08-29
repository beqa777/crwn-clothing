import SHOP_DATA from './shop.data';

const DEFAULT_STATE = {
    collections: SHOP_DATA
};

const shopReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default shopReducer;