import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";
import Barcode from 'react-native-barcode-builder';

//TODO: add firebase
import * as firebase from 'firebase'
export default class ViewProduct extends Component {
  static navigationOptions = {
    title: "פרטי המוצר"
  };

  constructor(props) {
    super(props);
    // set state
    this.state = {
      fname: null,
      lname: null,
      mark: null,
      allergy: null,
      Calories:null,
      Sodium :null,
      Proteins:null,
      Carbohydrates:null,
      Fats:null,
      email: null,
      barcode: null,
      imageUrl: null,
      key: null,
      isLoading: true
    };
  }
  // lifecycle method
  componentDidMount() {
    let key = this.props.navigation.getParam("key", "");
    this.getContact(key);
  }
  //TODO: get contact from firebase
  getContact = async key => {
    let self = this
    let contactRef = firebase.database().ref().child(key)
    await contactRef.on("value", dataSnapsot => {
      if (dataSnapsot.val()) {
        contactValue = dataSnapsot.val();
        self.setState({
          fname: contactValue.fname,
          //  lname:contactValue.lname,
          Calories: contactValue.Calories,
          Sodium: contactValue.Sodium,
          Proteins: contactValue.Proteins,
          Carbohydrates: contactValue.Carbohydrates,
          Fats: contactValue.Fats,
          //  email:contactValue.email,
          barcode: contactValue.barcode,
          mark: contactValue.mark,
          allergy: contactValue.allergy,
          imageUrl: contactValue.imageUrl,
          key: key,
          isLoading: false
        })
      }
    })
  };

  //This was already explained in AsyncStorage section
  // callAction = phone => {
  //   let phoneNumber = phone;
  //   if (Platform.OS !== "android") {
  //     // its not android save this url
  //     phoneNumber = `telprompt:${phone}`;
  //   } else {
  //     //else  save this url
  //     phoneNumber = `tel:${phone}`;
  //   }
  //   // check can open url
  //   Linking.canOpenURL(phoneNumber)
  //     .then(supported => {
  //       //if it not a supported format url
  //       if (!supported) {
  //         // show  a alert
  //         Alert.alert("Phone number is not available");
  //       } else {
  //         // else open url
  //         return Linking.openURL(phoneNumber);
  //       }
  //     }) //log error if any
  //     .catch(err => console.log(err));
  // };
  //This was already explained in AsyncStorage section
  // sms action
  // smsAction = phone => {
  //   // paas phone number
  //   let phoneNumber = phone;
  //   // save this url
  //   //there is same url for android and iOS for sms
  //   phoneNumber = `sms:${phone}`;
  //   // check can open url
  //   Linking.canOpenURL(phoneNumber)
  //     .then(supported => {
  //       // //if it not a supported format url
  //       if (!supported) {
  //         // show a alert
  //         Alert.alert("Phone number is not available");
  //       } else {
  //         // else open url
  //         return Linking.openURL(phoneNumber);
  //       }
  //     }) // log error if any
  //     .catch(err => console.log(err));
  // };

  //TODO:  deleteContact method
  deleteContact = key => {
    Alert.alert(
      "Delete Contact",
      `${this.state.fname}`,
      [
        {
          text: "Cancel", onPress: () => console.log("Cencelled pressed")

        },
        {
          text: "OK",
          onPress: async () => {
            let contactRef = firebase.database().ref()
              .child(key)
            await contactRef.remove(error => {
              if (!error) {
                this.props.navigation.goBack();
              }
            })
          }
        }
      ],
      { cancelable: false }
    )
  };

  // editContact function
  editContact = key => {
    //navigate to edit screen with passing key
    this.props.navigation.navigate("Edit", {
      key: key
    });
  };

