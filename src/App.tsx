import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { ProgressProvider } from "./contexts/progressContext";
// import { UserContext, UserProvider } from "./contexts/userContext";
// import * as Notifications from "expo-notifications";

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
import Navigation from "./navigation";
import { useEffect } from "react";
import { Alert } from "react-native";
import { ProgressProvider } from "./contexts/progressContext";
import { UserProvider } from "./contexts/userContext";

// const registerForPushNotificationsAsync = async () => {
//   if (Constants?.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     const token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }
// };

export default function App() {
  // const colorScheme = useColorScheme();
  useEffect(() => {
    // registerForPushNotificationsAsync();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <ProgressProvider>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </ProgressProvider>
    </>
  );
}
