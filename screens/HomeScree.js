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
  navigateBecauseEmpty = () => {
    const { navigation } = this.props
    this.speak2()
    setTimeout(() => {
        navigation.navigate('SignIn')
    }, 800);
}
  signOuUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.navigateBecauseEmpty())
      .catch(error => {
        alert(error.message)
      })
  }
  speak() {
    var thing ='בָּרוּךְ הַבָּא! לִסְרִיקַת מוּצָר לַחַץ עַל הַכַּפְתּוֹר הָאֶמְצָעִי'
    Speech.speak(thing,{ language: "he-IW" })
    // var thing2 = 'לַסְּרִיקָה לָחַץ עַל הַכַּפְתּוֹר הָאֶמְצָעִי'
    // Speech.speak(thing2, { language: "he-IW" })
    //Speech.speak('you have 3 choose, left Camera,Right Products,and down SignOut ',{ language: "pt-BR" })
  }
  speak2() {
    var thing = 'התנתקת מהמשתמש .'
    Speech.speak(thing,{ language: "he-IW" })
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
        

          <FeatherIcon name="log-out" style={styles.icon2}
            onPress={() => {
              Speech.stop()
              this.signOuUser()

            }}>
            </FeatherIcon>
          <View style={styles.icon3Stack}>
            <FeatherIcon name="eye" style={styles.icon3}
              onPress={() => {
                Speech.stop()

                this.props.navigation.navigate("Barcode")

              }}>
          
            </FeatherIcon>
            <Text style={styles.beYourEye}>be your eyes</Text>
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
          <View style={[styles.cupertinoButtonBlueTextColor2,marginTop=5]}>
            <TouchableOpacity style={styles.container5}
              onPress={() => {
                Speech.stop()
                this.props.navigation.navigate("Home")

              }}>

              
            <Text style={styles.caption10}>להוספת מוצר לחץ כאן</Text>
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
            full
            rounded
            onPress={() => {
              Speech.stop()
              this.speak4()

            }}>
              <Text style={styles.caption3}>השתמשו במוצר בבטחה</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.materialButtonPrimary5} >
            <TouchableOpacity style={[styles.container6]}
            full
            rounded
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
    backgroundColor:"#0200ff",
    flex: 1,
    
  },
  caption6: {
    color: "#0000fe",
    fontSize: 25,
    right:22,
 
    //fontFamily: "assistant-regular",
  
    fontWeight: "bold"
  },

  caption3: {
    color: "#0000fe",
    fontSize: 25,
    right:22,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold"
    //fontFamily: "assistant-regular"
  },
  container6: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.61,
    justifyContent: "center",
    //paddingRight: 16,
    //paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    //borderRadius: 2,
   
  },

  container3: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.62,
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
   
  },
  container1: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.53,
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    
  },
  container5: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  caption1: {
    color: "#0000fe",
    fontSize: 25,
    right:22,
    fontWeight: "bold"
    // fontFamily: "assistant-regular"
  },
  caption10: {
    color: "#fff",
    fontSize: 25,
    right:22,
    fontWeight: "bold"
    // fontFamily: "assistant-regular"
  },
  cupertinoButtonBlueTextColor: {
    width: 244,
    height: 61,
    marginTop: 110,
    marginLeft: 85
  },
  cupertinoButtonBlueTextColor2: {
    width: 244,
    height: 61,
    marginTop: 100,
    marginLeft: 95
  },
  caption: {
    color: "#FFF",
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
    color: "#FFF",
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
    color: "#ffffff",
    fontSize: 171,
    left: 0,
    height: 171,
    width: 171
  }, icon2: {
    color: "#fff",
    fontSize: 30,
    height: 30,
    width: 30,
    marginTop: 30,
    marginLeft: 14
  },
  materialButtonPrimary3: {
    top: 120,
    
    width: 500,
    height: 30,
    backgroundColor: "#FFF",
    position: "absolute",
  
    
  },
  materialButtonPrimary4: {
    top: 170,
    left:0,
    width: 500,
    height: 30,
    backgroundColor: "#FFF",
    position: "absolute",
   
  },
  materialButtonPrimary5: {
    top: 70,
    
    width: 500,
    backgroundColor: "#FFF",
    height: 30,
    position: "absolute"
  },


});
