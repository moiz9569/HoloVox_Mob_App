// import { useRouter } from "expo-router";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to My App</Text>

//       <Text style={styles.subtitle}>Your smart app start here</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/login")}
//       >
//         <Text style={styles.btnText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.outlineBtn}
//         onPress={() => router.push("/signup")}
//       >
//         <Text style={styles.outlineText}>Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },

//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 40,
//   },

//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     width: "100%",
//     borderRadius: 10,
//     marginBottom: 15,
//   },

//   btnText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 16,
//   },

//   outlineBtn: {
//     borderWidth: 1,
//     borderColor: "#007AFF",
//     padding: 15,
//     width: "100%",
//     borderRadius: 10,
//   },

//   outlineText: {
//     color: "#007AFF",
//     textAlign: "center",
//     fontSize: 16,
//   },
// });

import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/holovox-logo.png")}
        style={styles.logopic}
        resizeMode="contain"
      />
      {/* <Text style={styles.logo}>HOLOVOX</Text> */}
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/signup" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>
            Don’t have an account?{" "}
            <Text style={{ color: "#E9164B" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070722",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  logopic: {
    width: 200,
    height: 70,
    marginLeft: 75,
  },
  logo: {
    color: "#E9164B",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#111133",
    color: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#1c1c3a",
  },
  button: {
    backgroundColor: "#E9164B",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#E9164B",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});
