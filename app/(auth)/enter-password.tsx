import Button from "@/components/ui/Button";
import { appColors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleError = (error: number): string => {
    let errorMessage = "An unexpected error occurred."; //default value

    switch (error) {
      case 400:
        errorMessage =
          "Bad Request: The server could not understand the request.";
        break;
      case 401:
        errorMessage = "Unauthorized: Please check your credentials.";
        break;
      case 403:
        errorMessage =
          "Forbidden: You do not have permission to access this resource.";
        break;
      case 404:
        errorMessage = "Not Found: The requested resource could not be found.";
        break;
      case 500:
        errorMessage =
          "Internal Server Error: Something went wrong on the server.";
        break;
      case 502:
        errorMessage = "Bad Gateway: The server received an invalid response.";
        break;
      case 503:
        errorMessage =
          "Service Unavailable: The server is temporarily unavailable.";
        break;
      default:
        errorMessage = `Unexpected error: HTTP status code ${error}.`;
        break;
    }

    return errorMessage;
  };

  const fetchToken = async (username: string) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        setErrors(handleError(response.status));
      }

      const json = await response.json();
      await SecureStore.setItemAsync("authToken", json?.token);
      router.replace("/(index)");
    } catch (error) {
      console.error("Error with fetching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthClick = async () => {
    setIsLoading(true);
    setErrors("");
    if (!password) {
      setErrors("Please enter a password");
      setIsLoading(false);
      return;
    } else {
      //getting username
      try {
        const username = await AsyncStorage.getItem("username");
        if (username) {
          await fetchToken(username);
        }
      } catch (error: unknown) {
        setIsLoading(false);
        if (error instanceof Error) {
          setErrors(error.message);
        } else {
          setErrors("Error with getting username");
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={handleAuthClick} loading={isLoading}>
        Continue
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 23,
    paddingTop: appColors.statusBarMargin,
    backgroundColor: appColors.background,
  },
  title: {
    fontSize: 32,
    color: appColors.title,
    fontWeight: 400,
    marginBottom: 32,
    fontFamily: "Alata-Regular",
  },
  input: {
    backgroundColor: appColors.inputBackgroundColor,
    color: appColors.title,
    width: "100%",
    paddingHorizontal: 12,
    paddingTop: 19,
    paddingBottom: 15,
    marginBottom: 16,
    borderRadius: 4,
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Alata-Regular",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Alata-Regular",
  },
});
