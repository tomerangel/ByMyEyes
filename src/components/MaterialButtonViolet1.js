import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function MaterialButtonViolet1(props) {
  signOuUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("SignOut"))
      .catch(error => {
        alert(error.message)
      })
  }
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={()=>{
        this.signOuUser()
      }}
    ></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
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
  }
});

export default MaterialButtonViolet1;