  // render method
  render() {
    //console.log(`${name} ${n} ${n2}  this is from Camera`)
    console.log(`${this.state.mark}  that`)
    if (this.state.mark == 'תקין-ירוק') {
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
              המוצרים בטעינה רק שניה ....
          </Text>
          </View>
        );
      }
      // else show contact details
      return (
        <ScrollView style={styles.container}>
          <View style={styles.contactIconContainer}>
            {/* <Image
            style={styles.contactIcon}
            source={
              this.state.imageUrl === "empty"
                ? require("../assets/person.png")
                : {
                  uri: this.state.imageUrl
                }
            }
          /> */}
            
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {this.state.fname}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>קלוריות</Text>
                <Text style={styles.infoText}>נתרן</Text>
              </CardItem>
              <CardItem bordered>
                <Text style={styles.infoText}>{this.state.Calories}</Text>
                <Text style={styles.infoText}>{this.state.Sodium}</Text>
              </CardItem>

            </Card>
            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>אלרגיה מסוימת</Text>
              </CardItem>
              <CardItem bordered>
                <Text style={styles.infoText}>{this.state.allergy}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>סימון משרד הבריאות</Text>
              </CardItem>
              <CardItem bordered style={styles.infoText3}>
                <Text style={styles.infoText2}>{this.state.mark}</Text>
              </CardItem>
            </Card>

            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>ברקוד</Text>
              </CardItem>
              <CardItem bordered>
                <Barcode value={this.state.barcode} format="CODE128" />

              </CardItem>
            </Card>
          </View>
          <Card style={styles.actionContainer}>

            <CardItem style={styles.actionButton} bordered>
              <TouchableOpacity
                onPress={() => {
                  this.callAction(this.state.phone);
                }}
              >
                <Entypo name="phone" size={50} color="#335cd6" />
              </TouchableOpacity>
              <Text style={styles.actionText}>טלפון</Text>
            </CardItem>
          </Card>

          <Card style={styles.actionContainer}>
            <CardItem style={styles.actionButton} bordered>
              <TouchableOpacity
                onPress={() => {
                  this.editContact(this.state.key);
                }}
              >
                <Entypo name="edit" size={30} color="#335cd6" />
                <Text style={styles.actionText}>לעריכת המוצר</Text>
              </TouchableOpacity>
            </CardItem>
            <CardItem style={styles.actionButton} bordered>
              <TouchableOpacity
                onPress={() => {
                  this.deleteContact(this.state.key);
                }}
              >
                <Entypo name="trash" size={30} color="#335cd6" />
                <Text style={styles.actionText}>למחיקת המוצר</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
        </ScrollView>
      );
    }
    else {
      // if loading show ActivityIndicator
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
              המוצרים בטעינה רק שניה ....
          </Text>
          </View>
        );
      }
      // else show contact details
      return (
        <ScrollView style={styles.container}>
          <View style={styles.contactIconContainer}>
            {/* <Image
            style={styles.contactIcon}
            source={
              this.state.imageUrl === "empty"
                ? require("../assets/person.png")
                : {
                  uri: this.state.imageUrl
                }
            }
          /> */}
            <Image style={styles.contactIcon} />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {this.state.fname}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Card>
            <CardItem bordered>
                <Text style={styles.infoText}> קלוריות |</Text>
                <Text style={styles.infoText}> שומנים |</Text>
                <Text style={styles.infoText}> פחמימות |</Text>
                <Text style={styles.infoText}> חלבונים |</Text>
                <Text style={styles.infoText}>| נתרן |</Text>
              </CardItem>
              <CardItem bordered>
                <Text style={styles.infoText}>|    {this.state.Calories}    |</Text>
                <Text style={styles.infoText}>     {this.state.Fats}    |</Text>
                <Text style={styles.infoText}>      {this.state.Carbohydrates}    |</Text>
                <Text style={styles.infoText}>      {this.state.Proteins}    |</Text>
                <Text style={styles.infoText}>       {this.state.Sodium}    |</Text>
              </CardItem>


            </Card>
            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>אלרגיה מסוימת</Text>
              </CardItem>
              <CardItem bordered>
                <Text style={styles.infoText}>{this.state.allergy}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>סימון משרד הבריאות</Text>
              </CardItem>
              <CardItem bordered style={styles.infoText4}>
                <Text style={styles.infoText}>{this.state.mark}</Text>
              </CardItem>
            </Card>

            <Card>
              <CardItem bordered>
                <Text style={styles.infoText}>ברקוד</Text>
              </CardItem>
              <CardItem bordered>
                <Barcode value={this.state.barcode} format="CODE128" />

              </CardItem>
            </Card>
          </View>
          <Card style={styles.actionContainer}>

            <CardItem style={styles.actionButton} bordered>
              <TouchableOpacity
                onPress={() => {
                  this.callAction(this.state.phone);
                }}
              >
                <Entypo name="phone" size={50} color="#335cd6" />
              </TouchableOpacity>
              <Text style={styles.actionText}>טלפון</Text>
            </CardItem>
          </Card>

          <Card style={styles.actionContainer}>
            <CardItem style={styles.actionButton} bordered>
              <TouchableOpacity
                onPress={() => {
                  this.editContact(this.state.key);
                }}
              >
                <Entypo name="edit" size={30} color="#335cd6" />
                <Text style={styles.actionText}>לעריכת המוצר</Text>
              </TouchableOpacity>
            </CardItem>
            <CardItem style={styles.actionButton} bordered>
              <TouchableOpacity
                onPress={() => {
                  this.deleteContact(this.state.key);
                }}
              >
                <Entypo name="trash" size={30} color="#335cd6" />
                <Text style={styles.actionText}>למחיקת המוצר</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
        </ScrollView>
      );
    }
  }
}
// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    // to create a square box both height and width should be same
    height: 130,//Dimensions.get("window").width,
    width: 20//Dimensions.get("window").width
  },
  nameContainer: {
    textAlign: "center",
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300"
  },
  infoText3: {
    backgroundColor:"green",
  },
  infoText4: {
    backgroundColor:"red",
  },
  infoText2: {
    backgroundColor:"green",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    textAlign: "center",
    flexDirection: "row"
  },
  actionButton: {
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    textAlign: "center",
    color: "#0033cc",
    fontWeight: "900"
  }
});
