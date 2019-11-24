import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as firebase from 'firebase'
import { Form, Item, Input, Label, Button } from 'native-base'
export default class Page extends React.Component {
  static navigationOption = {
    title: "Result"
  }
  constructor(props) {
    super(props)
    this.state = {
      fname: "",
      //lname:"",

      phone: "",
      name: "",
      isLod: false,
      barcode: "",
      barcodeData: "",
      len: "",
      image: "empty",
      key: null,
      imageDownloadUrl: "empty",
      isUploading: false
    }
    this.nameOfFunc = this.nameOfFunc.bind(this)
  }
  componentDidMount() {

    //this.getAllContact();
    this.nameOfFunc();
  }

  // getAllContact = () => {
  //   let barCodeData2 = this.props.navigation.state.params.barcodeData
  //   let self = this;
  //   let contactRef = firebase.database().ref()
  //   contactRef.on("value", dataSnapsot => {
  //     if (dataSnapsot.val()) {
  //       let contactResult = Object.values(dataSnapsot.val())
  //       let contactKey = Object.keys(dataSnapsot.val())
  //       contactKey.forEach((value, key) => {
  //         contactResult[key]["key"] = value
  //       })
  //       self.setState({
  //        // fname: contactResult.fname,
  //         data: contactResult.sort((a, b) => {
  //           let nameA = a.barcode
  //           const nameB = barCodeData2
  //           const name = a.fname
  //           //console.log(`${nameA} What numers issssssss`);
  //           if (nameA == nameB) {
  //            // alert(`${name} ........`)
  //           //  console.log(`${nameA == nameB}is Equqlqlqlql`);
  //             return <Text>asd</Text>
  //           }
  //         }),
  //       })
  //     }
  //   })
  // }
  nameOfFunc = () => {
    let ref = firebase.database().ref()
    let barCodeData2 = this.props.navigation.state.params.barcodeData
    ref.on("value", dataSnapsot => {
      let contactResult = Object.values(dataSnapsot.val())
      //fname: contactResult,
      contactResult.forEach((a) => {
        let nameA = a.barcode
        const nameB = barCodeData2
        const name = a.fname
        console.log(`${nameA} this is from database`)
        console.log(`${nameB} this is from Camera`)
        //console.log(`${nameA} What numers issssssss`);
        if (nameA == nameB) {
          console.log(`${name} ........`)
          this.setState({ len: name });

          return name
        }else{
          this.setState({ len: 'empty' });
        }
      })
    
    })
  }


  render() {
    return (
      <View>
        <Text style={styles.button}>{this.state.len}</Text>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {

    //backgroundColor: "#B83227",
    color: "black",
    fontWeight: 'bold',
    fontSize: 20
  },

  cardTitle: {
    textAlign: 'left',
  },
})  