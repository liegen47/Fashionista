import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    imgSrc: "",
    brand: "",
    productName: "",
    productType: "",
    Price: "",
    SKU: "",
    stock: "",
    Weight: "",
    Width: "",
    Height: "",
    Depth: "",
    MinimumPurchase: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditFormData(product);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
    console.log(editFormData);
  };

  const submitEdit = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/products/${editFormData.id}`,
        editFormData
      );
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-auto mr-4 w-full">
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Image Source
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Brand
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Product Name
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Product Type
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Price
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">SKU</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Stock
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Weight
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Width
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Height
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Depth
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Minimum Purchase
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{product.imgSrc}</td>
              <td className="px-4 py-2 border">{product.brand}</td>
              <td className="px-4 py-2 border">{product.productName}</td>
              <td className="px-4 py-2 border">{product.productType}</td>
              <td className="px-4 py-2 border">{product.Price}</td>
              <td className="px-4 py-2 border">{product.SKU}</td>
              <td className="px-4 py-2 border">{product.stock}</td>
              <td className="px-4 py-2 border">{product.Weight}</td>
              <td className="px-4 py-2 border">{product.Width}</td>
              <td className="px-4 py-2 border">{product.Height}</td>
              <td className="px-4 py-2 border">{product.Depth}</td>
              <td className="px-4 py-2 border">{product.MinimumPurchase}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => editProduct(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Edit Product</h2>
          <form onSubmit={submitEdit}>
            <input
              type="text"
              name="id"
              value={editFormData.id}
              onChange={handleEditChange}
              placeholder="id"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              name="imgSrc"
              value={editFormData.imgSrc}
              onChange={handleEditChange}
              placeholder="Image Source"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="brand"
              value={editFormData.brand}
              onChange={handleEditChange}
              placeholder="Brand"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="productName"
              value={editFormData.productName}
              onChange={handleEditChange}
              placeholder="Product Name"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="productType"
              value={editFormData.productType}
              onChange={handleEditChange}
              placeholder="Product Type"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="Price"
              value={editFormData.Price}
              onChange={handleEditChange}
              placeholder="Price"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="SKU"
              value={editFormData.SKU}
              onChange={handleEditChange}
              placeholder="SKU"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="stock"
              value={editFormData.stock}
              onChange={handleEditChange}
              placeholder="Stock"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="Weight"
              value={editFormData.Weight}
              onChange={handleEditChange}
              placeholder="Weight"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="Width"
              value={editFormData.Width}
              onChange={handleEditChange}
              placeholder="Width"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="Height"
              value={editFormData.Height}
              onChange={handleEditChange}
              placeholder="Height"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="Depth"
              value={editFormData.Depth}
              onChange={handleEditChange}
              placeholder="Depth"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              name="MinimumPurchase"
              value={editFormData.MinimumPurchase}
              onChange={handleEditChange}
              placeholder="Minimum Purchase"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
