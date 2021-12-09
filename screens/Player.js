import React, {
  useState,
  useEffect,
  Component,
  useRef,
  useCallback,
} from "react";
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

const Player = ({ navigation, route }) => {
  useEffect(() => {
    let playPart = route.params.data;
    // TODO : print for testing
    console.log("***********************************");
    console.log(screen);
    console.log(screen.width, screen.height);
    console.log(playPart);
    console.log(playPart.partVideo_url);
  });

  // const { screenWidth, screenHeight } = Dimensions.get("screen");

  // TODO: Set speed factor only for testing purpose
  const speed = 10;

  const [partData, setPartData] = useState(route.params.data);
  const video = React.useRef(null);
  const [videoStatus, setVideoStatus] = React.useState({});
  const [isAnimated, setIsAnimated] = useState(false);
  const [yCoord, setYCoord] = useState(0.2 * 0.08742304309586632);

  // From Zhiwei

  // Animation Coords
  const Lag = [
    { start: 0, end: 1061, x: 0.3016710642040457, y: yCoord },
    {
      start: 27427,
      end: 28453,
      x: 0.09586631486367635,
      y: (0.08742304309586632 + 0.052594547053649965) * 0.75,
    },
    {
      start: 50193,
      end: 50707,
      x: 0.09410729991204925,
      y: (0.08742304309586632 + 0.18856640281442394 * 0.9) * 0.75,
    },
  ];
  //
  const Mov = [
    { start: 1061, end: 27427, x: 0.8865435356200527, y: yCoord },
    {
      start: 28453,
      end: 50193,
      x: 0.8962181178540017,
      y: (0.08742304309586632 + 0.052594547053649965) * 0.75,
    },
    {
      start: 50707,
      end: 68876,
      x: 0.8944591029023746,
      y: (0.08742304309586632 + 0.18856640281442394 * 0.9) * 0.75,
    },
  ];

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

  const moveBar = () => {
    // Animated.timing(position, {
    //   toValue: {
    //     x: 0.8865435356200527 * screen.width,
    //     y: ((3 * screen.height) / 4) * 0.02,
    //   },

    //   // FIXME : Duration not correct just for testing
    //   duration: (27427 - 1061) / 5,
    //   useNativeDriver: true,
    // }).start(({ finished }) => {
    //   if (finished) {
    //     // Do something?
    //   }
    // });

    // TODO: Animation Sequence

    if (videoStatus.isPlaying) {
      Animated.sequence([
        // First Line

        Animated.stagger((Lag[0].end - Lag[0].start) / speed, [
          Animated.timing(position, {
            toValue: {
              x: Lag[0].x * screen.width,
              y: ((3 * screen.height) / 4) * Lag[0].y,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: Mov[0].x * screen.width,
              y: ((3 * screen.height) / 4) * Mov[0].y,
            },
            duration: (Mov[0].end - Mov[0].start) / speed,
            useNativeDriver: true,
          }),

          // Animated.timing(position, {
          //   toValue: {
          //     x: Lag[0].x * screen.width,
          //     y: ((3 * screen.height) / 4) * Lag[0].y,
          //   },
          //   duration: 0,
          //   useNativeDriver: true,
          // }),

          // Animated.timing(position, {
          //   toValue: {
          //     x: Mov[0].x * screen.width,
          //     y: ((3 * screen.height) / 4) * Mov[0].y,
          //   },
          //   duration: (Mov[0].end - Mov[0].start) / speed,
          //   useNativeDriver: true,
          // }),
        ]),
        // Second Line
        Animated.stagger((Lag[1].end - Lag[1].start) / speed, [
          Animated.timing(position, {
            toValue: {
              x: Lag[1].x * screen.width,
              y: ((3 * screen.height) / 4) * Lag[1].y,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: Mov[1].x * screen.width,
              y: ((3 * screen.height) / 4) * Mov[1].y,
            },
            duration: (Mov[1].end - Mov[1].start) / speed,
            useNativeDriver: true,
          }),
        ]),

        // Third Line
        Animated.stagger((Lag[2].end - Lag[2].start) / speed, [
          Animated.timing(position, {
            toValue: {
              x: Lag[2].x * screen.width,
              y: ((3 * screen.height) / 4) * Lag[2].y,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: Mov[2].x * screen.width,
              y: ((3 * screen.height) / 4) * Mov[2].y,
            },
            duration: (Mov[2].end - Mov[2].start) / speed,
            useNativeDriver: true,
          }),
        ]),

        // Fourth Line
        Animated.stagger((69822 - 68876) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.0932277924362357 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.32242744063324535 * 0.9) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.8944591029023746 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.32242744063324535 * 0.9) *
                0.75,
            },
            duration: (84821 - 69822) / speed,
            useNativeDriver: true,
          }),
        ]),

        // Fifth Line
        Animated.stagger((85328 - 84821) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.08970976253298153 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.4580474934036939 * 0.85) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.8944591029023746 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.4580474934036939 * 0.85) *
                0.75,
            },
            duration: (102950 - 85328) / speed,
            useNativeDriver: true,
          }),
        ]),

        // Sixth Line
        Animated.stagger((103401 - 102950) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.09234828496042216 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.6028144239226032 * 0.85) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.8803869832893579 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.6028144239226032 * 0.85) *
                0.75,
            },
            duration: (129593 - 103401) / speed,
            useNativeDriver: true,
          }),
        ]),

        // 7th Line
        Animated.stagger((130504 - 129593) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.09058927000879508 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.7361477572559365 * 0.85) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.8768689533861038 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.7361477572559365 * 0.85) *
                0.75,
            },
            duration: (162951 - 130504) / speed,
            useNativeDriver: true,
          }),
        ]),

        // 8th Line
        Animated.stagger((163444 - 162951) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.08619173262972735 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.872999120492524 * 0.85) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.8918205804749341 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 0.872999120492524 * 0.85) *
                0.75,
            },
            duration: (185880 - 163444) / speed,
            useNativeDriver: true,
          }),
        ]),

        // 9th Line
        Animated.stagger((186113 - 185880) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.08267370272647317 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 1.0107299912049252 * 0.84) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.8654353562005277 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 1.0107299912049252 * 0.84) *
                0.75,
            },
            duration: (200236 - 186113) / speed,
            useNativeDriver: true,
          }),
        ]),

        // 10th Line
        Animated.stagger((201260 - 200236) / speed, [
          Animated.timing(position, {
            toValue: {
              x: 0.1090589270008795 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 1.1472295514511874 * 0.84) *
                0.75,
            },
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(position, {
            toValue: {
              x: 0.7854001759014951 * screen.width,
              y:
                ((3 * screen.height) / 4) *
                (0.08742304309586632 + 1.1472295514511874 * 0.84) *
                0.75,
            },
            duration: (227155 - 201260) / speed,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  };

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
          //source={{uri: 'https://www.youtube.com/watch?v=RYNVZqpytHM'}}
          // source={{uri: 'https://firebasestorage.googleapis.com/v0/b/lookhearrefactor.appspot.com/o/Cantus.mp4?alt=media&token=d9f3ba13-66fe-43ad-9be2-35249b4dbf56'}}
          source={{ uri: partData.url }}
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
        <View style={(styles.buttons, { position: "fixed", zIndex: 999 })}>
          <Button
            title={videoStatus.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              videoStatus.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
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
          source={{ uri: partData.sheet }}
          resizeMode="center"
          style={styles.note}
        >
          <Animated.View style={[styles.bar, styles.movebar]}></Animated.View>
          {/* <Animated.View
            style={[
              {
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.bar}></View>
          </Animated.View> */}
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
