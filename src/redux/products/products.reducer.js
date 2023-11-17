
// тут створюємо початковий стан
const initialState = {
  products: JSON.parse(localStorage.getItem('products')) ?? prod, // [{}, {}, ...]
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'products/deleteProduct': {
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload
        ),
      };
    }
    case 'products/addProduct': {
      // state.products = [...state.products, action.payload];❌
      return {
        ...state,
        products: [...state.products, action.payload], // ✅
      };
    }
    default:
      return state;
  }
};
