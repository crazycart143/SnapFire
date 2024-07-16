import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
