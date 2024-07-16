import BottomRowTools from "@/components/BottomRowTools";
import { CameraMode, CameraView } from "expo-camera";
import React from "react";
import { View } from "react-native";

export default function snap() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");
  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} mode={cameraMode} style={{ flex: 1 }}>
        <BottomRowTools setCameraMode={setCameraMode} cameraMode={cameraMode} />
      </CameraView>
    </View>
  );
}
