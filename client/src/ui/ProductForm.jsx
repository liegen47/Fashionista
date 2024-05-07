import React, { useState } from "react";
import Input from "@/components/Input";
import {
  DivideCircle,
  DollarSign,
  FileText,
  ShoppingBag,
  CheckSquare,
  List,
  CloudRain,
} from "react-feather";
import Button from "@/components/Button";
import Loader from "../components/Loader";
import Alert from "@/components/Alert";
import api from "@/api";
const AddProduct = ({ onSubmit }) => {
  // State to manage form data

  //const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(false);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState(false);

  const handleChecked = (event) => {
    setInStock(event.target.checked);
  };
  const handleNewProductChecked = (event) => {
    setNewProduct(event.target.checked);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    const fileName = Date.now() + file.name;
    bodyFormData.append("name", fileName);
    bodyFormData.append("file", file);
    setLoading(true);
    try {
      var data = await api.uploadProduct(bodyFormData);
      console.log("Product upload successful:", data);

      setLoading(false);
    } catch (error) {
      console.error("Failed to upload product:", error);
      setLoading(false);
    }
    setImage(`http://localhost:4000/public/images/${fileName}`);
    console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // if (file) {
    //   const data = new FormData();
    //   const fileName = Date.now() + file.name;
    //   data.append("name", fileName);
    //   data.append("file", file);

    //   try {
    //     const response = await api.uploadProduct(data);
    //     console.log("Product upload successful:", response);
    //   } catch (error) {
    //     console.error("Failed to upload product:", error);
    //   }
    //   setImage(`http://localhost:4000/public/images/${fileName}`);
    //   console.log(image);
    // }
    // Validation checks can be added here before submitting the form
    try {
      const resp = await onSubmit({
        title,
        description,
        image,
        price,
        inStock,
        categories,
        size,
        color,
        newProduct,
      });
      if (resp.status == "error") {
        setError(resp.message);
      }

      setTitle("");
      setDescription("");
      setPrice(0);
      setInStock(false);
      setImage(false);
      setCategories([]);
      setSize([]);
      setColor([]);
      setError(null);
      setNewProduct(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col space-y-2"
      >
        <Input
          value={title}
          icon={<ShoppingBag width={20} height={20} />}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          required
        />
        <Input
          value={description}
          icon={<FileText width={20} height={20} />}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
          required
        />
        <input
          type="file"
          name="myImage"
          id="myImage"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={uploadFileHandler}
          required
        />
        <Input
          value={price}
          icon={<DollarSign width={20} height={20} />}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Price"
          required
        />
        <div>
          <label>
            In Stock:
            <Input
              value={inStock}
              icon={<CheckSquare width={20} height={20} />}
              onChange={handleChecked}
              type="checkbox"
              placeholder="InStock"
              required
            />
          </label>
        </div>
        <Input
          value={categories}
          icon={<DivideCircle width={20} height={20} />}
          onChange={(e) => setCategories(e.target.value)}
          type="text"
          placeholder="categories"
          required
        />
        <Input
          value={size}
          icon={<List width={20} height={20} />}
          onChange={(e) => setSize(e.target.value)}
          type="text"
          placeholder="size"
          required
        />
        <Input
          value={color}
          icon={<CloudRain width={20} height={20} />}
          onChange={(e) => setColor(e.target.value)}
          type="text"
          placeholder="color"
          required
        />{" "}
        <div>
          <label>
            Is it a new product ? :
            <Input
              value={newProduct}
              icon={<CheckSquare width={20} height={20} />}
              onChange={handleNewProductChecked}
              type="checkbox"
              placeholder="New Product"
              required
            />
          </label>
        </div>
        {error && <Alert heading="Error!" body={error} danger />}
        <Button
          className="w-full !mt-6 !text-base !rounded-full"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader /> : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
