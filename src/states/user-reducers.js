const initUserState = {
    userID: undefined
};

export function user(state = initUserState, action) {
    switch(action.type) {
        case '@USER/SET_USERID':
            return {userID: action.id};
        default:
            return {...state};
    }
}
