import React from "react";
import { View, Text, StyleSheet,FlatList,TouchableOpacity } from "react-native";
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
      name:"",
      isLod:false,
      barcode: "",
      barcodeData: "",
      image: "empty",
      key:null,
      imageDownloadUrl: "empty",
      isUploading: false
    }
  }
  orderByValue(){
    var scoresRef = firebase.database().ref();
    scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("The " + data.key + " score is " + data.val());
      });
    });
  }
  componentWillMount() {
    //let key = this.props.navigation.getParam("key", "");
    this.getAllContact();
  }
  getNumber = () => {
    let number = this.state.name;
    let numm=this.state.barcodeData
    alert('1' + `${number}`);
    alert('2' + `${numm}`);
    // if (number == item) {
    //   alert(`is equal been scanned!`);
    //   alert(`${item.fname}`)
    //   return item.fname
    // }
    // alert('1'+`${number}`);
    //alert('2'+`${item}`);
    //alert('3 ' + num);
    //alert('4 ' + item);

    // alert(`has been scanned!`);
    return 'empty'
  }
  getAllContact = () => {
    let barCodeData2 = this.props.navigation.state.params.barcodeData
    let self = this;
    let contactRef = firebase.database().ref()
    contactRef.on("value", dataSnapsot => {
      if (dataSnapsot.val()) {
        let contactResult = Object.values(dataSnapsot.val())
        let contactKey = Object.keys(dataSnapsot.val())
        contactKey.forEach((value, key) => {
          contactResult[key]["key"] = value
        })
        self.setState({
          fname: contactResult.fname,
          data: contactResult.sort((a, b) => {
            let nameA = a.barcode
            const nameB = barCodeData2
            const name = a.fname
            console.log(`${nameA} What numers issssssss`);
            if (nameA == nameB) {
             // alert(`${name} ........`)
              console.log(`${nameA == nameB}is Equqlqlqlql`);
              return <Text>asd</Text>
            }
          }),
        })
      }
    })
  }

  _renderItem = ({ item }) => {
    let d = this.props.navigation.state.params.barcodeData
    alert('1' + `${d}`);
    alert('2' + `${item.barcode}`);
    //alert('3 ' + num);
    if (item.barcode == d) {
    return  <Text>{item.fname}</Text>
    } else {
      return <Text></Text>;
    }
  }
  render() {

    //   let d = this.props.navigation.state.params.barcodeData
    //let t=this.getNumber()
    //alert(`${t} how?`)
    // let d = this.props.navigation.state.params.barcodeData

    return (


      <View>


        <Text>{this.state.contactKey}</Text>

        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
        />
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