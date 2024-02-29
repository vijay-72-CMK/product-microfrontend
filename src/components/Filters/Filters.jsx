import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const Filters = ({ productFilters, setProductFilters }) => {
  const [categories, setCategories] = useState([]);

  const priceOptions = [
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-300", label: "$200 - $300" },
    { value: "300-plus", label: "$300+" },
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/category/all`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setProductFilters({ ...productFilters, categoryIds: selectedIds });
  };

  const handlePriceChange = (option) => {
    setProductFilters({ ...productFilters, priceRange: option.value });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="filter-container mb-5">
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Select
            isMulti
            options={categories.map((category) => ({
              value: category.name,
              label: category.name,
            }))}
            onChange={handleCategoryChange}
            placeholder="Select Categories"
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Select
            options={priceOptions}
            value={
              productFilters.priceRange
                ? priceOptions.find(
                    (option) => option.value === productFilters.priceRange
                  )
                : null
            }
            onChange={handlePriceChange}
            placeholder="Filter by Price Range"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Filters;
