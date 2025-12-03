import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button, TextInput, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, editItem, togglePurchased } from "../redux/slices/shoppingSlice";
import { Item } from "../types/Item";
import { RootState } from "../redux/store";
import { saveItems } from "../storage/persist";

export default function ShoppingItem({ item }: { item: Item }) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shopping.items);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(String(item.quantity));

  const handleSave = () => {
    const updated = { ...item, name, quantity: Number(qty) };
    dispatch(editItem(updated));
    saveItems(items.map(i => (i.id === item.id ? updated : i)));
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteItem(item.id));
    saveItems(items.filter(i => i.id !== item.id));
  };

  return (
    <Card style={styles.card}>
      {editing ? (
        <View style={styles.editContainer}>
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
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            buttonColor="#6200ee"
          >
            Save
          </Button>
          <Button
            mode="contained"
            onPress={() => setEditing(false)}
            style={styles.button}
            buttonColor="#b0b0b0"
          >
            Cancel
          </Button>
        </View>
      ) : (
        <View style={styles.normalContainer}>
          <Text style={item.purchased ? styles.purchased : styles.text}>
            {item.name} (x{item.quantity})
          </Text>
          <Switch
            value={item.purchased}
            onValueChange={() => {
              dispatch(togglePurchased(item.id));
              saveItems(
                items.map(i =>
                  i.id === item.id ? { ...i, purchased: !i.purchased } : i
                )
              );
            }}
          />
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => setEditing(true)}
              style={styles.button}
              buttonColor="#6200ee"
            >
              Edit
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              style={styles.button}
              buttonColor="#b00020"
            >
              Delete
            </Button>
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 10, padding: 10, elevation: 2 },
  normalContainer: { flexDirection: "column" },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editContainer: { paddingVertical: 5 },
  input: { marginBottom: 10 },
  button: { flex: 1, marginHorizontal: 2 },
  text: { fontSize: 16 },
  purchased: { fontSize: 16, textDecorationLine: "line-through", color: "gray" },
});
