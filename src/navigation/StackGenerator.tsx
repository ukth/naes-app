import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Community, Main, Notification, Question } from "../screens/MainTab";

import { colors } from "../constants";
import { HeaderBackButton, Logo, MyPressable } from "../components";
import { Ionicons } from "@expo/vector-icons";

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
  MainStack: 2,
  NotificationStack: 3,
};

const Stack = createNativeStackNavigator<StackGeneratorParamList>();

const StackGenerator = ({ screenName }: StackGeneratorProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  // const focused = getFocusedRouteNameFromRoute(route) ?? screenName;
  // const { width } = useWindowDimensions();

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
          headerLeft: () =>
            navigation.getState().routes.length > 1 ? (
              <HeaderBackButton onPress={() => navigation.pop()} />
            ) : null,
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
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
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
