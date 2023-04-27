import { StyleSheet, Text, View } from "react-native";
import Game from "./component/Game";
import React, { useState, useRef } from "react";
export default function App() {
  const [playCount, setplayCount] = useState(0);
   const won = useRef(-1);
   const lost = useRef(0);
  const playAgain = () => {
    // console.warn("playagain")
    setplayCount((pre) => {
      return pre + 1;
    });
  };
  return (
    <View style={styles.container}>
      <Game
        key={playCount}
        won={won}
        lost={lost}
        randomNumberSet={6}
        timer={10}
        playAgain={playAgain}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
