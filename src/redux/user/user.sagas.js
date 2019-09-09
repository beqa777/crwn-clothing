import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    auth,
    createUserProfileDocument,
    googleProvider,
    checkUserSession
} from '../../firebase/firebase.utils';
import userActionTypes from './user.types';
import {
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutSuccess,
    signUpSuccess,
    signUpFailure
} from './user.actions';


function* getSnapshotFromUser(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapShot.id,
            ...userSnapShot.data()
        }));
    } catch (error) {
        yield put(signInFailure(error));
    }

}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* checkUserPersistance() {
    try {
        const userAuth = yield checkUserSession();
        if (!userAuth) return;
        yield getSnapshotFromUser(userAuth);
    } catch (error) {
        yield signInFailure(error);
    }

}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }

}

function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error)
        );
    }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUser(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, checkUserPersistance);
}

export function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}