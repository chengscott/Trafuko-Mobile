import {AsyncStorage} from 'react-native';

export function clearData(key) {
    AsyncStorage.removeItem(key);
}

export function asyncSave(key, data) {

    AsyncStorage.getItem(key).then(result => {
        var arr = [];
        if(result !== null) {
            arr = JSON.parse(result);
            arr = arr.filter((element) => {
                if(element.id == data.id) return false;
                else return true;
            });
            arr.push(data);
            AsyncStorage.setItem(key,JSON.stringify(arr));
        }else {
            arr.push(data);
            AsyncStorage.setItem(key,JSON.stringify(arr));
        }
    }).catch( err =>{
        console.log(err);
    });
}


export function fetchDataLocal(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then( result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}