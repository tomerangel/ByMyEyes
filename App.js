// install react-navigation

//TODO: import four screens
import HomeScreen from './screens/HomeScreen'
import AddNewContact from './screens/AddNewProduct'
import EditContact from './screens/EditProduct'
import ViewContact from './screens/ViewProduct'
import HomeScree from './screens/HomeScree'
import LoadingScreen from './screens/LoadingScreen'
import SignupScreen from './screens/SignupScreen'
import SigninScreen from './screens/SigninScreen'
import Barcode from './screens/Barcode'
import barcodeProduct from './screens/barcodeProduct'
import Button from './src/screens/Untitled'
import Button2 from './src/components/MaterialButtonViolet'
import Button3 from './src/components/MaterialButtonPink'
//import Button4 from './src/components/MaterialButtonViolet1'
//import Unti from './screens/Untitled'
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
    barcodeProduct:{screen:barcodeProduct},
    //Button4:{screen:Button4},
    //Unti:{screen:Unti}
    // Voice:{screen:Voice},
  },
  {
   
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#4169E1"
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
export default App;
