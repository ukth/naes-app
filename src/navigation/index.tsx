import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useContext } from "react";
import { Text } from "react-native";
import { ProgressContext } from "../contexts/progressContext";
import { USER_KEY } from "../constants";
import { UserContext } from "../contexts/userContext";
import useCachedResources from "../hooks/useCachedResources";
import AuthStack from "./AuthStack";
import LinkingConfiguration from "./LinkingConfiguration";
import MainTab from "./MainTab";
import { ScreenContainer, Spinner } from "../components";

const Navigation = () => {
  const isLoadingComplete = useCachedResources();
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  useEffect(() => {
    (async () => {
      if (user) {
        AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    })();
  }, [user]);

  return isLoadingComplete ? (
    <NavigationContainer>
      {user ? <MainTab /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  ) : (
    <ScreenContainer />
  );
};

export default Navigation;
