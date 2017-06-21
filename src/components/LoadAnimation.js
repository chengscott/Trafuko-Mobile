import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {
    Dimensions,
    StyleSheet,
    View,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';

const timearr = [200, 250, 350, 200, 100, 100, 100, 100, 100];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class LoadAnimation extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.counter = setTimeout(this.tick, timearr[0]);
    }

    componentWillMount() {
        clearTimeout(this.counter);
    }

    tick() {
        clearTimeout(this.counter);
        const p = this.state.progress + 1;
        this.setState({progress: p});
        if (p < 8) this.counter = setTimeout(this.tick, timearr[p]);
        else {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Main',
                        action: NavigationActions.navigate({routeName: 'Card'})
                    })
                ]
            }));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textBox}>
                    <TextAnim text="t" progress={this.state.progress} />
                    <TextAnim text="r" progress={this.state.progress} />
                    <TextAnim text="a" progress={this.state.progress} />
                    <TextAnim text="f" progress={this.state.progress} />
                    <TextAnim text="u" progress={this.state.progress} />
                    <TextAnim text="k" progress={this.state.progress} />
                    <TextAnim text="o" progress={this.state.progress} />
                </View>
                <Spinner style={styles.spinner} isVisible={true} size={100} type="ThreeBounce" color="#1976D2"/>

            </View>
        );
    }

}

export default connect((state) => ({
    ...state
}))(LoadAnimation);


class TextAnim extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (getIndex(this.props.text) <= this.props.progress) {
            return <Animatable.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={[styles.bigText, {color: getColor(this.props.text)}]}>
                {(this.props.text == "t") && <Image style={styles.imgt} source={require("../images/t.png")}/>}
                {(this.props.text == "r") && <Image style={styles.imgr} source={require("../images/r.png")}/>}
                {(this.props.text == "a") && <Image style={styles.imga} source={require("../images/a.png")}/>}
                {(this.props.text == "f") && <Image style={styles.imgf} source={require("../images/f.png")}/>}
                {(this.props.text == "u") && <Image style={styles.imgu} source={require("../images/u.png")}/>}
                {(this.props.text == "k") && <Image style={styles.imgk} source={require("../images/k.png")}/>}
                {(this.props.text == "o") && <Image style={styles.imgo} source={require("../images/o.png")}/>}
            </Animatable.Text>;
        } else return <View></View>;
    }
}


getIndex = function(t) {
    const trafuko = "trafuko";
    return trafuko.indexOf(t) + 1;
};

getColor = function(t) {
    const i = getIndex(t);
    if (i <= 3) return "#3affdb";
    else if (i <= 5) return "#1eff43";
    else return "#f91616";
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        marginBottom: 50
    },
    textBox: {
        height: 170,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    smallText: {
        fontSize: 50,
        padding: 5
    },
    bigText: {
        fontSize: 90,
        padding: 2,
        fontWeight: "800",
        textShadowColor: "black",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5
    },
    imgt: {
        width: 150,
        height: 200
    },
    imgr: {
        width: 117,
        height: 200
    },
    imga: {
        width: 150,
        height: 200
    },
    imgf: {
        width: 140,
        height: 220
    },
    imgu: {
        width: 125,
        height: 200
    },
    imgk: {
        width: 143,
        height: 200
    },
    imgo: {
        width: 133,
        height: 200
    }
});
