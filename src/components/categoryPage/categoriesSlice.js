import { createSlice, nanoid } from "@reduxjs/toolkit";

export const NUMBER_OF_SYMBOLS = 20;

const getInitialState = () => {
  const storedData = localStorage.getItem("persist:root"); 

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return JSON.parse(parsedData.categories || '[]'); 
  }
  return []; 
};

const initialState = getInitialState();

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryAdded: {
      reducer(state, action) {
        return [action.payload, ...state]
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(6),
            name
          },
        };
      },
    },

    saveChanges(state, action) {
      const { id, name } = action.payload;
      const desiredCategory = state.find((category) => category.id === id);
      if (desiredCategory) {
        desiredCategory.name = name;
      }
    },

    categoryDelete(state, action) {
      return state.filter(category => category.id !== action.payload)
    },
  },
});

export default categoriesSlice.reducer;
export const { categoryAdded, saveChanges, categoryDelete, } =
  categoriesSlice.actions;
