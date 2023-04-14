import React, { useEffect } from "react";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Community, Main, Notification, Question } from "../screens/MainTab";

import { colors, styles } from "../constants";
import { BoldText, HeaderBackButton, Logo, MyPressable } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./MainTab";
import { RegisteredStyle, ViewStyle } from "react-native";

export type StackGeneratorParamList = {
  Main: undefined;
  Community: undefined;
  Question0: undefined;
  Question2: undefined;
  Question3: undefined;
  Notification: undefined;
};

export interface StackGeneratorProps {
  screenName: "CommunityStack" | "MainStack" | "NotificationStack";
}

const initialRouteMapper: {
  [key: string]: keyof StackGeneratorParamList;
} = {
  MainStack: "Main",
  CommunityStack: "Community",
  NotificationStack: "Notification",
};

const screenIndexMapper: {
  [key: string]: number;
} = {
  CommunityStack: 0,
  MainStack: 1,
};

const Stack = createNativeStackNavigator<StackGeneratorParamList>();

const StackGenerator = ({ screenName }: StackGeneratorProps) => {
  const route = useRoute();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const focused = getFocusedRouteNameFromRoute(route) ?? screenName;
  // const { width } = useWindowDimensions();

  // useEffect(() => {
  //   if ([""].includes(focused) || focused.includes("Question")) {
  //   } else {
  //   }
  // }, [focused]);

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: "Arial Rounded MT Bold",
          },
          headerStyle: {
            backgroundColor: colors.darkGray,
          },

          headerTitle: () => <Logo scale={5} />,
        };
      }}
      initialRouteName={initialRouteMapper[screenName]}
    >
      <Stack.Group>
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen
          name={
            `Question${screenIndexMapper[screenName]}` as keyof StackGeneratorParamList
          }
          component={Question}
          options={({ navigation }) => ({
            presentation: "fullScreenModal",
            headerLeft: () => (
              <MyPressable onPress={navigation.goBack}>
                <BoldText
                  style={{
                    fontSize: styles.fontSizes.md,
                    marginHorizontal: 15,
                  }}
                >
                  취소
                </BoldText>
              </MyPressable>
            ),
          })}
        />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={({ navigation }) => ({
            title: "Send message",
            headerLeft: () => (
              <MyPressable onPress={() => navigation.pop()}>
                <Ionicons name="close" size={20} />
              </MyPressable>
            ),
          })}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default StackGenerator;
