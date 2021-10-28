import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

const SignUpError = ({ hideSignUpError, errorMessage }) => {
  return (
    <Overlay isVisible={true} onBackdropPress={() => hideSignUpError(false)}>
      <View style={styles.overlay}>
        <Image style={styles.icon} source={require("../assets/alert.png")} />
        <Text style={styles.message}>{errorMessage}</Text>
      </View>
    </Overlay>
  );
};

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

export default SignUpError;
