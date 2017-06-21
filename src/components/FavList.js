import React from 'react';
import PropTypes from 'prop-types';
import {ListView, RefreshControl, View , Text, StyleSheet, Image} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {connect} from 'react-redux';

import {listFavs} from '../states/fav-actions';
import FavItem from './FavItem';

const white = "#FFF";
class FavList extends React.Component {

    static propTypes = {
        listingFavs: PropTypes.bool.isRequired,
        listingMoreFavs: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        favs: PropTypes.array.isRequired,
        hasMoreFavs: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        scrollProps: PropTypes.object,
        firebase: PropTypes.object.isRequired,
        userID: PropTypes.string,
        isConnected: PropTypes.bool.isRequired,
        emptyState: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        const {dispatch,userID,firebase} = this.props;
        dispatch(listFavs(userID,firebase));
    }

    componentWillReceiveProps(nextProps) {
        const {firebase,dispatch,userID,favs,isConnected} = this.props;
        const flag1 = userID == 'guest' && userID !== nextProps.userID;
        const flag2 = userID !== 'guest' && isConnected !== nextProps.isConnected && isConnected === false;
        if (flag1 || flag2) {
            dispatch(listFavs(nextProps.userID,firebase));
        }
        if((flag1 && isConnected === true) || flag2) {
            firebase.database().ref('/fav/'+nextProps.userID).on('value',function(snapshot){
                dispatch(listFavs(nextProps.userID,firebase));
            });
        }
        const flag3 = userID !== 'guest' && nextProps.userID === 'gurst';
        const flag4 = isConnected === true && nextProps.isConnected === false;
        if(flag3 || flag4){
            firebase.database().ref('/fav/'+userID).off();
        }
        if (favs !== nextProps.favs) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.favs)
            });
        }
    }

    render() {
        const {listingFavs, scrollProps} = this.props;
        const renderFavList =
            <ListView
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl refreshing={listingFavs} onRefresh={this.handleRefresh} />
                }
                distanceToLoadMore={300}
                renderScrollComponent={props => <InfiniteScrollView {...props} />}
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    return <FavItem {...p} />;
                }}
                canLoadMore={() => {
                    // if (listingFavs || !favs.length)
                    //     return false;
                    // return hasMoreFavs;
                    return false;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: white}}
                ref={(el) => this.listEl = el}
                {...scrollProps}
            />;
        const renderNoFavs = (
            <View style={styles.container}>
                <View style={styles.arrowBox}>
                    <Text style={styles.blankText}>登入後收藏</Text>
                    <Image source={require('../images/arrow.png')} style={styles.imageArrow} />
                </View>
                <View style={styles.blankBox}>
                    <Image source={require('../images/blank.png')} style={styles.imageBlank} />
                </View>
            </View>);
        return (this.props.emptyState) ? renderNoFavs : renderFavList;
    }

    handleRefresh() {
        const {dispatch, firebase, userID, isConnected} = this.props;
        if (userID !== 'guest' && isConnected == true)
            dispatch(listFavs(userID,firebase));
    }

    handleLoadMore() {
        // const {listingMoreFavs, dispatch, favs, firebase} = this.props;
        // const start = favs[favs.length - 1].id;
        // if (listingMoreFavs !== start)
        //     dispatch(listMoreFavs(this.props.userID,start,firebase));
    }
}

export default connect((state) => ({
    listingFavs: state.fav.listingFavs,
    listingMoreFavs: state.fav.listingMoreFavs,
    favs: state.fav.favs,
    hasMoreFavs: state.fav.hasMore,
    firebase: state.fb.firebase,
    userID: state.user.userID,
    isConnected: state.user.isConnected,
    emptyState: state.fav.emptyState
}))(FavList);

const bgColor = "#F5FCFF";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgColor
    },
    arrowBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    imageArrow: {
        width: 80,
        height: 175,
        marginTop: 5,
        marginRight: 15,
        marginBottom: 10
    },
    blankBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageBlank: {
        width: 280,
        height: 190,
        marginTop: 15
    },
    blankText: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        fontSize: 20,
        paddingRight: 13
    }
});
