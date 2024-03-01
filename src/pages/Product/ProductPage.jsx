import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import styles from "./ProductPage.module.css";
import Filters from "../../components/Filters/Filters";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState({
    categoryIds: [],
    brand: "",
    priceRange: null,
  });

  const fetchProducts = async () => {
    const categoryIdString = productsFilter.categoryIds.join(",");

    let minPrice;
    let maxPrice;

    if (productsFilter.priceRange === "300-plus") {
      minPrice = 300;
    } else if (productsFilter.priceRange) {
      [minPrice, maxPrice] = productsFilter.priceRange.split("-");
    }

    try {
      const response = await axios.get(
        "http://localhost:8081/api/products/search",
        {
          params: {
            category: categoryIdString,
            minPrice,
            maxPrice,
          },
        }
      );

      console.log("yo" + response.data);
      setProducts(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log(productsFilter);
  }, [productsFilter]);

  return (
    <Container className={`${styles.products}`} style={{ minHeight: "800px" }}>
      <Filters
        productFilters={productsFilter}
        setProductFilters={setProductsFilter}
      />
      <Row>
        {products.map((productItem) => (
          <Col xs={12} sm={6} md={4} lg={3} key={productItem.id}>
            <ProductCard productItem={productItem} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Product;
