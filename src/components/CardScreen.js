import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TouchableOpacity, Dimensions, StyleSheet, View, Text, Image, Alert} from 'react-native';
import {Button} from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SwipeCards from 'react-native-swipe-cards';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class CardScreen extends React.Component {

    static propTypes = {
        isConnected: PropTypes.bool.isRequired,
        userID: PropTypes.string.isRequired,
        firebase: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            Data: []
        };
        this.handleGoCamera = this.handleGoCamera.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike =this.handleUnlike.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            Data: [{id: "0001", text:"當你覺得自己累得跟狗一樣的時候，其實你誤會大了。狗都沒你這麼累。", vote: 23},{id:"0002", text:"玩遊戲輸了，一定是隊友的問題，要是他們夠強，我根本扯不了後腿", vote: 107},
                {id: "0003", text:"母鯊大，公鯊小 ", vote: 23},{id:"0004", text:"研究顯示，過越多生日的人越長壽", vote: 213},
                {id: "0005", text:"在非洲，每一分鐘就有60秒過去", vote: 79},{id:"0006", text:"每個成功的男人背後，都有一條脊椎", vote: 49},
                {id: "0007", text:"凡是每天喝水的人，有高機率在100年內死去", vote: 12},{id:"0008", text:"台灣競爭力低落，在美國就連小學生都會說流利的英語", vote: 47}]
        });
    }

    componentWillReceiveProps(nextProps) {
        const {firebase,isConnected} = this.props;
        if(isConnected === false && nextProps.isConnected === true) {
            firebase.database().ref('/posts').limitToFirst(4).once('value').then( snapshot => {
                let arr = objToarr(snapshot.val());
                let newData = this.state.Data.concat(arr);
                this.setState({
                    Data: newData
                });
            }).catch( err => {
                console.log(err);
            });
        }
    }
    render() {
        return (
            <View style={{height:screenHeight, width:screenWidth}}>
                <View style={styles.voteBtn}>
                    <Button transparent large style={{marginRight: 22}}>
                        <FIcon name="times-circle" size={70} color="#C62828"/>
                    </Button>
                    <Button transparent large style={{marginLeft: 22}}>
                        <FIcon name="check-circle" size={70} color="#2E7D32"/>
                    </Button>
                </View>
                <View style={styles.VRbtnBox}>
                    <View style={styles.VRbtn}>
                        <Button rounded style={{margin: 5}}>
                            <MIcon name="camera" size={35} color="white" />
                        </Button>
                    </View>
                </View>
                <SwipeCards
                    cards={this.state.Data}
                    renderCard={(cardData) => <Card
                        text={cardData.text}
                        key={cardData.id}
                        id={cardData.id}
                    />}
                    renderNoMoreCards={() => <NoMoreCards />}
                    showYup={false}
                    showNope={false}
                    showMaybe={false}
                    hasMaybeAction={true}
                    cardKey="swcard"
                    onClickHandler={this.onClick}
                    smoothTransition={true}
                    stack={true}
                    stackOffsetX={10}
                    stackOffsetY={-10}
                />
                <View style={styles.voteBtn}>
                    <Button onPress={()=>this.handleLike()} rounded transparent large style={{marginRight: 40}}>
                        <Text>&nbsp;&nbsp;&nbsp;</Text>
                    </Button>
                    <Button onPress={()=>this.handleUnlike()} rounded transparent large style={{marginLeft: 40}}>
                        <Text>&nbsp;&nbsp;&nbsp;</Text>
                    </Button>
                </View>
                <View style={styles.VRbtnBox}>
                    <View style={styles.VRbtn}>
                        <Button onPress={()=>this.handleGoCamera()} rounded transparent style={{margin: 20}}>
                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }


    handleLike() {
        alert("like");
    }

    handleUnlike() {
        alert("unlike");
    }

    onClick() {
        console.log("done");
    }
    // Alert.alert(
    //     '哈囉~',
    //     '要收藏此則幹話嗎？',
    //     [
    //         {text: '取消', style: 'cancel'},
    //         {text: '確認', onPress: () => clearAllDataWithKey(this.props.userID)},
    //     ]
    // );
    handleGoCamera() {
        this.props.navigation.navigate('Camera');
    }
}

