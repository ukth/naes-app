import React, { useState, useContext, useEffect, useRef } from "react";

import { RouteProp, useNavigation } from "@react-navigation/core";
import { Alert, Animated, Pressable, View } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthStack";
import {
  ACCESS_TOKEN_KEY,
  API_URL,
  colors,
  REFRESH_TOKEN_KEY,
  styles,
} from "../../constants";
import { ProgressContext } from "../../contexts/progressContext";
import { MyPressable, ScreenContainer } from "../../components";
import {
  BoldNumText,
  BoldText,
  BoldTextInput,
  LightText,
  MediumTextInput,
  MediumNumText,
  MediumText,
} from "../../components/StyledText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format2Digits, login, sendPostRequest } from "../../util";
import { EntranceYear } from "types/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/userContext";
import { Picker } from "@react-native-picker/picker";
import { sendCode } from "./Enter";

const checkUsername = async (username: string) => {
  const data = await sendPostRequest(API_URL + "user/checkUsername", {
    username,
  });
  if (!data?.ok) {
    Alert.alert("Failed to check username.\n" + data?.error);
  }
  return data;
};

const getTokens = async (registerData: {
  phone: string;
  username: string;
  code: number;
  entrance: EntranceYear;
  pushToken?: string;
}) => {
  const data = await sendPostRequest(API_URL + "user/join", registerData);

  return data;
};

