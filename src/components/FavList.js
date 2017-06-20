import React from 'react';
import PropTypes from 'prop-types';
import {ListView, RefreshControl, View , Text, StyleSheet} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {connect} from 'react-redux';

import FavItem from './FavItem';

import {listFavs, listMoreFavs} from '../states/fav-actions';
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
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }
    componentDidMount() {
        const {userID,dispatch,firebase} = this.props;
        dispatch(listFavs(userID,firebase));
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch,firebase,userID,favs} = this.props;

        if(userID !== "" && userID !== nextProps.userID) {
            dispatch(listFavs(userID,firebase));
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
        const renderNoFavs =
            <View style={styles.container}>
                <Text>{"No Favs"}</Text>
            </View>;

        return  (this.props.emptyState)?renderNoFavs:renderFavList;
    }

    handleRefresh() {
        const {dispatch, firebase, userID} = this.props;
        if(userID !== "")
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor
    }
});
