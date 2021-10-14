import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";

const Home = () => {
  const customData = require("../data.json");
  const [searchPart, setSearchPart] = useState("");
  const [feed, setFeed] = useState([]);

  // Set manual feeds
  // FIXME: feeds manually created (link with DB)
  useEffect(() => {
    // TODO: print for testing
    // console.log(customData);
    setFeed(customData);
  }, []);

  return (
    <View style={styles.mainView}>
      {/* // FIXME: piece name hard code */}
      <Text style={styles.header}>zirlerMotet</Text>

      <TextInput
        style={styles.textInput}
        placeholder={"Search your part"}
        value={searchPart}
      />
      <View style={styles.partsContent}>
        {feed.length < 1 ? (
          <ActivityIndicator size={"large"} color={"black"} />
        ) : (
          <FlatList
            data={feed}
            keyExtractor={(item, index) => {
              return item.partId.toString();
            }}
            renderItem={({ item, index }) => (
              <View style={styles.partConent}>
                <Text>{item.partName}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#e8e8db",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginRight: 180,
    marginTop: 50,
  },
  textInput: {
    marginBottom: 25,
    width: "85%",
    borderWidth: 3,
    borderColor: "#4D4D3D",
    borderRadius: 30,
    height: 40,
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
  },
  partsContent: {
    width: "90%",
  },
  partConent: {
    width: "100%",
    marginBottom: 20,
  },
});

export default Home;
