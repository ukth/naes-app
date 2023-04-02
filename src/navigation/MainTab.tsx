import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import StackGenerator, { StackGeneratorParamList } from "./StackGenerator";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Question } from "../screens/MainTab";
import { Alert } from "react-native";

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
      }}
    >
      <BottomTab.Screen
        name="CommunityStack"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-person" : "ios-person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => {
          return <StackGenerator screenName="CommunityStack" />;
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
      />
      <BottomTab.Screen
        name="MainStack"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-person" : "ios-person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => {
          return <StackGenerator screenName="MainStack" />;
        }}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="NotificationStack"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-person" : "ios-person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => {
          return <StackGenerator screenName="NotificationStack" />;
        }}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

export default MainTab;
