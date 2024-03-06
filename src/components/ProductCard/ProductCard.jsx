import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ productItem }) => {
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
          <button className="ms-auto btn btn-primary">Add to Cart</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
