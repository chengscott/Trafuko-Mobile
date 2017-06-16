import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native'

import {Container, Content, Icon , Thumbnail, Badge, Button, Text as NbText} from 'native-base';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    render() {
      const {navigate} = this.props;
      return (
        <Container style={styles.drawer}>
            <Image source={require('../images/account-bg.jpg')} style={styles.header}>
                <Thumbnail large source={require('../images/account.jpg')} />
            </Image>
            <Button block transparent style={styles.item} onPress={() => navigate('Main')}>
                <Icon name='ios-game-controller-a' style={styles.icon} />
                <Text style={styles.text}>Main</Text>
                <Badge primary style={styles.badge}>
                    <NbText style={styles.badgeText}>2</NbText>
                </Badge>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Fav')}>
                <Icon  name='star' style={styles.icon} />
                <Text style={styles.text}>Favlist</Text>
            </Button>
            <Button block transparent style={styles.item}>
                <Icon  name='settings' style={styles.icon}
                    onPress={() => {}} // TODO
                />
                <Text style={styles.text}>Settings</Text>
            </Button>
        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    }
};
