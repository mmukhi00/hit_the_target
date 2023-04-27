import React, { Component, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text,Button } from "react-native";
import RandomNumber from "./RandomNumber";
function Game(props) {
  // 10+Math.floor(40*Math.random())
  const [selectNumber, setSelectNumber] = useState([]);
  const [randomNumbers, setrandomNumbers] = useState([]);
  const [timer, setTimer] = useState(-1);
  const[played,setPlayed]=useState(false);
 
  useEffect(() => {
    setrandomNumbers(
      Array.from({ length: props.randomNumberSet }).map(
        () => 1 + Math.floor(10 * Math.random())
      )
    );
  }, []);
  useEffect(() => {
    if (timer == -1) setTimer(props.timer);
    let interval = setInterval(() => {
      setTimer((pre) => {
        return pre - 1;
      });
    }, 1000);
    if (timer === 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [timer]);

  const target = randomNumbers
    .slice(0, props.randomNumberSet - 2)
    .reduce((acc, crr) => acc + crr, 0);
  const numberSelected = (numberIndex) => {
    setSelectNumber((pre) => {
      return [...pre, numberIndex];
    });
  };

  const isNumberSelected = (numberindex) => {
    return selectNumber.indexOf(numberindex) >= 0;
  };

  const gameStatus = () => {
    const sum = selectNumber.reduce((acc, cur) => {
      // console.warn("cur:" + cur);
      // console.warn("acc: " + acc);
      return acc + randomNumbers[cur];
    }, 0);
    if (selectNumber.length==0&&timer == 0) {
      return "lost";
    }
    if (sum === target) {
      props.won.current=props.won.current+1;
      console.warn(props.won.current);
      return "won";
    }
    if (sum > target) {
      return "lost";
    }
    if (sum < target) {
      return "playing";
    }
  };

  // const result=()=>{
  //   gameStatus()
  // }
  
  return (
    <View style={styles.container}>
      <View style={[styles.gameConatiner, timer == 0 && styles.disable]}>
        <Text style={[styles.target, styles[`status_${gameStatus()}`]]}>
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
        <View style={styles.result}>
          <Text>Lost</Text>
          <Text>Won {props.won.current}</Text>
        </View>
        {timer == 0 && (
          <Button title="Play Again" onPress={props.playAgain}></Button>
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
    // backgroundColor: "yellow",
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
    height:100
  },
  timer: {
    backgroundColor: "#ddd",
    borderColor: "black",
    borderStyle: "dashed",
    borderRadius: 10,
    fontSize: 30,
    width: 100,
    textAlign: "center",
    marginLeft: 150,
    // marginBottom: 250,
    padding: 10,
    margin: 40,
    // flex:1
  },
  disable: {
    opacity: 0.5,
  },
  gameConatiner: {
    flex: 1,
    backgroundColor: "#333",
    height:20
  },
  timeAndResult: {
    flex:1,
    backgroundColor: "#333",
    // alignItems:"center"
    justifyContent:"space-around"
  },
});
