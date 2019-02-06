import {AsyncStorage} from 'react-native'
import App from '../../../App';

import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';
import startTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = "AIzaSyD4zX_jm75oEvBKIT2iWH_pawvhF7gZ_9c";
const authTokenStorageKey = "authToken";
const authTokenExpiresInKey = "tokenExpiresIn";
const authRefreshTokenKey = "refreshToken";

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        let authUrl = "";
        dispatch(uiStartLoading());
        if (authMode === "login") {
            authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
        } else {
            authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
        }

        fetch(authUrl, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                contentType: "application/json"
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(uiStopLoading());
        })
        .then(response => response.json())
        .then(response => {
            if (!response.idToken) {
                alert("Authentication failed. Please try again later.");
            } else {
                dispatch(authStoreToken(
                    response.idToken, 
                    response.expiresIn,
                    response.refreshToken
                ));
                startTabs();
            }
            dispatch(uiStopLoading());
        })
    }
}

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem(authTokenExpiresInKey, expiryDate.toString());
        AsyncStorage.setItem(authTokenStorageKey, token);
        AsyncStorage.setItem(authRefreshTokenKey, refreshToken);
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            let authToken = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if (!authToken || new Date(expiryDate) <= new Date()) {
                AsyncStorage.getItem(authTokenStorageKey)
                .catch(err => reject())
                .then(token => {
                    if (!token) {
                        reject();
                    }
                    authToken = token;
                    return AsyncStorage.getItem(authTokenExpiresInKey);
                })
                .then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));
                    const now = new Date();
                    if (parsedExpiryDate > now) {
                        dispatch(authSetToken(authToken))
                        resolve(authToken);
                    } else {
                        reject();
                    }
                });
            } else {
                resolve(authToken);
            }
        });
        return promise.catch(err => {
            return AsyncStorage.getItem(authRefreshTokenKey)
            .then(refreshToken => {
                return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
                    method: "POST",
                    headers: {
                        contentType: "application/x-www-form-urlencoded"
                    },
                    body: JSON.stringify({
                        grant_type: "refresh_token",
                        refresh_token: refreshToken
                    }),
                })
            })
            .then(response => response.json())
            .then(tokenResponse => {
                if (tokenResponse.id_token) {
                    dispatch(authStoreToken(
                        tokenResponse.id_token, 
                        tokenResponse.expires_in, 
                        tokenResponse.refresh_token
                    ));
                    return tokenResponse.id_token;
                } else {
                    dispatch(authClearStorage());

                }
            });
        })
        .then(token => {
            if (!token) {
                throw(new Error());
            } else {
                return token;
            }
        });
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            startTabs();
        })
        .catch(err => console.log("No valid token available. User need to sign in."));
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem(authTokenStorageKey);
        AsyncStorage.removeItem(authTokenExpiresInKey);
        return AsyncStorage.removeItem(authRefreshTokenKey);
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
        .then(() => {
            App();
        });        
        dispatch(authRemoveToken())
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}