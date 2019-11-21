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
      // email:"",
      barcode: "",
      barcodeData: "",
      image: "empty",
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
    this.getAllContact();
  }
  getAllContact = () => {
    let self = this;
    //TODO: get all contact from firebase
    let contactRef = firebase.database().ref()
    contactRef.on("value", dataSnapsot => {
      if (dataSnapsot.val()) {
        let contactResult = Object.values(dataSnapsot.val())
        let contactKey = Object.keys(dataSnapsot.val())
        contactKey.forEach((value, key) => {
          contactResult[key]["key"] = value
        })
        self.setState({
          data: contactResult.sort((a, b) => {
            var nameA = a.fname.toUpperCase()
            var nameB = b.fname.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA < nameB) {
              return 1
            }
            return 0
          }),
          isListEmpty: false
        })
      } else {
        self.setState({ isListEmpty: true })
      }
      self.setState({ isLoading: false })
    })
    //TODO:
    // sort array by fname and set it to data state


  }


  render() {
    let d = this.props.navigation.state.params.barcodeData

    return (
     
        <FlatList
   
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
       
        <Text style={styles.button}> {d}== {item.barcode}   </Text>
     
        <Text style={styles.button}> This is a Product</Text>

      </View>
    );
  }    }
    />
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