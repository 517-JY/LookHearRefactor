import React, { useState, useEffect, Component, useRef, useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";


const screen = Dimensions.get("screen");

// FIXME: ugly hard code needs to be replaced
// Data from aluts.js
const position = new Animated.ValueXY({
  x: 0.3016710642040457 * screen.width,
  y: ((3 * screen.height) / 4) * 0.02,
});

// const position = React.useRef(
//   new Animated.ValueXY({
//     x: 0.3016710642040457 * screen.width,
//     y: ((3 * screen.height) / 4) * 0.02,
//   }).current
// );

function moveBar() {
  Animated.timing(position, {
    toValue: {
      x: 0.8865435356200527 * screen.width,
      y: ((3 * screen.height) / 4) * 0.02,
    },

    // FIXME : Duration not correct just for testing
    duration: (27427 - 1061) / 5,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished) {
      // Do something?
    }
  });
}

const Player = ({ navigation, route }) => {
  useEffect(() => {
    let playPart = route.params.data;
    // TODO : print for testing
    console.log("***********************************")
    console.log(screen);
    console.log(screen.width, screen.height);
    console.log(playPart);
    console.log(playPart.partVideo_url);
  });

  // const { screenWidth, screenHeight } = Dimensions.get("screen");

  const [partData, setPartData] = useState(route.params.data);
  const video = React.useRef(null);
  const [videoStatus, setVideoStatus] = React.useState({});
  const [isAnimated, setIsAnimated] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  )[0];

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View style={styles.main}>
      <View
        style={{
          height: screen.height / 4,
          width: "100%",
          backgroundColor: "#a7a79d",
        }}
      >
        <Video
          ref={video}
          style={styles.video}
          // BUG: same problem with source
          //source={require("../assets/videos/Altus.mp4")}
          source={{uri: 'https://www.youtube.com/watch?v=RYNVZqpytHM'}}
          //source={{uri: partData.url}}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(videoStatus) =>
            setVideoStatus(() => videoStatus)
          }
        />
        {/* <WebView
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction
          source={{ uri: 'https://www.youtube.com/watch?v=RYNVZqpytHM' }} 
        /> */}
        {/* <YoutubePlayer
          style={styles.video}
          //height={300}
          play={playing}
          videoId={"RYNVZqpytHM"}
          onChangeState={onStateChange}
        /> */}
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
      {/* <Text style={styles.partName}>{partData.partName}</Text> */}
      <TouchableOpacity onPress={moveBar}>
        <Text>Click me to move the ball</Text>
      </TouchableOpacity>
      <View
        style={{
          height: (3 * screen.height) / 4,
          width: "100%",
        }}
      >
        <ImageBackground
          //source={require("../assets/images/altus.jpg")}
          source={{uri: partData.sheet}}
          resizeMode="center"
          style={styles.note}
        >
          <Animated.View style={[styles.bar, styles.movebar]}></Animated.View>
          <Animated.View
            style={[
              {
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.bar}></View>
          </Animated.View>
        </ImageBackground>
        {/* <Image
          style={styles.note}
          source={require("../assets/images/altus.jpg")}
        /> */}
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
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: 10,
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
    height: "95%",
  },
  bar: {
    height: 55,
    width: 10,
    backgroundColor: "rgba(20,0,250,0.25)",
  },
  movebar: {
    transform: [{ translateX: position.x }, { translateY: position.y }],
  },
});

export default Player;
