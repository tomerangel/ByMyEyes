import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { Form, Item, Input, Label, Button } from 'native-base'
import * as Speech from 'expo-speech'
export default class SigninScreen extends React.Component {
  static navigationOptions = {
    title: "התחברות",
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    
    }
    this.speak();
  }
  speak(){
    var thing='ברוך הבא לכניסה יש להזין פרטים ,אחרת אתה יכול להירשם'
    Speech.speak(thing, { language: "he-IW" })
    //Speech.speak('you have 3 choose, left Camera,Right Products,and down SignOut ',{ language: "pt-BR" })
  }
  signinUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authenticate) => {
        this.props.navigation.replace("Hom")
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
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 220, height: 215 }}
            source={require('../assets/default.png')}
          />

        </View>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input

              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => {
              Speech.stop()
              this.signinUser(
                this.state.email,
                this.state.password
              )
            }}
          ><Text style={styles.buttonText}>להתחבר</Text></Button>

        </Form>
        <View style={styles.footer}>
          <Text>או</Text>
          <TouchableOpacity
            onPress={() => {
              Speech.stop()
              this.props.navigation.navigate("SignUp")
            }}>
            <Text>ליצור חשבון חדש?...</Text>
          </TouchableOpacity>
        </View>
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
  form: {
    padding: 20,
    width: "100%"
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  }
});