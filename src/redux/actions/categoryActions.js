import axios from "axios";
export const GET_CATEGORY = "GET_CATEGORY";

export const getCategory = () => {
  return (dispatch) => {
    axios
      .get(
        `https://4sleemnltgyu5hl4kotkycgmwi0uycqd.lambda-url.us-east-1.on.aws/Categories/GetCategories"`
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
