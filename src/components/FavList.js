import React from 'react';
import PropTypes from 'prop-types';
import {ListView, RefreshControl} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {connect} from 'react-redux';

import FavItem from './FavItem';

import {setUserID} from '../states/user-actions';
import {listFavs, listMoreFavs} from '../states/fav-actions';

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
        userID: PropTypes.string
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
        const {firebase} = this.props;
        if(this.props.userID == undefined){
            this.props.firebase.auth().onAuthStateChanged((firebaseUser) => {
                if (firebaseUser) {
                    this.props.dispatch(setUserID(firebaseUser.uid));
                    this.props.dispatch(listFavs(firebaseUser.uid,firebase));
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const {favs} = this.props;

        if (favs !== nextProps.favs) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.favs)
            });
        }
    }

    render() {
        const {listingFavs, hasMoreFavs, favs, scrollProps} = this.props;
        return (
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
                // canLoadMore={() => {
                //     if (listingFavs || !favs.length)
                //         return false;
                //     return hasMoreFavs;
                // }}
                // onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
                ref={(el) => this.listEl = el}
                {...scrollProps}
            />
        );
    }

    handleRefresh() {
        const {dispatch, firebase, userID} = this.props;
        if(userID !== undefined)
            dispatch(listFavs(userID,firebase));
    }

    handleLoadMore() {
        // const {listingMoreFavs, dispatch, favs, firebase} = this.props;
        // const start = favs[favs.length - 1].id;
        // if (listingMoreFavs !== start)
        //     dispatch(listMoreFavs(this.props.userID,start,firebase));
    }
}

export default connect((state, ownProps) => ({
    listingFavs: state.fav.listingFavs,
    listingMoreFavs: state.fav.listingMoreFavs,
    favs: state.fav.favs,
    hasMoreFavs: state.fav.hasMore,
    firebase: state.fb.firebase,
    userID: state.user.userID
}))(FavList);
