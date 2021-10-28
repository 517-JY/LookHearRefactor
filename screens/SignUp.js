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

import SignUpSuccess from "../components/SignUpSuccess";
import SignUpError from "../components/SignUpError";

const SignUp = ({ navigation }) => {
  // State Variable
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const [displaySignUpError, setDisplaySignUpError] = useState(false);

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
    setIsLoading(true);
    // Use email and password to create a new user
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        setIsLoading(false);
        setSignUpSuccessMessage("Your account has been created successfully!");
      })
      .catch((error) => {
        // Say if a user creates an account that already exists
        setIsLoading(false);
        console.log(error);
        setSignUpErrorMessage(error.message);
        setDisplaySignUpError(true);
      });
  };

  // Check whether user sign up info is valid
  const validateUserInput = () => {
    let userInputs = [fullName, emailAddress, password, confirmPassword];
    // passwords should match
    let isPasswordMatch = password === confirmPassword;
    // User pass in empty string
    if (userInputs.includes("") || userInputs.includes(undefined)) {
      // TODO: Print for user input testing
      console.log(userInputs);
      setSignUpErrorMessage("Please fill in all fields.");
      setDisplaySignUpError(true);
      return;
    }
    if (isPasswordMatch) {
      createUser();
    } else {
      // TODO: Print for password testing
      console.log(userInputs);
      console.log("Passwords are inconsistent!");
      setSignUpErrorMessage("Passwords are inconsistent.");
      setDisplaySignUpError(true);
    }
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
          <TouchableOpacity style={styles.button} onPress={validateUserInput}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {displaySignUpError === true ? (
        <SignUpError
          hideSignUpError={setDisplaySignUpError}
          errorMessage={signUpErrorMessage}
        />
      ) : null}

      {isLoading === true ? (
        <SignUpSuccess />
      ) : signUpSuccessMessage ===
        "Your account has been created successfully!" ? (
        <SignUpSuccess
          successMessage={signUpSuccessMessage}
          hideSignUpSuccess={setSignUpSuccessMessage("")}
        />
      ) : null}
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
    height: "17%",
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
