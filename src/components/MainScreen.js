import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Button} from 'react-native';

import {connect} from 'react-redux';

import NavigationContainer from './NavigationContainer';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

class MainScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.goFavlist = this.goFavlist.bind(this);
        this.goVR = this.goVR.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
          <NavigationContainer navigate={navigate} title='Main'>
            <View style={styles.container}>
              <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      alert("login is cancelled.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          alert(data.accessToken.toString())
                        }
                      )
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

    goFavlist(){
        this.props.navigation.navigate('Fav');
    }
    goVR(){
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




