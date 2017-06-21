import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Alert} from 'react-native';
import {ListItem} from 'native-base';
import {connect} from 'react-redux';
import fecha from 'fecha';
import FIcon from 'react-native-vector-icons/FontAwesome';

import appColors from '../styles/colors';
import {deleteFav} from '../states/fav-actions';

class FavItem extends React.Component {

    static propTypes = {
        userID: PropTypes.string.isRequired,
        firebase: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        ts: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleDeleteFav = this.handleDeleteFav.bind(this);
    }

    render() {
        const {ts,text,id} = this.props;
        const time = new Date(ts);
        const favtime = fecha.format(time, "YYYY-MM-DD");
        return (
            <ListItem  onPress={()=>{this.handleDeleteFav(id)}} style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.fav}>
                    <View style={styles.wrap}>
                        <Text style={styles.ts}>{favtime}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                    <View style={styles.delete}>
                        <FIcon name="close" style={StyleSheet.flatten(styles.deleteIcon)}/>
                    </View>
                </View>
            </ListItem>
        );
    }

    handleDeleteFav(id) {
        const {firebase,dispatch} = this.props;
        Alert.alert(
            '注意',
            '您確定要刪除此收藏？',
            [
                {text: '取消', style: 'cancel'},
                {text: '確認', onPress: () => dispatch(deleteFav(id,firebase))},
            ]
        );
        //this.props.dispatch(deleteFav(id,firebase))
    }
}

export default connect((state) => ({
    userID: state.user.userID,
    firebase: state.fb.firebase
}))(FavItem);

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
    delete: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 0
    },
    ts: {
        color: appColors.textLight,
        marginLeft: 8
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8
    },
    deleteIcon: {
        fontSize: 15,
        top: 2,
        color: appColors.textLight
    },
});
