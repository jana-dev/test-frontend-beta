import React from "react";

import { Button, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CategoryFilter from "./categoryFilter";
import AddProductModal from "./addProductModal";

interface MenuComponentProps {
  onCategoryChange: (category: string) => void;
  onAddProductSuccess: (newProduct: any) => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({ onCategoryChange, onAddProductSuccess }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-between mt-4 max-w-[1280px] mx-auto px-4 items-center">
      <div>
        <CategoryFilter onCategoryChange={onCategoryChange} />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          startIcon={<AddIcon />}
          sx={{
            color: "green",
            bgcolor: "green",
            "&:hover": { bgcolor: "darkgreen", color: "white" },
          }}
        >
          ADICIONAR PRODUTO
        </Button>
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <AddProductModal open={modalOpen} onClose={handleCloseModal} onAddProductSuccess={onAddProductSuccess} />
        </Modal>
      </div>
    </div>
  );
};

export default MenuComponent;
