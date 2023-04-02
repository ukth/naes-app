import React from "react";
import { Linking } from "react-native";
import { colors } from "../../constants";
import ScreenContainer from "./ScreenContainer";
import { BoldText } from "../StyledText";

const ErrorComponent = () => {
  return (
    <ScreenContainer style={{ alignItems: "center", justifyContent: "center" }}>
      <BoldText
        style={{
          color: colors.mediumThemeColor,
          marginBottom: 5,
          fontSize: 20,
        }}
      >
        Something went wrong.
      </BoldText>
      <BoldText
        style={{
          color: colors.mediumThemeColor,
          marginBottom: 5,
          fontSize: 20,
        }}
      >
        Please contact us via
      </BoldText>
      <BoldText
        onPress={() => {
          Linking.openURL("mailto:collegetable.dev@gmail.com");
        }}
        style={{ color: colors.themeColor, fontSize: 20 }}
      >
        collegetable.dev@gmail.com.
      </BoldText>
    </ScreenContainer>
  );
};

export default ErrorComponent;
