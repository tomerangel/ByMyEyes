import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, Slider } from 'react-native';
import { Button } from 'native-base';
import { FontAwesome, Entypo } from "@expo/vector-icons"
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
export default class HomeScree extends React.Component {
  // s={isSwitchOn:true}
  _isMounted = false;

  static navigationOptions = {
    // set screen header name
    title: "עמוד הבית"
  };
  constructor(props) {
    super(props);
    this.state = {
      allergy: "",
      email: "",
      switch1Value: false,
    }
    this.speak();
  }
  async componentDidMount() {
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
        if (this._isMounted) {
          this.setState({
            email: authenticate.email,
            allergy: authenticate.displayName,
          })
          console.log(this.state.allergy)
        }
      } else {
        this.props.navigation.replace("SignIn")
      }
    })
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  signOuUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("SignOut"))
      .catch(error => {
        alert(error.message)
      })
  }
  speak() {
    var thing = 'welcome to scanner application'
    Speech.speak(thing)
    // var thing2 = 'לַסְּרִיקָה לָחַץ עַל הַכַּפְתּוֹר הָאֶמְצָעִי'
    // Speech.speak(thing2, { language: "he-IW" })
    //Speech.speak('you have 3 choose, left Camera,Right Products,and down SignOut ',{ language: "pt-BR" })
  }


  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.materialButtonVioletStack}>
          <Image
            style={{ width: 280, height: 200, paddingRight: 50, left: 70, alignItems: "center", }}
            source={require('../assets/default.png')}
          />
          <View style={styles.materialButtonPink}>

            <View style={styles.container1}>
              <View style={styles.materialButtonPink1}>
                <Text>Hey {this.state.allergy}</Text>
                <TouchableOpacity style={styles.container2}
                  onPress={() => {
                    Speech.stop()
                    this.props.navigation.navigate("Home")
                  }}
                >
                  <Text style={styles.caption2}>מוצרים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container3}
                  onPress={() => {
                    Speech.stop()
                    this.props.navigation.navigate("Barcode")
                  }}
                >
                  <Text style={styles.caption2}>מצלמת ברקוד</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.container4}
                  onPress={() => {
                    Speech.stop()
                    this.signOuUser()
                  }}
                >
                  <Text style={styles.caption2}>יציאה מהמערכת</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container1: {
    // width: 360,
    // height: 124
  },
  materialButtonPink1: {
    //width: 460,
    //height: 254
  },

  materialButtonPink: {
    //top: 130,
    //left: 0,
    width: 420,
    height: 124,
    position: "absolute",
    marginTop: 300
  },
  materialButtonVioletStack: {
    //width: 360,
    //height: 1000,

    //paddingRight:30
  },
  caption2: {
    //width: 0,
    height: 124,
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 40,

    //fontFamily: "roboto-regular"
  },
  caption22: {
    //width: 0,
    //height: 124,
    color: "black",
    fontWeight: 'bold',
    fontSize: 13,

    //fontFamily: "roboto-regular"
  },


  container2: {
    backgroundColor: "#a6c9ed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    //elevation: 2,
    //minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  container22: {
    //backgroundColor: "#fff",
    //flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //paddingRight: 16,
    //paddingLeft: 16,
    //elevation: 2,
    borderBottomLeftRadius: 3,
    //minWidth: 88,
    borderRadius: 2,
    left: 160,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  container3: {
    backgroundColor: "#599cde",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    //elevation: 2,
    //minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  container4: {
    backgroundColor: "#0d6ecf",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    //elevation: 2,
    //minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },

});
