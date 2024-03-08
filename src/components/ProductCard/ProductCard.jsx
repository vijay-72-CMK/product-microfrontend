import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ productItem }) => {
  const handleAddToCart = async (productItem) => {
    try {
      const productId = productItem.id;
      const quantity = 1;
      const response = await axios.post(
        "http://localhost:8082/api/cart/modify-cart",
        {
          productId,
          quantity,
        },
        { withCredentials: true }
      );
      console.log("Cart updated", response);
      window.dispatchEvent(
        new CustomEvent("cart-change", {
          detail: { productId, quantity },
        })
      );
      console.log("Event dispatched: cart-change from products page");
      toast.success(`Added to cart!`);
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Error adding item to cart, sign in");
    }
  };
  return (
    <Card className={`${styles.product} mb-5 mx-auto border-0`}>
      <Link to={`/products/${productItem.id}`}>
        <Card.Img
          variant="top"
          src={productItem.images[0]}
          alt={productItem.name}
          className={styles.productImage}
        />
      </Link>

      <Card.Body className="text-start">
        <Card.Title className="fw-bold">{productItem.name}</Card.Title>
        <div className="d-flex align-items-center">
          <Rating rating={productItem.averageRating} />
          <span className="ms-auto">({productItem.averageRating})</span>
        </div>
        <div className="d-flex align-items-center mt-3">
          <span className="fw-bold">${productItem.price}</span>
          <button
            onClick={() => handleAddToCart(productItem)}
            className="ms-auto btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </Card.Body>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Card>
  );
};

export default ProductCard;
