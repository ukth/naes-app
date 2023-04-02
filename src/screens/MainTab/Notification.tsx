import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../../contexts/userContext";
import { StackGeneratorParamList } from "../../navigation/StackGenerator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../constants";
import { BoldText } from "../../components/StyledText";
import { ErrorComponent, MyPressable, ScreenContainer } from "../../components";
import { logout } from "../../util";

const Notification = ({
  route,
}: {
  route: RouteProp<StackGeneratorParamList, "Notification">;
}) => {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  if (!user) {
    return <ErrorComponent />;
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<StackGeneratorParamList>>();

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView style={{ paddingHorizontal: "1%" }}>
        <View>
          <BoldText style={{ fontSize: 12, color: colors.white }}>
            Notification Screen
          </BoldText>
          <MyPressable
            style={{ height: 50, width: 200, backgroundColor: colors.magenta }}
            onPress={() => logout(userContext)}
          >
            <BoldText>Logout</BoldText>
          </MyPressable>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default Notification;
