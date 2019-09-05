import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsToMap } from '../../firebase/firebase.utils';

const startFetching = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START,
});

const successFetching = (payload) => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload
});

const errorFetching = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTION_ERROR,
    payload: error
});


export const startCollectionFetchAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('shopData');
        dispatch(startFetching());
        collectionRef.get().then((snapshot) => {
            const dataMap = convertCollectionsToMap(snapshot);
            dispatch(successFetching(dataMap));
        }).catch(error => errorFetching(error.message));
    }
}