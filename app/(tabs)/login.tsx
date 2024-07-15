import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase authentication functions
import { FIREBASE_AUTH } from "../../firebaseConfig"; // Adjust the import path accordingly

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // Handle login button press
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Navigate to your main application screen or dashboard
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
        console.error("Login error:", errorCode, errorMessage);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={require("../../assets/videos/background.mp4")}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>SNAP FIRE</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.headerText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.socialLoginContainer}>
          <Text style={styles.orText}>or</Text>
          <View style={styles.socialLoginSubContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/google-logo.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/facebook-logo.webp")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    minHeight: 600,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#FFA726",
    fontWeight: "bold",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
    position: "absolute",
    top: "35%",
    zIndex: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: "75%",
    zIndex: 2,
    color: "#FFA726",
  },
  titleContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: 300,
  },

  loginContainer: {
    padding: 10,
    backgroundColor: "#ffff",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 10,
    color: "#000",
    width: "100%",
    borderColor: "#FFA726",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFA726",
  },
  noAccountText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 500,
    position: "absolute",
  },
  socialLoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 60,
  },
  socialLoginSubContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 10,
    marginTop: 10,
  },
  orText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffff", // Adjust for Google button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 10,
    borderColor: "#FFA726",
    borderWidth: 1,
  },
  socialButtonText: {
    color: "#ccc",
    fontSize: 16,
    marginLeft: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: "#FFA726",
    color: "#ffff",
    padding: 6,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  loginButtonText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
