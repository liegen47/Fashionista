import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import { ChevronDown } from "react-feather";
import { useLocation } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import useClickOutside from "@/hooks/useClickOutside";
import ProductList from "@/ui/ProductList";
import Container from "@/components/Container";
import api from "../api";
import { searchImage } from "../actions/searchImage";

import { CartContext, UserContext } from "@/App";

export default function SearchImageScreen(props) {
  const sortOptions = [
    "popular",
    "new",
    "price: low to high",
    "price: high to low",
  ];
  const { cartDispatch } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const [sort, setSort] = useState(0);
  const imagePath = location.state.searchImagePath;
  const productList = useSelector((state) => state.productImageSearch);
  const { loading, error, products = [] } = productList;
  const [showSortOptions, setShowSortOptions] = useState(false);
  const dropDownRef = useClickOutside(() => setShowSortOptions(false));

  useEffect(() => {
    console.log("Use Effect:  ", imagePath);
    dispatch(
      searchImage({
        imagePath: imagePath,
      })
    );
  }, [imagePath, dispatch]);

  useEffect(() => {
    if (!loading && products.length === 0 && !error) {
      // If products are not loaded and no error occurred, retry fetching products after 5 seconds
      const timer = setTimeout(() => {
        dispatch(
          searchImage({
            imagePath: imagePath,
          })
        );
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [loading, error, imagePath, dispatch, products.length]);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      const resp = await api.addProductsToCart([
        { productID: product._id, quantity },
      ]);
      if (resp.status === "ok") {
        cartDispatch({
          type: "ADD_PRODUCTS",
          payload: [{ ...product, quantity }],
        });
      }
    } else {
      cartDispatch({
        type: "ADD_PRODUCTS",
        payload: [{ ...product, quantity }],
      });
    }
  };

  return (
    <main>
      <Container heading={`Searched Products`} type="page">
        <section className="flex justify-end">
          <div className="relative" ref={dropDownRef}>
            <span className="font-bold">Sort by:</span>
            <Button
              secondary
              onClick={() => setShowSortOptions((prev) => !prev)}
            >
              {sortOptions[sort]} <ChevronDown className="ml-2" />
            </Button>

            {showSortOptions && (
              <DropDown
                className="mt-10 inset-x-0"
                onClick={() => setShowSortOptions(false)}
              >
                <Select>
                  {sortOptions.map((option, i) => (
                    <Option key={option} onClick={() => setSort(i)}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </DropDown>
            )}
          </div>
        </section>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : products.length === 0 ? (
          <MessageBox>No Product Found</MessageBox>
        ) : (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
      </Container>
    </main>
  );
}
