import axios from "axios";
import { getCategories } from "../../helpers/Constant";
export const GET_CATEGORY = "GET_CATEGORY";

export const getCategory = () => {
  return (dispatch) => {
    axios
      .get(
        getCategories
      )
      .then((response) => {
        dispatch({
          type: GET_CATEGORY,
          payload: { Category: response.Data },
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
};
