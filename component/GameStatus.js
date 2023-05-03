import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

function GameStatus({won,lost}) {
  return (
    <View style={styles.result}>
      <Text style={styles.text}>Won: {won}</Text>
      <Text style={styles.text}>Lost: {lost}</Text>
    </View>
  );
}

export default GameStatus;
const styles = StyleSheet.create({
  result: {
    // flex: 1,
    flexDirection: "row",
    textAlign: "center",
    backgroundColor: "yellow",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize:20
  },
});