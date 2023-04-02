import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
import { MainTabParamList } from "./MainTab";
import { StackGeneratorParamList } from "./StackGenerator";

const linking: LinkingOptions<MainTabParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {},
  },
};

export default linking;
