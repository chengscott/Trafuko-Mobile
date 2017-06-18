import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, ListView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import NavigationContainer from './NavigationContainer';

class FavScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    componentDidMount() {

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Fav'>
                <View style={styles.container}>
                    <Text>{"Welcome to FavScreen"}</Text>
                    <Button title="Go back" onPress={()=>this.handleGoBack()}/>
                </View>
            </NavigationContainer>
        );
    }

    handleGoBack() {
        this.props.navigation.goBack();
    }
}

export default connect((state, ownProps) => ({
    ...state
}))(FavScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
