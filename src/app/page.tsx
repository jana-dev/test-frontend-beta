'use client'
import Products from "./components/products"
import PaginationProducts from "./components/pagination"
import SearchBar from "./components/ui/searchBar"
import { useState, useEffect } from "react"


const Home = () => {
  // Estado para armazenar os produtos
  const [productsResponse, setProductsResponse] = useState();
  // Estado para armazenar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Função para buscar os dados da API
  const getData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setProductsResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Efeito para buscar os dados da API quando o componente é montado
  useEffect(() => {
    getData();
  }, []);

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <main>
      {/* Componente de barra de pesquisa com seleção de categoria */}
      <SearchBar onCategoryChange={handleCategoryChange} />

      {/* Componente de produtos */}
      {productsResponse && (
        <Products productsResponse={productsResponse} selectedCategory={selectedCategory} />
      )}

      {/* Componente de paginação */}
      <PaginationProducts />
    </main>
  );
};

export default Home;
