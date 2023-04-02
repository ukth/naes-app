import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MyPressable } from "../../components";
import { MediumText } from "../../components/StyledText";
import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Question = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.3)" },
        ]}
        onPress={navigation.goBack}
      />
      <View
        style={{
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Create Posts !! This is Modal
        </Text>
      </View>
    </View>
  );
};

export default Question;
