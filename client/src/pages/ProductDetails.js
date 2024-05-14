
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart"; // Import the useCart context
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart(); // Use the useCart hook

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    toast.success("Item Added to Cart");
  };


  return (
    <Layout>
      <div className="product-details-container">
        <div className="product-image">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            Price: {product?.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}
          </p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            CART
          </button>
        </div>
      </div>

      <div className="similar-products">
        <h4>You might also like</h4>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products found</p>}
        <div className="related-products-grid">
          {relatedProducts?.map((p) => (
            <div className="related-product-card" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="product-info">
                <h5 className="product-name">{p.name}</h5>
                <h5 className="product-price">
                  {p.price.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                </h5>
                <p className="product-description">{p.description.substring(0, 60)}...</p>
                <div className="product-buttons">
                  <button className="view-btn" onClick={() => navigate(`/product/${p.slug}`)}>
                    View
                  </button>
                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>
                    CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
