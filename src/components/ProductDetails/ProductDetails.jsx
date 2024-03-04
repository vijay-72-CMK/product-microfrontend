import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import { FaDollarSign } from "react-icons/fa";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10) || 1);
  };

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    setQuantity(Math.max(quantity - 1, 1));
  };

  const handleAddToCart = async () => {
    try {
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
        new CustomEvent("cart-item-added", {
          detail: { productId, quantity },
        })
      );
      console.log("Event dispatched: cart-item-added");
      toast.success(`Added ${quantity} item(s) to the cart!`);
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Error adding item to cart!");
    }
  };

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/products/${productId}`
      );
      console.log(response.data);
      setProductData(response.data);
      if (response.data.images) {
        setMainImage(response.data.images[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleMainImageChange = (newImage) => {
    const newIndex = productData.images.indexOf(newImage);
    setSelectedThumbnail(newIndex);
    console.log("New Image Clicked:", newImage);
    setMainImage(newImage);
  };

  return (
    <Container className={styles.productDetailsContainer}>
      {isLoading ? (
        <p>Loading product details...</p>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              className={`${styles.productImage} img-fluid`}
              src={mainImage}
              alt="Product Main"
            />
            <Row className="mt-3 no-gutters">
              {productData.images.map((image, index) => (
                <Col key={index} xs={2}>
                  <Image
                    className={`${styles.thumbnail} img-fluid ${
                      index === selectedThumbnail ? styles.selected : ""
                    }`}
                    src={image}
                    alt={`Product Thumbnail ${index}`}
                    onClick={() => handleMainImageChange(image)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6}>
            <h2 className={styles.productTitle}>{productData.name}</h2>
            <p className={`${styles.productDescription} text-wrap`}>
              {productData.description}
            </p>
            <div className={`${styles.productWrapper} mb-2`}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.boldBigPrice}>
                <FaDollarSign className="dollar-icon" />
                {productData.price}
              </span>
            </div>
            <h4 className="fw-bold">Specs</h4>
            <ul className={styles.attributes}>
              {Object.keys(productData.attributes).map((key, index) => (
                <li key={index} className={styles.attribute}>
                  <span className={styles.attributeKey}>{key}: </span>
                  <span className={styles.attributeValue}>
                    {productData.attributes[key]}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.quantitySelector}>
              <label htmlFor="quantity">Quantity:</label>
              <button onClick={handleQuantityDecrement}>-</button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={handleQuantityIncrement}>+</button>
            </div>
            <Button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ProductDetails;
