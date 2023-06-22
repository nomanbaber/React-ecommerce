import { GET_CATEGORY } from "../actions/categoryActions";

const initState = {
  //   currencySymbol: "$",
  //   currencyName: "USD",
  //   currencyRate: 1,
  Category: [],
};

const currencyReducer = (state = initState, action) => {
  if (action.type === GET_CATEGORY) {
    return {
      ...state,
      Category:action.payload
    };
  }

  return state;
};

export default currencyReducer;
