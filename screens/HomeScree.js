import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Switch } from 'react-native';
import { Button } from 'native-base';
import { FontAwesome, Entypo } from "@expo/vector-icons"
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
export default class HomeScree extends React.Component {
  s={isSwitchOn:true}

  static navigationOptions = {
    // set screen header name
    title: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      switch1Value: false,
    }
    this.speak();
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(authenticate => {
      if (authenticate) {
      
        this.setState({
          email: authenticate.email,
          name: authenticate.displayName
        })
       
      } else {
        this.props.navigation.replace("SignIn")
        
      }
      
    })
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
  speak(){
    var thing='ברוך הבא לעמוד בית. יש לְךָ 3 אפשרויות, לבחירה'
    Speech.speak(thing, { language: "he-IW" })
    //Speech.speak('you have 3 choose, left Camera,Right Products,and down SignOut ',{ language: "pt-BR" })
  }
 
  
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.materialButtonVioletStack}>
      <Image
                style={{ width: 280, height: 200,paddingRight: 50,left:70, alignItems: "center", }}
                source={require('../assets/default.png')}
              />
        <View style={styles.materialButtonPink}>
          
          <View style={styles.container1}>
            <View style={styles.materialButtonPink1}>
              <TouchableOpacity style={styles.container2}
               onPress={()=>{
                this.props.navigation.navigate("Home")
              }}
              >
                <Text style={styles.caption2}>Products</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.container3}
              onPress={()=>{
                this.props.navigation.navigate("Barcode")
              }}
              >
                <Text style={styles.caption2}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.container4}
              onPress={()=>{
                this.signOuUser()
              }}
              >
                <Text style={styles.caption2}>SignOut</Text>
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
