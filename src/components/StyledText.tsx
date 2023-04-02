import { Text, TextInput, TextInputProps, TextProps } from "react-native";
import { colors } from "../constants";

export const LightText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: colors.white },
        props.style,
        { fontFamily: "KoPub Dotum Pro Light" },
      ]}
    />
  );
};

export const MediumText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: colors.white },
        props.style,
        { fontFamily: "KoPub Dotum Pro Medium" },
      ]}
    />
  );
};

export const BoldText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: colors.white },
        props.style,
        { fontFamily: "KoPub Dotum Pro Bold" },
      ]}
    />
  );
};

export const LightNumText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: colors.white },
        props.style,
        { fontFamily: "SpaceGrotesk-Light" },
      ]}
    />
  );
};

export const MediumNumText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: colors.white },
        props.style,
        { fontFamily: "SpaceGrotesk-Medium" },
      ]}
    />
  );
};

export const BoldNumText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: colors.white },
        props.style,
        { fontFamily: "SpaceGrotesk-Bold" },
      ]}
    />
  );
};

export const LightTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      autoCorrect={false}
      {...props}
      style={[props.style, { fontFamily: "KoPub Dotum Pro Light" }]}
    />
  );
};

export const MediumTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      autoCorrect={false}
      {...props}
      style={[props.style, { fontFamily: "KoPub Dotum Pro Medium" }]}
    />
  );
};

export const BoldTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      autoCorrect={false}
      {...props}
      style={[props.style, { fontFamily: "KoPub Dotum Pro Bold" }]}
    />
  );
};

export const RegTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      autoCorrect={false}
      {...props}
      style={[props.style, { fontFamily: "Arial Hebrew" }]}
    />
  );
};
