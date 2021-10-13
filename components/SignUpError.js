import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

const SignUpError = ({ hideSignUpError }) => {
  return (
    <Overlay
      style={styles.overlay}
      isVisible={true}
      onBackdropPress={() => hideSignUpError(false)}
    >
      <Text>Invalid User Input</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: "60%",
    height: "40%",
  },
});

export default SignUpError;
