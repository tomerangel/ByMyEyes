import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Barcode extends React.Component {
  static navigationOptions = {
    title: "BarCodeScanner",
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      barcodeData: "",
      barcodeType: ""
    }
  }
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

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
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Text>Bar code{this.state.barcodeData}</Text>
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }


  handleBarCodeScanned = ({ type, data }) => {

    // alert(`${data} has been scanned!`);
    let barcodeType = type;
    let barcodeData = data;
    this.setState({
      barcodeType: barcodeType,
      barcodeData: barcodeData,
    });
    this.props.navigation.replace("Page", { barcodeData: data })
  };

}