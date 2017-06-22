import React from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {setUserID, setBtnDisable, login, logout} from '../states/user-actions';

class LoginButton extends React.Component {

    static propTypes = {
        disable: PropTypes.bool.isRequired,
        permissions: PropTypes.array.isRequired,
        firebase: PropTypes.object.isRequired,
        logtxt: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.LoginFunc = this.LoginFunc.bind(this);
    }

    render() {
        return (
            <Icon.Button name="facebook" disabled={this.props.disable} backgroundColor="#3b5998" onPress={this.LoginFunc}>
                {this.props.logtxt}
            </Icon.Button>
        );
    }

    LoginFunc() {
        if (this.props.logtxt === '登入') {
            this.props.dispatch(setBtnDisable(true));
            LoginManager.logInWithReadPermissions(this.props.permissions).then(result => {
                if (result.isCancelled) {
                    Alert.alert('Trafuko', '登入取消QQ');
                    this.props.dispatch(setBtnDisable(false));
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const {firebase} = this.props;
                        const credential =  firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                        firebase.auth().signInWithCredential(credential).then(result => {
                            this.props.dispatch(setUserID(result.uid));
                            this.props.dispatch(setBtnDisable(false));
                            this.props.dispatch(login());
                            Alert.alert('登入成功', '可以開始同步幹話了～');
                        }).catch(error => {
                            // The firebase.auth.AuthCredential type that was used.
                            const errInfo = {
                                errorCode: error.code,
                                errorMessage: error.message,
                                email: error.email,
                                credential: error.credential
                            };
                            this.props.dispatch(setBtnDisable(false));
                            // console.log(errInfo);
                            Alert.alert('Trafuko', '登入失敗TAT');
                        });
                    });
                }
            }, error => {
                Alert.alert('Trafuko', '登入錯誤QAQ\n請回報訊息：\n' + error);
                this.props.dispatch(setBtnDisable(false));
            });
        } else {
            this.props.firebase.auth().signOut();
            this.props.dispatch(logout());
            this.props.dispatch(setUserID('guest'));
        }
    }
}

export default connect((state) => ({
    firebase: state.fb.firebase,
    disable: state.user.disable,
    logtxt: state.user.logtxt
}))(LoginButton);
