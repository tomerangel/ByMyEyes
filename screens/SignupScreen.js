import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import * as  firebase from 'firebase';
import * as Speech from 'expo-speech'
import { Form, Input, Label, Button, Item } from 'native-base'
export default class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "הרשמה",
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    }
    this.speak();
  }
  speak(){
    var thing='ברוך הבא להרשמה יש להזין שם פרטי. איימיל. וסיסמה.'
    Speech.speak(thing, { language: "he-IW" })
    //Speech.speak('you have 3 choose, left Camera,Right Products,and down SignOut ',{ language: "pt-BR" })
  }
  signupUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authenticate => {
        return authenticate.user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            this.props.navigation.replace("Hom")
          })
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
            <Item floatingLabel>
              <Label>שם פרטי</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="name-phone-pad"
                onChangeText={name => this.setState({ name })}
              />
            </Item>
            <Item floatingLabel>
              <Label>אימייל</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>סיסמה</Label>
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
                this.signupUser(
                  this.state.name,
                  this.state.email,
                  this.state.password,
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
  }
});