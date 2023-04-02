import React from "react";
import { View, ViewStyle } from "react-native";
import { colors } from "../../constants";

const ScreenContainer = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.darkGray,
        flex: 1,
        ...style,
      }}
    >
      {children}
    </View>
  );
};
export default ScreenContainer;
