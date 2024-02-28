import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { FaPlus } from "react-icons/fa";
import styles from "./ProductCard.module.css";

const ProductCard = ({ productItem }) => {
  return (
    <Card className={`${styles.product} mb-5 mx-auto border-0`}>
      <Card.Img
        variant="top"
        src={productItem.images[0]}
        alt={productItem.name}
      />
      <Card.Body>
        <Card.Title className="text-center">{productItem.name}</Card.Title>
        <div className="d-flex justify-content-between mt-3">
          <span className="fw-bold">{productItem.price}</span>
          <Rating value={productItem.rating} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
