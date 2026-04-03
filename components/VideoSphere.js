// components/VideoSphere.js
import { Canvas } from "@react-three/fiber/native";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { VideoTexture } from "three";

function VideoSphere({ stream }) {
  const sphereRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (stream && videoRef.current) {
      // Create video element and attach stream
      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      video.loop = true;
      video.muted = true;
      videoRef.current = video;

      // Create video texture
      const texture = new VideoTexture(video);
      sphereRef.current.material.map = texture;
    }
  }, [stream]);

  return (
    <mesh ref={sphereRef} rotation={[0, Math.PI / 2, 0]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial side={THREE.BackSide} />
    </mesh>
  );
}

export default function VideoSphereView({ stream }) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Canvas>
        <ambientLight />
        <VideoSphere stream={stream} />
      </Canvas>
    </View>
  );
}
