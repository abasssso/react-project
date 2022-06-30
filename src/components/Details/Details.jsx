import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";

const Details = () => {
  const { detailedProduct, oneProduct } = useContext(productsContext);
  const { id } = useParams();
  useEffect(() => {
    detailedProduct(id);
  }, []);

  return oneProduct ? (
    <Container>
      <Box>
        <img src={oneProduct.image} width="50%" alt="product" />

        <Typography variant="h4">{oneProduct.title}</Typography>
        <Typography variant="h5">{oneProduct.description}</Typography>
        <Typography variant="h4">{oneProduct.price}</Typography>
      </Box>
    </Container>
  ) : (
    <Loader />
  );
};

export default Details;
