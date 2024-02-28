import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";

const ProductCard = ({ productItem }) => {
  return (
    <Card className={`${styles.product} mb-5 mx-auto border-0`}>
      <Card.Img
        variant="top"
        src={productItem.images[0]}
        alt={productItem.name}
        className={styles.productImage}
      />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold">{productItem.name}</Card.Title>
        <div>
          <Rating rating={productItem.averageRating} /> (
          {productItem.averageRating})
        </div>
        <span className="d-block mt-3">${productItem.price}</span>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
