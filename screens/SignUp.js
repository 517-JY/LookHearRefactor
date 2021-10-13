import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import "../assets/images/logo2.png";
import "../assets/images/logo.png";

const SignUp = (navigation) => {
  return (
    <View style={styles.container}>
      <View style={styles.UpperView}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <ScrollView style={styles.BottomView}>
        <Text style={styles.BottomViewHeader}>Create Your Account</Text>
        <View style={styles.form}>
          <TextInput style={styles.textInput} placeholder={"Full Name"} />
          <TextInput style={styles.textInput} placeholder={"Email Address"} />
          <TextInput
            style={styles.textInput}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  UpperView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
    backgroundColor: "#e8e8db",
  },
  image: {
    width: "65%",
    resizeMode: "contain",
  },
  BottomView: {
    width: "100%",
    height: "75%",
    backgroundColor: "#a7a79d",

    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
  },
  BottomViewHeader: {
    fontSize: 34,
    color: "#F0F0EB",
    fontWeight: "600",
    marginTop: 45,
    marginLeft: 40,
  },
  form: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  textInput: {
    marginBottom: 20,
    width: "80%",
    borderWidth: 3,
    borderColor: "#4D4D3D",
    borderRadius: 30,
    height: 50,
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
  },
  button: {
    width: "80%",
    color: "#fff",
    backgroundColor: "#e8e8db",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  signupTextButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#506AD4",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 15,
  },
});

export default SignUp;
