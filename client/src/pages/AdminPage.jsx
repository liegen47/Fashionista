import React, { useContext } from "react";
import { sliderItems } from "@/dummydata";

import { UserContext, CartContext } from "@/App";
import api from "@/api";
import { useNavigate } from "react-router-dom";

import RegisterForm from "@/ui/RegisterForm";
import AddProduct from "../ui/ProductForm";

export default function AdminPage() {
  const { cart } = useContext(CartContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmitProduct = async (productData) => {
    try {
      const resp = await api.submitProduct(productData);

      // Check if the response status is OK
      if (resp.status === "ok") {
        // Perform any additional actions after successful submission
        console.log("Product submitted successfully!");
      } else {
        // Handle errors if the submission fails
        console.error("Product submission failed:", resp.message);
      }

      // Return the response
      return resp;
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred while submitting the product:", error);
      // Return an error response
      return {
        status: "error",
        message: "An error occurred while submitting the product.",
      };
    }
  };
  // const handleRegister = async (userData) => {
  //   const resp = await api.registerUser(userData);
  //   if (resp.status == "ok") {
  //     const loginResp = await api.loginUser(userData);
  //     if (loginResp.status == "ok") {
  //       setUser(api.getUser());
  //       await api.createUserCart(
  //         cart.products.map((p) => ({
  //           productID: p.id,
  //           quantity: p.quantity,
  //         }))
  //       );

  //       if (cart.products.length) {
  //         navigate("/cart");
  //       } else {
  //         navigate("/account");
  //       }
  //     }
  //   }
  //   return resp;
  // };

  const randomSlide =
    sliderItems[Math.floor(Math.random() * sliderItems.length)];

  return (
    <main
      className="flex justify-center h-screen items-center bg-cover bg-center sm:bg-left"
      style={{ backgroundImage: `url(${randomSlide.image})` }}
    >
      <div className="min-w-sm p-6 rounded-lg bg-white filter drop-shadow-2xl">
        <h3 className="text-2xl font-bold text-center mb-6">
          Create a new Product
        </h3>
        <AddProduct onSubmit={handleSubmitProduct} />
      </div>
    </main>
  );
}
