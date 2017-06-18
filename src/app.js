import React from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    NavigationActions,
    addNavigationHelpers
} from 'react-navigation';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {StyleProvider, Icon} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import * as firebase from "firebase";

import CardScreen from './components/CardScreen';
import FavScreen from './components/FavScreen';
import VRScreen from './components/VRScreen';

const config = {
    apiKey: "AIzaSyDUfoL0DdG_VDo5ijtZRqvVACwXQMARZrc",
    authDomain: "test-efd03.firebaseapp.com",
    databaseURL: "https://test-efd03.firebaseio.com",
    storageBucket: "test-efd03.appspot.com",
};
const fb = firebase.initializeApp(config).database();

const MainNavigator = TabNavigator({
    Card: {
        screen: CardScreen,
        navigationOptions: {
            tabBarLabel: '幹話卡',
            tabBarIcon: <Icon name="albums" />,
        },
    },
    Fav: {
        screen: FavScreen,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: <Icon name="bookmark" />,
        },
    },
});

const AppNavigator = StackNavigator({
    Main: {screen: MainNavigator},
    VR: {screen: VRScreen}
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        headerTitleStyle: {
            color: '#fff',
        },
        title: 'Trafuko',
    }
});

// Nav reducer
const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Main')
);
const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(
        action//, state
    );
    return nextState || state;
};

class AppWithStyleAndNavigator extends React.Component {

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
}

const AppWithNavState = connect(state => ({
    nav: state.navReducer
}))(AppWithStyleAndNavigator);

const store = createStore(combineReducers({
    navReducer
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState />
            </Provider>
        );
    }
}
