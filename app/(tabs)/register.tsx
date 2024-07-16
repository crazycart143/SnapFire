import React, { useState, useEffect, useId } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig"; // Adjust the import path accordingly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

export default function Register() {
  const router = useRouter(); // Initialize router
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState("first");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        router.replace("/login"); // Navigate to the login page
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, router]);

  const handleRegister = () => {
    if (currentSection === "first") {
      // Move to the next section
      setCurrentSection("second");
    } else if (currentSection === "second") {
      // Perform Firebase registration
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Optionally, save additional user information to Firestore
          console.log("User registered:", user);
          await setDoc(doc(FIREBASE_DB, "users", user.uid), {
            userId: user.uid,
            username: username,
            password: password,
            email: email,
            displayName: firstName,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            age: age,
            address: address,
          });
          console.log("User information saved to Firestore");
          setUsername("");
          setPassword("");
          setEmail("");
          setPhoneNumber("");
          setFirstName("");
          setLastName("");
          setAge("");
          setAddress("");
          setSuccessMessage("Successfully registered! Redirecting...");
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("../../assets/images/background.webp")}
          style={styles.backgroundImageContainer}
        />
        <View style={styles.registerContainer}>
          {!successMessage && (
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Register</Text>
              <Text style={styles.secondaryText}>
                Please fill-up the necessary details
              </Text>
            </View>
          )}
          {successMessage ? (
            <View style={styles.successMessageContainer}>
              <Text style={styles.successMessage}>{successMessage}</Text>
            </View>
          ) : (
            <>
              {currentSection === "first" && (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "username" && styles.inputFocused,
                    ]}
                    placeholder="Username"
                    placeholderTextColor="#ccc"
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setFocusedInput("username")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "password" && styles.inputFocused,
                    ]}
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "email" && styles.inputFocused,
                    ]}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "phoneNumber" && styles.inputFocused,
                    ]}
                    placeholder="Phone Number"
                    placeholderTextColor="#ccc"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    onFocus={() => setFocusedInput("phoneNumber")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </>
              )}

              {currentSection === "second" && (
                <>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "firstName" && styles.inputFocused,
                    ]}
                    placeholder="First Name"
                    placeholderTextColor="#ccc"
                    value={firstName}
                    onChangeText={setFirstName}
                    onFocus={() => setFocusedInput("firstName")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "lastName" && styles.inputFocused,
                    ]}
                    placeholder="Last Name"
                    placeholderTextColor="#ccc"
                    value={lastName}
                    onChangeText={setLastName}
                    onFocus={() => setFocusedInput("lastName")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "age" && styles.inputFocused,
                    ]}
                    placeholder="Age"
                    placeholderTextColor="#ccc"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    onFocus={() => setFocusedInput("age")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "address" && styles.inputFocused,
                    ]}
                    placeholder="Address"
                    placeholderTextColor="#ccc"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    onFocus={() => setFocusedInput("address")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => router.push("/login")}
                >
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                {currentSection === "second" && (
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setCurrentSection("first")}
                  >
                    <Text style={styles.backText}>Back</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>
                    {currentSection === "first" ? "Next" : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  inputFocused: {
    borderColor: "#FFA726",
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#FFA726",
    fontWeight: "bold",
    marginBottom: 10,
  },
  secondaryText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 30,
  },
  backgroundImageContainer: {
    height: "150%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: 300,
    flex: 1,
    resizeMode: "cover",
  },
  registerContainer: {
    backgroundColor: "#ffff",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: "70%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 10,
    color: "#000",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
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
  eyeIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 2,
    marginBottom: 4,
    marginHorizontal: 10,
    backgroundColor: "#ccc",
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
  successMessageContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    columnGap: 10,
    alignItems: "center",
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#FFA726",
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: "flex-end",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: "flex-end",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FFA726",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  backText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA726",
  },
});
