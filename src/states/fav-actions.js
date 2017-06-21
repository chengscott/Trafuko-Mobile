import {fetchDataLocal,removeDataWithID,asyncUpdate} from '../api/storage';

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

export function emptyFavList() {
    return {
        type: '@FAV/EMPTY_FAVS'
    };
}

function fetchDataOnline(userID, firebase) {
    return firebase.database().ref('/fav/'+ userID).once('value').then( snapshot =>{
        let arr = objToarr(snapshot.val());
        return arr;
    }).catch(err => {
        return err;
    });
}
// 0 for localData
// 1 for online data
export function listFavs(userID, firebase) {
    return (dispatch, getState) => {
        const {isConnected} = getState().user;
        if (isConnected === true && userID !== 'guest') {
            dispatch(startFavList());
            Promise.all([fetchDataLocal(userID), fetchDataOnline(userID, firebase)]).then(data => {
                if (data[0] !== null && data[1] !== null) {
                    let arr1 = JSON.parse(data[0]);
                    let arr2 = objToarr(data[1]);

                    if(arr2.length > 0){
                        let posts = arr2.map((element) => {
                            return getFav(firebase,element.id,element.ts);
                        });
                        Promise.all(posts).then(result => {
                            let arr3 = arrayUnique(arr1,result);
                            arr3 = arraySortByts(arr3);

                            asyncUpdate(userID,arr3).then(result => {
                                dispatch(endFavList(arr3));
                            }).catch(err => {
                                dispatch(emptyFavList());
                            });
                        });
                    } else {
                        arr1 = arraySortByts(arr1);
                        dispatch(endFavList(arr1));
                    }
                } else if(data[0] === null && data[1] === null) {
                    dispatch(emptyFavList());
                } else {
                    if (data[0] === null) {
                        let arr = objToarr(data[1]);
                        if(arr.length > 0){
                            let posts = arr.map((element) => {
                                return getFav(firebase,element.id,element.ts);
                            });
                            Promise.all(posts).then(result => {
                                let arrFinal = arraySortByts(result);
                                asyncUpdate(userID,arrFinal).then(result => {
                                    dispatch(endFavList(arrFinal));
                                }).catch(err => {
                                    dispatch(emptyFavList());
                                });
                            });
                        }else {
                            dispatch(emptyFavList());
                        }
                    } else {
                        let arr = JSON.parse(data[0]);
                        arr = arraySortByts(arr);
                        if(arr.length == 0) dispatch(emptyFavList());
                        else dispatch(endFavList(arr));
                    }
                }
            }).catch( err => {
                console.log(err);
                dispatch(emptyFavList());
            });
        }
        else if(isConnected === false){
            fetchDataLocal(userID).then( result => {
                dispatch(startFavList());
                if(result !== null){
                    let arr = JSON.parse(result);
                    arr = arraySortByts(arr);
                    dispatch(endFavList(arr));
                } else {
                    dispatch(emptyFavList());
                }
            }).catch( err => {
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
function getFav(firebase,pid,favts) {
    return firebase.database().ref('/posts/' + pid).once('value').then(snapshot => {
        let obj = {
            id: snapshot.val().id,
            text: snapshot.val().text,
            ts: favts,
            vote: snapshot.val().vote
        };
        return obj;
    }).catch(err => {
        return err;
    });
}

function arrayUnique(array1, array2) {

    let len1 = array1.length;
    for(let i = 0; i<len1; i++) {
        array2 = array2.filter((element) => {
            return element.id !== array1[i].id;
        });
    }
    return array1.concat(array2);
}

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}

/* favitem */
export function deleteFav(pid,firebase) {
    return (dispatch, getState) => {
        const {isConnected,userID} = getState().user;
        if(isConnected === true && userID !== 'guest') {
            removeDataWithID(userID,pid).then( result =>{
                console.log(result);
                firebase.database().ref('/fav/' + userID + '/' + pid).remove();
            }).catch( err => {
                console.log(err);
                dispatch(emptyFavList());
            });
        }else {
            removeDataWithID(userID,pid).then( result =>{
                if(result) dispatch(listFavs(userID,firebase));
            }).catch( err => {
                console.log(err);
                dispatch(emptyFavList());
            });
        }
    };
}
