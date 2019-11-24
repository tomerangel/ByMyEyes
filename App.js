// install react-navigation

//TODO: import four screens
import HomeScreen from './screens/HomeScreen'
import AddNewContact from './screens/AddNewContact'
import EditContact from './screens/EditContact'
import ViewContact from './screens/ViewContact'
import HomeScree from './screens/HomeScree'
import LoadingScreen from './screens/LoadingScreen'
import SignupScreen from './screens/SignupScreen'
import SigninScreen from './screens/SigninScreen'
import Barcode from './screens/Barcode'
import Voice from './screens/VoiceButton'
import Page from './screens/Page'
//TODO: import firebase
import * as firebase from 'firebase'

// set up react navigation
import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Loading:{screen:LoadingScreen},
    SignIn:{screen:SigninScreen},
    SignUp:{screen:SignupScreen},
    Hom:{screen:HomeScree},
    Barcode:{screen:Barcode},
    Home: { screen: HomeScreen },
    Add: { screen: AddNewContact },
    Page: { screen: Page },
    View: { screen: ViewContact },
    Edit: { screen: EditContact },
    // Voice:{screen:Voice},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#0000FF"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

//TODO: Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDhuzs-h0KJllvKT3RnusuRfMP0Nt3Ml0o",
  authDomain: "reactbootcamp-725b2.firebaseapp.com",
  databaseURL: "https://reactbootcamp-725b2.firebaseio.com",
  projectId: "reactbootcamp-725b2",
  storageBucket: "reactbootcamp-725b2.appspot.com",
  messagingSenderId: "717745421324",
  appId: "1:717745421324:web:aef219a955876c06d0c229",
  measurementId: "G-Q6Y8HJS5E9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//FirebaseTODO create firebase real-time database with rules

// {
//   "rules": {
//     ".read": true,
//     ".write": true
//   }
// }
export default App;
