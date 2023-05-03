import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import RandomNumber from "./RandomNumber";
import GameStatus from "./GameStatus";
function Game(props) {
  // 10+Math.floor(40*Math.random())
  const [selectNumber, setSelectNumber] = useState([]);
  const [randomNumbers, setrandomNumbers] = useState([]);
  const [timer, setTimer] = useState(-1);
  const [status, setStatus] = useState("playing");
  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);
  const [gameContinue, setContinue] = useState("null");
  const [randomNumberSet, setrandomNumbersSet] = useState(
    props.randomNumberSet
  );
  useEffect(() => {
    if (won === 5) {
      console.warn("in condition");
      setrandomNumbersSet((pre) => {
        return pre + 3;
      });
    }
    setrandomNumbers(
      Array.from({ length: randomNumberSet }).map(
        () => 1 + Math.floor(10 * Math.random())
      )
    );
    console.warn("randomNumbers:" + randomNumbers);
    if (gameContinue == "continue") {
      setSelectNumber([]);
      setTimer(props.timer);
      setStatus("playing");
    }
  }, [gameContinue]);

  useEffect(() => {
    if (timer == -1) setTimer(props.timer);
    let interval = setInterval(() => {
      setTimer((pre) => {
        return pre - 1;
      });
    }, 1000);
    if (status === "won") {
      setTimer(0);
      setWon((pre) => {
        return pre + 1;
      });
      clearInterval(interval);
      setContinue("null");
    }
    if (status === "lost") {
      setTimer(0);
      setLost((pre) => {
        return pre + 1;
      });
      clearInterval(interval);
      setContinue("null");
    }
    if (timer === 0) clearInterval(interval);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (selectNumber.length == 0) setStatus("playing");
    else {
      const status = gameStatus();
      setStatus(status);
    }
  }, [selectNumber]);

  // create target number
  const target = randomNumbers
    .slice(0, props.randomNumberSet - 2)
    .reduce((acc, crr) => acc + crr, 0);

  // set selected number in state
  const numberSelected = (numberIndex) => {
    setSelectNumber((pre) => {
      return [...pre, numberIndex];
    });
  };

  // check if given index number is selected
  const isNumberSelected = (numberindex) => {
    return selectNumber.indexOf(numberindex) >= 0;
  };

  // change color of target and return status
  const gameStatus = () => {
    const sum = selectNumber.reduce((acc, cur) => {
      return acc + randomNumbers[cur];
    }, 0);
    if (selectNumber.length == 0 && timer == 0) {
      return "lost";
    }
    if (sum < target) {
      return "playing";
    }
    if (sum === target) {
      return "won";
    }
    if (sum > target) {
      return "lost";
    }
  };

  return (
    <View style={styles.container}>
      <View style={[won<5?styles.gameConatiner:styles.expandGameConatiner, timer == 0 && styles.disable]}>
        <Text style={[styles.target, styles[`status_${status}`]]}>
          {target}
        </Text>
        <View style={styles.randomContainer}>
          {randomNumbers.map((random, index) => (
            <RandomNumber
              key={index}
              id={index}
              randomNumber={random}
              onPress={numberSelected}
              isDisabled={isNumberSelected(index)}
            />
          ))}
        </View>
      </View>
      <View style={styles.timeAndResult}>
        <Text style={styles.timer}>{timer}</Text>
        {gameStatus() !== "playing" && <GameStatus won={won} lost={lost} />}
        {timer == 0 && (
          <View style={styles.buttons}>
            <Button title="Play Again" onPress={props.playAgain}></Button>
            <Button
              title="continue"
              onPress={() => setContinue("continue")}
            ></Button>
          </View>
        )}
      </View>
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: "center",
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  random: {
    backgroundColor: "#999",
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: "center",
  },
  status_playing: {
    backgroundColor: "blue",
  },
  status_won: {
    backgroundColor: "green",
  },
  status_lost: {
    backgroundColor: "red",
  },
  result: {
    // flex: 1,
    flexDirection: "row",
    textAlign: "center",
    backgroundColor: "yellow",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
  },
  timer: {
    // backgroundColor: "#ddd",
    color: "white",
    borderRadius: 10,
    fontSize: 40,
    width: 100,
    textAlign: "center",
    marginLeft: 150,
    padding: 10,
    // margin: 40,
  },
  disable: {
    opacity: 0.5,
  },
  gameConatiner: {
    flex:1,
  },
  expandGameConatiner:{
    flex:2
  },
  timeAndResult: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "space-around",
  },
  buttons: {
    margin: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
