import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {ListItem} from 'native-base';
import {connect} from 'react-redux';
import fecha from 'fecha';

import appColors from '../styles/colors';
import {deleteFav} from '../states/fav-actions';

class FavItem extends React.Component {

    static propTypes = {
        userID: PropTypes.string.isRequired,
        isConnected: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        ts: PropTypes.string.isRequired,
        text: PropTypes.string,
        firebase: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
        this.handleDeleteFav = this.handleDeleteFav.bind(this);
    }

    componentDidMount() {
        const {isConnected, id, firebase} = this.props;
        if (isConnected === true) {
            firebase.database().ref('/posts/' + id).once('value').then(snapshot => {
                if (snapshot !== null) {
                    this.setState({
                        text: snapshot.val().text
                    });
                }
            });
        } else {
            this.setState({
                text: this.props.text
            });
        }
    }

    render() {
        const {ts} = this.props;
        const time = new Date(ts);
        const favtime = fecha.format(time, "YYYY-MM-DD");
        return (
            <ListItem onPress={()=> this.handleDeleteFav(this.props.id,this.state.text)} style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.fav}>
                    <View style={styles.wrap}>
                        <Text style={styles.ts}>{favtime}</Text>
                        <Text style={styles.text}>{this.state.text}</Text>
                    </View>
                </View>
            </ListItem>
        );
    }

    handleDeleteFav(id) {
        const {firebase} = this.props;
        this.props.dispatch(deleteFav(id, firebase));
    }
}

export default connect((state) => ({
    firebase: state.fb.firebase,
    isConnected: state.user.isConnected,
    userID: state.user.userID
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
    }
});
