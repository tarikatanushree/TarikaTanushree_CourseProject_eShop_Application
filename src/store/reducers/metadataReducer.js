let initialState = {
  selectedCategory: null,
  categories: [],
  products: [],
  selectedSortBy: "DEFAULT",
};

const actionReducer = (state = initialState, action) => {
  let data;
  switch (action.type) {
    case "SET_FILTER": {
      data = {
        ...state,
        selectedCategory: action.category,
      };
      break;
    }
    case "CLEAR_FILTER": {
      data = {
        ...state,
        selectedCategory: null,
      };
      break;
    }
    case "SET_SORTING": {
      data = {
        ...state,
        selectedSortBy: action.sortBy,
      };
      break;
    }
    case "INIT_CATALOG": {
      data = {
        ...state,
        categories: action.categories,
        products: action.products,
      };
      break;
    }
    case "CLEAR_ALL": {
      data = initialState;
      break;
    }
    default: {
      data = state;
    }
  }
  localStorage.setItem("upgrad_eshop_metadata", JSON.stringify(data));
  return data;
};

export default actionReducer;
