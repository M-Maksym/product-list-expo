import React, { useEffect, useState } from "react";
import { Pressable, Image, Text, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

interface ProductCardProps {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [cardWidth, setCardWidth] = useState<number>();
  const router = useRouter();
  useEffect(() => {
    const screenWidth = Dimensions.get("window").width;
    const width = (screenWidth - 68) / 2;
    setCardWidth(width);
  }, []);

  const handleTitle = (title: string) => {
    let result;
    if (title.length > 26) {
      result = title.slice(0, 24) + "...";
    } else {
      result = title;
    }
    return result;
  };

  return (
    <Pressable
      style={{ ...styles.card, width: cardWidth }}
      onPress={() => router.navigate(`/productDetails/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.card__image} />
      <Text style={styles.card__title}>{handleTitle(item.title)}</Text>
      <Text style={styles.card__price}>${item.price}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default ProductCard;
