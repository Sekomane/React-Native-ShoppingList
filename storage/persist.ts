import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppDispatch } from "../redux/store";
import { setItems } from "../redux/slices/shoppingSlice";
import { Item } from "../types/Item";

const KEY = "SHOPPING_ITEMS";

export const saveItems = async (items: Item[]) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch (err) {
    console.log("Save error:", err);
  }
};

export const loadItems = async (dispatch: AppDispatch) => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    if (data) dispatch(setItems(JSON.parse(data)));
  } catch (err) {
    console.log("Load error:", err);
  }
};
