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
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { firebase } from "../Firebase/firebase";
import { onSnapshot, collection, query, where} from "firebase/firestore";
import { WebView } from 'react-native-webview';
import storage from '@react-native-firebase/storage';
import 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";

const Home = ({ navigation }) => {
  const [searchPart, setSearchPart] = useState("");
  const [feed, setFeed] = useState([]);
  const [temp, setTemp] = useState([]);

  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [sheetUrl, setSheetUrl] = useState(null);
  const [newName, setNewName] = useState('');
  const [id, setId] = useState(3);

  // Set manual feeds
  // FIXME: feeds manually created (link with DB)
  // Update has already linked to database, dummy data has already been stored in firebase, and the function works properly 
  useEffect(() => {
    // TODO: make sure that all properties in fetched data can work fine with all the frontend tags
    const db = firebase.firestore()
    var curInfoList = []
    async function fetchVideo(db) {
      await db.collection('videos').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          //need to retrieve every property of each doc, and make them as a whole object, so that we can make a list of object and set it as feed
          const curInfo = doc.data()
          curInfoList.push(curInfo)
        })
      })
      console.log(curInfoList)
      setTemp(curInfoList)
    }
    fetchVideo(db)
  }, []);

  const selectThumbnailImage = async (e) => {
    console.log("selectThumbnailImage")
    const file = e.target.files[0]
    var storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const ThumbnailUrl = await fileRef.getDownloadURL()
    setThumbnailUrl(ThumbnailUrl)
    console.log('thumbnailImage url: ', ThumbnailUrl)
  }

  const selectVideo = async (e) => {
    console.log("selectVideo")
    const file = e.target.files[0]
    var storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const VideoUrl = await fileRef.getDownloadURL()
    setVideoUrl(VideoUrl)
    console.log('video url: ', VideoUrl)
  }

  const selectSheetImage = async (e) => {
    console.log("selectSheetImage")
    const file = e.target.files[0]
    var storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const SheetUrl = await fileRef.getDownloadURL()
    setSheetUrl(SheetUrl)
    console.log('sheetImage url: ', SheetUrl)
  }

  const createNew = () => {
    const db = firebase.firestore()
    // await setDoc(doc(db, "videos", newName), {
    //   partName: newName,
    //   partThumbnail: thumbnailUrl,
    //   sheet: sheetUrl,
    //   url: videoUrl,
    // })
    console.log("ready to create")
    db.collection("videos").doc(newName).set({
      partId: id,
      partName: newName,
      partThumbnail: thumbnailUrl,
      sheet: sheetUrl,
      url: videoUrl,
    }).then(() => {
      console.log("a new doc has been created!")
    })
    .catch((error) => {
      console.log("Error writing new doc: ", error);
    });
    const newId = id + 1;
    setId(newId);
    //window.location.reload();
  }

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
        {temp.length < 1 ? (
          <ActivityIndicator size={"large"} color={"black"} />
        ) : (
          <FlatList
            //data={feed}
            data = {temp}
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
                        // BUG: 1.why require does not work for each item? 2.How to link with google drive(JSON)
                        source={{ uri: item.partThumbnail }}
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
      <View style={{alignItems: 'flex-start'}}>
        <View style={styles.upload}>
          <Text style={{fontSize: 20, marginRight: 10}}>Upload thumbnail image:</Text>
          <input type='file' onChange={selectThumbnailImage}/>
        </View>
        <View style={styles.upload}>
          <Text style={{fontSize: 20, marginRight: 10}}>Upload video:</Text>
          <input type='file' onChange={selectVideo}/>
        </View>
        <View style={styles.upload}>
          <Text style={{fontSize: 20, marginRight: 10}}>Upload sheet image:</Text>
          <input type='file' onChange={selectSheetImage}/>
        </View>
        <View style={styles.upload}>
          <Text style={{fontSize: 20}}>Give it a name: </Text>
          <TextInput style={{borderWidth: 1.0}} placeholder='Name it' onChangeText={text => setNewName(text)}></TextInput>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.upload1, {minWidth: 150, marginRight: 10}}>
            {/* {(thumbnailUrl != null && videoUrl != null && sheetUrl != null && newName != '') ?  */}
              <Button color='green' title='create new set' onPress={createNew}/> 
            {/* : null} */}
          </View>
          <View style={{marginTop: 4}}>
            {/* {(thumbnailUrl != null && videoUrl != null && sheetUrl != null && newName != '') ?  */}
              <Text style={{fontSize: 17}}>Please refresh this page after clicking this</Text> 
            {/* : null} */}
          </View>
        </View>
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
  upload: {
    flexDirection: 'row', 
    marginBottom: 15
  },
  upload1: {
    flexDirection: 'column',
    marginBottom: 10,
  }
});

export default Home;
