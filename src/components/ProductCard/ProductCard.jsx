import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../CustomButtonComponent/CustomButton";

const ProductCard = ({ productItem }) => {
  const shortProductName =
    productItem.name.length > 17
      ? productItem.name.slice(0, 17) + "..."
      : productItem.name;

  const handleAddToCart = async (productItem) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") || false;
    if (!isLoggedIn) {
      toast.error("Please sign in to add to cart");
      return;
    }

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
        <Card.Title className="fw-bold" title={productItem.name}>
          {shortProductName}
        </Card.Title>
        <div className="d-flex align-items-center">
          <Rating rating={productItem.averageRating} />
          <span className="ms-auto">({productItem.averageRating})</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <span className="fw-bold">${productItem.price}</span>
          <CustomButton size="md" onClick={() => handleAddToCart(productItem)}>
            <span>Add To Cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${styles.plusIcon}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </CustomButton>
          {/* <button
            onClick={() => handleAddToCart(productItem)}
            className="ms-auto btn btn-primary"
          >
            Add to Cart
          </button> */}
        </div>
      </Card.Body>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Card>
  );
};

export default ProductCard;
