import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import MaterialButtonPink from "../components/MaterialButtonPink";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <View style={styles.materialButtonVioletStack}>
        <MaterialButtonViolet
          style={styles.materialButtonViolet}
        ></MaterialButtonViolet>
        <Text style={styles.products}>Products</Text>
      </View>
      <View style={styles.materialButtonViolet1Stack}>
        <MaterialButtonViolet1
          style={styles.materialButtonViolet1}
        ></MaterialButtonViolet1>
        <Text style={styles.camera}>Camera</Text>
      </View>
      <View style={styles.materialButtonPinkStack}>
        <MaterialButtonPink
          style={styles.materialButtonPink}
        ></MaterialButtonPink>
        <Text style={styles.signOut}>Sign-Out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  materialButtonViolet: {
    top: 0,
    left: 0,
    width: 375,
    height: 132,
    backgroundColor: "rgba(144,19,254,1)",
    position: "absolute"
  },
  products: {
    top: 32,
    left: 86,
    width: 201,
    height: 50,
    color: "#121212",
    position: "absolute",
    fontSize: 49,
    //fontFamily: "roboto-700"
  },
  materialButtonVioletStack: {
    width: 375,
    height: 132,
    marginTop: 275
  },
  materialButtonViolet1: {
    top: 0,
    left: 0,
    width: 410,
    height: 123,
    backgroundColor: "rgba(173,81,255,1)",
    position: "absolute"
  },
  camera: {
    top: 37,
    left: 99,
    color: "#121212",
    position: "absolute",
    fontSize: 50,
    //fontFamily: "roboto-700"
  },
  materialButtonViolet1Stack: {
    width: 410,
    height: 123
  },
  materialButtonPink: {
    top: 0,
    left: 0,
    width: 410,
    height: 150,
    backgroundColor: "rgba(198,131,255,1)",
    position: "absolute"
  },
  signOut: {
    top: 46,
    left: 97,
    color: "#121212",
    position: "absolute",
    fontSize: 45,
    //fontFamily: "roboto-700"
  },
  materialButtonPinkStack: {
    width: 375,
    height: 137
  }
});

export default Untitled;
