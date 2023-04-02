import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Enter, Join } from "../screens/AuthStack/index";
import { HeaderBackButton, Logo } from "../components";
import { colors } from "../constants";
// import { SearchCollege, Enter } from "@screens/AuthStack";

export type AuthStackParamList = {
  Enter: undefined;
  Join: {
    phone: string;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Enter"
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
          headerShadowVisible: false,
          headerShown: false,
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.pop()} />
          ),
        };
      }}
    >
      <Stack.Screen name="Enter" component={Enter} />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
