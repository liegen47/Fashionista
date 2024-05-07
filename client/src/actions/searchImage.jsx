import Axios from "axios";
import {
  PRODUCT_IMG_SEARCH_REQUEST,
  PRODUCT_IMG_SEARCH_SUCCESS,
  PRODUCT_IMG_SEARCH_FAIL,
} from "../constants/imageConstants";
const API_URL = "http://localhost:4000";
export const searchImage =
  ({ imagePath }) =>
  async (dispatch, getState) => {
    dispatch({ type: PRODUCT_IMG_SEARCH_REQUEST });
    // const {
    //   userSignin: { userInfo },
    // } = getState();
    try {
      const { data } = await Axios.post(`${API_URL}/products/search_image`, {
        searchImagePath: imagePath,
      });

      console.log("Search Image Response:", data); // Add this line to log the response

      dispatch({
        type: PRODUCT_IMG_SEARCH_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_IMG_SEARCH_FAIL, payload: message });
    }
  };
