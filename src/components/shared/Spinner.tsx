import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../constants";

const Spinner = () => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 2,
        opacity: 0.3,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.ligthGray} />
    </View>
  );
};

export default Spinner;
