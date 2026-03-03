import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>

      <Text style={styles.subtitle}>
        Your smart app starts here
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineBtn}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.outlineText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 15,
    width: "100%",
    borderRadius: 10,
  },

  outlineText: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 16,
  },
});