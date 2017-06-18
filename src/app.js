import React, {Component} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import * as firebase from "firebase";

import {user} from './states/user-reducers';

import MainScreen from './components/MainScreen';
import FavScreen from './components/FavScreen';
import VRScreen from './components/VRScreen';

const config = {
    apiKey: "AIzaSyDUfoL0DdG_VDo5ijtZRqvVACwXQMARZrc",
    authDomain: "test-efd03.firebaseapp.com",
    databaseURL: "https://test-efd03.firebaseio.com",
    storageBucket: "test-efd03.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);

const AppNavigator = StackNavigator({
    Main: {screen: MainScreen},
    Fav: {screen: FavScreen},
    VR: {screen: VRScreen}
}, {
    headerMode: 'none'
});

class AppWithStyleAndNavigator extends React.Component {

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <AppNavigator navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav
                    })}/>
            </StyleProvider>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0) return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state => ({
    nav: state.nav
}))(AppWithStyleAndNavigator);

// Nav reducer
const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Today'}));
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

// Firebase reducer
const initialFbState = {
    firebase:undefined
};
const fb = (state = initialFbState, action) => {
    if(firebaseApp !== undefined) {
        return {firebase: firebase};
    } else return {...state};
}

const store = createStore(combineReducers({
    nav, fb, user
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}
