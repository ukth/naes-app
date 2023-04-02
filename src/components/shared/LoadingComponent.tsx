import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../../constants";

const LoadingComponent = () => {
  return <ActivityIndicator size="small" color={colors.gray} />;
};

export default LoadingComponent;
