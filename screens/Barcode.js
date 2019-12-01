import * as React from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {FontAwesome} from "@expo/vector-icons"
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';



const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

export default class Barcode extends React.Component {
  static navigationOptions = {
    title: "BarCodeScanner",
    
  }
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      barcodeData: "",
      type: Camera.Constants.Type.back,
      barcodeType: "",
      flashMode: "on", // on, off, auto, torch
      isFlashLightOn:Camera.Constants.FlashMode.off

    }
  }
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }
  toggleFlash() {
    this.setState({
      flash: flashModes[this.state.flash],
    });
  }
  onFlash = () => {
    const { flashMode } = this.state;
    this.setState({
      flashMode: flashModeOrder[flashMode],
    });
  };
  onFlip = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  };
  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
//Toggle flash light
flashLight=()=>{
  this.setState=({
    isFlashLightOn:
    this.state.isFlashLightOn === Camera.Constants.FlashMode.off
    ?  Camera.Constants.FlashMode.on
    :  Camera.Constants.FlashMode.off
  })
}

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: 'flex-end',
        }}>
        <Camera
         autoFocus={Camera.Constants.AutoFocus.on}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          
          
          style={StyleSheet.absoluteFillObject}
        />
        <Text>Bar code{this.state.barcodeData}</Text>
        <View style={styles.actionContainer}>
       
        <TouchableOpacity
        style={styles.iconHolder}
        onPress={this.onFlash}
        >
          <FontAwesome
          name="flash"
          size={35}
          style={styles.icon}
          />
        </TouchableOpacity>

      </View>
      </View>
   
    );
  }


  handleBarCodeScanned = ({ type, data }) => {
    // alert(`${data} has been scanned!`);
   
    this.props.navigation.replace("Page", { barcodeData: data })
  };

}
const styles = StyleSheet.create({
 
  actionContainer:{
    flex:1,
    flexDirection:"row",
    backgroundColor:"transparent"
  },
})