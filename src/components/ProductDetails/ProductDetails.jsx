import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";

const ProductDetails = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);

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
                <Col key={index} xs={3}>
                  <Image
                    className={`${styles.thumbnail} img-fluid`}
                    src={image}
                    alt={`Product Thumbnail ${index}`}
                    onClick={() => handleMainImageChange(image)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={5}>
            <h2 className={styles.productTitle}>{productData.name}</h2>
            <p className={`${styles.productDescription} text-wrap`}>
              {productData.description}
            </p>
            <div className={styles.price}>{productData.price}</div>
            <div className={styles.rating}>{productData.rating}</div>
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
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
