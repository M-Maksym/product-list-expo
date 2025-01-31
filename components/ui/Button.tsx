import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { appColors } from "@/constants/Colors";

type ButtonVariant = "authentication";
type ButtonSize = "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "authentication",
  size = "lg",
  disabled = false,
  children,
  loading = false,
  style,
  textStyle,
}) => {
  const sizeStyle: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    lg: { height: 49, fontSize: 16, padding: 11 },
  };

  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 100,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    };
    switch (variant) {
      case "authentication":
        return {
          ...baseStyle,
          backgroundColor: appColors.authButtonColor,
        };
      default:
    }
  };
  const getTextColor = () => {
    switch (variant) {
      case "authentication":
        return appColors.authButtonTextColor;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle(),
        {
          height: sizeStyle[size].height,
          paddingHorizontal: sizeStyle[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyle[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              fontWeight: "400",
              marginBottom: 0,
              fontFamily: "Alata-Regular",
            },
          ])}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
