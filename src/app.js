import React from 'react';
import PropTypes from 'prop-types';
import {BackHandler, NetInfo, AsyncStorage} from 'react-native';
import {persistStore} from 'redux-persist';
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

import {user} from './states/user-reducers';
import {fav} from './states/fav-reducers';
import {setConnectState,setUserID} from './states/user-actions';
import CardScreen from './components/CardScreen';
import FavScreen from './components/FavScreen';
import VRScreen from './components/VRScreen';

/* Firebase */

const config = {
    apiKey: "AIzaSyDUfoL0DdG_VDo5ijtZRqvVACwXQMARZrc",
    authDomain: "test-efd03.firebaseapp.com",
    databaseURL: "https://test-efd03.firebaseio.com",
    storageBucket: "test-efd03.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);

// Firebase reducer
const initialFbState = {
    firebase: undefined
};
const fb = (state = initialFbState) => {
    if (firebaseApp !== undefined) {
        return {firebase: firebase};
    }
    return {...state};
};

/* Navigator */

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
const initialNavState = AppNavigator.router.getStateForAction(
    MainNavigator.router.getActionForPathAndParams('Card')
);
const navReducer = (state = initialNavState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

class AppWithStyleAndNavigator extends React.Component {

    static propTypes = {
        nav: PropTypes.object.isRequired,
        isConnected: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.handleConnectChange = this.handleConnectChange.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.props.dispatch(setUserID(firebaseUser.uid));
            }
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this.handleConnectChange);
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0 && nav.routes[0].index === 0) return false;
            dispatch(NavigationActions.back());
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
        NetInfo.isConnected.removeEventListener('change', this.handleConnectChange);
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

    handleConnectChange(status) {
        this.props.dispatch(setConnectState(status));
    }
}

const AppWithNavState = connect(state => ({
    nav: state.navReducer,
    isConnected: state.user.isConnected
}))(AppWithStyleAndNavigator);

const store = createStore(combineReducers({
    navReducer, fb, user, fav
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['user','navReducer']
});
export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppWithNavState />
            </Provider>
        );
    }
}
