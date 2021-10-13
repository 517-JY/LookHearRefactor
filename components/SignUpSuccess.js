import React from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";

const SignUpSuccess = () => {
  return (
    <Overlay isVisible={true}>
      <Text>Hello from Overlay!</Text>
    </Overlay>
  );
};

export default SignUpSuccess;
