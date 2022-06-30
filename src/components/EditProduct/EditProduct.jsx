import { Title } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";

const EditProduct = () => {
  const navigate = useNavigate();
  const { oneProduct, detailedProduct, updateProduct } =
    useContext(productsContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    detailedProduct(id);
  }, []);
  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setImage(oneProduct.image);
    }
  }, [oneProduct]);

  function handleSave() {
    const editedProduct = {
      title,
      price,
      description,
      image,
    };
    // console.log(editedProduct);
    updateProduct(id, editedProduct);
    navigate("/products");
  }

  return oneProduct ? (
    <Container maxWidth="sm">
      <Box display={"flex"} flexDirection={"column"} marginTop={"30px"}>
        <Typography variant="h4" textAlign={"center"}>
          Edit Product
        </Typography>
        <TextField
          label="Title"
          variant="filled"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          type="number"
          label="Price"
          variant="filled"
          value={+price}
          onChange={e => setPrice(+e.target.value)}
        />
        <TextField
          label="Description"
          variant="filled"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          label="Image"
          variant="filled"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </Box>
    </Container>
  ) : (
    <Loader />
  );
};

export default EditProduct;
