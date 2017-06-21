import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Entypo';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class CameraScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.state = {
            text: "麻雀雖小，五臟 小次郎",
            path: "",
            height: 0,
            width: 0
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    captureTarget={Camera.constants.CaptureTarget.cameraRoll}
                    type={Camera.constants.Type.back}
                    flashMode={Camera.constants.FlashMode.auto}
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    defaultTouchToFocus
                    mirrorImage={false}>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>{this.state.text}</Text>
                    </View>
                    <View style={styles.captureBox}>
                        <Icon name="camera"  onPress={this.takePicture.bind(this)} size={50} color="white" style={styles.capture}/>
                    </View>
                </Camera>
            </View>
        );
    }
    /*
<Button title="Go back" onPress={()=>this.handleGoBack()}/>

    <Camera
      ref={(cam) => {
        this.camera = cam;
      }}
      style={styles.preview}
      aspect={Camera.constants.Aspect.fill}
      captureTarget={Camera.constants.CaptureTarget.cameraRoll}
      type={Camera.constants.Type.back}
      flashMode={Camera.constants.FlashMode.auto}
      onFocusChanged={() => {}}
      onZoomChanged={() => {}}
      defaultTouchToFocus
      mirrorImage={false}>
          <Text style={styles.text}>{this.state.text}</Text>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[click]</Text>
     </Camera>



*/

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                alert("儲存至" + data.path);
            })
            .catch(err => console.error(err));
    }

    handleGoBack() {
        this.props.navigation.goBack();
    }
}

export default connect((state) => ({
    ...state
}))(CameraScreen);

const styles = StyleSheet.create({
    preview: {
        height: screenHeight,
        width: screenWidth,
        top: 0,
        left: 0,
        position: 'absolute'
    },
    captureBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        top: screenHeight - 230,
        left: 0,
        position: 'absolute'
    },
    capture: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 40,
        color: '#000',
        width: 70,
        height: 70,
        padding: 10,
        margin: 40,
        zIndex: 2
    },
    textBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight,
        left: 0,
        top: 50,
        position: 'absolute'
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        fontSize: 25
    }
});
