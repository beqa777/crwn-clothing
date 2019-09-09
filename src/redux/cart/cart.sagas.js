import { all, put, takeLatest, call } from 'redux-saga/effects';
import { clearCartItems } from './cart.actions';
import userActionTypes from '../user/user.types';

export function* clearCart() {
    yield put(clearCartItems());
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCart)
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ])
}