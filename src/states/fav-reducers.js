const initFavState = {
    listingFavs: false,
    listingMoreFavs: undefined, // id of fav from which to start
    favs: [],
    hasMore: true
};

export function fav(state = initFavState, action) {
    switch(action.type) {
        case '@FAV/START_LIST_FAVS':
            return {
                ...state,
                listingFavs: true,
                listingMoreFavs: undefined
            };
        case '@FAV/END_LIST_FAVS':
            if (!action.favs)
                return {
                    ...state,
                    listingFavs: false
                };
            return {
                ...state,
                listingFavs: false,
                favs: action.favs,
                hasMore: action.favs.length > 0
            };
        case '@FAVITEM_DELETE':
            return {...state};
        default:
            return {...state};
    }
}
