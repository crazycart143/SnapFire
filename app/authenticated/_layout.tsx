import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light"; // Provide a default value of 'light' if colorScheme is null or undefined

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          // Define the icon names explicitly
          const iconNameMap: {
            [key: string]: React.ComponentProps<typeof Ionicons>["name"];
          } = {
            home: "home",
            snap: "camera",
            profile: "person-circle",
          };

          // Get the icon name based on the route name, or use a default icon
          const iconName = iconNameMap[route.name] || "home";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFA726",
        tabBarInactiveTintColor: "#ccc",
        tabBarStyle: {
          backgroundColor: "#f2f2f2",
          position: "absolute",
          bottom: 0,
          height: 60,
          paddingBottom: 6,
        },
        tabBarOptions: {
          headerShown: false,
          title: "Home",
          headerTitleStyle: styles.tabBarTitle, // Style for the title
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen name="snap" options={{ title: "Snap" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarTitle: {
    fontSize: 18, // Adjust font size as needed
    fontWeight: "bold", // Bold font weight
    color: "#333", // Title color
  },
});
