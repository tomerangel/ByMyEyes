import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonPink from "../components/MaterialButtonPink";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <View style={styles.materialButtonVioletStack}>
        <MaterialButtonViolet
          style={styles.materialButtonViolet}
        ></MaterialButtonViolet>
        <MaterialButtonPink
          style={styles.materialButtonPink}
        ></MaterialButtonPink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialButtonViolet: {
    top: 0,
    left: 0,
    width: 360,
    height: 131,
    position: "absolute"
  },
  materialButtonPink: {
    top: 130,
    left: 0,
    width: 360,
    height: 124,
    position: "absolute"
  },
  materialButtonVioletStack: {
    width: 360,
    height: 254,
    marginTop: 386
  }
});

export default Untitled;
