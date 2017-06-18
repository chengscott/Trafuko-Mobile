import React from 'react';
import PropTypes from 'prop-types';
import {View, ListView, RefreshControl} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {connect} from 'react-redux';

import FavItem from './FavItem';

import {listFavs, listMoreFavs} from '../states/fav-actions';

class FavList extends React.Component {

    static propTypes = {
        searchText: PropTypes.string,
        listingFavs: PropTypes.bool.isRequired,
        listingMoreFavs: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        favs: PropTypes.array.isRequired,
        hasMoreFavs: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        scrollProps: PropTypes.object
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
        this.props.dispatch(listFavs(/*this.props.searchText*/""));
    }

    componentWillReceiveProps(nextProps) {
        const {searchText, dispatch, favs} = this.props;
        if (searchText !== nextProps.searchText) {
            dispatch(listFavs(nextProps.searchText));
        }
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
                canLoadMore={() => {
                    if (listingFavs || !favs.length)
                        return false;
                    return hasMoreFavs;
                }}
                onLoadMoreAsync={this.handleLoadMore}
                style={{backgroundColor: '#fff'}}
                ref={(el) => this.listEl = el}
                {...scrollProps}
            />
        );
    }

    handleRefresh() {
        const {dispatch, searchText} = this.props;
        dispatch(listFavs(searchText));
    }

    handleLoadMore() {
        const {listingMoreFavs, dispatch, favs, searchText} = this.props;
        const start = favs[favs.length - 1].id;
        if (listingMoreFavs !== start)
            dispatch(listMoreFavs(searchText, start));
    }
}

export default connect((state, ownProps) => ({
    searchText: state.search.searchText,
    listingFavs: state.fav.listingFavs,
    listingMoreFavs: state.fav.listingMoreFavs,
    favs: state.fav.favs,
    hasMoreFavs: state.fav.hasMore
}))(FavList);
