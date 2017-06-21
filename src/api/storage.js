import {AsyncStorage} from 'react-native';

export function clearAllDataWithKey(key) {
    AsyncStorage.removeItem(key);
}

export function removeDataWithID(key,id) {
    return fetchDataLocal(key).then( arr => {
        arr = JSON.parse(arr);
        if(arr !== null && arr.length !== 0){
            arr = arr.filter((element) => {
                return element.id !== id;
            });
            console.log('2222222222222');
            console.log(arr);
            return AsyncStorage.setItem(key,JSON.stringify(arr)).then(()=>{
                return true;
            }).catch(err => {
                return err;
            });
        }
    }).catch( err => {
        return err;
    });
}

export function asyncUpdate(key, data) {

    return AsyncStorage.setItem(key,JSON.stringify(data)).then(()=>{
        return true;
    }).catch(err => {
        return err;
    });
}

export function asyncSave(key,data) { // for obj
    return AsyncStorage.getItem(key).then(result => {
        var arr = [];
        if(result !== null) {
            arr = JSON.parse(result);
            arr = arr.filter((element) => {
                return element.id !== data.id;
            });
            console.log('-----------');
            console.log(arr);
            return true;
            // return AsyncStorage.setItem(key,JSON.stringify(arr)).then(()=>{
            //     return true;
            // }).catch(err => {
            //     console.log(err);
            //     return err;
            // });
        } else {
            arr.push(data);
            console.log('+++++++++++');
            console.log(arr);

            return true;
            // return AsyncStorage.setItem(key,JSON.stringify(arr)).then(()=>{
            //     return true;
            // }).catch(err => {
            //     console.log(err);
            //     return err;
            // });
        }
    }).catch( err =>{
        console.log(err);
        return err;
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

function arrayUnique(array1, array2) {

    let len1 = array1.length;
    for(let i = 0; i<len1; i++) {
        array2 = array2.filter((element) => {
            return element.id !== array1[i].id;
        });
    }
    return array1.concat(array2);
}