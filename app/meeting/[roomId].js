// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// // import { CameraView, useCameraPermissions } from "expo-camera";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//     Dimensions,
//     FlatList,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RTCView } from "react-native-webrtc";
// import { startMeeting, stopMeeting } from "../../components/webrtc";

// const { width, height } = Dimensions.get("window");

// export default function MeetingScreen() {
//   const { roomId } = useLocalSearchParams();
//   const [streams, setStreams] = useState({});
//   const router = useRouter();

//   //   const cameraRef = useRef(null);
//   //   const [type, setType] = useState("front");
//   const [isMuted, setIsMuted] = useState(false);
//   const [videoOff, setVideoOff] = useState(false);
//   const [seconds, setSeconds] = useState(0);
//   //   const [permission, requestPermission] = useCameraPermissions();

//   //   useEffect(() => {
//   //     startMeeting(roomId, true, (id, stream) => {
//   //       setStreams((prev) => ({
//   //         ...prev,
//   //         [id]: stream,
//   //       }));
//   //     });

//   //     return () => stopMeeting();
//   //   }, []);
//   useEffect(() => {
//     startMeeting(roomId, true, (id, stream) => {
//       setStreams((prev) => ({
//         ...prev,
//         [id]: stream,
//       }));
//     }).then((localStream) => {
//       setStreams((prev) => ({
//         ...prev,
//         local: localStream,
//       }));
//     });

//     return () => stopMeeting();
//   }, []);

//   // Timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prev) => prev + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = () => {
//     const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
//     const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
//     const secs = String(seconds % 60).padStart(2, "0");
//     return `${hrs} : ${mins} : ${secs}`;
//   };

//   const leaveMeeting = () => {
//     stopMeeting();
//     router.replace("/");
//   };

//   //   if (!permission) return <View />;

//   //   if (!permission.granted) {
//   //     return (
//   //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//   //         <Text style={{ color: "white" }}>Camera permission required</Text>
//   //         <TouchableOpacity onPress={requestPermission}>
//   //           <Text style={{ color: "#E9164B", marginTop: 10 }}>
//   //             Grant Permission
//   //           </Text>
//   //         </TouchableOpacity>
//   //       </View>
//   //     );
//   //   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={leaveMeeting}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>

//         <View>
//           <Text style={styles.meetingTitle}>Meeting Time</Text>
//           <Text style={styles.timer}>{formatTime()}</Text>
//         </View>

//         <Ionicons name="tv-outline" size={22} color="white" />
//         <Text style={styles.roomText}>Room: {roomId}</Text>
//       </View>

//       <FlatList
//         data={Object.keys(streams)}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <RTCView
//             streamURL={streams[item].toURL()}
//             style={styles.video}
//             objectFit="cover"
//           />
//         )}
//       />

//       <TouchableOpacity style={styles.endButton} onPress={stopMeeting}>
//         <Text style={styles.endText}>End Meeting</Text>
//       </TouchableOpacity>

//       {/* Camera */}
//       {/* {!videoOff && <CameraView style={styles.camera} facing={type} />} */}

//       {/* Right Controls */}
//       <View style={styles.rightControls}>
//         <TouchableOpacity
//           style={styles.circleBtn}
//           onPress={() => setType(type === "front" ? "back" : "front")}
//         >
//           <Ionicons name="camera-reverse" size={22} color="#070722" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.circleBtn}
//           onPress={() => setIsMuted(!isMuted)}
//         >
//           <Ionicons
//             name={isMuted ? "mic-off" : "mic"}
//             size={22}
//             color="#070722"
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.circleBtn}
//           onPress={() => setVideoOff(!videoOff)}
//         >
//           <Ionicons
//             name={videoOff ? "videocam-off" : "videocam"}
//             size={22}
//             color="#070722"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Controls */}
//       <View style={styles.bottomBar}>
//         <TouchableOpacity>
//           <MaterialIcons name="chat" size={24} color="white" />
//           <Text style={styles.bottomText}>Chat</Text>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <MaterialIcons name="fiber-manual-record" size={24} color="white" />
//           <Text style={styles.bottomText}>Record</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.endCallBtn} onPress={leaveMeeting}>
//           <Ionicons name="call" size={28} color="white" />
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Ionicons name="happy-outline" size={24} color="white" />
//           <Text style={styles.bottomText}>Reaction</Text>
//         </TouchableOpacity>

//         <TouchableOpacity>
//           <Ionicons name="ellipsis-horizontal" size={24} color="white" />
//           <Text style={styles.bottomText}>More</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#070722",
//   },

//   topBar: {
//     position: "absolute",
//     top: 10,
//     width: "100%",
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     zIndex: 10,
//   },
//   roomText: {
//     color: "#E9164B",
//     fontSize: 18,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   video: {
//     width: "100%",
//     height: 250,
//     backgroundColor: "#000",
//     marginBottom: 10,
//   },
//   endButton: {
//     backgroundColor: "#E9164B",
//     padding: 15,
//     margin: 20,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   endText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },

//   meetingTitle: {
//     color: "white",
//     fontSize: 14,
//     textAlign: "center",
//   },

//   timer: {
//     color: "#E9164B",
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   camera: {
//     flex: 1,
//   },

//   previewBox: {
//     position: "absolute",
//     top: 120,
//     right: 20,
//     width: 100,
//     height: 140,
//     borderRadius: 16,
//     overflow: "hidden",
//   },

//   rightControls: {
//     position: "absolute",
//     right: 20,
//     top: "35%",
//     gap: 15,
//   },

//   circleBtn: {
//     width: 50,
//     height: 50,
//     backgroundColor: "white",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   bottomBar: {
//     position: "absolute",
//     bottom: 20,
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },

