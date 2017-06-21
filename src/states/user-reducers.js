const initUserState = {
    isConnected: false,
    userID: 'guest',
    logtxt: '登入',
    disable: false
};

export function user(state = initUserState, action) {
    switch (action.type) {
        case 'persist/REHYDRATE':
            const incoming = action.payload.user;
            if (incoming == undefined) {
                return {...state};
            }
            return {
                ...state,
                userID: incoming.userID,
                logtxt: incoming.logtxt
            };
        case '@USER/SET_USERID':
            return {
                ...state,
                userID: action.id
            };
        case '@USER/SET_CONNECTED_STATE':
            return {
                ...state,
                isConnected: action.isConnected
            };
        case '@USER/SET_BTN_DISABLE':
            return {
                ...state,
                disable: action.disable
            };
        case '@USER/USER_LOGIN':
            return {
                ...state,
                logtxt: '登出'
            };
        case '@USER/USER_LOGOUT':
            return {
                ...state,
                logtxt: '登入'
            };
        default:
            return {...state};
    }
}
