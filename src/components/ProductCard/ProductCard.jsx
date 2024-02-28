import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { FaPlus } from "react-icons/fa";
import styles from "./ProductCard.module.css";

const ProductCard = ({ productItem }) => {
  return (
    <Card className={`${styles.product} mb-4`}>
      <div className={styles.productImg}>
        <Card.Img
          loading="lazy"
          variant="top"
          src={productItem?.images && productItem?.images[0]}
          alt={productItem.name}
        />
      </div>

      <Card.Body className={`${styles.productDetails} p-3`}>
        <Card.Title className={`${styles.productTitle} text-primary`}>
          {productItem.name}
        </Card.Title>
        <Rating rating={productItem.averageRating} />

        <div className="d-flex justify-content-between align-items-start mt-3">
          <h4>${productItem.price}</h4>
          <Button variant="light" className={styles.add}>
            <FaPlus />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
