import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function home() {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerSubContainerOne}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.headerTextOne}>Welcome!</Text>
          </View>
          <View style={styles.servicesContainer}>
            <View style={styles.servicesSubContainerOne}>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service1.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Snap</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service2.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Locate</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service3.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Call 911</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service4.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Donate</Text>
              </View>
            </View>
            <View style={styles.servicesSubContainerTwo}>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service1.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Snap</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service2.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Locate</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service3.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Call 911</Text>
              </View>
              <View style={styles.serviceItem}>
                <Image
                  source={require("../../assets/images/service4.png")}
                  style={styles.servicesLogo}
                />
                <Text style={styles.serviceText}>Donate</Text>
              </View>
            </View>
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
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 100,
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
    height: 240,
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
});
