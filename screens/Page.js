import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as firebase from 'firebase'
import { Form, Item, Input, Label, Button, Card } from 'native-base'
export default class Page extends React.Component {
  static navigationOption = {
    title: "Result"
  }
  constructor(props) {
    super(props)
    this.state = {
      fname: "",
      phone: "",
      name: "",
      isLod: false,
      barcode: "",
      barcodeData: "",
      len: "empty",
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
          //console.log(`${name} ........`)
          // this.setState({  len: 'empty' });
          this.setState({ len: name });
          return name
        }
      })

    })
  }
  editContact = key => {
    //navigate to edit screen with passing key
    this.props.navigation.navigate("Edit", {
      key: key
    });
  };


  render() {
    let d = this.props.navigation.state.params.barcodeData
    if(this.state.len=='empty'){
      return (
        <View style={styles.containe}>
          <View style={styles.cardTitle}>
            <Text
              full

              style={styles.title}>Result:</Text>
          </View>
          <Card style={styles.listItem}>
            <Text style={styles.b}>Product description:</Text>
            <View style={styles.cardTitle}>
              <Text style={styles.button}>{this.state.len} </Text>
            </View>
          </Card>
          
       
                  <View style={styles.container4}>

                    <TouchableOpacity style={[styles.container2]}
                      onPress={() => {
                        this.props.navigation.navigate("Add")
                      }}
                    >
                      <Text style={styles.caption}>Add Product</Text>
                    </TouchableOpacity>
                  </View>

                </View>

      )
                    }
                    else{
                      return(
                        <View style={styles.containe}>
                        <View style={styles.cardTitle}>
                          <Text
                            full
              
                            style={styles.title}>Result:</Text>
                        </View>
                        <Card style={styles.listItem}>
                          <Text style={styles.b}>Product description:</Text>
                          <View style={styles.cardTitle}>
                            <Text style={styles.button}>{this.state.len} </Text>
                          </View>
                        </Card>
                        
                     
                                <View style={styles.container4}>
              
                                  <TouchableOpacity style={[styles.container2]}
                                    onPress={() => {
                                      this.editContact(this.state.key);
                                    }}
                                  >
                                    <Text style={styles.caption}>Edit Product</Text>
                                  </TouchableOpacity>
                                </View>
              
                              </View>
              
                      );
                    }
  }

}
const styles = StyleSheet.create({
  containe: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    textAlign: 'left',
    //backgroundColor: "#B83227",
    color: "black",
    fontWeight: 'bold',
    fontSize: 25
  },
  b: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'left',

  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 50
  },
  cardTitle: {
    textAlign: 'left',
  },
  listItem: {
    flexDirection: "row",
    padding: 50,
    color: "red",
    borderWidth: 100,

    borderColor: "red"
  },
  contactIcon: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  con: {
    width: 420,
    height: 250
  },
  container4: {
    width: 420,
    height: 250,
    justifyContent: "center",
  },
  container2: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    color: "#fff",
    fontSize: 50,
    //fontFamily: "roboto-regular"
  },
  container: {
    flex: 1
  },
  container3: {
    width: 420,
    height: 250,
    justifyContent: "center"
  },
  group: {
    width: 420,
    height: 220,
    justifyContent: "center",
    marginTop: 492,
    alignSelf: "center"
  },
  materialButtonViolet: {
    width: 360,
    height: 360
  }


})  