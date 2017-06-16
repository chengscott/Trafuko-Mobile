import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button} from 'react-native';

import {connect} from 'react-redux';

class VRScreen extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{"Welcome to VRScreen"}</Text>
                <Button title="Go back" onPress={()=>this.handleGoBack()}/>
            </View>
        );
    }

    handleGoBack() {
         this.props.navigation.goBack();
    }
}

export default connect((state, ownProps) => ({
    ...state
}))(VRScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
