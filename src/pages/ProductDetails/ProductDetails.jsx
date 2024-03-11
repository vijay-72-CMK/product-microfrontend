import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import { FaDollarSign } from "react-icons/fa";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../../components/CustomButtonComponent/CustomButton";

const ProductDetails = () => {
  const navigate = useNavigate();
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
        new CustomEvent("cart-change", {
          detail: { productId, quantity },
        })
      );
      console.log("Event dispatched: cart-change from PDP");
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
      if (error.response.status == 404) {
        navigate("*", { replace: true });
      }
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
          <Col md={3}>
            <Image
              className={`${styles.productImage} img-fluid`}
              src={mainImage}
              alt="Product Main"
            />
            <Row className={`mt-3 no-gutters ${styles.imageThumbnail}`}>
              {productData.images.map((image, index) => (
                <Col key={index} xs={4}>
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
          <Col md={9} className={styles.productDetails}>
            <h2 className={styles.productTitle}>{productData.name}</h2>
            <p className={`${styles.productDescription}`}>
              {productData.description}
            </p>
            <Container className={styles.specContainer}>
              <Row className={styles.priceRow}>
                <Col lg={12}>
                  <h4 className={styles.specsTitle}>
                    <bold className={styles.attributeKey}>Specs</bold>
                  </h4>
                  <ul className={styles.attributes}>
                    {Object.keys(productData.attributes).map((key, index) => (
                      <>
                        <li key={index} className={styles.attribute}>
                          <span className={styles.attributeK}>{key}: </span>
                          <span className={styles.attributeValue}>
                            {productData.attributes[key]}
                          </span>
                        </li>
                      </>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row className={styles.priceRow}>
                <div className={`${styles.productWrapper}`}>
                  <span className={styles.priceLabel}>Price:</span>
                  <span className=""> $ {productData.price}</span>
                </div>
              </Row>
            </Container>
            <div className={styles.addCartContainer}>
              <div className={styles.quantitySelector}>
                <label htmlFor="quantity">Quantity:</label>
                <div className={styles.quantityOptions}>
                  <button
                    onClick={handleQuantityDecrement}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    onClick={handleQuantityIncrement}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
              <CustomButton
                size="lg"
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                Add to Cart
              </CustomButton>
            </div>
          </Col>
        </Row>
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Container>
  );
};

export default ProductDetails;
