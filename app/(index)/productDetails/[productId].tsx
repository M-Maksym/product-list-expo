import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { appColors } from "@/constants/Colors";
import { useFonts } from "expo-font";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export default function ProductDetail() {
  const { productId } = useLocalSearchParams(); //getting ID
  const [productDetail, setProductDetail] = useState<Product>(); //information about product
  useEffect(() => {
    fetchProducts();
  }, []);
  const router = useRouter();
  //get token for authorization
  const getSecureToken = async () => {
    let result = await SecureStore.getItemAsync("authToken");
    return result;
  };
  //get information about product by id
  const fetchProducts = async () => {
    try {
      const token = await getSecureToken();
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setProductDetail(json);
    } catch (error) {
      console.error("Error with fetching:", error);
      alert("Product is unavailable");
      router.back();
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Image
          source={require("../../../assets/images/backIcon.png")}
          style={styles.backIcon}
        />
      </Pressable>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: productDetail?.image }}
          style={styles.producImage}
        />
      </View>

      <Text style={styles.title}>{productDetail?.title}</Text>
      <Text style={styles.price}>${productDetail?.price}</Text>
      <Text style={styles.description}>{productDetail?.description}</Text>
      <Text style={styles.shippingDetail}>Shipping & Returns</Text>
      <Text style={styles.shippingDetailDescription}>
        Free standard shipping and free 60-day returns
      </Text>
      <Text style={styles.reviews}>Reviews</Text>
      <Text style={styles.rating}>
        {(Math.random() * 4 + 1).toFixed(1)} Ratings
      </Text>
      <Text style={styles.reviewNumber}>
        {Math.floor(Math.random() * 991) + 10} Reviews
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 24,
    paddingTop: 63,
    paddingBottom: 0,
    backgroundColor: appColors.background,
  },
  title: {
    fontSize: 16,
    color: appColors.title,
    fontWeight: 400,
    marginBottom: 8,
    fontFamily: "Alata-Regular",
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  producImage: {
    maxWidth: "100%",
    minWidth: 177,
    height: 250,
  },
  imageWrapper: {
    maxWidth: "70%",
    minWidth: 177,
    height: 250,
    resizeMode: "contain",
    marginTop: 12,
    marginBottom: 12,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    color: "#FFD600",
    fontWeight: "700",
    marginBottom: 12,
    fontFamily: "Gabarito-Bold",
  },
  shippingDetail: {
    fontSize: 16,
    color: appColors.title,
    fontWeight: "400",
    marginBottom: 12,
    fontFamily: "Alata-Regular",
  },
  shippingDetailDescription: {
    fontSize: 12,
    color: appColors.title,
    fontWeight: "400",
    marginBottom: 24,
    fontFamily: "Alata-Regular",
    lineHeight: 22,
    opacity: 0.5,
  },
  description: {
    fontSize: 14,
    color: appColors.title,
    fontWeight: "400",
    marginBottom: 24,
    fontFamily: "Alata-Regular",
    lineHeight: 22,
    opacity: 0.5,
  },
  reviews: {
    fontSize: 16,
    color: appColors.title,
    fontWeight: "400",
    marginBottom: 12,
    fontFamily: "Alata-Regular",
    lineHeight: 22,
  },
  rating: {
    fontSize: 24,
    color: appColors.title,
    fontWeight: "400",
    marginBottom: 12,
    fontFamily: "Alata-Regular",
    lineHeight: 33,
  },
  reviewNumber: {
    fontSize: 12,
    color: appColors.title,
    fontWeight: "400",
    fontFamily: "Alata-Regular",
    lineHeight: 19,
    opacity: 0.5,
  },
});
