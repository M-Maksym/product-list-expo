import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { appColors } from "@/constants/Colors";
import ProductCard from "@/components/ui/ProductCard";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  async function getSecureToken() {
    let result = await SecureStore.getItemAsync("authToken");
    return result;
  }
  const fetchProducts = async () => {
    try {
      const token = await getSecureToken();
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      console.error("Error with fetching:", error);
    }
  };

  const renderItem = ({ item }: any) => <ProductCard item={item} />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          gap: 20,
        }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 24,
    paddingTop: 43,
    paddingBottom: 0,
    backgroundColor: appColors.background,
  },
  title: {
    fontSize: 16,
    color: appColors.title,
    fontWeight: 400,
    marginBottom: 20,
    paddingTop: 20,
    fontFamily: "Alata-Regular",
  },
  card: {
    backgroundColor: "#3D3C37",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  card__title: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "400",
    marginBottom: 8,
    fontFamily: "Alata-Regular",
    paddingLeft: 4,
  },
  card__price: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: "Gabarito-Bold",
    paddingLeft: 4,
  },
  card__image: {
    width: "100%",
    aspectRatio: 0.75,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
});
