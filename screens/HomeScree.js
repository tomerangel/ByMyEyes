import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { FontAwesome, Entypo } from "@expo/vector-icons"
import * as firebase from 'firebase';
import Constants from 'expo-constants';


export default class HomeScree extends React.Component {
  static navigationOptions = {
    // set screen header name
    title: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    }
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{ width: 260, height: 240 }}
            source={require('../assets/default.png')}
          />

        </View>
        <View style={styles.fixToText2} >
          
          <TouchableOpacity
            style={styles.fixToText}
            onPress={() => {
              this.props.navigation.navigate("Barcode")
            }}
          >
            <FontAwesome
              name="camera"
              color="#0000FF"
              size={50}
             // style={styles.icon}
            />
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
          
           // style={styles.floatButton}
            
            onPress={() => {
              this.props.navigation.navigate("Home")
            }}
          >
            <FontAwesome
              name="plus"
              size={45}
              color="blue"
             
            />
             <Text>Add Product</Text>
          </TouchableOpacity>
          {/* <Button
          
           // style={styles.floatButton}
            
            onPress={() => {
             // this.props.navigation.navigate("Voice")
            }}
          >
           
             <Text>Voice</Text>
          </Button>
        */}
              </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            this.signOuUser();
          }}
        >
           <FontAwesome
              name="sign-out"
              color="#0000FF"
              size={50}
              
            />
          <Text >SignOut</Text></TouchableOpacity>
          
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
    // margin: 20
  },
  containerr: {
    //flexDirection:'row',
    borderColor: 'black',
    //borderWidth:1,
    //justifyContent:'flex-start'

  },
  fixToText2:{
    //flex:1,
    
    //justifyContent:'space-between',
    flexDirection: 'row',
  },
  fixToText: {
    
    marginRight:220
   // marginHorizontal: 100,
    //alignItems: "center",
  },
  floatButton: {
   // borderWidth: 1,
    //borderColor: "rgba(0,0,0,0.2)",
    //alignItems: "center",
    //justifyContent: "center",
    //position: "absolute",
    //width: 60,
    marginLeft:220,
   // bottom: 10,
    //right: 130,
    //height: 60,
    backgroundColor: "#0000FF",
    //borderRadius: 300
  },

  logoContainer: {
    alignItems: "center",
    //marginTop: 100,
    marginBottom: 100
  },
  userDetails: {},

  button: {
    marginTop: 20,
    backgroundColor: "#00BFFF"
  },
  buttonText: {
    color: "black",
    //marginEnd:150,
    fontSize:14,
  },


  icon: {
    //flex:1,
    //justifyContent:"space-between",
    marginBottom:100,
    //marginEnd:200
    //color:"#fff"
    //borderColor:'black',
    //borderWidth:1,

    //width: 60,
    //bottom: 10,
    //left: 130,
    //height: 60,
    // alignItems:"flex-start"
  },


});
