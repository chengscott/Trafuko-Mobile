import {AsyncStorage} from 'react-native';

export function clearData(favid) {
    AsyncStorage.removeItem('localFavs'+favid);
}

export function asyncSave(favid, data) {

    console.log(data);
    AsyncStorage.getItem('localFavs'+favid).then(result => {
        var arr = [];
        if(result !== null) {
            arr = JSON.parse(result);
            arr = arr.filter((element) => {
                if(element.id == data.id) return false;
                else return true;
            });
            arr.push(data);
            AsyncStorage.setItem('localFavs'+favid,JSON.stringify(arr));
        }else {
            arr.push(data);
            alert('localFavs'+favid);
            AsyncStorage.setItem('localFavs'+favid,JSON.stringify(arr));
        }
    }).catch( err =>{
        console.log(err);
    });
}


export function fetchDataLocal(favid) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('localFavs' + favid).then( result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}