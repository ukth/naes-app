import React, { useState, useContext, useEffect, useRef } from "react";

import { RouteProp, useNavigation } from "@react-navigation/core";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { API_URL, colors, styles } from "../../constants";
import { ProgressContext } from "../../contexts/progressContext";
import { MyPressable, ScreenContainer } from "../../components";
import {
  BoldText,
  LightText,
  MediumTextInput,
  MediumNumText,
  MediumText,
} from "../../components/StyledText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format2Digits, login, sendPostRequest } from "../../util";
import { UserContext } from "../../contexts/userContext";
import { Ionicons } from "@expo/vector-icons";
import LogoText from "../../../assets/images/logo_text.svg";

export const sendCode = async (phone: string) => {
  const data = await sendPostRequest(API_URL + "user/sendCode", { phone });
  if (!data?.ok) {
    Alert.alert("Failed to send verification code.\n" + data?.error);
  }
  return data;
};

const getTokens = async (registerData: {
  userId: number;
  phone: string;
  code: number;
  pushToken?: string;
}) => {
  const data = await sendPostRequest(API_URL + "user/login", registerData);

  return data;
};

const Enter = ({
  route,
}: {
  route: RouteProp<AuthStackParamList, "Enter">;
}) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(0);
  const [codeSent, setCodeSent] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const { spinner } = useContext(ProgressContext);

  const boxOpacity = useRef(new Animated.Value(0)).current;
  const boxHeight = boxOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110],
  });

  useEffect(() => {
    const timerIntervalId = setInterval(
      () =>
        setTimer((time) => {
          console.log("tick");
          if (time > 1) {
            return time - 1;
          }
          return 0;
        }),
      1000
    );
    return () => clearInterval(timerIntervalId);
  }, []);

  useEffect(() => {
    setCode("");
    if (codeSent) {
      Animated.timing(boxOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setTimer(180);
    } else {
      Animated.timing(boxOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setTimer(0);
    }
  }, [codeSent]);

  const [timer, setTimer] = useState(0);

  const userContext = useContext(UserContext);

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: colors.darkGray,
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              height: "24%",
              justifyContent: "center",
              paddingTop: "18%",
            }}
          >
            <LogoText width={200} height={80} />
          </View>
          <View
            style={{
              backgroundColor: colors.darkGray,
              paddingHorizontal: "9%",
              paddingTop: 36,
              borderRadius: styles.borderRadius.xl,
              shadowRadius: 100,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: colors.black,
              shadowOpacity: 0.75,
              flex: 1,
            }}
          >
            <BoldText
              style={{
                fontSize: styles.fontSizes.xl,
                marginBottom: 17,
              }}
            >
              로그인
            </BoldText>
            <LightText
              style={{
                fontSize: styles.fontSizes.sm,
                marginBottom: "15%",
              }}
            >
              저장된 정보가 없을 시,{" "}
              <LightText
                style={{
                  fontSize: styles.fontSizes.sm,
                  color: colors.green,
                  marginBottom: "10%",
                }}
              >
                회원가입
              </LightText>{" "}
              창으로 넘어갑니다.
            </LightText>
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: styles.borderRadius.sm,
                paddingHorizontal: 20,
                paddingTop: 28,
                marginBottom: 25,
                paddingBottom: 30,
              }}
            >
              <BoldText
                style={{
                  fontSize: styles.fontSizes.md,
                  color: colors.textBlack,
                  marginBottom: 17,
                }}
              >
                전화번호
              </BoldText>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  backgroundColor: colors.white,
                  borderRadius: styles.borderRadius.sm,
                  borderWidth: 1,
                  borderColor: colors.ligthGray,
                  marginBottom: 35,
                  height: 50,
                  width: "100%",
                }}
              >
                {codeSent ? (
                  <>
                    <MediumText
                      style={{
                        flex: 1,
                        fontSize: styles.fontSizes.sm,
                        color: colors.textBlack,
                      }}
                    >
                      {phone}
                    </MediumText>
                    <MyPressable onPress={() => setCodeSent(false)}>
                      <Ionicons
                        name="close-circle-outline"
                        size={17}
                        color="#292D32"
                      />
                    </MyPressable>
                  </>
                ) : (
                  <MediumTextInput
                    style={{
                      flex: 1,
                      fontSize: styles.fontSizes.sm,
                      color: colors.textBlack,
                      marginRight: 5,
                    }}
                    onChangeText={(text) => setPhone(text.trim())}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    placeholder="전화번호를 입력해주세요"
                  />
                )}
              </View>
              <Animated.View style={{ height: boxHeight, opacity: boxOpacity }}>
                <BoldText
                  style={{
                    fontSize: styles.fontSizes.md,
                    color: colors.textBlack,
                    marginBottom: 17,
                  }}
                >
                  인증번호
                </BoldText>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    backgroundColor: colors.white,
                    borderRadius: styles.borderRadius.sm,
                    borderWidth: 1,
                    borderColor: colors.ligthGray,
                    marginBottom: 10,
                    height: 50,
                    width: "100%",
                  }}
                >
                  {codeSent ? (
                    <MediumTextInput
                      style={{
                        flex: 1,
                        fontSize: styles.fontSizes.sm,
                        color: colors.textBlack,
                        marginRight: 5,
                      }}
                      onChangeText={(text) => setCode(text.trim())}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder="인증번호를 입력해주세요"
                      maxLength={6}
                    />
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 3,
                  }}
                >
                  <MediumText
                    style={{
                      color: colors.textBlack,
                      fontSize: styles.fontSizes.sm,
                    }}
                  >
                    남은 시간{" "}
                    <MediumNumText
                      style={{ color: colors.green, letterSpacing: -0.5 }}
                    >
                      {format2Digits(Math.floor(timer / 60))}:
                      {format2Digits(timer % 60)}
                    </MediumNumText>
                  </MediumText>
                  <MyPressable
                    onPress={async () => {
                      spinner.start();
                      const data = await sendCode(phone);
                      spinner.stop();
                      if (data?.ok) {
                        setTimer(180);
                      } else {
                        Alert.alert("request failed.");
                      }
                    }}
                  >
                    <MediumText
                      style={{
                        textDecorationLine: "underline",
                        color: colors.textBlack,
                        fontSize: styles.fontSizes.sm,
                      }}
                    >
                      재전송
                    </MediumText>
                  </MyPressable>
                </View>
              </Animated.View>
            </View>
            <MyPressable
              style={{
                backgroundColor: colors.green,
                borderRadius: styles.borderRadius.sm,
                width: "100%",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={async () => {
                if (codeSent) {
                  spinner.start();
                  const data = await getTokens({
                    userId,
                    phone,
                    code: +code,
                  });
                  spinner.stop();
                  if (data?.ok) {
                    if (data.refreshToken && data.accessToken && data.user) {
                      login(userContext, data);
                    }
                  } else {
                    Alert.alert(data.error);
                  }
                } else {
                  if (phone.length == 11) {
                    // need to improve
                    spinner.start();
                    const data = await sendCode(phone);
                    spinner.stop();
                    if (data?.ok) {
                      if (data?.user) {
                        setCodeSent(true);
                        setUserId(data.user.id);
                      } else {
                        navigation.push("Join", { phone });
                      }
                    } else {
                      Alert.alert("request failed.");
                    }
                  } else {
                    Alert.alert("전화번호 형식이 올바르지 않습니다.");
                  }
                }
              }}
            >
              <BoldText
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  fontSize: styles.fontSizes.md,
                }}
              >
                {codeSent ? "로그인" : "인증번호 전송"}
              </BoldText>
            </MyPressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default Enter;
