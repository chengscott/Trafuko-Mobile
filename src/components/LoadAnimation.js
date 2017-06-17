import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

export default class LoadAnimation extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>{"Welcome to LoadAnimation"}</Text>
            </View>
        );
    }
}
