import React, { Component } from "react";
// import needed Components
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  Keyboard,
  TextInput,
  ActivityIndicator
} from "react-native";
// install native-base and import card from it
import { Card } from "native-base";
//import Entypo icons from @expo
import {SearchBar} from  'react-native-elements'
import { Entypo } from "@expo/vector-icons";
import * as Speech from 'expo-speech'
//TODO: add firebase
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons'
import * as Animate from 'react-native-animatable'

 class HomeScreen extends Component {
 
  //TODO: add constructor with state: data[], isLoading, isListEmpty

  constructor(props) {
    super(props);
    // set empty array to state
    this.state = {
      search: '',
      data: [],
      searchBarFocused: false,
      isLoading: true,
      isListEmpty: false
    };
  }
  // lifecycle method
  componentWillMount() {
    this.speak();
    this.getAllContact();

  }
  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  speak() {
    var thing = 'this is Products Page Welcome.'
   // Speech.speak(thing)
    Speech.speak('יש לך 2 אפשרויות,לצפות במוצר או להוסיף מוצר חדש ', { language: "he-IW" })
  }
  updateSearch = search => {
    this.setState({ search });
  };
  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
  }
  // getAllContact method
  getAllContact = () => {
    let self = this;
    //TODO: get all contact from firebase
    let contactRef = firebase.database().ref()
    contactRef.on("value", dataSnapsot => {
      if (dataSnapsot.val()) {
        let contactResult = Object.values(dataSnapsot.val())
        let contactKey = Object.keys(dataSnapsot.val())
        contactKey.forEach((value, key) => {
          contactResult[key]["key"] = value
        })
        self.setState({
          data: contactResult.sort((a, b) => {
            var nameA = a.fname.toUpperCase()
            var nameB = b.fname.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA < nameB) {
              return 1
            }
            return 0
          }),
          isListEmpty: false
        })
      } else {
        self.setState({ isListEmpty: true })
      }
      self.setState({ isLoading: false })
    })
    //TODO:
    // sort array by fname and set it to data state
  }
  // render method
  render() {
    // if its loading show ActivityIndicator
    if (this.state.isLoading) {
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
    } else if (this.state.isListEmpty) {
      // else if loading is completed and no contact found show this
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <Entypo style={{ alignSelf: "center" }} name="plus" size={35} />
          <Text style={{ textAlign: "center" }}>אין מוצרים במערכת תוכל להוסיף </Text>
          <TouchableOpacity
            onPress={() => {
              Speech.stop()
              // add icon
              //navigate to Add Contact screen
              this.props.navigation.navigate("Add");
            }}
            style={styles.floatButton}
          >
            <Entypo name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    }
    // return list of contacts
    return (

      <View style={styles.container}>
      
      <View style={styles.container}>
      <SearchBar
      round
      searchIcon={{ size: 24 }}
      
      placeholder="Search Here"
      //onChangeText={this.getAllContact()}
      value={this.state.search}
    />
        <FlatList
          style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white' }}
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Speech.stop()
                  //navigate to view contact screen with passing key
                  this.props.navigation.navigate("View", {
                    key: item.key
                  });
                }}
              >
                <Card style={styles.listItem}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                      {item.fname}
                    </Text>
                    {/* <Text style={styles.infoText}></Text> */}
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          
        />
        <TouchableOpacity
          onPress={() => {
            // add icon
            //navigate to Add Contact screen
            //this.props.navigation.navigate("View")
            Speech.stop()
            this.props.navigation.navigate("Add")
          }}
          style={styles.floatButton}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
export default HomeScreen;
// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  contactIcon: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#0000FF",
    borderRadius: 100
  }
});
