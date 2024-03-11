import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import "./Filters.css";

const Filters = ({ productFilters, setProductFilters, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const priceOptions = [
    { value: null, label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-300", label: "$200 - $300" },
    { value: "300-plus", label: "$300+" },
  ];

  const keyboardSizes = [
    { label: "40%", value: 40 },
    { label: "60%", value: 60 },
    { label: "65%", value: 65 },
    { label: "75%", value: 75 },
    { label: "TKL (Tenkeyless)", value: 80 },
    { label: "96%", value: 96 },
    { label: "Full-size (100%)", value: 100 },
  ];

  const availableBrands = [
    { label: "KBDFans", value: "KBDfans" },
    { label: "Keychron", value: "Keychron" },
    { label: "Glorious", value: "Glorious" },
    { label: "Ducky", value: "Ducky" },
    { label: "Varmilo", value: "Varmilo" },
    { label: "Leopold", value: "Leopold" },
  ];

  const sortOptions = [
    { label: "Price (Low to High)", value: "price_asc" },
    { label: "Price (High to Low)", value: "price_desc" },
    { label: "Title (A - Z)", value: "name_asc" },
    { label: "Title (Z - A)", value: "name_desc" },
    { label: "Date (Oldest - Newest)", value: "createdAt_asc" },
    { label: "Date (Newest - Oldest)", value: "createdAt_desc" },
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
    setProductFilters({
      ...productFilters,
      priceRange: option ? option.value : null,
    });
  };

  const handleKeyboardSizeChange = (selectedSizes) => {
    const allSelectedSizes = selectedSizes
      ? selectedSizes.map((selectedSize) => selectedSize.value)
      : [];
    setProductFilters({ ...productFilters, boardSizes: allSelectedSizes });
  };

  const handleBrandChange = (selectedBrands) => {
    const allSelectedBrands = selectedBrands
      ? selectedBrands.map((selectedBrands) => selectedBrands.value)
      : [];
    setProductFilters({ ...productFilters, brands: allSelectedBrands });
  };

  const handleSortChange = (sortOption) => {
    setProductFilters({ ...productFilters, selectedSort: sortOption.value });
  };
  useEffect(() => {
    console.log("yo selected category is" + selectedCategory);
    fetchCategories();
  }, [selectedCategory]);

  return (
    <>
      <Row>
        <h2 className="catalogHeading">Custom Keys for Ultimate Clicks</h2>
      </Row>
      <Row>
        <Col xs={12}>
          <SearchBar
            placeholder="Search Products..."
            filters={productFilters}
            setFilters={setProductFilters}
          />
        </Col>
      </Row>
      <Row className="negMargin">
        <Col xs={6} sm={6} md={4} lg={2}>
          <Select
            key={String(selectedCategory)}
            isMulti
            options={categories.map((category) => ({
              value: category.name,
              label: category.name,
            }))}
            onChange={handleCategoryChange}
            placeholder="Categories"
            defaultValue={
              selectedCategory
                ? { value: selectedCategory, label: selectedCategory }
                : null
            }
          />
        </Col>
        <Col xs={6} sm={6} md={4} lg={2}>
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
            placeholder="Price"
          />
        </Col>
        <Col xs={6} sm={6} md={4} lg={2}>
          <Select
            isMulti
            options={keyboardSizes.map((keyboardSizes) => ({
              value: keyboardSizes.value,
              label: keyboardSizes.label,
            }))}
            onChange={handleKeyboardSizeChange}
            placeholder="Board Size"
          />
        </Col>
        <Col xs={6} sm={6} md={4} lg={2}>
          <Select
            isMulti
            options={availableBrands.map((brand) => ({
              value: brand.value,
              label: brand.label,
            }))}
            onChange={handleBrandChange}
            placeholder="Brand"
          />
        </Col>
        <Col xs={6} sm={6} md={4} lg={4}>
          <Select
            options={sortOptions.map((sortOptions) => ({
              value: sortOptions.value,
              label: sortOptions.label,
            }))}
            onChange={handleSortChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default Filters;
