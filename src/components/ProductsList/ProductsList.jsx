import { Box, Container, Pagination, Slider, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import ProductCard from "../ProductCard/ProductCard";

const ProductsList = () => {
  const { products, getProducts, pages } = useContext(productsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("q") ? searchParams.get("q") : ""
  );
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("_page") ? +searchParams.get("_page") : 1
  );
  const [price, setPrice] = useState([1000, 1000000]);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setSearchParams({
      q: search,
      _page: currentPage,
      _limit: 3,
      price_gte: price[0],
      price_lte: price[1],
    });
  }, [search, currentPage, price]);
  // console.log(price);
  useEffect(() => {
    getProducts();
  }, [searchParams]);

  // console.log(currentPage);
  // console.log(window.location.search);
  return (
    <Container>
      <Box>
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          label="Search"
          variant="filled"
        />
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={price}
          onChange={(e, value) => {
            console.log(value);
            setPrice(value);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
          step={10000}
          // getAriaValueText={valuetext}
        />
      </Box>
      <Box display={"flex"} flexDirection={"row"}>
        {products.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Box>
      <Box>
        <Pagination
          onChange={(event, page) => {
            setCurrentPage(page);
          }}
          page={currentPage}
          count={pages}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ProductsList;
