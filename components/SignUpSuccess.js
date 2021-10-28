import React from "react";
import { Text, View, ActivityIndicator, StyleSheet, Image } from "react-native";
import { Overlay } from "react-native-elements";

const SignUpSuccess = ({ successMessage, hideSignUpSuccess }) => {
  return (
    <View>
      <Overlay isVisible={true} onBackdropPress={() => isVisible(false)}>
        <View style={styles.overlay}>
          <ActivityIndicator size={"large"} color="#90CBFB" />
          <Image style={styles.icon} source={require("../assets/check.png")} />
          <Text style={styles.message}>{successMessage}</Text>
        </View>
      </Overlay>
    </View>
  );

  // <Overlay isVisible={true}>
  //   <Text>Hello from Overlay!</Text>
  // </Overlay>
};

export default SignUpSuccess;

const styles = StyleSheet.create({
  overlay: {
    width: 320,
    height: 320,
    backgroundColor: "#e8e8db",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
  },
  icon: {
    width: 80,
    height: 80,
  },
  message: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
});
