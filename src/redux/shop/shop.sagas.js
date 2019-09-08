import { takeLatest, call, put } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsToMap } from '../../firebase/firebase.utils';
import {
    fetchCollectionSuccess,
    fetchCollectionFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('shopData');
        const snapShot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsToMap, snapShot);
        yield put(fetchCollectionSuccess(collectionMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error));
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionsAsync
    );
}

