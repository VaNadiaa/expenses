import { createSlice, nanoid } from "@reduxjs/toolkit";

const addZero = (num) => {
  if (num >= 0 && num <= 9) {
    return '0' + num;
  } else {
    return num;
  }
}

export const getDateNow = () => {
  let date = new Date();
  let nowDate =
    addZero(date.getFullYear()) +
    "-" +
    addZero(date.getMonth() + 1) +
    "-" +
    addZero(date.getDate());
  return nowDate;
}

export const getDateFormat = (date) => {
  if (date.includes("-")) {
    return date.split("-").reverse().join(".");
  } else if (date.includes(".")) {
    return date.split(".").reverse().join("-");
  }
  return date;
}

const getInitialState = () => {
  const storedData = localStorage.getItem("persist:root");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return JSON.parse(parsedData.products || '[]');
  }
}
const initialState = getInitialState() || [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action) {
        const { date, product } = action.payload
        const existingEntry = state.find(entry => Object.keys(entry)[0] === date);

        if (existingEntry) {
          return state.map(entry => {
            if (Object.keys(entry)[0] === date) {
              return {
                [date]: [product, ...entry[date]]
              }
            }
            return entry;
          })
        } else {
          return [{ [date]: [product] }, ...state]
        }
      },
      prepare(category, name, price, date) {
        return {
          payload: {
            product: {
              id: nanoid(6),
              category,
              name,
              price
            },
            date
          },
        };
      },
    },

    saveChanges(state, action) {
      const { id, category, name, price } = action.payload;
      const productEntry = state.find((product) => {
        const dateKey = Object.keys(product)[0];
        const foundProducts = product[dateKey].find(item => item.id === id);
        return foundProducts;
      });
      if (productEntry) {
        const dateKey = Object.keys(productEntry)[0];
        const desiredProduct = productEntry[dateKey].find(item => item.id === id);
        if (desiredProduct) {
          desiredProduct.category = category;
          desiredProduct.name = name;
          desiredProduct.price = price;
        }
      }
    },

    deleteProduct(state, action) {
      const { id } = action.payload;
      return state.map((product) => {
        const dateKey = Object.keys(product)[0];
        const foundProduct = product[dateKey].filter(item => item.id !== id);
        if (foundProduct.length > 0) {
          return { [dateKey]: foundProduct };
        }
        return null;
      }).filter(Boolean);
    }
  },
});

export default productsSlice.reducer;
export const { productAdded, saveChanges, deleteProduct } =
  productsSlice.actions;
