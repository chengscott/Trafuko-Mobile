import {fetchDataLocal} from '../api/storage';

/* favlist */

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

function fetchDataOnline(favid, firebase) {
    return firebase.database().ref('/fav/'+ favid).once('value').then( snapshot =>{
        let arr = objToarr(snapshot.val());
        return arr;
    }).catch(err => {
        return err;
    });
}
// 0 for localData
// 1 for online data
export function listFavs(favid, firebase) {
    return (dispatch, getState) => {
        const {isConnected} = getState().user;
        if (isConnected === true && favid !== '') {
            dispatch(startFavList());
            Promise.all([fetchDataLocal('localFavs' + favid), fetchDataOnline(favid, firebase)]).then(data => {
                if (data[0] !== null && data[1] !== null) {
                    let arr1 = JSON.parse(data[0]);
                    let arr2 = objToarr(data[1]);
                    let arr3 = arrayUnique(arr1.concat(arr2));
                    arr3 = arraySortByts(arr3);
                    dispatch(endFavList(arr3));
                } else if(data[0] === null && data[1] === null) {
                    dispatch(emptyFavList());
                } else {
                    if (data[0] === null) {
                        let arr = objToarr(data[1]);
                        arr = arraySortByts(arr);
                        dispatch(endFavList(arr));
                    } else {
                        let arr = JSON.parse(data[0]);
                        arr = arraySortByts(arr);
                        dispatch(endFavList(arr));
                    }
                }
            }).catch( err => {
                console.log(err);
                dispatch(emptyFavList());
            });
        } else if (isConnected === false) {
            dispatch(startFavList());
            fetchDataLocal('localFavs' + favid).then(result => {
                if (result !== null) {
                    let arr = JSON.parse(result);
                    arr = arraySortByts(arr);
                    dispatch(endFavList(arr));
                } else dispatch(emptyFavList());
            }).catch(err => {
                console.log(err);
                dispatch(emptyFavList());
            });
        } else dispatch(emptyFavList());
    };
}

function arraySortByts(array) {
    let a = array;
    a.sort(function(a, b) {
        let a_t = new Date(a.ts);
        let b_t = new Date(b.ts);
        return b_t.getTime() - a_t.getTime();
    });
    return a;
}

function arrayUnique(array) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}

/* favitem */
export function deleteFav(favId,firebase) {
    return {
        type: '@TEST'
    };
}
