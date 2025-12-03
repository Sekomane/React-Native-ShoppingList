import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../types/Item";

interface ShoppingState {
  items: Item[];
}

const initialState: ShoppingState = {
  items: []
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    editItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    }
  }
});

export const { addItem, editItem, deleteItem, togglePurchased, setItems } =
  shoppingSlice.actions;

export default shoppingSlice.reducer;
