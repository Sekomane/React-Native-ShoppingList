import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slices/shoppingSlice";
import { RootState } from "../redux/store";
import { Item } from "../types/Item";
import { saveItems } from "../storage/persist";

export default function AddItemForm() {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("1");
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shopping.items);

  const handleAdd = () => {
    if (!name.trim()) return;

    const newItem: Item = {
      id: globalThis.crypto.randomUUID(),
      name,
      quantity: Number(qty),
      purchased: false,
    };

    dispatch(addItem(newItem));
    saveItems([...items, newItem]);
    setName("");
    setQty("1");
  };

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <TextInput
          label="Item Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Quantity"
          value={qty}
          onChangeText={setQty}
          keyboardType="number-pad"
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleAdd}>
          Add Item
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, marginBottom: 20, elevation: 4 },
  container: { padding: 10 },
  input: { marginBottom: 10 },
});
