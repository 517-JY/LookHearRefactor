import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// Icon Package: https://oblador.github.io/react-native-vector-icons/
import Icon from "react-native-vector-icons/AntDesign";
import "../assets/images/logo2.png";
import "../assets/images/logo.png";
import { firebase } from "../Firebase/firebase";

const SignUp = ({ navigation }) => {
  // State Variable
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = () => {
    navigation.navigate("Sign In");
    // TODO: Print for testing
    // console.log(firebase);
    // console.log(fullName);
    // console.log(emailAddress);
    // console.log(password);
    // console.log(confirmPassword);
  };

  const fullNameChange = (fullName) => {
    setFullName(fullName);
  };

  const emailAddressChange = (emailAddress) => {
    setEmailAddress(emailAddress);
  };

  const passwordChange = (password) => {
    setPassword(password);
  };

  const confirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  // Create User in firebase
  const createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.UpperView}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <ScrollView style={styles.BottomView}>
        <Icon
          style={styles.icon}
          name="arrowleft"
          size={35}
          color={"#4D4D3D"}
          onPress={() => navigate()}
        />
        <Text style={styles.BottomViewHeader}>Create Your Account</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder={"Full Name"}
            value={fullName}
            onChangeText={fullNameChange}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Email Address"}
            value={emailAddress}
            onChangeText={emailAddressChange}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Password"}
            secureTextEntry={true}
            value={password}
            onChangeText={passwordChange}
          />
          <TextInput
            style={styles.textInput}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={confirmPasswordChange}
          />
          <TouchableOpacity style={styles.button} onPress={createUser}>
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
  icon: {
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  BottomViewHeader: {
    fontSize: 34,
    color: "#F0F0EB",
    fontWeight: "600",
    marginTop: 5,
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
