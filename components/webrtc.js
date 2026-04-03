import {
    mediaDevices,
    RTCIceCandidate,
    RTCPeerConnection,
    RTCSessionDescription,
} from "react-native-webrtc";

export const peers = {};
let localStream = null;
let ws = null;
let userId = null;

export async function stopMeeting() {
  if (ws) {
    ws.close();
    ws = null;
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }

  Object.keys(peers).forEach((id) => {
    peers[id].close();
    delete peers[id];
  });
}

export async function startMeeting(roomId, isHost, onPeerUpdate) {
  if (!userId) userId = Math.random().toString(36).substring(7);

  const wsURL = "wss://syedabdulmoizshah-360-connect-signaler.hf.space";

  // 🎥 React Native camera stream
  localStream = await mediaDevices.getUserMedia({
    video: {
      width: 1280,
      height: 720,
      frameRate: 24,
      facingMode: "user",
    },
    audio: true,
  });

  ws = new WebSocket(wsURL);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "join", roomId, userId, isHost }));
  };

  ws.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);

    switch (data.type) {
      case "peer-joined":
        await createPeer(data.userId, true, onPeerUpdate, data.isHost);
        break;

      case "offer":
        await createPeer(
          data.sender,
          false,
          onPeerUpdate,
          data.isHost,
          data.offer,
        );
        break;

      case "answer":
        await peers[data.sender]?.setRemoteDescription(
          new RTCSessionDescription(data.answer),
        );
        break;

      case "candidate":
        await peers[data.sender]?.addIceCandidate(
          new RTCIceCandidate(data.candidate),
        );
        break;
    }
  };

  return localStream;
}

async function createPeer(
  peerId,
  isOfferer,
  onPeerUpdate,
  peerIsHost,
  offer = null,
) {
  if (peers[peerId]) return;

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  peers[peerId] = pc;

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(
        JSON.stringify({
          type: "candidate",
          candidate: e.candidate,
          target: peerId,
          sender: userId,
        }),
      );
    }
  };

  pc.ontrack = (e) => {
    onPeerUpdate(peerId, e.streams[0], peerIsHost);
  };

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  if (isOfferer) {
    const desc = await pc.createOffer();
    await pc.setLocalDescription(desc);
    ws.send(
      JSON.stringify({
        type: "offer",
        offer: desc,
        target: peerId,
        sender: userId,
        // isHost,
        isHost: peerIsHost,
      }),
    );
  } else {
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const desc = await pc.createAnswer();
    await pc.setLocalDescription(desc);
    ws.send(
      JSON.stringify({
        type: "answer",
        answer: desc,
        target: peerId,
        sender: userId,
      }),
    );
  }
}
