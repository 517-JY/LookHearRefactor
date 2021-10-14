import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Image,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const screen = Dimensions.get("screen");

const Player = ({ navigation, route }) => {
  useEffect(() => {
    let playPart = route.params.data;
    // TODO : print for testing
    console.log(screen);
    console.log(screen.width, screen.height);
    console.log(playPart);
    console.log(playPart.partVideo_url);
  });

  // const { screenWidth, screenHeight } = Dimensions.get("screen");

  const [partData, setPartData] = useState(route.params.data);
  const video = React.useRef(null);
  const [videoStatus, setVideoStatus] = React.useState({});

  return (
    <View style={styles.main}>
      <View
        style={{
          height: screen.height / 3,
          width: "100%",
          backgroundColor: "#a7a79d",
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          // BUG: same problem with source
          source={require("../assets/videos/Altus.mp4")}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(videoStatus) =>
            setVideoStatus(() => videoStatus)
          }
        />
        <View style={styles.buttons}>
          {/* <Button
            title={videoStatus.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              videoStatus.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          /> */}
        </View>
      </View>
      <Text style={styles.partName}>{partData.partName}</Text>
      <View
        style={{
          height: (2 * screen.height) / 3,
          width: "100%",
        }}
      >
        <Image
          style={styles.note}
          source={require("../assets/images/altus.jpg")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#e8e8db",
  },
  partName: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
    color: "#58555A",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    // marginTop: 40,
  },
  note: {
    width: "100%",
    height: "100%",
  },
});

export default Player;
