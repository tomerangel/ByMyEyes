import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Speech from 'expo-speech'
export default class barcodeProduct extends React.Component {
  static navigationOptions = {
    title: "מצלמת ברקוד",

  }
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      barcodeData: "",
      type: Camera.Constants.Type.back,
      barcodeType: "",
      isFlashLightOn: Camera.Constants.FlashMode.off

    }
  }
  state = {
    hasCameraPermission: null,
    scanned: false,
  };
  speak() {
    var thing = 'להוספת מוצר תסרוק את הברקוד.'
    Speech.speak(thing, { language: "he-IW" })
  }
  async componentDidMount() {
    this.speak();
    this.getPermissionsAsync();
  }
  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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
        <View style={styles.actionContainer}>
       
        </View>
      </View>

    );
  }
  handleBarCodeScanned = ({ type, data }) => {
    Speech.stop()
    this.props.navigation.replace("Add", { barcodeData: data })
  };

}
const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
})