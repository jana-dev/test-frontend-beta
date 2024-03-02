'use client';
import Link from "next/link";
import Image from "next/image";
import DropdownButton from "./ui/dropdownButton";
import HalfRating from "./ui/ratingProduct";
import React, {useEffect, useState} from 'react';

interface ProductProps {
    id: number;
    title: string;
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    images: Array<string>;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
}

interface ProductsResponse {
    products: ProductProps[];
    total: number;
    skip: number;
    limit: number;
}

interface Props {
    productsResponse: ProductsResponse; // Mudança na propriedade para refletir o formato de dados
    selectedCategory: string;
}

const Products: React.FC<Props> = ({ productsResponse, selectedCategory }) => {
    //console.log('selectedCategory', selectedCategory)
    // Verifica se a categoria selecionada está vazia ou é All Products
    const isAllProductsSelected = selectedCategory === '' || selectedCategory === 'All Products';
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

    //console.log('isAllProductsSelected:', isAllProductsSelected);

    const calculateDiscountPrice = (price: number, discountPercentage: number) => {
        const discountedPrice = price - (price * (discountPercentage / 100));
        const formattedPrice = discountedPrice.toFixed(2).replace('.', ',');
        return formattedPrice;
    }
    
    useEffect(() => {
        // Atualizar os produtos filtrados quando o searchTerm for alterado
        const filteredProducts = productsResponse.products.filter((item) => {
    
            // Verificar se a categoria do produto corresponde à categoria selecionada
            const isCategoryMatch = isAllProductsSelected || item.category === selectedCategory;
            
            // Retorna true se o produto corresponder à categoria selecionada e ao termo de busca
            return isCategoryMatch;
        });
    
        // Atualizar o estado dos produtos filtrados
        setFilteredProducts(filteredProducts);
    }, [productsResponse, selectedCategory]);

    //console.log('filteredProducts:', filteredProducts);
    return (
        <>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10 px-4 text-center">
                {filteredProducts.map((item) => (
                    <Link href={"/"} key={item.id}>
                        <div className="flex flex-col justify-start gap-y-2 h-[380px] shadow-lg relative p-6">
                            {/* Product image */}
                            <div>
                            <Image
                                src={item?.thumbnail}
                                width={500}
                                height={500}
                                alt="Test"
                                className="w-full h-40 object-fill"
                            />
                            </div>
                            <DropdownButton />
                            {/* Product content */}
                            <div className="text-sm flex flex-col gap-1 text-left">
                                <p className="font-bold">{item?.title}</p>
                                <p className="text-xs">{item?.brand}</p>   
                                <p className="overflow-hidden h-12 text-gray-400 py-2">
                                    {item?.description}
                                </p>
                                <p className="absolute top-[160px] bg-lime-700 text-white text-xs py-1 px-2">{Math.floor(item?.discountPercentage)}% OFF</p>
                                <p>
                                    <span className="line-through text-gray-500">$ {item?.price}</span> 
                                    <span className="text-lg ml-2 font-semibold">${calculateDiscountPrice(item?.price, item?.discountPercentage)}</span>
                                </p>
                                <HalfRating rating={item?.rating} />
                                <p className="text-gray-400 text-xs">{item?.stock} in stock</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Products;