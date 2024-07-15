import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const handleLogin = () => {
    // Handle login logic
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic
    console.log("Google Sign-In");
  };

  const handleFacebookSignIn = () => {
    // Handle Facebook sign-in logic
    console.log("Facebook Sign-In");
  };

  return (
    <View style={styles.container}>
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
          placeholder="Username/Email"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}> Log In</Text>
        </TouchableOpacity>
        <View style={styles.socialLoginContainer}>
          <Text style={styles.orText}>or</Text>
          <View style={styles.socialLoginSubContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
            >
              <Image
                source={require("../../assets/images/google-logo.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleFacebookSignIn}
            >
              <Image
                source={require("../../assets/images/facebook-logo.webp")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-end",
    alignContent: "flex-end",
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
    top: "15%",
    zIndex: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: "55%",
    zIndex: 2,
    color: "#FFA726",
  },
  titleContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loginContainer: {
    padding: 10,
    backgroundColor: "#ffff",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: "56%",
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
    paddingHorizontal: 20,
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
    width: "100%",
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
