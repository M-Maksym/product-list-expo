import Button from "@/components/ui/Button";
import { appColors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; //put username
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store"; //get and put authentication token

export default function SignIn() {
  const [username, setUsername] = useState(""); //input for username
  const [errors, setErrors] = useState(""); // any errors which can be displayed for the user
  const [isLoading, setIsLoading] = useState(false); //button spinner
  const router = useRouter();
  useEffect(() => {
    // get the token if it exists
    getToken();
  });
  const getToken = async () => {
    let result = await SecureStore.getItemAsync("authToken");
    if (result) {
      router.replace("/(index)");
    }
  };
  //function for handle inputs and navigate to another page
  const handleAuthClick = async () => {
    setIsLoading(true); //button spinner
    setErrors("");
    if (!username) {
      setErrors("Please enter a username");
      setIsLoading(false);
      return;
    }
    try {
      await AsyncStorage.setItem("username", username);
      setIsLoading(false);
      router.navigate("./enter-password");
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        setErrors(error.message);
      } else {
        setErrors("Error with saving username");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
        value={username}
        onChangeText={(username) => setUsername(username)}
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
