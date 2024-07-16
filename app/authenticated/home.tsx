import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dummyNewsData = [
  {
    id: "1",
    title: "Lorem Ipsum Dolor Sit Amet",
    image: require("@/assets/images/news1.jpg"),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id nisi nec metus lacinia posuere.",
  },
  {
    id: "2",
    title: "Pellentesque Habitant Morbi Tristique",
    image: require("@/assets/images/news1.jpg"),
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  {
    id: "3",
    title: "Integer Vitae Nibh Molestie",
    image: require("@/assets/images/news1.jpg"),
    description:
      "Integer vitae nibh molestie, pharetra nibh non, blandit arcu. Nam aliquet est vitae augue tincidunt condimentum.",
  },
  {
    id: "4",
    title: "Duis At Eros Efficitur",
    image: require("@/assets/images/news1.jpg"),
    description:
      "Duis at eros efficitur, consectetur justo et, tempor odio. Quisque consequat, nisi ac maximus vestibulum.",
  },
];

export default function home() {
  const [user, setUser] = useState<User | null>(null); // Initialize with null and specify User | null type
  const [userData, setUserData] = useState<any>(null); // State to hold additional user data
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(
      async (firebaseUser) => {
        console.log("Firebase User:", firebaseUser?.uid);
        if (firebaseUser) {
          setUser(firebaseUser);

          // Fetch additional user data from Firestore based on UID
          const q = query(
            collection(FIREBASE_DB, "users"),
            where("userId", "==", firebaseUser.uid)
          );

          try {
            const querySnapshot = await getDocs(q);
            console.log("Query Snapshot:", querySnapshot);

            if (!querySnapshot.empty) {
              // Assuming there's only one document matching the uid
              const doc = querySnapshot.docs[0];
              setUserData(doc.data());
            } else {
              console.log("No matching documents.");
              setUserData(null); // Handle case where no user data is found
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null); // Handle error state
          }
        } else {
          setUser(null);
          setUserData(null);
        }
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerSubContainerOne}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.headerTextOne}>
              Welcome{userData ? `, ${userData.firstName?.split(" ")[0]}!` : ""}
            </Text>
          </View>
          <View style={styles.servicesContainer}>
            <View style={styles.servicesSubContainerOne}>
              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => router.push("/authenticated/snap")}
              >
                <Image
                  source={require("@/assets/images/service1.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Snap</Text>
              </TouchableOpacity>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service2.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Locate</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service3.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Call 911</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service4.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Donate</Text>
              </View>
            </View>
            <View style={styles.servicesSubContainerTwo}>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service1.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Snap</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service2.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Locate</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service3.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Call 911</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("@/assets/images/service4.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Donate</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.newsContainer}>
          <Text style={styles.newsContainerHeaderText}>Latest News</Text>
          <View style={styles.lineBorder} />
          <View style={styles.newsSubContainer}>
            <FlatList
              data={dummyNewsData}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.newsSubContainer}
              renderItem={({ item }) => (
                <View style={styles.newsItem}>
                  <Image source={item.image} style={styles.newsImage} />
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: "40%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  headerSubContainerOne: {
    flexDirection: "row",
    columnGap: 4,
    width: "100%",
    alignContent: "center",
  },
  headerTextOne: {
    fontWeight: "bold",
    fontSize: 26,
    alignSelf: "center",
    marginTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  servicesContainer: {
    flexDirection: "column",
    rowGap: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFA726",
    height: 230,
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
  },
  servicesSubContainerOne: {
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFA726",
    height: 80,
    width: "100%",
  },
  servicesSubContainerTwo: {
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFA726",
    height: 80,
    width: "100%",
  },
  servicesLogo: {
    width: 60,
    height: 60,
    alignSelf: "flex-start",
  },
  serviceItem: {
    alignItems: "center",
  },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  newsContainer: {
    flexDirection: "column",
    paddingLeft: 10,
    marginTop: 10,
  },
  newsSubContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  newsHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  newsList: {
    paddingLeft: 10,
  },
  newsItem: {
    width: 300,
    marginRight: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
  },
  newsImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  newsDescription: {
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  newsContainerHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 10,
    marginLeft: 6,
  },
  lineBorder: {
    borderColor: "#FFA726",
    borderWidth: 2,
    marginRight: 10,
  },
});
