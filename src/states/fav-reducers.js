const initFavState = {
    listingFavs: false,
    listingMoreFavs: undefined, // id of fav from which to start
    favs: [],
    hasMore: true,
    emptyState: false
};

export function fav(state = initFavState, action) {
    switch (action.type) {
        case '@FAV/EMPTY_FAVS':
            return {
                ...state,
                listingFavs: false,
                emptyState: true
            };
        case '@FAV/START_LIST_FAVS':
            return {
                ...state,
                listingFavs: true,
                emptyState: false,
                listingMoreFavs: undefined
            };
        case '@FAV/END_LIST_FAVS':
            if (action.favs.length == 0)
                return {
                    ...state,
                    listingFavs: false,
                    emptyState: true
                };
            return {
                ...state,
                listingFavs: false,
                favs: action.favs,
                emptyState: false,
                hasMore: action.favs.length > 0
            };
        case '@FAVITEM_DELETE':
            return {...state};
        default:
            return {...state};
    }
}
