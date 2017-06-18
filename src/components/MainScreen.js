import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

import NavigationContainer from './NavigationContainer';
import {setUserID} from '../states/user-actions';

class MainScreen extends React.Component {

    static propTypes = {
        UuerID: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.goFavlist = this.goFavlist.bind(this);
        this.goVR = this.goVR.bind(this);
    }

    componentDidMount() {
        //const {firebase} = this.props.fb;
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Main'>
                <View style={styles.container}>
                    <Icon name="home"/>
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
                        onLogoutFinished={() => alert("logout.")}/>
                    <Button color="#EF7DF4" title="GoFav" onPress={()=>this.goFavlist()}/>
                    <Button title="GoVR" onPress={()=>this.goVR()}/>
                </View>
            </NavigationContainer>
        );
    }

    goFavlist() {
        this.props.navigation.navigate('Fav');
    }

    goVR() {
        this.props.navigation.navigate('VR');
    }
}

export default connect((state, ownProps) => ({
    ...state
}))(MainScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}