class Card extends React.Component {

    static propTypes = {
        userID: PropTypes.string,
        isConnected: PropTypes.bool,
        text: PropTypes.string
    };
    constructor(props) {
        super(props);

        this.handleFav = this.handleFav.bind(this);

    }
    render() {
        return (
            <View style={styles.card}>
                <View style={styles.cardTextBox}>
                    <Text style={styles.cardText}>{this.props.text}</Text>
                </View>
                <View style={styles.cardBtn}>
                    <View style={styles.cardIcon}>
                        <MIcon name="crown" size={32} color="#4F8EF7" />
                        <TouchableOpacity onPress={this._onPressQRCode}>
                            <View>
                                { (true) && <FIcon onPress={this.handleFav} name="bookmark-o" size={25} style={{padding:6.5, margin:0}} color="#4F8EF7" />}
                                { (false) && <FIcon name="bookmark" size={25} style={{padding:6.5, margin:0}} color="#4F8EF7" />}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    handleFav() {
        alert(this.props.id + " " + this.props.text);
        //console.log("done");
    }
}

class NoMoreCards extends React.Component {

    constructor(props) {
        super(props);
        this.imageNum = Math.floor(Math.random() * 5);
    }

    render() {
        const n = this.imageNum;
        return (
            <View style={styles.noMoreCards}>
                {
                    n == 0 ? <Image source={require('../images/0.png')} style={styles.image0} /> :
                    n == 1 ? <Image source={require('../images/1.png')} style={styles.image1} /> :
                    n == 2 ? <Image source={require('../images/2.png')} style={styles.image2} /> :
                    n == 3 ? <Image source={require('../images/3.png')} style={styles.image3} /> :
                    n == 4 ? <Image source={require('../images/4.png')} style={styles.image4} /> :
                        <Image source={require('../images/5.png')} style={styles.image5} />
                }
                <Text style={styles.noMoreCardsText}>
                    歐喔，你需要更多幹話{"\n"}再看一次～
                </Text>
            </View>
        );
    }
}

export default connect((state) => ({
    userID: state.user.userID,
    isConnected: state.user.isConnected,
    firebase: state.fb.firebase
}))(CardScreen);

function objToarr(obj) {
    let arr = [];
    for (let x in obj) {
        arr.push(obj[x]);
    }
    return arr;
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth - 60,
        height: screenHeight - 300,
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 3,
        borderColor:"#e1e1e1",
        marginTop: 37,
        marginLeft: 22,
        zIndex: 0
    },
    cardTextBox: {
        flex: 5,
        justifyContent: 'center',
    },
    cardText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 28,
        color: "black",
        padding: 20
    },
    cardBtn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    cardIcon: {
        flex: 1,
        height: 20,
        width: screenWidth - 106,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noMoreCards: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100
    },
    noMoreCardsText: {
        fontSize: 22,
        textAlign: 'center'
    },
    image0: {
        width: 200,
        height: 129
    },
    image1: {
        width: 200,
        height: 200
    },
    image2: {
        width: 150,
        height: 150
    },
    image3: {
        width: 160,
        height: 150
    },
    image4: {
        width: 100,
        height: 100
    },
    image5: {
        width: 100,
        height: 100
    },
    container: {
        height: screenHeight,
        width: screenWidth,
        top: 0,
        left: 0,
    },
    voteBtn: {
        height: 70,
        width: screenWidth,
        top: screenHeight - 258,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 0
    },
    VRbtnBox: {
        height: 90,
        width: screenWidth,
        top: screenHeight - 208,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position: 'absolute',
        zIndex: 0
    },
    VRbtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        zIndex: 0
    }
});
