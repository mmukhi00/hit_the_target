import { StyleSheet, Text, View } from "react-native";
import Game from "./component/Game";
import React, { useState, useRef } from "react";
export default function App() {
  const [playCount, setplayCount] = useState(0);
  const [won, setWon] = useState(0);
  const gameStatusRef = useRef();
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
        randomNumberSet={6}
        timer={10}
        playAgain={playAgain}
        gameStatusRef={gameStatusRef}
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
