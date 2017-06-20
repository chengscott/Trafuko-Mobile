export function setUserID(id) {
    return {
        type: '@USER/SET_USERID',
        id: id
    };
}

export function setBtnDisable(flag) {
    return {
        type: '@USER/SET_BTN_DISABLE',
        disable: flag
    };
}

export function setConnectState(status) {
    return {
        type: '@USER/SET_CONNECTED_STATE',
        isConnected: status
    };
}

export function login() {
    return {
        type: '@USER/USER_LOGIN'
    };
}

export function logout() {
    return {
        type: '@USER/USER_LOGOUT'
    };
}
