import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MyPressable, ScreenContainer, Spinner } from "../../components";
import {
  BoldText,
  LightTextInput,
  MediumText,
} from "../../components/StyledText";
import { API_URL, colors, styles } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { postData, sendPostRequest } from "../../util";
import { UserContext } from "../../contexts/userContext";
import { ProgressContext } from "../../contexts/progressContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackGeneratorParamList } from "src/navigation/StackGenerator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CameraIcon from "../../../assets/images/icon_camera.svg";
import GalleryIcon from "../../../assets/images/icon_gallery.svg";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "src/navigation/MainTab";

const Question = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackGeneratorParamList>>();
  const [images, setImages] = useState<string[]>([]);
  const [cameraStatus, cameraRequestPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryStatus, mediaLibraryRequestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const userContext = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const user = userContext.user;

  if (!user) {
    return null;
  }

  const sendQuestion = async (questionsData: {
    title: string;
    content: string;
    imageUrls: string[];
  }) => {
    const data = await postData(
      userContext,
      API_URL + "question/uploadQuestion",
      questionsData
    );
    return data;
  };

  useEffect(() => {
    (async () => {
      let granted = (await ImagePicker.getCameraPermissionsAsync()).granted;
      if (!granted) {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
          Alert.alert("카메라 권한이 필요합니다.");
          navigation.goBack();
          return;
        }
      }

      granted = (await ImagePicker.getMediaLibraryPermissionsAsync()).granted;
      if (!granted) {
        const { granted } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
          Alert.alert("사진 접근 권한이 필요합니다.");
          navigation.goBack();
        }
      }
    })();
    // spinner.start();
  }, []);

  const upload = async () => {
    console.log("upload started", title, content, images);
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      let imageUrls = [];
      if (images.length) {
        const uploadData = await postData(
          userContext,
          API_URL + "getImageUrls",
          {
            n: images.length,
          }
        );

        imageUrls = await Promise.all(
          images.map(async (localUrl, idx) => {
            const uploadURL = uploadData.urls[idx].uploadURL;

            const formData = new FormData();
            formData.append("file", {
              // @ts-ignore
              uri: localUrl,
              name: localUrl.substring(localUrl.length - 20),
            });
            const rawResponse: any = await fetch(uploadURL, {
              method: "POST",
              body: formData,
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            const res: any = await rawResponse.json();
            if (res?.errors?.length === 0 && res?.result) {
              return res.result.variants[0];
            }
          })
        );
      }
      const data = await sendQuestion({
        title,
        content,
        imageUrls,
      });
      console.log(data);
      if (data?.ok) {
        Alert.alert("질문이 등록되었습니다.");
        navigation.pop();
      } else {
        Alert.alert(data.error);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Image upload error");
    }

    // spinner.stop();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  useEffect(() => {
    if (title.length > 3 && content.length > 3) {
      navigation.setOptions({
        headerRight: () => (
          <MyPressable onPress={upload}>
            <BoldText
              style={{
                fontSize: styles.fontSizes.md,
                marginHorizontal: 15,
              }}
            >
              보내기
            </BoldText>
          </MyPressable>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [upload, images, content, title]);

  return (
    <ScreenContainer>
      {loading && <Spinner />}
      <KeyboardAwareScrollView
        style={{ paddingHorizontal: "9%", paddingTop: 27 }}
      >
        <LightTextInput
          style={{ fontSize: styles.fontSizes.xl, color: colors.white }}
          multiline={false}
          maxLength={30}
          placeholder="제목"
          placeholderTextColor={colors.textLightGray}
          onChangeText={(text) => setTitle(text.trim())}
        />
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: colors.gray,
            marginVertical: 18,
          }}
        />
        <LightTextInput
          style={{ fontSize: styles.fontSizes.md, color: colors.white }}
          placeholder="내용을 입력하여 주세요"
          onChangeText={(text) => setContent(text.trim())}
          placeholderTextColor={colors.textLightGray}
        />
      </KeyboardAwareScrollView>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "9%", // 390 - 78 = 312
            marginBottom: 17,
          }}
        >
          {images.map((uri) => (
            <View key={uri} style={{ marginRight: 9 }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: styles.borderRadius.sm,
                }}
                source={{ uri: uri }}
              />
              <MyPressable
                style={{ position: "absolute", top: 3, left: 3 }}
                hitSlop={{
                  top: 15,
                  bottom: 15,
                  left: 15,
                  right: 15,
                }}
                onPress={() => {
                  setImages(images.filter((value) => value != uri));
                }}
              >
                <View style={{ opacity: 0.8 }}>
                  <Ionicons
                    name="close-circle"
                    size={17}
                    color={colors.darkGray}
                  />
                </View>
              </MyPressable>
            </View>
          ))}
        </View>
        <View
          style={{
            backgroundColor: colors.darkGray,
            borderRadius: styles.borderRadius.sm,
            flexDirection: "row",
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowRadius: 8,
            // shadowOffset: { height: -8, width: 0 },
            paddingTop: 8,
            paddingBottom: 25,
            paddingRight: "9%",
            paddingLeft: "6%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MyPressable
              style={{
                width: 45,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={takePicture}
            >
              <CameraIcon width={21} height={21} />
            </MyPressable>
            <MyPressable
              style={{
                width: 45,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={pickImage}
            >
              <GalleryIcon width={21} height={21} />
            </MyPressable>
          </View>
          <MyPressable style={{ justifyContent: "center" }}>
            <MediumText style={{ fontSize: styles.fontSizes.md }}>
              임시저장
            </MediumText>
          </MyPressable>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Question;
