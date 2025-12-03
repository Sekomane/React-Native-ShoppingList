import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import AddItemForm from "../components/AddItemForm";
import ShoppingItem from "../components/ShoppingItem";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function HomeScreen() {
  const items = useSelector((state: RootState) => state.shopping.items);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Shopping List</Text>
      <AddItemForm />
      <View style={styles.list}>
        {items.map((item) => (
          <ShoppingItem key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f6f6f6", flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  list: { marginTop: 10 },
});
