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
import RNPickerSelect from 'react-native-picker-select';
import { ImagePicker } from "expo";
import { Form, Item, Input, Label, Button } from "native-base";
import { Header } from "react-navigation";
//TODO:add firebase
import * as firebase from 'firebase'
export default class EditContact extends Component {

  static navigationOptions = {
    title: "Edit Product"
  };
  constructor(props) {
    super(props);
    // set state
    this.state = {
      allergy:"",
      fname: "",
      barcode: "",
      mark: "",
      items: [
        {
          label: 'תקין-ירוק',
          value: 'תקין-ירוק',
        },
          {
              label: 'סוכר ברמה גוובה',
              value: 'סוכר ברמה גוובה',
          },
          {
              label: 'נתרן ברמה גוובה',
              value: 'נתרן ברמה גוובה',
          },
          {
              label: 'שומן רווי ברמה גוובה',
              value: 'שומן רווי ברמה גוובה',
          },
      ],
      allergys:[
        {
          label: 'אין',
          value: 'אין',
        },
        {
          label: 'חלב',
          value: 'חלב',
        },
        {
          label: 'סויה',
          value: 'סויה',
        },
        {
          label: 'ביצים',
          value: 'ביצים',
        },
        {
          label: 'חיטה',
          value: 'חיטה',
        },
        {
          label: 'דגים',
          value: 'דגים',
        },
        {
          label: 'בוטנים',
          value: 'בוטנים',
        },
        {
          label: 'שומשום',
          value: 'שומשום',
        },
        {
          label: 'שקדים',
          value: 'שקדים',
        },
        {
          label: 'קווי',
          value: 'קויי',
        },
        {
          label: 'אגוזים',
          value: 'אגוזים',
        },
        {
          label: 'קשיו',
          value: 'קשיו',
        },
      ],
      barcodeData:"",
      Calories:"",
      Sodium :"",
      Proteins:"",
      Category:"",
      Carbohydrates:"",
      Fats:"",
      isUploading: false,
      isLoading: true,
      key: "",
      isMounted: false
    };
  }
  componentDidMount() {
    
    this.setState({isMounted: true})
    var key = this.props.navigation.getParam("key", "");
    this.getContact(key);
    
  }
  componentWillUnmount() {
    this.state.isMounted = false
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
          Category:contactValue.Category,
          Calories:contactValue.Calories,
          Sodium:contactValue.Sodium,
          Proteins:contactValue.Proteins,
          Carbohydrates:contactValue.Carbohydrates,
          Fats:contactValue.Fats,
          mark:contactValue.mark,
          allergy:contactValue.allergy,
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
      this.state.Category !== ""&&
      this.state.Calories!== ""&&
      this.state.Sodium!== ""&&
      this.state.Proteins!== ""&&
      this.state.Carbohydrates!== ""&&
      this.state.Fats!== ""&&
      this.state.mark !== "" &&
      this.state.allergy !==""&&
      this.state.barcode !== ""
    ) {
      this.setState({ isUploading: true })
      const dbRefernce = firebase.database().ref()
      const storageRef = firebase.database().ref()
    
      var contact = {
        fname: this.state.fname,
        Category:this.state.Category,
        Calories: this.state.Calories,
        Sodium: this.state.Sodium,
        Proteins: this.state.Proteins,
        Carbohydrates: this.state.Carbohydrates,
        Fats:this.state.Fats,
        mark:this.state.mark,
        allergy:this.state.allergy,
        barcode: this.state.barcode,
       
      }
      await dbRefernce.child(key).set(contact, error => {
        if (!error) {
          return this.navigatebackHomepage()
        }
      })
    }
  };
  navigatebackHomepage = () => {
    const { navigation } = this.props
    setTimeout(() => {
        navigation.navigate('Home')
    }, 2000);
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
          המוצרים בטעינה רק שניה ...
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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            <Form>
              <Item style={styles.inputItem} floatingLabel>
                <Label>תיאור המוצר</Label>
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
                <Label>קטגוריה</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={Category => this.setState({ Category })}
                  value={
                    // set current contact value to input box
                    this.state.Category
                  }
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{textAlign: 'right'}}>קלוריות</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Calories => this.setState({ Calories })}
                  value={
                    // set current contact value to input box
                    this.state.Calories
                  }
                />
              </Item>

              <Item style={styles.inputItem} floatingLabel>
                <Label style={{textAlign: 'right'}}>חלבונים</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Proteins => this.setState({ Proteins })}
                  value={
                    // set current contact value to input box
                    this.state.Proteins
                  }
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{textAlign: 'right'}}>פחמימות</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Carbohydrates => this.setState({ Carbohydrates })}
                  value={
                    // set current contact value to input box
                    this.state.Carbohydrates
                  }
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{textAlign: 'right'}}>שומנים</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Fats => this.setState({ Fats })}
                  value={
                    // set current contact value to input box
                    this.state.Fats
                  }
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{textAlign: 'right'}}>נתרן</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Sodium => this.setState({ Sodium })}
                  value={
                    // set current contact value to input box
                    this.state.Sodium
                  }
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{textAlign: 'right'}}>מס' ברקוד</Label>
                <Input
             
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={barcode => this.setState({ barcode })}
                  value={this.state.barcode}
                />   
              </Item>
              <Text style={{textAlign: 'right'}}>תבחר סימון משרד הבריאות</Text>
                <RNPickerSelect
                    placeholder={{
                        label: this.state.mark,
                        value: this.state.mark,
                    }}
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            mark: value,
                        });
                    }}
                    style={{ ...pickerStyles }}
                    value={this.state.mark}
                    />

            <Text style={{textAlign: 'right'}}>מכיל אלרגיה מסוימת ?.</Text>
                <RNPickerSelect
                    placeholder={{
                        label: this.state.allergy,
                        value: this.state.allergy,
                    }}
                    items={this.state.allergys}
                    onValueChange={(value) => {
                        this.setState({
                            allergy: value,
                        });
                    }}
                    style={{ ...pickerStyles }}
                    value={this.state.allergy}
                    />

            </Form>
            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                this.updateContact(this.state.key);
              }}
            >
              <Text style={styles.buttonText}>לעדכן מוצר</Text>
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
const pickerStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 17,
    color: 'black',
  },
  viewContainer: {
    flex: 1
  },
  inputIOSContainer: {
     flex: 1,
    margin: 5,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#bbb',
  },
  icon: {
    
    flexDirection: 'column',
    position: 'relative',
    top: 0,
    right: 5,
    flexGrow: 0,
    width: 6,
    alignSelf: 'center',
    borderTopWidth: 6,
    borderTopColor: '#212733',
    borderRightWidth: 6,
    borderLeftWidth: 6,
  },
  done: {
    color: '#212733'
  },
});

