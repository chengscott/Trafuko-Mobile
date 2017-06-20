import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import LoginButton from './FBLoginButton';
import {connect} from 'react-redux';

import FavList from './FavList';
class FavScreen extends React.Component {

    static propTypes = {
        userID: PropTypes.string.isRequired,
        firebase: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        renderNoFavs: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    render() {
        const renderLoginPage =
            <View style={styles.container}>
                <Text>{"Login Page"}</Text>
                <LoginButton
                    permissions={['public_profile','email','user_friends']}
                />
            </View>;

        const renderFavList =
            <View>
                <LoginButton
                    permissions={['public_profile','email','user_friends']}
                />
                <FavList/>
            </View>;
        return (this.props.userID == "")?renderLoginPage:renderFavList;
    }

    handleGoBack() {
        this.props.navigation.goBack();
    }
}

export default connect((state) => ({
    firebase: state.fb.firebase,
    userID: state.user.userID
}))(FavScreen);

const bgColor = "#F5FCFF";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
    }
});
