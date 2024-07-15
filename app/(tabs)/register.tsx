import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
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
            username: username,
            password: password,
            email: email,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            age: age,
            address: address,
          });
          console.log("User information saved to Firestore");
          setSuccessMessage("Successfully registered! Redirecting...");
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {!successMessage && (
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Register</Text>
              <Text style={styles.secondaryText}>
                Please fill-up the necessary details
              </Text>
            </View>
          )}
          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    height: 400,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  inputFocused: {
    borderColor: "#FFA726",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    columnGap: 10,
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
  successMessage: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
