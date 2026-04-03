// app/test-webrtc.js
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RTCView } from "react-native-webrtc";
import { startMeeting, stopMeeting } from "../../components/webrtc";

export default function TestWebRTC() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [isInMeeting, setIsInMeeting] = useState(false);
  const roomId = "test-room-123";

  const startTestMeeting = async () => {
    try {
      const stream = await startMeeting(roomId, true, (id, remoteStream) => {
        setRemoteStreams((prev) => ({
          ...prev,
          [id]: remoteStream,
        }));
      });
      setLocalStream(stream);
      setIsInMeeting(true);
    } catch (error) {
      console.error("Failed to start meeting:", error);
    }
  };

  const endTestMeeting = () => {
    stopMeeting();
    setLocalStream(null);
    setRemoteStreams({});
    setIsInMeeting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebRTC Test</Text>

      {!isInMeeting ? (
        <TouchableOpacity style={styles.button} onPress={startTestMeeting}>
          <Text style={styles.buttonText}>Start Meeting</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.videoContainer}>
            {localStream && (
              <View style={styles.videoWrapper}>
                <Text style={styles.videoLabel}>Local Stream</Text>
                <RTCView
                  streamURL={localStream.toURL()}
                  style={styles.video}
                  objectFit="cover"
                />
              </View>
            )}

            {Object.entries(remoteStreams).map(([id, stream]) => (
              <View key={id} style={styles.videoWrapper}>
                <Text style={styles.videoLabel}>Remote: {id.slice(0, 4)}</Text>
                <RTCView
                  streamURL={stream.toURL()}
                  style={styles.video}
                  objectFit="cover"
                />
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, styles.endButton]}
            onPress={endTestMeeting}
          >
            <Text style={styles.buttonText}>End Meeting</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070722",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  endButton: {
    backgroundColor: "#E9164B",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  videoContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 20,
  },
  videoWrapper: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  videoLabel: {
    color: "white",
    marginBottom: 5,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
});
