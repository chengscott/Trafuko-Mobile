import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import FavList from './FavList';

class FavScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <FavList/>;
    }

}

export default connect((state) => ({
    ...state
}))(FavScreen);
