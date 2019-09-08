import ShopActionTypes from './shop.types';

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionSuccess = (payload) => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload
});

export const fetchCollectionFailure = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTION_ERROR,
    payload: error
});


