import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Spinner = ({ className = "h-4 w-4 text-white" }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const Products = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("loginToken");

      if (!token) {
        alert("You must be logged in.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `https://mvc-production-b794.up.railway.app/users/products?token=${token}`
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setImageURL("");
    setDescription("");
    setEditingId(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("loginToken");

      const response = await axios.post(
        "https://mvc-production-b794.up.railway.app/users/addproduct",
        { title, imageURL, description, token }
      );

      setProducts([...products, response.data]);
      clearForm();
    } catch (error) {
      console.log(error);
      alert("Failed to add product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("loginToken");

      await axios.delete(
        `https://mvc-production-b794.up.railway.app/users/deleteproduct/${id}?token=${token}`
      );

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
      alert("Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setTitle(product.title);
    setImageURL(product.imageURL);
    setDescription(product.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("loginToken");

      const response = await axios.put(
        `https://mvc-production-b794.up.railway.app/users/updateproduct/${editingId}`,
        { title, imageURL, description, token }
      );

      setProducts(
        products.map((product) =>
          product._id === editingId ? response.data : product
        )
      );

      clearForm();
    } catch (error) {
      console.log(error);
      alert("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Products
        </h2>

        <form
          onSubmit={editingId ? handleUpdate : handleAddProduct}
          className="bg-white p-6 rounded-2xl shadow-md mb-10 animate-fade-in"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none
                         transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none
                         transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none resize-none
                         transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium
                         px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-indigo-700
                         active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <Spinner />}
              {submitting
                ? editingId ? "Updating..." : "Adding..."
                : editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium
                           transition-all duration-200 hover:bg-slate-100 active:scale-95"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Product List
        </h3>

        {pageLoading ? (
          <div className="flex justify-center py-16">
            <Spinner className="h-8 w-8 text-indigo-600" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-slate-500 text-center py-10">No products yet.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-5">
            {products.map((product) => (
              <li
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in
                           transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={product.imageURL}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h4 className="text-lg font-semibold text-slate-800 mb-1">
                    {product.title}
                  </h4>
                  <p className="text-sm text-slate-500 mb-4">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-600
                                 text-sm font-medium transition-all duration-200 hover:bg-indigo-50 active:scale-95"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg
                                 border border-red-200 text-red-600 text-sm font-medium transition-all
                                 duration-200 hover:bg-red-50 active:scale-95 disabled:opacity-60"
                    >
                      {deletingId === product._id && (
                        <Spinner className="h-3.5 w-3.5 text-red-600" />
                      )}
                      {deletingId === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;