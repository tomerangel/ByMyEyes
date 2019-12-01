import * as React from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {FontAwesome} from "@expo/vector-icons"
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';



const flashModes = {
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
      barcodeType: "",
      flash: "off", // on, off, auto, torch
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
         flashMode={this.state.flashMode}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          
          
          style={StyleSheet.absoluteFillObject}
        />
        <Text>Bar code{this.state.barcodeData}</Text>
        <View style={styles.actionContainer}>
        
        <TouchableOpacity
        style={styles.iconHolder}
        onPress={this.toggleFlash.bind(this)}>

        
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