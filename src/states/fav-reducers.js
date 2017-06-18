const initFavState = {
    listingFavs: false,
    listingMoreFavs: undefined, // id of fav from which to start
    favs: [],
    hasMore: true
};

export function fav(state = initFavState, action) {
    switch(action.type) {
        case '@FAVLIST_LIST':
            return {...state};
        case '@FAVLIST_LISTMORE':
            return {...state};
        case '@FAVITEM_DELETE':
            return {...state};
        default:
            return {...state};
    }
}
