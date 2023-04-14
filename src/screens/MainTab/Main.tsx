import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../../contexts/userContext";
import { StackGeneratorParamList } from "../../navigation/StackGenerator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, styles } from "../../constants";
import { BoldText, LightText, MediumText } from "../../components/StyledText";
import { ErrorComponent, MyPressable, ScreenContainer } from "../../components";
import { logout } from "../../util";

const Main = ({
  route,
}: {
  route: RouteProp<StackGeneratorParamList, "Main">;
}) => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const [scrollViewIndex, setScrollViewIndex] = useState(0);
  const adLength = 3;

  if (!user) {
    return <ErrorComponent />;
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<StackGeneratorParamList>>();

  const items = [
    { color: colors.magenta },
    { color: colors.gray },
    { color: colors.purple },
  ];

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView>
        <View
          style={{
            paddingTop: "8%", // 33
            paddingHorizontal: "8%", // 37 = 390
            marginBottom: 64,
          }}
        >
          <MediumText
            style={{
              fontSize: styles.fontSizes.xxl,
              lineHeight: 39,
            }}
          >
            <BoldText>나진환T</BoldText>에게
          </MediumText>
          <LightText
            style={{ fontSize: styles.fontSizes.xxl, marginBottom: 25 }}
          >
            질문하기
          </LightText>
          <MyPressable
            style={{
              width: "100%",
              height: 48,
              borderRadius: styles.borderRadius.sm,
              backgroundColor: colors.gray,
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
            onPress={() => navigation.push("Question2")}
          >
            <MediumText
              style={{
                color: colors.textLightGray,
                fontSize: styles.fontSizes.md,
              }}
            >
              질문을 입력하여 주세요.
            </MediumText>
          </MyPressable>
        </View>
        <View style={{ marginBottom: 20 }}>
          <ScrollView
            style={{
              height: 160,
            }}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              let idx = Math.floor(
                (nativeEvent.contentOffset.x + windowWidth / 2) / 390
              );
              if (idx < 0) {
                idx = 0;
              }
              setScrollViewIndex(idx);
            }}
            scrollEventThrottle={16}
          >
            <View
              style={{
                width: windowWidth,
                height: 160,
                backgroundColor: colors.magenta,
              }}
            />
            <View
              style={{
                width: windowWidth,
                height: 160,
                backgroundColor: colors.purple,
              }}
            />
            <View
              style={{
                width: windowWidth,
                height: 160,
                backgroundColor: colors.magenta,
              }}
            />
          </ScrollView>
          <View
            style={{
              position: "absolute",
              height: 2,
              bottom: 0,
              width: "100%",
              flexDirection: "row",
            }}
          >
            {[0, 1, 2].map((idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: colors.green,
                  height: 2,
                  flex: 1,
                  opacity: idx <= scrollViewIndex ? 1 : 0,
                }}
              />
            ))}
          </View>
        </View>
        <View style={{ paddingHorizontal: "8%", marginBottom: "20%" }}>
          <FlatList
            style={{
              height: 215,
            }}
            data={items}
            renderItem={({ item }) => (
              <MyPressable
                style={{
                  width: 200,
                  paddingTop: 24,
                }}
              >
                <View
                  style={{
                    backgroundColor: item.color,
                    height: "100%",
                    borderRadius: styles.borderRadius.sm,
                  }}
                />
              </MyPressable>
            )}
            keyExtractor={(item, index) => index + ""}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 13 }} />}
            // onScroll={({ nativeEvent }) => {
            //   let idx = Math.floor(nativeEvent.contentOffset.x / 390);
            //   if (idx < 0) {
            //     idx = 0;
            //   }
            //   setScrollViewIndex(idx);
            // }}
          ></FlatList>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default Main;