const Join = ({ route }: { route: RouteProp<AuthStackParamList, "Join"> }) => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [timer, setTimer] = useState(180);
  const phone = route.params.phone;

  const userContext = useContext(UserContext);

  useEffect(() => {
    const id = setInterval(
      () =>
        setTimer((time) => {
          if (time > 1) {
            return time - 1;
          }
          return 0;
        }),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const { spinner } = useContext(ProgressContext);

  useEffect(() => {
    setUsernameChecked(false);
  }, [username]);

  const [pickerValue, setPickerValue] = useState<EntranceYear>("y_2023");
  const [showPicker, setShowPicker] = useState(false);
  const [pickerOpened, setPickedOpened] = useState(false);

  const gradeText: {
    [key: EntranceYear]: string;
  } = {
    y_2023: "고1",
    y_2022: "고2",
    y_2021: "고3",
    y_2020m: "N수생",
  };

  const pickerPosition = useRef(new Animated.Value(-250)).current;

  const openPicker = Animated.timing(pickerPosition, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const closePicker = Animated.timing(pickerPosition, {
    toValue: -250,
    duration: 300,
    useNativeDriver: false,
  });

  useEffect(() => {
    (async () => {
      if (pickerOpened) {
        setShowPicker(true);
        openPicker.start();
      } else {
        closePicker.start(() => setShowPicker(false));
      }
    })();
  }, [pickerOpened]);

  // function open() {
  //   pickerRef.current.focus();
  // }

  // function close() {
  //   pickerRef.current.blur();
  // }

  return (
    <ScreenContainer>
      {showPicker ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: colors.white,
              position: "absolute",
              zIndex: 2,
              opacity: 1,
              shadowRadius: 100,
              shadowColor: colors.black,
              shadowOpacity: 0.1,
              bottom: pickerPosition,
              width: "100%",
              height: 230,
              borderTopLeftRadius: styles.borderRadius.md,
              borderTopRightRadius: styles.borderRadius.md,
              alignItems: "center",
            }}
          >
            <MyPressable
              style={{
                right: 10,
                alignSelf: "flex-end",
                paddingTop: 15,
                paddingHorizontal: 10,
              }}
              hitSlop={{
                top: 10,
                bottom: 10,
              }}
              onPress={() => setPickedOpened(false)}
            >
              <BoldText style={{ color: colors.green }}>선택</BoldText>
            </MyPressable>
            <Picker
              style={{ width: "100%" }}
              selectedValue={pickerValue}
              onValueChange={(item) => setPickerValue(item)}
            >
              <Picker.Item label="고1" value="y_2023" />
              <Picker.Item label="고2" value="y_2022" />
              <Picker.Item label="고3" value="y_2021" />
              <Picker.Item label="N수생" value="y_2020m" />
            </Picker>
          </Animated.View>
        </View>
      ) : null}

      <View
        style={{
          top: -15,
          width: "100%",
          height: 15,
          ...styles.shadow.header,
          backgroundColor: colors.gray,
          position: "absolute",
        }}
      />
      <KeyboardAwareScrollView
        extraScrollHeight={80}
        style={{
          paddingHorizontal: 30,
          paddingTop: 60,
        }}
      >
        <BoldText
          style={{
            fontSize: styles.fontSizes.xl,
            marginBottom: 35,
          }}
        >
          회원가입
        </BoldText>

        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: styles.borderRadius.sm,
            paddingHorizontal: 20,
            paddingTop: 30,
            marginBottom: 30,
            paddingBottom: 50,
          }}
        >
          <BoldText
            style={{
              fontSize: styles.fontSizes.md,
              color: colors.textBlack,
              marginBottom: 9,
            }}
          >
            아이디
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
              marginBottom: 0,
              height: 50,
              width: "100%",
            }}
          >
            <MediumTextInput
              style={{
                flex: 1,
                fontSize: styles.fontSizes.sm,
                color: colors.textBlack,
                marginRight: 5,
              }}
              onChangeText={(text) => setUsername(text.trim())}
              autoCapitalize="none"
              placeholder="아이디를 입력해주세요"
            />

            <MyPressable
              style={{
                height: 27,
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 0.8,
                borderColor: usernameChecked ? colors.green : colors.gray,
                borderRadius: styles.borderRadius.full,
              }}
              onPress={async () => {
                spinner.start();
                const data = await checkUsername(username);
                spinner.stop();
                console.log(data);
                if (data.usernameExist) {
                  Alert.alert("중복된 아이디입니다.");
                } else {
                  Alert.alert("아이디를 사용하실 수 있습니다.");
                  setUsernameChecked(true);
                }
              }}
            >
              <BoldText
                style={{
                  color: usernameChecked ? colors.green : colors.gray,
                  fontSize: styles.fontSizes.sm,
                }}
              >
                중복확인
              </BoldText>
            </MyPressable>
          </View>
          <View style={{ height: 40, paddingTop: 10 }}>
            <View style={{ paddingHorizontal: 3 }}>
              {usernameChecked ? (
                <MediumText
                  style={{ color: colors.green, fontSize: styles.fontSizes.sm }}
                >
                  사용하실 수 있는 아이디입니다.
                </MediumText>
              ) : null}
            </View>
          </View>
          <View>
            <BoldText
              style={{
                fontSize: styles.fontSizes.md,
                color: colors.textBlack,
                marginBottom: 9,
              }}
            >
              학년 선택
            </BoldText>
            <MyPressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                backgroundColor: colors.white,
                borderRadius: styles.borderRadius.sm,
                borderWidth: 1,
                borderColor: colors.ligthGray,
                marginBottom: 40,
                height: 50,
                width: "100%",
              }}
              onPress={() => setPickedOpened(true)}
            >
              <MediumText
                style={{
                  flex: 1,
                  fontSize: styles.fontSizes.sm,
                  color: colors.textBlack,
                  marginRight: 5,
                }}
              >
                {gradeText[pickerValue]}
              </MediumText>
            </MyPressable>
            <BoldText
              style={{
                fontSize: styles.fontSizes.md,
                color: colors.textBlack,
                marginBottom: 9,
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
                  style={{
                    color: colors.green,
                    marginBottom: 30,
                    letterSpacing: -0.5,
                  }}
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
          </View>
        </View>
        <View>
          <MyPressable
            style={{
              backgroundColor:
                usernameChecked && code.length == 6
                  ? colors.green
                  : colors.white,

              borderRadius: styles.borderRadius.sm,
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => {
              spinner.start();
              const data = await getTokens({
                phone,
                username,
                code: +code,
                entrance: pickerValue,
              });
              console.log(data, {
                phone,
                username,
                code: +code,
                entrance: pickerValue,
              });
              spinner.stop();
              if (data?.ok) {
                if (data.refreshToken && data.accessToken && data.user) {
                  login(userContext, data);
                } else {
                  Alert.alert(
                    "Something's wrong! Please contact administrator."
                  );
                }
              } else {
                Alert.alert(data.error);
              }
            }}
            disabled={!(usernameChecked && code.length == 6)}
          >
            <BoldText
              style={{
                color:
                  usernameChecked && code.length == 6
                    ? colors.white
                    : colors.textGray,
                paddingHorizontal: 10,
                fontSize: styles.fontSizes.md,
              }}
            >
              회원가입
            </BoldText>
          </MyPressable>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default Join;
