import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";

//TODO: Read about UUID
import uuid from 'uuid'
import { Form, Item, Input, Label, Button } from "native-base";
import * as Speech from 'expo-speech';
import * as  ImagePicker from "expo-image-picker";
//import { Header } from "react-navigation";

//TODO: add firebase
import * as firebase from 'firebase'

export default class AddNewContact extends Component {
  static navigationOptions = {
    // set screen header title
    title: "Add Product"
  };
  //TODO: create constructor with state: fname, lname, phone, email, address, image, imageDownloadUrl, isUploading
  constructor(props) {
    super(props)
    this.state = {
      fname: "",
      //lname:"",
      phone: "",
      // email:"",
      barcode: "",
      image: "empty",
      imageDownloadUrl: "empty",
      isUploading: false
    }
  }
  //TODO: savecontact method
  saveContact = async () => {
    // create and save contact to firebase
    if (
      this.state.fname !== "" &&
      //this.state.lname !== "" &&
      this.state.phone !== "" &&
      //this.state.email !== "" &&
      this.state.barcode !== ""

    ) {
      this.setState({ isUploading: true });
      const dbRefexrence = firebase.database().ref();
      const storageRef = firebase.storage().ref();
      if (this.state.image !== "empty") {
        const downloadUrl = await this.uploadImageAsync(this.state.image, storageRef)
        this.setState({ imageDownloadUrl: downloadUrl })
      }

      var contact = {
        fname: this.state.fname,
        // lname:this.state.lname,
        phone: this.state.phone,
        //  email:this.state.email,
        barcode: this.state.barcode,
        //imageUrl:this.state.imageUrl,
      }
      await dbRefexrence.push(contact, error => {
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
  componentWillMount(){
    this.speak();
  }
  speak(){
    var thing='this is NewProduct Page Welcome.'
    Speech.speak(thing)
    Speech.speak('you need to fill the details :product description ,phone number and barcode number')
  }

  //TODO: upload image to firebase
  uploadImageAsync = async (uri, storageRef) => {
    const parts = uri.split(".");
    const fileExtenstion = parts[parts.length - 1]
    //create blog
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
      xhr.send(null)
    })
    const ref = storageRef
      .child("ContactImages")
      .child(uuid.v4() + "." + fileExtenstion)
    const snapshot = await ref.put(blob)

    blob.close()
    return await snapshot.ref.getDownloadUR();
  };

  //render method
  render() {
    if (this.state.isUploading) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            Contact Uploading please wait..
          </Text>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        // keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
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
                />
              </Item>

              <Item style={styles.inputItem} floatingLabel>
                <Label>Phone number</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={phone => this.setState({ phone })}
                />
              </Item>

              <Item style={styles.inputItem} floatingLabel>
                <Label>Barcode</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={barcode => this.setState({ barcode })}
                />
              </Item>
            </Form>

            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                // save contact
                this.saveContact();
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
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
  imagePicker: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#c1c1c1",
    borderWidth: 2
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#0000FF",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
