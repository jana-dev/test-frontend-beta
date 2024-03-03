'use client';
import { useState, useEffect } from "react";
import Products from "./components/Products";
import PaginationProducts from "./components/pagination";
import MenuComponent from "./components/ui/menuComponent";

interface ProductProps {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  thumbnail: string;
  description: string;
  images: Array<string>;
  discountPercentage: number;
}

interface ProductsResponse {
  total: number;
  skip: number;
  limit: number;
  products: ProductProps[];
}

const Home = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>({
    skip: 0,
    limit: 0,
    total: 0,
    products: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setProductsResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(productsResponse);
  }, [productsResponse]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddProductSuccess = (newProduct: ProductProps) => {
    if (productsResponse) {
      const updatedProductsResponse: ProductsResponse = {
        ...productsResponse,
        products: [...productsResponse.products, newProduct],
      };
      setProductsResponse(updatedProductsResponse);
    }
  };

  return (
    <main>
      <MenuComponent
        onCategoryChange={handleCategoryChange}
        onAddProductSuccess={handleAddProductSuccess}
      />
      {productsResponse && (
        <Products
          productsResponse={productsResponse}
          selectedCategory={selectedCategory}
        />
      )}
      <PaginationProducts />
    </main>
  );
};

export default Home;
