import {
  PRODUCT_IMG_SEARCH_REQUEST,
  PRODUCT_IMG_SEARCH_SUCCESS,
  PRODUCT_IMG_SEARCH_FAIL,
} from "../constants/imageConstants.jsx";

const initialState = {
  products: [],
  loading: true,
};

const productImageSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_IMG_SEARCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_IMG_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: action.payload,
      };
    case PRODUCT_IMG_SEARCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productImageSearchReducer;
