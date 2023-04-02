import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import { colors } from "../../constants";

const HeaderBackButton = ({
  onPress,
  color,
}: {
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
}) => {
  return (
    <Pressable
      hitSlop={{
        top: 10,
        bottom: 10,
        right: 10,
        left: 10,
      }}
      onPress={onPress}
    >
      <Ionicons name="chevron-back" size={30} color={colors.white} />
    </Pressable>
  );
};

export default HeaderBackButton;
