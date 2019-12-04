import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";

//TODO: Add UUID

import { ImagePicker } from "expo";

import { Form, Item, Input, Label, Button } from "native-base";

import { Header } from "react-navigation";

//TODO: add firebase
import * as firebase from 'firebase'
export default class EditContact extends Component {
  static navigationOptions = {
    title: "Edit Product"
  };

  constructor(props) {
    super(props);
    // set state
    this.state = {
      fname: "",
      // lname: "",
      phone: "",
      //email: "",
      barcode: "",
      image: "empty",
      imageDownloadUrl: "empty",
      isUploading: false,
      isLoading: true,
      key: ""
    };
  }

  componentDidMount() {
    var key = this.props.navigation.getParam("key", "");
    this.getContact(key);
  }
  //TODO: getContact  method
  getContact = async key => {
    let self = this
    let contactRef = firebase.database().ref().child(key)



    await contactRef.on("value", dataSnapsot => {
      if (dataSnapsot.val()) {
        contactValue = dataSnapsot.val();
        self.setState({
          fname: contactValue.fname,
          //   lname:contactValue.lname,
          phone: contactValue.phone,
          // email:contactValue.email,
          barcode: contactValue.barcode,
          imageUrl: contactValue.imageUrl,
          key: key,
          isLoading: false
        })
      }
    })
  };

  //TODO: update contact method
  updateContact = async key => {
    if (this.state.fname !== "" &&
      // this.state.lname !== "" &&
      this.state.phone !== "" &&
      //  this.state.email !== "" &&
      this.state.barcode !== ""

    ) {
      this.setState({ isUploading: true })
      const dbRefernce = firebase.database().ref()
      const storageRef = firebase.database().ref()
      if (this.state.image !== "empty") {
        const downloadUrl = await this.uploadImageAsync(
          this.state.image, storageRef
        )
        this.setState({ imageDownloadUrl: downloadUrl })
      }
      var contact = {
        fname: this.state.fname,
        //lname:this.state.lname,
        phone: this.state.phone,
        //email:this.state.email,
        barcode: this.state.barcode,
        //imageUrl:this.state.imageUrl,
      }
      await dbRefernce.child(key).set(contact, error => {
        if (!error) {
          return this.props.navigation.goBack();
        }
      })
    }
  };

  //TODO: pick image from gallery
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1]

    })
    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  };

  //TODO: upload to firebase
  uploadImageAsync = async (uri, storageRef) => {
    const parts = uri.split(".")
    const fileExtenstion = parts[parts.length - 1]

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", uri, true)
      xhr.send(null);

    })

    const ref = storageRef
      .child("ContactImages")
      .child(uuid.v4() + "." + fileExtenstion)
    const snapshot = await ref.put(blob)

    blob.close()
    return await snapshot.ref.getDownloadUR();

  }

  // render method
  render() {
    if (this.state.isUploading) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            Contact Updateing please wait..
          </Text>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        //keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
        style={{ flex: 1 }}
        behavior="padding"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            // dismiss the keyboard if touch any other area then input
            Keyboard.dismiss();
          }}
        >
          <ScrollView style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                this.pickImage();
              }}
            >
              <Image
                source={
                  this.state.image === "empty"
                    ? require("../assets/person.png")
                    : {
                      uri: this.state.image
                    }
                }
                style={styles.imagePicker}
              />
            </TouchableOpacity>
            <Form>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Product description</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={fname => this.setState({ fname })}
                  value={
                    // set current contact value to input box
                    this.state.fname
                  }
                />
              </Item>

              <Item style={styles.inputItem} floatingLabel>
                <Label>Phone number</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={phone => this.setState({ phone })}
                  value={this.state.phone}
                />
              </Item>

              <Item style={styles.inputItem} floatingLabel>
                <Label>Barcode</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={barcode => this.setState({ barcode })}
                  value={this.state.barcode}
                />
              </Item>
            </Form>

            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                this.updateContact(this.state.key);
              }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  imagePicker: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#c1c1c1",
    borderWidth: 2
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
