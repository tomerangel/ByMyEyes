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
import RNPickerSelect from 'react-native-picker-select';
import MainService from './MainService'
import { Form, Item, Input, Label, Button } from "native-base";
import * as Speech from 'expo-speech';
//import { Header } from "react-navigation";

//TODO: add firebase
import * as firebase from 'firebase'

export default class AddNewProduct extends Component {
  _isMounted = false;
  state = {
    loaded: false
  }
  static navigationOptions = {
    // set screen header title
    title: "הוספת מוצר"
  };
  //TODO: create constructor with state: fname, lname, phone, email, address, image, imageDownloadUrl, isUploading
  constructor(props) {
    super(props)
    MainService.load(v => this.setState({ loaded: true }))
    this.state = {
      mark: "",
      items: [
        {
          label: 'תקין-ירוק',
          value: 'תקין-ירוק',
        },
        {
          label: 'סוכר ברמה גבווה',
          value: 'סוכר ברמה גבווה',
        },
        {
          label: 'נתרן ברמה גבווה',
          value: 'נתרן ברמה גבווה',
        },
        {
          label: 'שומן רווי ברמה גבווה',
          value: 'שומן רווי ברמה גבווה',
        },
      ],
      allergy: "",
      allergys: [
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
      fname: "",
      key: "",
      barcode: "",
      barcodeData: "",
      Calories: "",
      Sodium: "",
      Category:"",
      Proteins: "",
      Carbohydrates: "",
      Fats: "",
      isUploading: false,
      boolspeak: true,
      booladdProduct: false,
    }

  }
  //TODO: savecontact method
  saveContact = async () => {

    // create and save contact to firebase
    if (
      this.state.fname !== "" &&
      this.state.Category !==""&&
      this.state.Calories !== "" &&
      this.state.Sodium !== "" &&
      this.state.Proteins !== "" &&
      this.state.Carbohydrates !== "" &&
      this.state.Fats !== "" &&
      this.state.mark !== "" &&
      this.state.allergy !== "" &&
      this.state.barcode !== ""

    ) {
      const dbRefexrence = firebase.database().ref();
      const storageRef = firebase.storage().ref();
      var contact = {
        fname: this.state.fname,
        Category:this.state.Category,
        Calories: this.state.Calories,
        Proteins: this.state.Proteins,
        Carbohydrates: this.state.Carbohydrates,
        Fats: this.state.Fats,
        mark: this.state.mark,
        allergy: this.state.allergy,
        Sodium: this.state.Sodium,
        barcode: this.state.barcode,
        //imageUrl:this.state.imageUrl,
      }
      await dbRefexrence.push(contact, error => {
        if (!error) {
          //this.state.booladdProduct=true;
          return this.navigatebackHomepage()
        }
      })
    } else {
      alert("שכחת למלא אחד מהמוצרים.")
    }
  };
  navigatebackHomepage = () => {
    const { navigation } = this.props
    Speech.speak('המוצר התווסף למערכת.', { language: "he-IW" })
    setTimeout(() => {
        navigation.navigate('Home')
    }, 2000);
}
  componentDidMount() {
    this._isMounted = true;
    let d = this.props.navigation.state.params.barcodeData

    if (this._isMounted) {
      this.setState({
        barcode: d
      })
      let self = this
      let barCodeData2 = this.props.navigation.state.params.barcodeData
      let ref = firebase.database().ref()
      ref.on("value", dataSnapsot => {
        let contactResult = Object.values(dataSnapsot.val())
        //contactValue = dataSnapsot.val();
        contactResult.forEach((a) => {
          let nameA = a.barcode
          const nameB = barCodeData2
          if (nameA == nameB) {
            this.state.boolspeak = false;
            
          }
        })
      })
      if(this.state.boolspeak){
        this.speak()
      }
    }

  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  navigateBecauseEmpty = () => {
    const { navigation } = this.props
    this.speak2()
    alert("המוצר כבר קיים במערכת תוכלו לבדוק בצפייה במוצרים")
    setTimeout(() => {
      navigation.navigate('Hom')
    }, 800);
  }

  speak2() {
    // var thing='this is NewProduct Page Welcome.'
    // Speech.speak(thing)
    Speech.speak('המוצר כבר קיים במערכת', { language: "he-IW" })
  }
  speak() {
    // var thing='this is NewProduct Page Welcome.'
    // Speech.speak(thing)
    setTimeout(() => {
    Speech.speak(' .בְּעַמּוּד זֶה יֵשׁ לְמַלֵּא אֶת פְּרָטֵי הַמּוּצָר', { language: "he-IW" })
    },2000)
  }
  //render method

  render() {
    // if (this.state.tomer){
    let d = this.props.navigation.state.params.barcodeData

    if (!this.state.loaded) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
          
            .....בטעינה אנא המתן
          </Text>
        </View>
      );
    }
    if (!this.state.boolspeak) {
      return (
        <View>
          {this.navigateBecauseEmpty()}
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
            <Form>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>תיאור המוצר</Label>
                <Input
                  textAlign="right"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={fname => this.setState({ fname })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>קטגוריה</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={ Category=> this.setState({ Category })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>קלוריות</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Calories => this.setState({ Calories })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>חלבונים</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Proteins => this.setState({ Proteins })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>פחמימות</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Carbohydrates => this.setState({ Carbohydrates })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>שומנים</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Fats => this.setState({ Fats })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label style={{ textAlign: 'right' }}>נתרן</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={Sodium => this.setState({ Sodium })}
                />
              </Item>
            </Form>
            <Text style={{ textAlign: 'right' }}>תבחר סימון משרד הבריאות</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Choose...',
                value: null,
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
            <Text style={{ textAlign: 'right' }}>מכיל אלרגיה מסוימת ?.</Text>
            <RNPickerSelect
              placeholder={{
                label: 'אם המוצר מכיל משהו מכאן תבחר.',
                value: null,
              }}
              items={this.state.allergys}
              onValueChange={(value) => {
                this.setState({
                  // barcode: d,
                  allergy: value,
                });
              }}
              style={{ ...pickerStyles }}
              value={this.state.allergy}
            />
            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                // save contact
                this.saveContact();
              }}
            >
              <Text style={styles.buttonText}>שמירת המוצר</Text>
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
  },
  pickerSelectStyles: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
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

