import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

const Logo = ({ scale = 1, style }: { scale?: number; style?: ImageStyle }) => {
  return (
    <Image
      source={require("../../../assets/logo.png")}
      style={{
        width: 159 / scale,
        height: 91 / scale,

        ...style,
      }}
    />
  );
};

export default Logo;
