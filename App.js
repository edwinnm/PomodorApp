import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import Header from "./src/components/Header";
import Timmer from "./src/components/Timmer";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      //run timmer
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      // clear interval
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      const timeReset = currentTime === 0 ? 25 : currentTime === 1 ? 5 : 15;
      setTime(timeReset * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    setIsActive(!isActive);
    playSound();
  }
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 20,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timmer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
