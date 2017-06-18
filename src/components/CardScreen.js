import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

class CardScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleGoVR = this.handleGoVR.bind(this);
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{"Welcome to CardScreen"}</Text>
                <Button title="Go VR" onPress={()=>this.handleGoVR()}/>
            </View>
        );
    }

    handleGoVR() {
        this.props.navigation.navigate('VR');
    }
}

export default connect((state, ownProps) => ({
    ...state
}))(CardScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
