import React from 'react';
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

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.props.dispatch(login());
                this.props.dispatch(setUserID(firebaseUser.uid));
            }
        });
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
                    alert('Login cancelled');
                    this.props.dispatch(setBtnDisable(false));
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const {firebase} = this.props;
                        const credential =  firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                        firebase.auth().signInWithCredential(credential).then(result => {
                            this.props.dispatch(setUserID(result.uid));
                            this.props.dispatch(setBtnDisable(false));
                            this.props.dispatch(login());
                            alert("success");
                        }).catch(error => {
                            // The firebase.auth.AuthCredential type that was used.
                            const errInfo = {
                                errorCode: error.code,
                                errorMessage: error.message,
                                email: error.email,
                                credential: error.credential
                            };
                            this.props.dispatch(setBtnDisable(false));
                            console.log(errInfo);
                            alert("error");
                        });
                    });
                }
            }, error => {
                alert('Login fail with error: ' + error);
                this.props.dispatch(setBtnDisable(false));
            });
        } else {
            this.props.firebase.auth().signOut().then(() => {
                this.props.dispatch(logout());
                this.props.dispatch(setUserID('guest'));
            }).catch(error => {
                console.log(error);
            });
        }
    }

}

export default connect((state) => ({
    firebase: state.fb.firebase,
    disable: state.user.disable,
    logtxt: state.user.logtxt
}))(LoginButton);
