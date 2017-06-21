import {fetchDataLocal,asyncSave} from '../api/storage';

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
            Promise.all([fetchDataLocal(favid), fetchDataOnline(favid, firebase)]).then(data => {

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
                            dispatch(endFavList(arr3));
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
                                dispatch(endFavList(arrFinal));
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
            fetchDataLocal(favid).then( result => {
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
// function getFavList(uid, pid, ts) {
//     this.props.firebase.ref('/posts/' + pid).once('value').then((snapshot) => {
//         let val = snapshot.val();
//         if (val !== null) {
//             let obj = {
//                 uid: uid,
//                 id: pid,
//                 text: val.text,
//                 color: val.color,
//                 ts: ts
//             };
//             let objs = this.state.favlist;
//             objs.push(obj);
//         }
//     });
// }

function arrayUnique(array1, array2) {

    let a = [];
    let len1 = array1.length;
    let len2 = array2.length;
    for(let i = 0; i<len1; i++) {
        for(let j = 0; j<len2; j++) {
            if(array1[i].id !== array2[j].id) {
                a.push(array1[i]);
            }
        }
    }
    return a.concat(array2);
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
