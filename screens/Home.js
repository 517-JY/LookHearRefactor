import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const Home = ({ navigation }) => {
  // const customData = require("../data.json");
  const customData = [
    {
      partId: 1,
      partName: "Altus",
      partThumbnail: 'require("../assets/images/altusThumbnail.png")',
      partImage: 'require("../assets/images/altus.jpg")',
      partVideo_url: 'require("../assets/videos/Altus.mp4")',
    },
    {
      partId: 2,
      partName: "Cantus",
      partThumbnail: 'require("../assets/images/cantusThumbnail.png")',
      partImage: 'require("../assets/images/cantus.jpg")',
      partVideo_url: 'require("../assets/videos/Cantus.mp4")',
    },
    {
      partId: 3,
      partName: "Bassus",
      partThumbnail: 'require("../assets/images/bassusThumbnail.png")',
      partImage: 'require("../assets/images/bassus.jpg")',
      partVideo_url: 'require("../assets/videos/Bassus.mp4")',
    },
  ];
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
                <View style={styles.partNameOuter}>
                  <View style={styles.imageView}>
                    <TouchableOpacity
                      style={styles.thumbnailButton}
                      onPress={() =>
                        navigation.navigate("Player", { data: item })
                      }
                    >
                      <Image
                        style={styles.partThumbnail}
                        source={require("../assets/images/altusThumbnail.png")}
                        // BUG: 1.why require does not work for each item? 2.How to link with google drive(JSON)
                        // source={item.partThumbnail}
                        // source={{ uri: item.partThumbnail }}
                      />
                    </TouchableOpacity>

                    <Text style={styles.partName}>{item.partName}</Text>
                  </View>

                  <Icon style={styles.optionsIcon} name="options-vertical" />
                </View>
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
    width: "100%",
  },
  partConent: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  partNameOuter: {
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  partThumbnail: {
    backgroundColor: "rgba(0,0,0,0.06)",
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  imageView: {
    flexDirection: "row",
  },
  partName: {
    fontSize: 21,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingVertical: 32,
    color: "#58555A",
    alignItems: "center",
  },
  optionsIcon: {
    paddingVertical: 36,
    color: "#58555A",
    alignItems: "center",
  },
  thumbnailButton: {
    backgroundColor: "#e8e8db",
    width: 80,
    height: 80,
  },
});

export default Home;
