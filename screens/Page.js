import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import * as firebase from 'firebase'
import { Form, Item, Input, Label, Button, Card, CardItem } from 'native-base'
export default class Page extends React.Component {
  static navigationOption = {
    title: "תוצאה"
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
      isLoading: true,
      key: null,
      imageDownloadUrl: "empty",
      isUploading: false,
      //thingToSay:"empty"
    }
    this.nameOfFunc = this.nameOfFunc.bind(this)
  }
  speak = len => {
    let thingToSay = len
    Speech.speak(thingToSay, { language: "he-IW" });
  }
  speak2() {
    let thingToSay = 'המוצר לא קיים. אתה יכול להוסיף אותו. עם לחיצה על הוספת מוצר'
    Speech.speak(thingToSay, { language: "he-IW" });
  }
  componentDidMount() {
    let key = this.props.navigation.getParam("key", "");
    this.getContact(key);
    this.nameOfFunc();
  }

  getContact = async key => {
    let self = this
    let barCodeData2 = this.props.navigation.state.params.barcodeData
    let ref = firebase.database().ref()
    ref.on("value", dataSnapsot => {
      let contactResult = Object.values(dataSnapsot.val())
      //contactValue = dataSnapsot.val();
      contactResult.forEach((a) => {
        let nameA = a.barcode
        const nameB = barCodeData2
        const name = a.fname;
        const n = a.phone;
        const n2 = a.barcode;
        const n3 = a.key

        if (nameA == nameB) {
          self.setState({
            fname: name,
            //  lname:contactValue.lname,
            phone: n,
            //  email:contactValue.email,
            barcode: n2,
            key: n3,
          })
          console.log(`${name} ${n} ${n2}  this is from Camera`)
        }
      })
    })
  };
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
          this.setState({ len: name, isLoading: false });
          // this.setState({thingToSay:name})
          return name
        }


      })
      this.setState({ isLoading: false })
    })
  }
  editContact = key => {
    //navigate to edit screen with passing key
    this.props.navigation.navigate("Edit", {
      key: key
    });
  };
  AddPro() {
    let d2 = this.props.navigation.state.params.barcodeData
    this.props.navigation.replace("Add", { barcodeData: d2 })

  }

  render() {
    let d = this.props.navigation.state.params.barcodeData
    // console.log(`${d}`)
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            loading please wait..
          </Text>
        </View>
      );
    }
    if (this.state.len == 'empty') {
      return (
        <View style={styles.containe}>
          <View style={styles.cardTitle}>
          </View>
          <Card style={styles.listItem}>
            <Text style={styles.b}></Text>
            <View style={styles.cardTitle}>
              <Text style={styles.button}>{this.speak2()} המוצר לא קיים. אתה יכול להוסיף אותו. עם לחיצה על הוספת מוצר {this.state.len} </Text>
            </View>
          </Card>


          <View style={styles.container4}>
            <TouchableOpacity style={[styles.container2]}
              onPress={() => {
                this.AddPro()
              }}
            >
              <Text style={styles.caption}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.container3]}
              onPress={() => {
                this.props.navigation.navigate("Barcode")
              }}
            >
              <Text style={styles.caption2}>Scan Again</Text>
            </TouchableOpacity>
          </View>

        </View>

      )
    }
    else {
      return (
        <View style={styles.containe}>
          <View style={styles.cardTitle}>
            <Text
              full
              style={styles.title}>Result:</Text>
          </View>


          <Card style={styles.listItem}>
            <View style={styles.cardTitle}>
              <CardItem bordered>
                <Text style={styles.button3}>Product description:  </Text>
              </CardItem>
              <CardItem bordered>
                <Text style={styles.button}>{this.state.len}
                  {this.speak(this.state.len)} </Text>
              </CardItem>
            </View>
          </Card>
          <Card style={styles.listItem2}>
            <View style={styles.cardTitle}>
              <CardItem bordered>
                <Text style={styles.button2}>Special allergies:
                </Text>
              </CardItem>
              <CardItem bordered>
                <Text style={styles.button}>None
                   </Text>
              </CardItem>
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
            <TouchableOpacity style={[styles.container3]}
              onPress={() => {
                this.props.navigation.navigate("Barcode")
              }}
            >
              <Text style={styles.caption2}>Scan Again</Text>
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
    // margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    //marginRight: 30,
    //textAlign: 'left',
    //marginTop:30,
    //right:30,
    //backgroundColor: "#B83227",
    color: "black",
    fontWeight: 'bold',
    fontSize: 30
  },
  button2: {
    //marginRight: 30,
    //textAlign: 'left',
    //marginTop:30,
    //right:30,
    //backgroundColor: "#B83227",
    color: "red",
    fontWeight: 'bold',
    fontSize: 30
  },
  button3: {
    //marginRight: 30,
    //textAlign: 'left',
    //marginTop:30,
    //right:30,
    //backgroundColor: "#B83227",
    color: "blue",
    fontWeight: 'bold',
    fontSize: 30
  },
  b: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'left',

  },
  title: {
    color: "#4d4db8",
    fontWeight: 'bold',
    fontSize: 50
  },
  cardTitle: {
    textAlign: 'left',
  },
  listItem: {
    //flexDirection: "row",
    //padding: 50,
    // color: "#335cd6",
    //borderWidth: 100,
    justifyContent: "flex-start",
    borderColor: "#335cd6"
  },
  listItem2: {
    //flexDirection: "row",
    //padding: 50,
    // color: "#335cd6",
    //borderWidth: 100,
    justifyContent: "flex-start",
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
    //top: 130,
    //left: 0,
    width: 420,
    height: 124,
    position: "absolute",
    marginTop: 272
  },
  container2: {
    backgroundColor: "#6685e0",
    flexDirection: "row",
    alignItems: "center",
    width: 430,
    height: 200,
    justifyContent: "center",
    //paddingRight: 16,
    //paddingLeft: 19,
    //marginTop: 200,
    elevation: 9,
    //minWidth: 180,
    borderRadius: 2,

  },
  container3: {
    backgroundColor: "#335cd6",
    flexDirection: "row",
    alignItems: "center",
    width: 430,
    height: 200,
    justifyContent: "center",
    marginEnd: 20,
    //marginTop: 80,
    //paddingRight: 16,
    //paddingLeft: 19,
    elevation: 9,
    //minWidth: 180,
    borderRadius: 2,

  },
  caption: {
    color: "#fff",
    fontSize: 50,
    //fontFamily: "roboto-regular"
  },
  caption2: {
    color: "#fff",
    fontSize: 50,
    //fontFamily: "roboto-regular"
  },
  container: {
    flex: 1
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