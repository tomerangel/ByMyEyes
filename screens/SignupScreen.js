import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import * as  firebase from 'firebase';
import * as Speech from 'expo-speech'
import RNPickerSelect from 'react-native-picker-select';

import { Form, Input, Label, Button, Item } from 'native-base'


class Picker extends React.Component {
  render() {
    return (
      <RNPickerSelect
       
        placeholder={{
          label: 'Choose...',
          value: null,
         }}
        
        items={this.props.items}
        onValueChange={(value) => {
          this.setState({
            name: value,
          });
        }}
         
      />
    );
  }
}


export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "הרשמה",
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      items:[
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
      email: "",
      password: "",
      name: "",
      allergy:"",
    }
    this.speak();
  }
  speak(){
    var thing='ברוך הבא להרשמה יש להזין שם פרטי. איימיל. וסיסמה.'
    Speech.speak(thing, { language: "he-IW" })
    //Speech.speak('you have 3 choose, left Camera,Right Products,and down SignOut ',{ language: "pt-BR" })
  }
  CheckingDetails = (email ,password,allergy) => {
    if( email == ''|| password ==''||allergy=='' )
    {
        alert("Missing Details")
    }
    else{
          this.signupUser(this.state.email, this.state.password);
    }
   
  }
  signupUser = (email, password) => {
 
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async authenticate => {
        await authenticate.user
          .updateProfile({
            displayName: this.state.allergy
          });
        this.props.navigation.replace("Hom");
      })
      .catch(error => {
        alert(error.message)
      })
  }
    
  
  
  




  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled
      >
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image
              style={{ width: 250, height: 245 }}
              source={require('../assets/default.png')}
            />
            <Text>LearnCodeOnline.in</Text>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel >
              <Label style={{textAlign: 'right'}}>אימייל</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{textAlign: 'right'}}>סיסמה</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Text style={{textAlign: 'right'}}>אם יש לך רגישות לאלרגיה מסוימת תבחר כאן.</Text>
            <View style={styles.formItemInput}>
            <RNPickerSelect
                    placeholder={{
                        label: 'אם המוצר מכיל משהו מכאן תבחר.',
                        value: null,
                    }}
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            allergy: value,
                        });
                    }}
                    style={{ ...pickerStyles }}
                    value={this.state.allergy}
                    />
                </View>
            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                Speech.stop()
                this.CheckingDetails(
                  this.state.email,
                  this.state.password,
                  this.state.allergy,
                )
              }}
            ><Text style={styles.buttonText}>Sign in</Text></Button>
          </Form>
          <View style={styles.footer}>
            <Text>או</Text>
            <TouchableOpacity
              onPress={() => {
                Speech.stop()
                this.props.navigation.navigate("SignIn")
              }}>
              <Text style={styles.buttonText}>יש לך כבר חשבון ?..</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  formItemInput: {
    minHeight: 80,
    padding: 10,
    flexDirection: 'row',
    flex: -1,
  },
  form: {
    padding: 20,
    width: "100%"
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: "black"
  },
  footer: {
    alignItems: "center"
  },
  
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
    backgroundColor: '#969796',
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