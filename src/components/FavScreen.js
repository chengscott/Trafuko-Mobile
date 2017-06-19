import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, ListView, RefreshControl} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {setUserID} from '../states/user-actions';

import FavList from './FavList';
class FavScreen extends React.Component {

    static propTypes = {
        userID: PropTypes.string,
        firebase: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    componentDidMount() {
        if(this.props.userID == undefined){
            this.props.firebase.auth().onAuthStateChanged((firebaseUser) => {
                if (firebaseUser) {
                    this.props.dispatch(setUserID(firebaseUser.uid));
                }
            });
        }
    }

    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={["publish_actions,email"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        const {firebase} = this.props.fb;
                                        const credential =  firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                                        firebase.auth().signInWithCredential(credential).then((result) => {
                                            this.props.dispatch(setUserID(result.uid));
                                            alert("success");
                                        }).catch((error) => {
                                        // The firebase.auth.AuthCredential type that was used.
                                            const errInfo = {
                                                errorCode: error.code,
                                                errorMessage: error.message,
                                                email: error.email,
                                                credential: error.credential
                                            };
                                            console.log(errInfo);
                                            alert("error");
                                        });
                                    });
                            }
                        }
                    }
                    onLogoutFinished={() => {
                        this.props.firebase.auth().signOut().then(()=>{
                            alert("logout.");
                            this.props.dispatch(setUserID(undefined));
                        }).catch(error =>{
                            alert("Logout error");
                        });
                    }}/>
                <FavList/>
            </View>
        );
    }

    handleGoBack() {
        this.props.navigation.goBack();
    }
}

export default connect((state, ownProps) => ({
    ...state,
    firebase: state.fb.firebase,
    userID: state.user.userID
}))(FavScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

// <LoginButton
//     publishPermissions={["publish_actions,email"]}
//     onLoginFinished={
//         (error, result) => {
//             if (error) {
//                 alert("login has error: " + result.error);
//             } else if (result.isCancelled) {
//                 alert("login is cancelled.");
//             } else {
//                 AccessToken.getCurrentAccessToken().then(
//                 (data) => {
//                     const {firebase} = this.props.fb;
//                     const credential =  firebase.auth.FacebookAuthProvider.credential(data.accessToken);
//                     firebase.auth().signInWithCredential(credential).then((result) => {
//                         this.props.dispatch(setUserID(result.uid));
//                         alert("success");
//                     }).catch((error) => {
//                         // The firebase.auth.AuthCredential type that was used.
//                         const errInfo = {
//                             errorCode: error.code,
//                             errorMessage: error.message,
//                             email: error.email,
//                             credential: error.credential
//                         };
//                         console.log(errInfo);
//                         alert("error");
//                     });
//                 });
//             }
//         }
//     }
//     onLogoutFinished={() => alert("logout.")}/>