//   bottomText: {
//     color: "white",
//     fontSize: 10,
//     textAlign: "center",
//     marginTop: 2,
//   },

//   endCallBtn: {
//     backgroundColor: "#E9164B",
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RTCView } from "react-native-webrtc";
import VideoSphereView from "../../components/VideoSphere";
import { startMeeting, stopMeeting } from "../../components/webrtc";

const { width, height } = Dimensions.get("window");

export default function MeetingScreen() {
  const { roomId } = useLocalSearchParams();
  const [streams, setStreams] = useState({});
  const [activeStreamId, setActiveStreamId] = useState("local");
  const [isMuted, setIsMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const router = useRouter();

  // Gyroscope for head tracking in 360 view
  useEffect(() => {
    const subscription = Gyroscope.addListener((gyroscopeData) => {
      // Update sphere rotation based on device orientation
      setRotation((prev) => ({
        x: prev.x + gyroscopeData.x * 0.01,
        y: prev.y + gyroscopeData.y * 0.01,
        z: prev.z + gyroscopeData.z * 0.01,
      }));
    });

    Gyroscope.setUpdateInterval(100);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const initMeeting = async () => {
      try {
        const localStream = await startMeeting(
          roomId,
          true,
          (id, stream, isHost) => {
            setStreams((prev) => ({
              ...prev,
              [id]: { stream, isHost },
            }));
          },
        );

        setStreams((prev) => ({
          ...prev,
          local: { stream: localStream, isHost: true },
        }));
      } catch (error) {
        Alert.alert("Error", "Failed to start meeting: " + error.message);
        router.back();
      }
    };

    initMeeting();

    return () => stopMeeting();
  }, [roomId]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const leaveMeeting = () => {
    stopMeeting();
    router.replace("/");
  };

  const toggleMute = () => {
    if (streams.local?.stream) {
      streams.local.stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streams.local?.stream) {
      streams.local.stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setVideoOff(!videoOff);
    }
  };

  return (
    <View style={styles.container}>
      {/* 360° Video Sphere for active stream */}
      {activeStreamId && streams[activeStreamId] && (
        <VideoSphereView
          stream={streams[activeStreamId].stream}
          rotation={rotation}
        />
      )}

      {/* Top Bar */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity onPress={leaveMeeting} style={styles.topButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.meetingInfo}>
          <Text style={styles.meetingTitle}>360° Meeting</Text>
          <Text style={styles.timer}>{formatTime()}</Text>
        </View>

        <TouchableOpacity style={styles.topButton}>
          <Ionicons name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Room ID Badge */}
      <View style={styles.roomBadge}>
        <Text style={styles.roomText}>Room: {roomId}</Text>
      </View>

      {/* Participant Thumbnails at Bottom */}
      <View style={styles.thumbnailContainer}>
        <FlatList
          data={Object.keys(streams)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveStreamId(item)}
              style={[
                styles.thumbnailWrapper,
                activeStreamId === item && styles.activeThumbnail,
              ]}
            >
              <RTCView
                streamURL={streams[item].stream.toURL()}
                style={styles.thumbnail}
                objectFit="cover"
              />
              <View style={styles.thumbnailBadge}>
                <Text style={styles.thumbnailText}>
                  {item === "local" ? "You" : `User ${item.slice(0, 4)}`}
                </Text>
                {streams[item].isHost && (
                  <Ionicons name="star" size={12} color="#FFD700" />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Right Controls */}
      <View style={styles.rightControls}>
        <TouchableOpacity style={styles.circleBtn} onPress={toggleMute}>
          <Ionicons
            name={isMuted ? "mic-off" : "mic"}
            size={22}
            color="#070722"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleBtn} onPress={toggleVideo}>
          <Ionicons
            name={videoOff ? "videocam-off" : "videocam"}
            size={22}
            color="#070722"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleBtn}>
          <Ionicons name="camera-reverse" size={22} color="#070722" />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <MaterialIcons name="chat" size={24} color="white" />
          <Text style={styles.bottomText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <MaterialIcons name="fiber-manual-record" size={24} color="white" />
          <Text style={styles.bottomText}>Record</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallBtn} onPress={leaveMeeting}>
          <Ionicons name="call" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons name="happy-outline" size={24} color="white" />
          <Text style={styles.bottomText}>Reaction</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          <Text style={styles.bottomText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070722",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  topButton: {
    padding: 8,
  },
  meetingInfo: {
    alignItems: "center",
  },
  meetingTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  timer: {
    color: "#E9164B",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },
  roomBadge: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: "rgba(233,22,75,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E9164B",
    zIndex: 10,
  },
  roomText: {
    color: "#E9164B",
    fontSize: 12,
    fontWeight: "600",
  },
  thumbnailContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  thumbnailWrapper: {
    marginRight: 10,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeThumbnail: {
    borderColor: "#E9164B",
  },
  thumbnail: {
    width: 100,
    height: 150,
    backgroundColor: "#000",
  },
  thumbnailBadge: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  thumbnailText: {
    color: "white",
    fontSize: 10,
  },
  rightControls: {
    position: "absolute",
    right: 20,
    top: "35%",
    gap: 15,
    zIndex: 10,
  },
  circleBtn: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomBar: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  bottomButton: {
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },
  endCallBtn: {
    backgroundColor: "#E9164B",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
