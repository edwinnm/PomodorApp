import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ currentTime, setCurrentTime, setTime }) {
  const options = ["Pomodoro", "Short Break", "Long Break"];

  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.optionStyle,
            currentTime !== index && { borderColor: "transparent" },
          ]}
        >
          <Text style={{fontWeight: "bold"}}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionStyle: {
    width: "33%",
    borderWidth: 3,
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: 20,
  },
});
