import { Pagination, Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import styles from "./ProductPage.module.css";
import Filters from "../../components/Filters/Filters";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState({
    categoryIds: [],
    brands: [],
    priceRange: null,
    keyword: "",
    boardSizes: [],
    selectedSort: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({});

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const fetchProducts = async (page = 0) => {
    const categoryIdString = productsFilter.categoryIds.join(",");
    const boardSizeString = productsFilter.boardSizes.join(",");
    const brandsString = productsFilter.brands.join(",");

    let minPrice;
    let maxPrice;
    let sortBy;
    let sortDirection;

    if (productsFilter.priceRange === "300-plus") {
      minPrice = 300;
    } else if (productsFilter.priceRange) {
      [minPrice, maxPrice] = productsFilter.priceRange.split("-");
    }
    [sortBy, sortDirection] = productsFilter.selectedSort.split("_");
    console.log(sortBy, sortDirection);

    try {
      const response = await axios.get(
        "http://localhost:8081/api/products/search",
        {
          params: {
            category: categoryIdString,
            boardSize: boardSizeString,
            brand: brandsString,
            minPrice,
            maxPrice,
            keyword: productsFilter.keyword,
            page,
            sortBy,
            sortDirection,
            size: 8,
          },
        }
      );

      console.log("yo" + response.data);
      setProducts(response.data.content);
      setPaginationInfo({
        totalPages: response.data.totalPages,
        last: response.data.last,
        first: response.data.first,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response.status == 500) {
        navigate("/error");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    console.log(productsFilter);
  }, [productsFilter, currentPage]);

  return (
    <Container className={`${styles.products}`}>
      <Filters
        productFilters={productsFilter}
        setProductFilters={setProductsFilter}
      />

      {/* Products Display */}
      <Row>
        {products.length > 0 ? (
          products.map((productItem) => (
            <Col xs={12} sm={6} md={4} lg={3} key={productItem.id}>
              <ProductCard productItem={productItem} />
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center mt-3">
            <p>No products found.</p>
          </div>
        )}
      </Row>

      {/* Pagination */}
      {products.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            {/* 'First' and 'Prev' buttons */}
            {paginationInfo.first ? null : (
              <>
                <Pagination.First onClick={() => handlePageChange(0)} />
                <Pagination.Prev
                  onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                />
              </>
            )}

            {/* Page Number Buttons */}
            {Array.from({ length: paginationInfo.totalPages }).map((_, idx) => (
              <Pagination.Item
                key={idx}
                active={idx === currentPage}
                onClick={() => handlePageChange(idx)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}

            {/* 'Next' and 'Last' buttons */}
            {paginationInfo.last ? null : (
              <>
                <Pagination.Next
                  onClick={() =>
                    handlePageChange(
                      Math.min(paginationInfo.totalPages - 1, currentPage + 1)
                    )
                  }
                />
                <Pagination.Last
                  onClick={() =>
                    handlePageChange(paginationInfo.totalPages - 1)
                  }
                />
              </>
            )}
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Product;
