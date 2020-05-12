import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, Slider, ImageBackground, ActivityIndicator } from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import { Button } from 'native-base';
import { FontAwesome, Entypo } from "@expo/vector-icons"
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import MainService from './MainService'
export default class HomeScree extends React.Component {
  static navigationOptions = {
    title: "עמוד הבית",
    header: null
  }
  state={
    loaded:false
  }
  // s={isSwitchOn:true}
  _isMounted = false;
  constructor(props) {
    super(props);
    MainService.load2(v=>this.setState({loaded:true}))
    this.state = {
      allergy: "",
      isLoading: true,
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
            isLoading: false,
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
  speak3() {
    var thing = 'האזינו לפרטי המוצר'
    Speech.speak(thing, { language: "he-IW" })
  }
  speak4() {
    var thing = 'השתמשו במוצר בבטחה'
    Speech.speak(thing, { language: "he-IW" })
  }
  speak5() {
    var thing = 'סרקו את המוצר'
    Speech.speak(thing, { language: "he-IW" })
  }

  render() {
    if (!this.state.loaded) {
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
            המערכת בטעינה....
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageStack}>
          <ImageBackground
            source={require("../assets/images/-247289715.jpg")}
            resizeMode="stretch"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
          </ImageBackground>

          <FeatherIcon name="log-out" style={styles.icon2}
            onPress={() => {
              Speech.stop()
              this.signOuUser()

            }}>
            ></FeatherIcon>
          <View style={styles.icon3Stack}>
            <FeatherIcon name="eye" style={styles.icon3}
              onPress={() => {
                Speech.stop()

                this.props.navigation.navigate("Barcode")

              }}>
              >
            </FeatherIcon>
            <Text style={styles.beYourEye}>be your eye</Text>
          </View>

          <View style={[styles.cupertinoButtonBlueTextColor]}>
            <TouchableOpacity style={styles.container5}
              onPress={() => {
                Speech.stop()
                this.props.navigation.navigate("Home")

              }}>

              
            <Text style={styles.caption}>לצפייה ברשימת המוצרים</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.materialButtonPrimary3}>
            <TouchableOpacity style={[styles.container1]}
            onPress={() => {
              Speech.stop()
              this.speak3()

            }}>
            
              <Text style={styles.caption1}>האזינו לפרטי המוצר</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.materialButtonPrimary4} >
            <TouchableOpacity style={[styles.container3]}
            
            onPress={() => {
              Speech.stop()
              this.speak4()

            }}>
              <Text style={styles.caption3}>השתמשו במוצר בבטחה</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.materialButtonPrimary5} >
            <TouchableOpacity style={[styles.container6]}
            
            onPress={() => {
              Speech.stop()
              this.speak5()

            }}
            >
              <Text style={styles.caption6}>סרקו את המוצר</Text>
            </TouchableOpacity>
          </View>



        </View>
      </View>
    )

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  caption6: {
    color: "#fff",
    fontSize: 20,
    //fontFamily: "assistant-regular",
    textAlign: "right"
  },

  caption3: {
    color: "#fff",
    fontSize: 20,
    //fontFamily: "assistant-regular"
  },
  container6: {
    backgroundColor: "rgba(110,171,219,1)",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.61,
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },

  container3: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.62,
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  container1: {
    //backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.53,
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  container5: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  caption1: {
    color: "#fff",
    fontSize: 20,
    // fontFamily: "assistant-regular"
  },
  cupertinoButtonBlueTextColor: {
    width: 244,
    height: 61,
    marginTop: 110,
    marginLeft: 85
  },
  caption: {
    color: "#007AFF",
    fontSize: 20,
    //fontFamily: "assistant-regular",
    textAlign: "center"
  },
  imageStack: {
    width: 400,
    height: 350,
    //marginTop:5
  },
   icon3Stack: {
    width: 224,
    height: 191,
    marginTop: 214,
    marginLeft: 113
  },
  beYourEye: {
    top: 151,
    left: 118,
    width: 106,
    height: 40,
    color: "rgba(82,115,153,1)",
    position: "absolute",
    fontSize: 20,

  },
  image: {
    top: 0,
    left: 0,
    width: 420,
    height: 749,
    position: "absolute"
  },
  image_imageStyle: {},
  icon3: {
    top: 0,
    position: "absolute",
    color: "rgba(25,89,163,1)",
    fontSize: 171,
    left: 0,
    height: 171,
    width: 171
  }, icon2: {
    color: "rgba(25,89,163,1)",
    fontSize: 30,
    height: 30,
    width: 30,
    marginTop: 30,
    marginLeft: 14
  },
  materialButtonPrimary3: {
    top: 105,
    left: 199,
    width: 236,
    height: 20,
    backgroundColor: "rgba(100,126,181,1)",
    position: "absolute",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: "rgba(52,86,126,1)"
  },
  materialButtonPrimary4: {
    top: 140,
    left: 147,
    width: 270,
    height: 36,
    position: "absolute",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: "rgba(52,86,126,1)"
  },
  materialButtonPrimary5: {
    top: 70,
    left: 230,
    width: 187,
    height: 36,
    position: "absolute"
  },


});
