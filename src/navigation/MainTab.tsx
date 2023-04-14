import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import StackGenerator, { StackGeneratorParamList } from "./StackGenerator";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Question } from "../screens/MainTab";
import { Alert } from "react-native";
import HomeIcon from "../../assets/images/icon_home.svg";
import MainIcon from "../../assets/images/icon_main.svg";
import EditIcon from "../../assets/images/icon_edit.svg";

export type MainTabParamList = {
  CommunityStack: NavigatorScreenParams<StackGeneratorParamList>;
  MainStack: NavigatorScreenParams<StackGeneratorParamList>;
  Question: undefined;
  NotificationStack: NavigatorScreenParams<StackGeneratorParamList>;
};

const QuestionScreenComponent = () => null;

const BottomTab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "black",
        headerStyle: {
          backgroundColor: colors.darkGray,
        },
        tabBarStyle: {
          backgroundColor: colors.darkGray,
          shadowColor: colors.black,
          shadowOpacity: 0.1,
          borderTopWidth: 0,
        },
      }}
    >
      <BottomTab.Screen
        name="CommunityStack"
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon height={focused ? 22 : 20} width={focused ? 22 : 20} />
          ),
        }}
      >
        {() => {
          return <StackGenerator screenName="CommunityStack" />;
        }}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="MainStack"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MainIcon height={focused ? 22 : 20} width={focused ? 22 : 20} />
          ),
        }}
      >
        {() => {
          return <StackGenerator screenName="MainStack" />;
        }}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Question"
        component={QuestionScreenComponent}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(`Question${navigation.getState().index}`);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <EditIcon height={focused ? 22 : 20} width={focused ? 22 : 20} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainTab;
