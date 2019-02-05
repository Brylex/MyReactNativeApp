import {AUTH_SET_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './index';
import startTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = "AIzaSyD4zX_jm75oEvBKIT2iWH_pawvhF7gZ_9c";

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
                dispatch(authSetToken(response.idToken));
                startTabs();
            }
            dispatch(uiStopLoading());
        })
    }
}

export const authSetToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    }

}