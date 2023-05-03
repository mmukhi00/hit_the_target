import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function RandomNumber(props) {
 const onHandlePress=()=>{
 if(props.isDisabled)
 {
  return;
 }
 props.onPress(props.id);
 }
 
  return (
    <TouchableOpacity onPress={onHandlePress}>
      <View>
        <Text style={[styles.random, props.isDisabled && styles.disabled]}>
          {props.randomNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default RandomNumber;
const styles = StyleSheet.create({
  random: {
    backgroundColor: "grey",
    borderRadius:10,
    // borderColor:"pink",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
  },
  disabled:{
   opacity:0.3
  }
});
