import React, { useState } from "react";
import { Button, Modal, TextField, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import CategoryFilter from "./categoryFilter";

interface ProductData {
  title: string;
  price: number;
  stock: number;
  brand: string;
  rating: number;
  thumbnail: string;
  description: string;
  discountPercentage: number;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAddProductSuccess: (newProduct: ProductData) => void; // Callback para indicar sucesso na adição de produto
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, onAddProductSuccess  }) => {
  const [productData, setProductData] = useState<ProductData>({
    price: 0,
    stock: 0,
    rating: 0,
    brand: "",
    title: "",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg", // A API não deixa enviar qualquer url de qualquer imagem, e até mesmoa url da imagem que a própria api fornece está dando erro, então estou enviando uma imagem padrão de um produto retornado pela API
    description: "",
    discountPercentage: 0,
  });
  const [category, setCategory] = useState<string>("");

  const handleAddProduct = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          category: category,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const newProduct = await response.json();
      // Após adicionar com sucesso, buscar novamente os dados da API
      onAddProductSuccess(newProduct); // Chama a função de callback para indicar sucesso
      onClose(); // Aqui você está invocando a função getData definida no componente Home
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
        <IconButton onClick={onClose} className="absolute top-2 right-2">
          <CloseIcon />
        </IconButton>
        <TextField
          label="Title"
          value={productData.title}
          onChange={(e) =>
            setProductData({ ...productData, title: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={productData.price}
          onChange={(e) =>
            setProductData({
              ...productData,
              price: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Discount Percentage"
          type="number"
          value={productData.discountPercentage}
          onChange={(e) =>
            setProductData({
              ...productData,
              discountPercentage: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          type="number"
          value={productData.rating}
          onChange={(e) =>
            setProductData({
              ...productData,
              rating: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          type="number"
          value={productData.stock}
          onChange={(e) =>
            setProductData({
              ...productData,
              stock: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Brand"
          value={productData.brand}
          onChange={(e) =>
            setProductData({ ...productData, brand: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <CategoryFilter
          onCategoryChange={(category) => setCategory(category)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          startIcon={<AddIcon />}
          sx={{
            color: "green",
            bgcolor: "green",
            "&:hover": { bgcolor: "darkgreen", color: "white" },
          }}
          className="mt-4"
        >
          ADICIONAR PRODUTO
        </Button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
