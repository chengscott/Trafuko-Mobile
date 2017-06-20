/**    favlist    **/
function startFavList() {
    return {
        type: '@FAV/START_LIST_FAVS'
    };
}

function endFavList(favs) {
    return {
        type: '@FAV/END_LIST_FAVS',
        favs
    };
}

function emptyFavList() {
    return {
        type: '@FAV/EMPTY_FAVS'
    };
}

export function listFavs(favid, firebase) {

    return (dispatch) =>{
        if(favid == ""){
            dispatch(emptyFavList());
        } else {
            dispatch(startFavList());
            firebase.database().ref('/fav/'+ favid).once('value').then( snapshot =>{
                let arr = objToarr(snapshot.val());
                arr.sort(function(a, b) {
                    let a_t = new Date(a.ts);
                    let b_t = new Date(b.ts);
                    return b_t.getTime() - a_t.getTime();
                });
                dispatch(endFavList(arr));
            }).done();
        }
    };
}
function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}

export function listMoreFavs(favid, start,firebase) {
    return {
        type: '@TEST'
    };
}

/**    favitem    **/
export function deleteFav(favId,firebase) {
    return {
        type: '@TEST'
    };
}
