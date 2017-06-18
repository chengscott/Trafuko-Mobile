import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {ListItem, Icon} from 'native-base';

import appColors from '../styles/colors';

import {deleteFav} from '../states/fav-actions';

export default class FavItem extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        ts: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleDeleteFav = this.handleDeleteFav.bind(this);
    }

    render() {
        const {id, text, ts, color} = this.props;
        return (
            <ListItem onPress={()=> this.handleDeleteFav(this.props.id)} style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.fav}>
                    <View style={styles.wrap}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            </ListItem>
        );
    }

    handleDeleteFav(id) {
        this.props.dispatch(deleteFav(id));
    }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0
    },
    fav: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    wrap: {
        flex: 1
    },
    ts: {
        color: appColors.textLight
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4
    }
});
